/**
 * 3D-style financial illustrations.
 *
 * Hand-built SVG (a few KB in total) sharing one set of gradients defined in
 * <IllustrationDefs />, which is rendered once in the root layout. Each object
 * is drawn with an extruded "side" face offset behind the front face, top
 * highlights and a soft ground shadow, giving a consistent 3D look without
 * WebGL, images or extra requests.
 *
 * Palette follows the design tokens: navy bodies, paper surfaces, gold accents.
 */
import type { ReactElement } from "react";

const G = {
  navy: "url(#i3-navy)",
  navySide: "url(#i3-navy-side)",
  paper: "url(#i3-paper)",
  paperSide: "url(#i3-paper-side)",
  gold: "url(#i3-gold)",
  goldSide: "url(#i3-gold-side)",
  sky: "url(#i3-sky)",
  glass: "url(#i3-glass)",
  shadow: "url(#i3-shadow)",
};

export function IllustrationDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="i3-navy" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#35659f" />
          <stop offset="1" stopColor="#0f2848" />
        </linearGradient>
        <linearGradient id="i3-navy-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d2240" />
          <stop offset="1" stopColor="#051024" />
        </linearGradient>
        <linearGradient id="i3-paper" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e2e8f1" />
        </linearGradient>
        <linearGradient id="i3-paper-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c3cedd" />
          <stop offset="1" stopColor="#9fb0c7" />
        </linearGradient>
        <linearGradient id="i3-gold" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#f1d48c" />
          <stop offset="0.55" stopColor="#cfa64c" />
          <stop offset="1" stopColor="#a8822f" />
        </linearGradient>
        <linearGradient id="i3-gold-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#94702a" />
          <stop offset="1" stopColor="#6d511c" />
        </linearGradient>
        <linearGradient id="i3-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fcbff" />
          <stop offset="1" stopColor="#4a86d4" />
        </linearGradient>
        <radialGradient id="i3-glass" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#dcebff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#a9c8ef" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="i3-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0b1f3a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0b1f3a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── primitives ─────────────────────────────────────────────────────────── */

const Shadow = ({ cx = 60, cy = 106, rx = 40 }: { cx?: number; cy?: number; rx?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.16} fill={G.shadow} />
);

/** Rounded slab with an extruded side face. */
function Slab({ x, y, w, h, r = 6, d = 5, face, side }: { x: number; y: number; w: number; h: number; r?: number; d?: number; face: string; side: string }) {
  return (
    <g>
      <rect x={x + d} y={y + d} width={w} height={h} rx={r} fill={side} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={face} />
    </g>
  );
}

/** Isometric-style bar: front, right side and top faces. */
function Bar({ x, base, w, h, d = 7, face, side, top }: { x: number; base: number; w: number; h: number; d?: number; face: string; side: string; top: string }) {
  const k = d * 0.6;
  return (
    <g>
      <path d={`M${x + w} ${base - h} L${x + w + d} ${base - h - k} L${x + w + d} ${base - k} L${x + w} ${base} Z`} fill={side} />
      <path d={`M${x} ${base - h} L${x + d} ${base - h - k} L${x + w + d} ${base - h - k} L${x + w} ${base - h} Z`} fill={top} />
      <rect x={x} y={base - h} width={w} height={h} fill={face} />
    </g>
  );
}

function Lines({ x, y, widths, gap = 8, color = "#0b1f3a", opacity = 0.22 }: { x: number; y: number; widths: number[]; gap?: number; color?: string; opacity?: number }) {
  return (
    <g fill={color} opacity={opacity}>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={3.2} rx={1.6} />
      ))}
    </g>
  );
}

function Coin({ cx, cy, r = 10 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 3} rx={r} ry={r * 0.42} fill={G.goldSide} />
      <rect x={cx - r} y={cy} width={r * 2} height={3} fill={G.goldSide} />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.42} fill={G.gold} />
      <ellipse cx={cx} cy={cy} rx={r * 0.62} ry={r * 0.24} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={1.2} />
    </g>
  );
}

const Check = ({ d, width = 5, color = "#fff" }: { d: string; width?: number; color?: string }) => (
  <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
);

/* ── illustrations ──────────────────────────────────────────────────────── */

const art = {
  audit: (
    <>
      <Shadow />
      <Slab x={22} y={20} w={50} h={66} face={G.paper} side={G.paperSide} />
      <rect x={22} y={20} width={50} height={12} rx={6} fill={G.navy} />
      <rect x={22} y={26} width={50} height={6} fill={G.navy} />
      <Lines x={30} y={42} widths={[34, 28, 32, 20]} />
      {/* magnifier */}
      <path d="M86 84 L100 98" stroke={G.navySide} strokeWidth={10} strokeLinecap="round" />
      <path d="M85 83 L98 96" stroke={G.navy} strokeWidth={8} strokeLinecap="round" />
      <circle cx={74} cy={71} r={20} fill={G.goldSide} />
      <circle cx={72} cy={69} r={20} fill={G.gold} />
      <circle cx={72} cy={69} r={14} fill={G.glass} />
      <Check d="M64 69.5 L70 75.5 L80.5 63.5" width={4.5} color="#0f2848" />
    </>
  ),
  tax: (
    <>
      <Shadow />
      <Slab x={18} y={16} w={50} h={66} face={G.paper} side={G.paperSide} />
      <Lines x={26} y={26} widths={[22, 30]} />
      <g fill={G.gold}>
        <circle cx={34} cy={52} r={6} />
        <circle cx={54} cy={70} r={6} />
        <rect x={40} y={45} width={6} height={36} rx={3} transform="rotate(38 43 63)" />
      </g>
      <circle cx={34} cy={52} r={2.4} fill="#fff" />
      <circle cx={54} cy={70} r={2.4} fill="#fff" />
      {/* calculator */}
      <Slab x={66} y={46} w={34} h={48} r={6} face={G.navy} side={G.navySide} />
      <rect x={71} y={51} width={24} height={10} rx={2.5} fill={G.sky} />
      <g fill="#fff" opacity={0.9}>
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={71 + c * 8.6} y={65 + r * 8.6} width={6} height={6} rx={1.6} />))}
      </g>
      <rect x={88.2} y={82.2} width={6} height={6} rx={1.6} fill={G.gold} />
    </>
  ),
  accounting: (
    <>
      <Shadow rx={42} />
      {/* ledger book */}
      <path d="M22 40 L78 30 L84 76 L28 88 Z" fill={G.paperSide} />
      <path d="M20 36 L76 26 L82 72 L26 84 Z" fill={G.navy} />
      <path d="M20 36 L28 34.6 L34 82.3 L26 84 Z" fill={G.gold} opacity={0.95} />
      <path d="M44 42 L66 38 L67.5 50 L45.5 54 Z" fill="#fff" opacity={0.92} />
      <path d="M48 45.4 L63 42.8 M48.8 49.6 L60 47.6" stroke="#0b1f3a" strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" />
      {/* pencil */}
      <g transform="rotate(-28 64 88)">
        <rect x={40} y={85} width={40} height={6} rx={1.5} fill={G.gold} />
        <path d="M80 85 L88 88 L80 91 Z" fill="#f3e3c1" />
        <rect x={37} y={85} width={4} height={6} rx={1} fill="#9fb0c7" />
      </g>
      <Coin cx={94} cy={82} r={11} />
      <Coin cx={94} cy={74} r={11} />
      <Coin cx={94} cy={66} r={11} />
    </>
  ),
  bookkeeping: (
    <>
      <Shadow rx={42} />
      {[
        { x: 22, face: G.navy, side: G.navySide },
        { x: 46, face: G.gold, side: G.goldSide },
        { x: 70, face: G.navy, side: G.navySide },
      ].map((b, i) => (
        <g key={i} transform={i === 2 ? "rotate(8 82 96)" : undefined}>
          <rect x={b.x + 5} y={28} width={22} height={70} rx={4} fill={b.side} />
          <rect x={b.x} y={24} width={22} height={70} rx={4} fill={b.face} />
          <rect x={b.x + 4} y={36} width={14} height={18} rx={2} fill="#fff" opacity={0.9} />
          <circle cx={b.x + 11} cy={78} r={4} fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} />
        </g>
      ))}
    </>
  ),
  payroll: (
    <>
      <Shadow />
      <Slab x={30} y={14} w={56} h={60} face={G.paper} side={G.paperSide} />
      <rect x={30} y={14} width={56} height={11} rx={6} fill={G.navy} />
      <rect x={30} y={20} width={56} height={5} fill={G.navy} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={39} cy={35 + i * 9} r={2.6} fill={G.gold} />
          <rect x={45} y={33.4 + i * 9} width={20} height={3.2} rx={1.6} fill="#0b1f3a" opacity={0.22} />
          <rect x={69} y={33.4 + i * 9} width={10} height={3.2} rx={1.6} fill="#0b1f3a" opacity={0.35} />
        </g>
      ))}
      {/* people */}
      <g>
        <path d="M14 104 C14 88 22 80 34 80 C46 80 54 88 54 104 Z" fill={G.navySide} />
        <path d="M12 102 C12 86 20 78 32 78 C44 78 52 86 52 102 Z" fill={G.navy} />
        <circle cx={33} cy={69} r={10} fill={G.paperSide} />
        <circle cx={32} cy={67} r={10} fill={G.paper} />
      </g>
      <g>
        <path d="M58 104 C58 90 65 83 76 83 C87 83 94 90 94 104 Z" fill={G.goldSide} />
        <path d="M56 102 C56 88 63 81 74 81 C85 81 92 88 92 102 Z" fill={G.gold} />
        <circle cx={75} cy={73} r={9} fill={G.paperSide} />
        <circle cx={74} cy={71} r={9} fill={G.paper} />
      </g>
    </>
  ),
  vat: (
    <>
      <Shadow rx={36} />
      <path d="M31 19 H81 V95 L75 90 L69 95 L63 90 L57 95 L51 90 L45 95 L39 90 L31 95 Z" fill={G.paperSide} transform="translate(5 5)" />
      <path d="M26 16 H76 V92 L70 87 L64 92 L58 87 L52 92 L46 87 L40 92 L34 87 L26 92 Z" fill={G.paper} />
      <Lines x={34} y={28} widths={[30, 22, 26, 18]} gap={9} />
      <rect x={34} y={68} width={34} height={4} rx={2} fill="#0b1f3a" opacity={0.5} />
      <circle cx={84} cy={70} r={19} fill={G.goldSide} />
      <circle cx={82} cy={68} r={19} fill={G.gold} />
      <g fill="#fff">
        <circle cx={75.5} cy={61.5} r={3.6} />
        <circle cx={88.5} cy={74.5} r={3.6} />
        <rect x={80} y={54} width={4} height={28} rx={2} transform="rotate(45 82 68)" />
      </g>
    </>
  ),
  advisory: (
    <>
      <Shadow rx={44} />
      <path d="M14 98 L94 98 L106 90 L26 90 Z" fill={G.paperSide} />
      <Bar x={24} base={96} w={14} h={22} face={G.navy} side={G.navySide} top="#4d7ab4" />
      <Bar x={44} base={96} w={14} h={36} face={G.navy} side={G.navySide} top="#4d7ab4" />
      <Bar x={64} base={96} w={14} h={52} face={G.gold} side={G.goldSide} top="#f3dc9f" />
      <path d="M22 62 L42 50 L58 56 L88 24" fill="none" stroke="#0b1f3a" strokeOpacity={0.18} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" transform="translate(2 3)" />
      <path d="M22 62 L42 50 L58 56 L88 24" fill="none" stroke={G.gold} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M76 22 L91 21 L90 36 Z" fill={G.gold} />
    </>
  ),
  formation: (
    <>
      <Shadow rx={42} />
      {/* building: left + right faces with roof */}
      <path d="M22 40 L58 28 L94 40 L58 50 Z" fill="#4d7ab4" />
      <path d="M22 40 L58 50 L58 100 L22 94 Z" fill={G.navy} />
      <path d="M58 50 L94 40 L94 94 L58 100 Z" fill="#0f2848" />
      <g fill={G.sky}>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <path key={`l${r}${c}`} d={`M${27 + c * 10} ${54 + r * 9} l6 1.6 v5 l-6 -1.6 Z`} transform={`translate(0 ${c * 2.8})`} />
          )),
        )}
      </g>
      <g fill="#8fb6e6" opacity={0.75}>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <path key={`r${r}${c}`} d={`M${63 + c * 10} ${56 + r * 9} l6 -1.6 v5 l-6 1.6 Z`} transform={`translate(0 ${-c * 2.8})`} />
          )),
        )}
      </g>
      <path d="M52 89 l10 -1.5 v12 l-10 1.5 Z" fill={G.gold} transform="translate(-3 0)" />
      {/* flag */}
      <path d="M58 28 V12" stroke="#0b1f3a" strokeWidth={2} />
      <path d="M58 12 L72 16 L58 20 Z" fill={G.gold} />
    </>
  ),
  cfo: (
    <>
      <Shadow rx={42} />
      <Slab x={14} y={20} w={88} h={58} r={7} face={G.navy} side={G.navySide} />
      <rect x={19} y={25} width={78} height={48} rx={4} fill={G.paper} />
      {/* donut */}
      <circle cx={38} cy={49} r={12} fill="none" stroke="#c9d5e6" strokeWidth={7} />
      <circle cx={38} cy={49} r={12} fill="none" stroke={G.gold} strokeWidth={7} strokeDasharray="47 76" transform="rotate(-90 38 49)" />
      <circle cx={38} cy={49} r={12} fill="none" stroke="#27528a" strokeWidth={7} strokeDasharray="18 76" strokeDashoffset={-47} transform="rotate(-90 38 49)" />
      {/* line chart */}
      <path d="M58 62 L66 54 L73 57 L82 43 L90 38" fill="none" stroke="#27528a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={90} cy={38} r={3} fill={G.gold} />
      <Lines x={58} y={32} widths={[18, 12]} gap={6} opacity={0.25} />
      {/* stand */}
      <path d="M52 83 L68 83 L72 98 L48 98 Z" fill={G.navySide} />
      <rect x={40} y={96} width={40} height={5} rx={2.5} fill={G.navy} />
    </>
  ),
  cloud: (
    <>
      <Shadow rx={40} />
      <path
        d="M36 78 C22 78 16 68 18 60 C20 52 27 48 34 49 C36 36 47 28 60 30 C71 31 78 39 80 47 C90 46 99 53 99 63 C99 72 92 78 84 78 Z"
        fill={G.paperSide}
        transform="translate(4 5)"
      />
      <path d="M36 78 C22 78 16 68 18 60 C20 52 27 48 34 49 C36 36 47 28 60 30 C71 31 78 39 80 47 C90 46 99 53 99 63 C99 72 92 78 84 78 Z" fill={G.paper} />
      <Bar x={40} base={70} w={8} h={12} d={5} face={G.navy} side={G.navySide} top="#4d7ab4" />
      <Bar x={53} base={70} w={8} h={20} d={5} face={G.navy} side={G.navySide} top="#4d7ab4" />
      <Bar x={66} base={70} w={8} h={28} d={5} face={G.gold} side={G.goldSide} top="#f3dc9f" />
      <path d="M60 82 V92" stroke="#27528a" strokeWidth={3} strokeDasharray="3 3" />
      <Coin cx={60} cy={96} r={10} />
    </>
  ),
  compliance: (
    <>
      <Shadow rx={34} />
      <path d="M64 16 L96 28 V54 C96 76 82 92 64 100 C46 92 32 76 32 54 V28 Z" fill={G.navySide} transform="translate(-1 3)" />
      <path d="M60 14 L92 26 V52 C92 74 78 90 60 98 C42 90 28 74 28 52 V26 Z" fill={G.gold} />
      <path d="M60 21 L86 31 V52 C86 70 75 83 60 90 C45 83 34 70 34 52 V31 Z" fill={G.navy} />
      <path d="M60 21 L86 31 V52 C86 70 75 83 60 90 Z" fill="#0b1f3a" opacity={0.25} />
      <Check d="M47 55 L57 65 L75 45" width={7} />
    </>
  ),
  reporting: (
    <>
      <Shadow rx={42} />
      <Slab x={16} y={18} w={84} h={70} r={8} face={G.paper} side={G.paperSide} />
      <rect x={16} y={18} width={84} height={13} rx={8} fill={G.navy} />
      <rect x={16} y={25} width={84} height={6} fill={G.navy} />
      <circle cx={24} cy={24.5} r={2} fill={G.gold} />
      <Bar x={26} base={78} w={9} h={16} d={5} face="#27528a" side={G.navySide} top="#6b93c8" />
      <Bar x={40} base={78} w={9} h={26} d={5} face="#27528a" side={G.navySide} top="#6b93c8" />
      <Bar x={54} base={78} w={9} h={34} d={5} face={G.gold} side={G.goldSide} top="#f3dc9f" />
      <circle cx={84} cy={52} r={10} fill="none" stroke="#c9d5e6" strokeWidth={6} />
      <circle cx={84} cy={52} r={10} fill="none" stroke={G.gold} strokeWidth={6} strokeDasharray="42 63" transform="rotate(-90 84 52)" />
      <Lines x={74} y={70} widths={[20, 14]} gap={6} />
    </>
  ),
  consultation: (
    <>
      <Shadow rx={40} />
      <path d="M20 26 H72 A8 8 0 0 1 80 34 V62 A8 8 0 0 1 72 70 H40 L28 82 V70 H20 A8 8 0 0 1 12 62 V34 A8 8 0 0 1 20 26 Z" fill={G.navySide} transform="translate(4 4)" />
      <path d="M20 26 H72 A8 8 0 0 1 80 34 V62 A8 8 0 0 1 72 70 H40 L28 82 V70 H20 A8 8 0 0 1 12 62 V34 A8 8 0 0 1 20 26 Z" fill={G.navy} />
      <Lines x={22} y={38} widths={[44, 36, 24]} gap={9} color="#fff" opacity={0.75} />
      <path d="M64 50 H100 A7 7 0 0 1 107 57 V80 A7 7 0 0 1 100 87 H98 V97 L88 87 H64 A7 7 0 0 1 57 80 V57 A7 7 0 0 1 64 50 Z" fill={G.goldSide} transform="translate(3 3)" />
      <path d="M64 50 H100 A7 7 0 0 1 107 57 V80 A7 7 0 0 1 100 87 H98 V97 L88 87 H64 A7 7 0 0 1 57 80 V57 A7 7 0 0 1 64 50 Z" fill={G.gold} />
      <Check d="M71 68 L79 76 L93 61" width={5} />
    </>
  ),
} satisfies Record<string, ReactElement>;

export type IllustrationName = keyof typeof art;

export function Illustration({ name, className, title }: { name: IllustrationName; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} focusable="false">
      {title ? <title>{title}</title> : null}
      {art[name]}
    </svg>
  );
}
