import type { BotConfig } from "./config";
import type { PublicBot } from "@/components/chatbot/ChatWidget";
// Only these fields reach the browser; the knowledge base stays on the server.
export const toPublic = ({ id, botName, tagline, accent, avatar, greeting, quickReplies }: BotConfig): PublicBot =>
  ({ id, botName, tagline, accent, avatar, greeting, quickReplies });
