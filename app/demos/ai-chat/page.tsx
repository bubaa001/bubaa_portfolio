import type { Metadata } from "next";
import DemoBar from "@/components/demo/DemoBar";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { defaultBot } from "@/lib/chatbot/config";
import { toPublic } from "@/lib/chatbot/public";

export const metadata: Metadata = { title: "AI chatbot demo" };

export default function Page() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-700 [color-scheme:light]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <span className="font-serif text-2xl font-semibold text-stone-900">Oak & Ember</span>
        <nav className="hidden gap-8 text-sm sm:flex"><span>Menu</span><span>Book a table</span><span>Events</span><span>Contact</span></nav>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-orange-700">Wood-fired kitchen · Downtown</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-stone-900 sm:text-6xl">Slow food, cooked over real fire.</h1>
          <p className="mt-6 max-w-md text-lg">Seasonal plates, natural wine and a 12-seat chef&apos;s counter. Questions about the menu, allergies or bookings? Ask our assistant, bottom right.</p>
          <div className="mt-8 flex gap-3">
            <span className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white">Book a table</span>
            <span className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium">View menu</span>
          </div>
        </div>
        <div className="aspect-[4/5] rounded-[2rem] bg-[radial-gradient(circle_at_30%_30%,#fb923c,#9a3412_60%,#292524)] shadow-2xl" />
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-32 text-center sm:px-6">
        <h2 className="font-serif text-3xl text-stone-900">What this demo shows</h2>
        <p className="mt-4">A support chatbot that answers from the business&apos;s own info (menu, hours, policies), streams replies, offers quick-reply buttons and hands off to a human or booking. It runs on Claude AI, answering only from this restaurant's own information, and drops into any website with one line of code.</p>
        <pre className="mx-auto mt-8 max-w-xl overflow-x-auto rounded-2xl bg-stone-900 p-5 text-left text-xs text-orange-200">{`<script src="https://your-site.com/embed.js"\n        data-bot="oak-ember" async></script>`}</pre>
        <p className="mt-3 text-sm text-stone-500">Works on WordPress, Shopify, Wix, Webflow, Squarespace or plain HTML.</p>
      </section>
      <ChatWidget bot={toPublic(defaultBot)} />
      <DemoBar gig="AI chatbot for your website" />
    </div>
  );
}
