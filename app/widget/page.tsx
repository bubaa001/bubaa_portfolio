import type { Metadata } from "next";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { bots, defaultBot } from "@/lib/chatbot/config";
import { toPublic } from "@/lib/chatbot/public";

export const metadata: Metadata = { title: "Chat", robots: { index: false } };

export default async function Widget({ searchParams }: { searchParams: Promise<{ bot?: string }> }) {
  const { bot } = await searchParams;
  const cfg = (bot && bots[bot]) || defaultBot;
  return (
    <>
      <style>{`html,body{background:transparent!important}`}</style>
      <ChatWidget bot={toPublic(cfg)} embedded />
    </>
  );
}
