"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function PasswordInput({ id, label, value, onChange, placeholder, required }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label-sm font-medium text-on-surface">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full h-11 px-3 pr-10 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-colors text-body-md [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}