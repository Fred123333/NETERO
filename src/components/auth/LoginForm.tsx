"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { SocialButtons } from "./SocialButtons";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="w-full max-w-md">
      <div className="p-space-xl rounded-2xl bg-surface-container border border-outline-variant/30 ">
        <div className="text-center mb-space-lg">
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface whitespace-nowrap">
            Heureux de vous <span className="text-[#FFD700]">revoir !</span>
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-2">
            Connectez-vous pour accéder à votre espace NETERO.
          </p>
        </div>

        {submitted && (
          <div className="mb-space-md p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-body-sm">
            Connexion simulée avec succès (démo frontend).
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-label-sm font-medium text-on-surface">
              Adresse email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-colors text-body-md"
              />
            </div>
          </div>

          <PasswordInput
            id="password"
            label="Mot de passe"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
          />

          <div className="flex justify-end">
            <Link href="#" className="text-label-sm text-[#FFD700] hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-[#FFD700] hover:bg-[#e9c400] text-[#171717] font-label-md font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
          >
            Se connecter
            <ArrowRight size={16} />
          </button>
        </form>

        <SocialButtons />

        <div className="mt-space-lg pt-space-md border-t border-outline-variant/30 text-center text-body-sm text-on-surface-variant">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="text-[#FFD700] font-semibold hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}