#!/usr/bin/env python3
"""Generates the importable n8n workflow JSON files in this folder.
Edit here, run `python3 build.py`, then import the .json into n8n (Workflows → Import from file)."""
import json, re, uuid
from pathlib import Path

HERE = Path(__file__).parent
TS = (HERE / "../../lib/automation/qualify.ts").read_text()
SYSTEM = re.search(r"QUALIFY_SYSTEM = `(.*?)`;", TS, re.S).group(1)
SCHEMA = {
    "type": "object", "additionalProperties": False,
    "required": ["score", "tier", "intent", "budget_fit", "urgency", "summary", "next_step", "reply_draft"],
    "properties": {
        "score": {"type": "integer"},
        "tier": {"type": "string", "enum": ["hot", "warm", "cold"]},
        "intent": {"type": "string"},
        "budget_fit": {"type": "string", "enum": ["high", "medium", "low", "unknown"]},
        "urgency": {"type": "string", "enum": ["high", "medium", "low"]},
        "summary": {"type": "string"}, "next_step": {"type": "string"}, "reply_draft": {"type": "string"},
    },
}

def node(name, type_, version, pos, params, **extra):
    n = {"parameters": params, "id": str(uuid.uuid5(uuid.NAMESPACE_URL, name)), "name": name, "type": type_, "typeVersion": version, "position": pos}
    n.update(extra)
    return n

def link(*pairs):
    c = {}
    for a, b, *idx in pairs:
        i = idx[0] if idx else 0
        main = c.setdefault(a, {"main": []})["main"]
        while len(main) <= i:
            main.append([])
        main[i].append({"node": b, "type": "main", "index": 0})
    return c

ANTHROPIC_CRED = {"httpHeaderAuth": {"id": "", "name": "Anthropic API key (x-api-key)"}}

def claude_http(name, pos):
    return node(name, "n8n-nodes-base.httpRequest", 4.2, pos, {
        "method": "POST",
        "url": "https://api.anthropic.com/v1/messages",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": True,
        "headerParameters": {"parameters": [{"name": "anthropic-version", "value": "2026-10-21"}]},
        "sendBody": True,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify($json.request) }}",
        "options": {"timeout": 60000},
    }, credentials=ANTHROPIC_CRED, retryOnFail=True, maxTries=3, waitBetweenTries=3000)

# ── Workflow 1: AI lead qualifier ──────────────────────────────────────────────
build_req = f"""// Builds the Claude request from the form submission.
const lead = $json.body ?? $json;
const SYSTEM = {json.dumps(SYSTEM)};
const SCHEMA = {json.dumps(SCHEMA)};
return [{{ json: {{
  lead,
  request: {{
    model: 'claude-opus-5-5',
    max_tokens: 2048,
    output_config: {{ effort: 'low', format: {{ type: 'json_schema', schema: SCHEMA }} }},
    system: SYSTEM,
    messages: [{{ role: 'user', content: 'New lead from the website form:\\n<lead>\\n' + JSON.stringify(lead, null, 2) + '\\n</lead>' }}],
  }},
}} }}];"""

parse = """// Parses Claude's JSON answer and merges it with the lead.
const lead = $('Build Claude request').first().json.lead;
const res = $json;
if (res.stop_reason === 'refusal') {
  return [{ json: { ...lead, score: 0, tier: 'cold', summary: 'Flagged by AI safety filter', received_at: new Date().toISOString() } }];
}
const text = (res.content || []).find(b => b.type === 'text')?.text || '{}';
const q = JSON.parse(text);
return [{ json: { received_at: new Date().toISOString(), ...lead, ...q } }];"""

wf1_nodes = [
    node("Lead form (Webhook)", "n8n-nodes-base.webhook", 2, [0, 300], {"httpMethod": "POST", "path": "lead", "responseMode": "responseNode", "options": {}}, webhookId=str(uuid.uuid5(uuid.NAMESPACE_URL, "lead-webhook"))),
    node("Build Claude request", "n8n-nodes-base.code", 2, [220, 300], {"jsCode": build_req}),
    claude_http("Claude: qualify lead", [440, 300]),
    node("Parse result", "n8n-nodes-base.code", 2, [660, 300], {"jsCode": parse}),
    node("Log to Google Sheets", "n8n-nodes-base.googleSheets", 4.5, [880, 160], {
        "operation": "append",
        "documentId": {"__rl": True, "mode": "url", "value": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit"},
        "sheetName": {"__rl": True, "mode": "name", "value": "Leads"},
        "columns": {"mappingMode": "autoMapInputData", "value": {}},
        "options": {},
    }, credentials={"googleSheetsOAuth2Api": {"id": "", "name": "Google Sheets account"}}),
    node("Hot lead?", "n8n-nodes-base.if", 2, [880, 400], {
        "conditions": {
            "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict"},
            "conditions": [{"id": "hot", "leftValue": "={{ $json.tier }}", "rightValue": "hot", "operator": {"type": "string", "operation": "equals"}}],
            "combinator": "and",
        },
        "options": {},
    }),
    node("Email owner: hot lead", "n8n-nodes-base.emailSend", 2.1, [1100, 320], {
        "fromEmail": "alerts@yourdomain.com",
        "toEmail": "you@yourdomain.com",
        "subject": "=🔥 Hot lead ({{ $json.score }}/100): {{ $json.name }} — {{ $json.intent }}",
        "emailFormat": "text",
        "text": "={{ $json.summary }}\n\nBudget fit: {{ $json.budget_fit }} · Urgency: {{ $json.urgency }}\nEmail: {{ $json.email }}\n\nNext step: {{ $json.next_step }}\n\nSuggested reply:\n{{ $json.reply_draft }}",
        "options": {},
    }, credentials={"smtp": {"id": "", "name": "SMTP account"}}),
    node("Reply to form", "n8n-nodes-base.respondToWebhook", 1.1, [1100, 500], {
        "respondWith": "json",
        "responseBody": "={{ JSON.stringify({ ok: true, tier: $('Parse result').first().json.tier }) }}",
        "options": {},
    }),
]
wf1 = {
    "name": "AI Lead Qualifier (Claude → Sheets → Email)",
    "nodes": wf1_nodes,
    "connections": link(
        ("Lead form (Webhook)", "Build Claude request"),
        ("Build Claude request", "Claude: qualify lead"),
        ("Claude: qualify lead", "Parse result"),
        ("Parse result", "Log to Google Sheets"),
        ("Parse result", "Hot lead?"),
        ("Hot lead?", "Email owner: hot lead", 0),
        ("Hot lead?", "Reply to form", 0),
        ("Hot lead?", "Reply to form", 1),
    ),
    "settings": {"executionOrder": "v1"},
    "pinData": {},
    "meta": {"templateCredsSetupCompleted": False},
}

# ── Workflow 2: competitor price / website change monitor ──────────────────────
compare = """// Compares today's prices with the last run (stored in workflow static data).
const store = $getWorkflowStaticData('global');
const prev = store.prices || {};
const items = $input.all().map(i => i.json);
const now = {};
const changes = [];
for (const it of items) {
  const titles = it.titles || [], prices = it.prices || [];
  titles.forEach((t, i) => {
    const p = parseFloat(String(prices[i] || '').replace(/[^0-9.]/g, ''));
    if (!t || isNaN(p)) return;
    now[t] = p;
    if (prev[t] !== undefined && prev[t] !== p) changes.push({ product: t, old_price: prev[t], new_price: p, change_pct: +(((p - prev[t]) / prev[t]) * 100).toFixed(1) });
    if (prev[t] === undefined && Object.keys(prev).length) changes.push({ product: t, old_price: null, new_price: p, change_pct: null });
  });
}
store.prices = now;
const checked_at = new Date().toISOString();
return [{ json: { checked_at, tracked: Object.keys(now).length, changed: changes.length, changes } }];"""

wf2_nodes = [
    node("Every morning 8:00", "n8n-nodes-base.scheduleTrigger", 1.2, [0, 300], {"rule": {"interval": [{"triggerAtHour": 8}]}}),
    node("Fetch competitor page", "n8n-nodes-base.httpRequest", 4.2, [220, 300], {"url": "https://books.toscrape.com/catalogue/category/books/travel_2/index.html", "options": {"response": {"response": {"responseFormat": "text"}}}}, retryOnFail=True, maxTries=3),
    node("Extract products", "n8n-nodes-base.html", 1.2, [440, 300], {
        "operation": "extractHtmlContent",
        "dataPropertyName": "data",
        "extractionValues": {"values": [
            {"key": "titles", "cssSelector": "article.product_pod h3 a", "returnValue": "attribute", "attribute": "title", "returnArray": True},
            {"key": "prices", "cssSelector": "article.product_pod p.price_color", "returnArray": True},
        ]},
        "options": {"trimValues": True},
    }),
    node("Compare with yesterday", "n8n-nodes-base.code", 2, [660, 300], {"jsCode": compare}),
    node("Any changes?", "n8n-nodes-base.if", 2, [880, 300], {
        "conditions": {
            "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict"},
            "conditions": [{"id": "changed", "leftValue": "={{ $json.changed }}", "rightValue": 0, "operator": {"type": "number", "operation": "gt"}}],
            "combinator": "and",
        },
        "options": {},
    }),
    node("Email price alert", "n8n-nodes-base.emailSend", 2.1, [1100, 220], {
        "fromEmail": "alerts@yourdomain.com",
        "toEmail": "you@yourdomain.com",
        "subject": "=📈 {{ $json.changed }} competitor price change(s) today",
        "emailFormat": "text",
        "text": "={{ $json.changes.map(c => `${c.product}: ${c.old_price ?? 'new'} → ${c.new_price}${c.change_pct !== null ? ` (${c.change_pct}%)` : ''}`).join('\\n') }}",
        "options": {},
    }, credentials={"smtp": {"id": "", "name": "SMTP account"}}),
]
wf2 = {
    "name": "Competitor Price Monitor (daily scrape → email alert)",
    "nodes": wf2_nodes,
    "connections": link(
        ("Every morning 8:00", "Fetch competitor page"),
        ("Fetch competitor page", "Extract products"),
        ("Extract products", "Compare with yesterday"),
        ("Compare with yesterday", "Any changes?"),
        ("Any changes?", "Email price alert", 0),
    ),
    "settings": {"executionOrder": "v1"},
    "pinData": {},
    "meta": {"templateCredsSetupCompleted": False},
}

for fn, wf in [("ai-lead-qualifier.json", wf1), ("competitor-price-monitor.json", wf2)]:
    (HERE / fn).write_text(json.dumps(wf, indent=2, ensure_ascii=False) + "\n")
    print("wrote", fn, len(wf["nodes"]), "nodes")
