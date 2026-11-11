"use client";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" width="16" height="16" fill="none">
      <path fill="#4285F4" d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.9 6-15.3Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4 1.9-6.8 1.9-5.2 0-9.6-3.5-11.2-8.2H5.9v5.2A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.8 27.7a12 12 0 0 1 0-7.4v-5.2H5.9a20 20 0 0 0 0 17.8l6.9-5.2Z" />
      <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6 29.5 4 24 4A20 20 0 0 0 5.9 15.1l6.9 5.2c1.6-4.7 6-8.2 11.2-8.2Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.2 3.4 1.6.1-.8.4-1.3.8-1.6-2.5-.3-5.2-1.3-5.2-5.5 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.7 5.2-5.2 5.5.4.4.8 1 .8 2v3c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export function SocialButtons() {
  return (
    <>
      <div className="flex items-center gap-3 my-space-md">
        <div className="flex-1 h-px bg-outline-variant/40" />
        <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
          Ou continuer avec
        </span>
        <div className="flex-1 h-px bg-outline-variant/40" />
      </div>

      <div className="grid grid-cols-2 gap-space-sm">
        <button
          type="button"
          className="h-11 rounded-lg bg-surface-container-lowest border border-outline-variant/40 hover:bg-surface-container-high text-on-surface font-label-md font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          className="h-11 rounded-lg bg-surface-container-lowest border border-outline-variant/40 hover:bg-surface-container-high text-on-surface font-label-md font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <GithubIcon />
          GitHub
        </button>
      </div>
    </>
  );
}