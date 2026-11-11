import {
  Server,
  Database,
  Brain,
  Globe,
  Layout,
  Zap,
} from "lucide-react";

export function TopologySVG() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 360 190"
        className="w-full h-auto"
        role="img"
        aria-label="Schéma de topologie de l'application"
      >
        {/* Lignes de connexion */}
        <g
          stroke="var(--on-surface-variant)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        >
          <path d="M180 90 78 45M180 90 78 135M180 90 282 45M180 90 282 135" />
        </g>

        {/* Labels de flux (sur les lignes) */}
        <g
          fontFamily="monospace"
          fontSize="8"
          fill="var(--primary-container)"
          fontWeight="bold"
        >
          <text x="120" y="60" transform="rotate(-22 120 60)">
            HTTP
          </text>
          <text x="120" y="125" transform="rotate(22 120 125)">
            SQL
          </text>
          <text x="230" y="60" transform="rotate(22 230 60)">
            SSE
          </text>
          <text x="230" y="125" transform="rotate(-22 230 125)">
            REST
          </text>
        </g>

        {/* Nœud central CORE (jaune) */}
        <g>
          <circle cx="180" cy="90" r="30" fill="var(--primary-container)" />
          <circle
            cx="180"
            cy="90"
            r="34"
            fill="none"
            stroke="var(--primary-container)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
        </g>

        {/* Satellites */}
        <g fill="var(--on-surface-variant)">
          <circle cx="78" cy="45" r="20" />
          <circle cx="78" cy="135" r="20" />
          <circle cx="282" cy="45" r="20" />
          <circle cx="282" cy="135" r="20" />
        </g>

        {/* Icônes dans les cercles (via foreignObject pour Lucide) */}
        <g fill="var(--on-surface)">
          <foreignObject x="68" y="35" width="20" height="20">
            <Layout size={20} />
          </foreignObject>
          <foreignObject x="68" y="125" width="20" height="20">
            <Database size={20} />
          </foreignObject>
          <foreignObject x="272" y="35" width="20" height="20">
            <Brain size={20} />
          </foreignObject>
          <foreignObject x="272" y="125" width="20" height="20">
            <Globe size={20} />
          </foreignObject>
        </g>

        {/* Texte "CORE" dans le nœud central */}
        <text
          x="180"
          y="92"
          fill="#171717"
          fontFamily="monospace"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
        >
          CORE
        </text>

        {/* Labels sous chaque nœud */}
        <g
          fontFamily="monospace"
          fontSize="9"
          fontWeight="bold"
          textAnchor="middle"
          fill="var(--on-surface)"
        >
          <text x="78" y="80">APP</text>
          <text x="78" y="170">DB</text>
          <text x="282" y="80">AI</text>
          <text x="282" y="170">API</text>
        </g>

        {/* Badges de statut (point vert) */}
        <g fill="#22c55e">
          <circle cx="98" cy="25" r="3" />
          <circle cx="98" cy="155" r="3" />
          <circle cx="302" cy="25" r="3" />
          <circle cx="302" cy="155" r="3" />
        </g>

        {/* Latence sous chaque badge */}
        <g
          fontFamily="monospace"
          fontSize="7"
          fill="var(--on-surface-variant)"
          textAnchor="middle"
        >
          <text x="78" y="185">&lt; 5ms</text>
          <text x="282" y="185">&lt; 5ms</text>
        </g>
      </svg>

      {/* Légende sous le SVG */}
      <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-on-surface-variant font-code">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Actif</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap size={10} className="text-[#FFD700]" />
          <span>Sub-20ms</span>
        </div>
        <div className="flex items-center gap-1">
          <Server size={10} />
          <span>Edge Runtime</span>
        </div>
      </div>
    </div>
  );
}