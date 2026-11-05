export function TopologySVG() {
  return (
    <svg className="w-full h-auto text-primary-container" fill="none" viewBox="0 0 320 140">
      <rect fill="#201f1f" height="40" rx="6" width="80" x="10" y="50" />
      <text fill="#e5e2e1" fontFamily="Inter" fontSize="11" textAnchor="middle" x="50" y="75">
        Next 15 Core
      </text>
      <path d="M90 70 L140 40" stroke="#ffd700" strokeDasharray="3 3" strokeWidth="1.5" />
      <path d="M90 70 L140 100" stroke="#ffd700" strokeWidth="1.5" />
      <rect fill="#2a2a2a" height="40" rx="6" width="80" x="140" y="20" />
      <text fill="#ffd700" fontFamily="Inter" fontSize="10" textAnchor="middle" x="180" y="45">
        Agent IA Engine
      </text>
      <rect fill="#201f1f" height="40" rx="6" width="80" x="140" y="80" />
      <text fill="#e5e2e1" fontFamily="Inter" fontSize="10" textAnchor="middle" x="180" y="105">
        Postgres Auth
      </text>
      <path d="M220 40 L260 70" stroke="#ffd700" strokeWidth="1.5" />
      <path d="M220 100 L260 70" stroke="#ffd700" strokeDasharray="3 3" strokeWidth="1.5" />
      <rect fill="#ffd700" height="40" rx="6" width="60" x="250" y="50" />
      <text
        fill="#131313"
        fontFamily="Inter"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        x="280"
        y="75"
      >
        Prod Hub
      </text>
    </svg>
  );
}