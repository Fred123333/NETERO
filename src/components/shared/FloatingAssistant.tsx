"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Sparkles, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: React.ReactNode;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Bonjour développeur ! Quel type d’application souhaitez-vous prototyper ou expédier aujourd’hui ?",
  },
  {
    role: "user",
    content: "Un micro-SaaS d'analyse avec abonnement Stripe.",
  },
  {
    role: "assistant",
    content: (
      <>
        Je vous suggère le template <strong>SaaS AI Copilot Starter</strong>. Voulez-vous la commande
        CLI pour l’&apos;initialiser ?
      </>
    ),
  },
];

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  function send() {
    const value = input.trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", content: value }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: (
            <>
              Commande CLI générée :{" "}
              <code className="text-primary-container">npx netero-cli init custom-app</code>
            </>
          ),
        },
      ]);
    }, 500);
  }

  return (
    <>
      <aside className="fixed bottom-space-lg right-space-lg z-50">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="group relative flex items-center justify-center w-14 h-14 bg-surface-container-highest hover:bg-surface-bright rounded-full shadow-[0_12px_32px_-4px_rgba(0,0,0,0.7)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-container active:scale-95"
          aria-label="Ouvrir l'assistant IA"
        >
          <Bot size={24} className="text-on-surface" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
            <Sparkles size={13} />
          </span>
        </button>
      </aside>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-surface-container-high rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="px-space-md py-space-sm bg-surface-container-highest flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-ping" />
              <span className="font-label-md text-label-md font-bold text-on-surface">
                Architecte IA Netero
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-secondary-fixed-dim hover:text-on-surface"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="p-space-md space-y-space-sm max-h-72 overflow-y-auto font-body-sm text-body-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "p-space-sm rounded-xl",
                  m.role === "user"
                    ? "bg-primary-container text-on-primary-container ml-auto max-w-[85%] text-right font-medium"
                    : "bg-surface-container text-on-surface"
                )}
              >
                {m.content}
              </div>
            ))}
          </div>

          <div className="p-space-sm bg-surface-container-highest flex items-center gap-space-xs">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Posez une question technique..."
              className="flex-1 bg-surface-container text-on-surface placeholder:text-secondary-fixed-dim px-3 py-2 rounded-lg text-body-sm font-body-sm focus:outline-none"
            />
            <button
              onClick={send}
              className="p-2 bg-primary-container text-on-primary rounded-full flex items-center justify-center hover:bg-primary-fixed-dim"
              aria-label="Envoyer"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}