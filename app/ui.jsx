// Elconekt — shared UI tokens and primitives

const UI = {
  // Surfaces
  bg: '#fafaf9',
  surface: '#ffffff',
  surfaceAlt: '#fafafa',
  hover: '#f5f5f4',

  // Borders — darkened for sharper SaaS feel without going to pure black
  border: 'rgba(10,10,10,0.16)',
  borderStrong: 'rgba(10,10,10,0.22)',
  borderHair: 'rgba(10,10,10,0.06)',

  // Text
  text: '#0a0a0a',
  textMuted: '#525252',
  muted: '#737373',
  faint: '#a3a3a3',
  faintest: '#d4d4d4',

  // Brand
  navy: '#0a1838',
  navyHover: '#142147',
  accent: '#1d4ed8',
  accentHover: '#1e40af',
  accentSoft: '#dbeafe',
  accentText: '#1e3a8a',

  // Status
  green: '#15803d',
  greenSoft: '#dcfce7',
  amber: '#b45309',
  amberSoft: '#fef3c7',
  rose: '#b91c1c',
  roseSoft: '#fee2e2',
  violet: '#7c3aed',
  violetSoft: '#ede9fe',

  // Type
  fontSans: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  fontMono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace',

  // Radii
  r4: 4, r6: 6, r8: 8, r10: 10, r12: 12,
};

// Inject once
if (!document.getElementById('elk-ui-styles')) {
  const s = document.createElement('style');
  s.id = 'elk-ui-styles';
  s.textContent = `
    * { box-sizing: border-box; }
    .elk-app { font-family: ${UI.fontSans}; color: ${UI.text}; }
    .elk-app[dir="rtl"] { font-family: 'IBM Plex Sans Arabic', 'Cairo', ${UI.fontSans}; }
    .elk-num { font-variant-numeric: tabular-nums; }
    .elk-mono { font-family: ${UI.fontMono}; }
    /* Force numbers/SKUs to render LTR even inside RTL containers */
    .elk-app[dir="rtl"] .elk-num,
    .elk-app[dir="rtl"] .elk-mono { direction: ltr; unicode-bidi: isolate; }
    .elk-app input:focus, .elk-app textarea:focus { outline: none; }
    .elk-scroll { overflow: auto; }
    .elk-scroll::-webkit-scrollbar { width: 10px; height: 10px; }
    .elk-scroll::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 999px; border: 2px solid transparent; background-clip: padding-box; }
    .elk-scroll::-webkit-scrollbar-thumb:hover { background: #a3a3a3; background-clip: padding-box; border: 2px solid transparent; }
    .elk-row-hover:hover { background: #fafafa; }
    .elk-btn-primary:hover { background: ${UI.navyHover}; }
    .elk-btn-accent:hover { background: ${UI.accentHover}; }
    .elk-btn-ghost:hover { background: ${UI.hover}; }
    @keyframes elk-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes elk-slide-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .elk-modal-backdrop { animation: elk-fade-in .15s ease; }
    .elk-modal-panel { animation: elk-slide-up .18s cubic-bezier(.2,.7,.3,1); }
    .elk-no-scrollbar::-webkit-scrollbar { display: none; }
    /* Directional icons auto-flip in RTL */
    .elk-app[dir="rtl"] .elk-icon-flip { transform: scaleX(-1); }
    /* Tables: align labels to start, numbers to end (auto-flip with dir) */
    .elk-app[dir="rtl"] .elk-cell-num { text-align: left; }
  `;
  document.head.appendChild(s);
}

// ─── Icon component ────────────────────────────────────────────────────────
const ICONS = {
  overview:   'M3 12l9-9 9 9M5 10v10h6v-6h2v6h6V10',
  containers: 'M3 7h18v10H3zM7 7v10M12 7v10M17 7v10',
  inventory:  'M4 7h16v4H4zM4 13h16v4H4zM7 7v10M17 7v10',
  clients:    'M16 11a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0114 0',
  invoices:   'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3',
  reports:    'M4 20V10M10 20V4M16 20v-7M22 20H2',
  search:     'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4-4',
  plus:       'M12 5v14M5 12h14',
  close:      'M6 6l12 12M18 6L6 18',
  chevron:    'M9 6l6 6-6 6',
  chevDown:   'M6 9l6 6 6-6',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowDown:  'M12 5v14M5 12l7 7 7-7',
  arrowLeft:  'M19 12H5M11 18l-6-6 6-6',
  filter:     'M3 6h18M6 12h12M10 18h4',
  more:       'M5 12h.01M12 12h.01M19 12h.01',
  check:      'M5 13l4 4L19 7',
  clock:      'M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  download:   'M12 4v12m0 0l-5-5m5 5l5-5M4 20h16',
  edit:       'M11 4H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-6M19 4l2 2-9 9H9v-3l9-9z',
  trash:      'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  menu:       'M3 6h18M3 12h18M3 18h18',
  user:       'M16 11a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0114 0',
  briefcase:  'M3 9h18v11H3zM8 9V5h8v4',
  phone:      'M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  mail:       'M3 6h18v12H3zM3 6l9 7 9-7',
  pin:        'M12 22s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12zM12 11a2 2 0 100-4 2 2 0 000 4z',
  lock:       'M6 11V8a6 6 0 0112 0v3M5 11h14v10H5z',
  swap:       'M7 7h13l-3-3M17 17H4l3 3',
  truck:      'M3 7h11v10H3zM14 10h5l2 3v4h-7M7 20a2 2 0 100-4 2 2 0 000 4zM17 20a2 2 0 100-4 2 2 0 000 4z',
  package:    'M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v10',
  shopping:   'M4 6h16l-2 12H6zM8 6V4a4 4 0 018 0v2M9 12h6',
  invoice:    'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3',
  refresh:    'M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-4M20 14a8 8 0 01-14 4',
};

function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.8 }) {
  const path = ICONS[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={path} />
    </svg>
  );
}

// ─── Status pill ───────────────────────────────────────────────────────────
const STATUS_MAP = {
  in_transit: { bg: UI.amberSoft, fg: UI.amber, dot: '#d97706', tKey: 'statusInTransit' },
  arrived:    { bg: UI.greenSoft, fg: UI.green, dot: '#16a34a', tKey: 'statusArrived' },
  closed:     { bg: '#f4f4f5',    fg: '#52525b', dot: '#71717a', tKey: 'statusClosed' },
  draft:      { bg: '#f4f4f5',    fg: '#52525b', dot: '#71717a', tKey: 'statusDraft' },
  issued:     { bg: UI.accentSoft, fg: UI.accentText, dot: '#2563eb', tKey: 'statusIssued' },
  paid:       { bg: UI.greenSoft, fg: UI.green, dot: '#16a34a', tKey: 'statusPaid' },
  refunded:   { bg: UI.roseSoft,  fg: UI.rose,  dot: '#dc2626', tKey: 'statusRefunded' },
  priority:   { bg: UI.violetSoft, fg: UI.violet, dot: '#7c3aed', tKey: 'statusPriority' },
  contractor: { bg: '#fef3c7',    fg: '#92400e', dot: '#d97706', tKey: 'statusContractor' },
  retailer:   { bg: '#dbeafe',    fg: '#1e3a8a', dot: '#2563eb', tKey: 'statusRetailer' },
  individual: { bg: '#f3e8ff',    fg: '#6b21a8', dot: '#9333ea', tKey: 'statusIndividual' },
  'net-30':   { bg: '#f0f9ff',    fg: '#075985', dot: '#0284c7', tKey: 'statusNet30' },
  hotel:      { bg: '#fce7f3',    fg: '#9d174d', dot: '#db2777', tKey: 'statusHotel' },
};

function Pill({ status, label, size = 'md' }) {
  const s = STATUS_MAP[status] || { bg: '#f4f4f5', fg: '#52525b', dot: '#71717a', tKey: status };
  const fontSize = size === 'sm' ? 10.5 : 11.5;
  const padding = size === 'sm' ? '1px 7px 1px 6px' : '2px 8px 2px 7px';
  const txt = label || (s.tKey ? t(s.tKey) : status);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding, borderRadius: 999, fontSize, fontWeight: 500, background: s.bg, color: s.fg, whiteSpace: 'nowrap' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot }} />
      {txt}
    </span>
  );
}

// ─── Button ────────────────────────────────────────────────────────────────
function Button({ variant = 'secondary', size = 'md', icon, iconRight, children, onClick, disabled, style, type = 'button' }) {
  const sizes = {
    sm: { padding: '5px 9px', fontSize: 12, gap: 5 },
    md: { padding: '7px 12px', fontSize: 13, gap: 6 },
    lg: { padding: '9px 16px', fontSize: 13.5, gap: 7 },
  };
  const variants = {
    primary: { background: UI.navy, color: '#fff', border: `1px solid ${UI.navy}`, className: 'elk-btn-primary' },
    accent:  { background: UI.accent, color: '#fff', border: `1px solid ${UI.accent}`, className: 'elk-btn-accent' },
    secondary: { background: UI.surface, color: UI.text, border: `1px solid ${UI.borderStrong}`, className: 'elk-btn-ghost' },
    ghost: { background: 'transparent', color: UI.text, border: '1px solid transparent', className: 'elk-btn-ghost' },
    danger: { background: UI.surface, color: UI.rose, border: `1px solid ${UI.borderStrong}`, className: 'elk-btn-ghost' },
  };
  const v = variants[variant];
  const sz = sizes[size];
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={v.className} style={{
      display: 'inline-flex', alignItems: 'center', gap: sz.gap, padding: sz.padding,
      fontSize: sz.fontSize, fontWeight: 500, fontFamily: 'inherit',
      borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
      background: v.background, color: v.color, border: v.border,
      opacity: disabled ? 0.5 : 1, transition: 'background .12s',
      ...style,
    }}>
      {icon && <Icon name={icon} size={sz.fontSize} strokeWidth={2} />}
      {children}
      {iconRight && <Icon name={iconRight} size={sz.fontSize} strokeWidth={2} />}
    </button>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────
function Input({ icon, placeholder, value, onChange, style, type = 'text', size = 'md', ...rest }) {
  const sizes = { sm: { padding: '5px 9px', fontSize: 12, iconLeft: 8 }, md: { padding: '7px 11px', fontSize: 13, iconLeft: 10 } };
  const sz = sizes[size];
  return (
    <div style={{ position: 'relative', ...style }}>
      {icon && <span style={{ position: 'absolute', left: sz.iconLeft, top: '50%', transform: 'translateY(-50%)', color: UI.muted, pointerEvents: 'none' }}>
        <Icon name={icon} size={13} />
      </span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', padding: icon ? `${sz.padding.split(' ')[0]} ${sz.padding.split(' ')[1]} ${sz.padding.split(' ')[0]} 30px` : sz.padding,
          fontSize: sz.fontSize, fontFamily: 'inherit',
          border: `1px solid ${UI.borderStrong}`, borderRadius: 6, background: UI.surface, color: UI.text,
        }}
        {...rest}
      />
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────
function Card({ children, style, padding = 20 }) {
  return (
    <div style={{ background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: UI.r12, padding, ...style }}>
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle, action, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, ...style }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, subtitle, children, footer, width = 720, maxHeight = '85vh' }) {
  if (!open) return null;
  return (
    <div className="elk-modal-backdrop" style={{
      position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.32)', zIndex: 100,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '8vh', paddingLeft: 16, paddingRight: 16,
    }} onClick={onClose}>
      <div className="elk-modal-panel elk-scroll" onClick={(e) => e.stopPropagation()} style={{
        background: UI.surface, borderRadius: 12, maxWidth: '100%', width, maxHeight,
        boxShadow: '0 20px 50px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${UI.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12.5, color: UI.muted, marginTop: 2 }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} className="elk-btn-ghost" style={{ background: 'transparent', border: 'none', color: UI.muted, cursor: 'pointer', padding: 6, borderRadius: 6, display: 'flex' }}>
            <Icon name="close" size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
        {footer && (
          <div style={{ padding: '12px 20px', borderTop: `1px solid ${UI.border}`, background: UI.surfaceAlt, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', flexShrink: 0 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────
function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: UI.muted }}>
      {icon && <div style={{ width: 44, height: 44, margin: '0 auto 14px', borderRadius: 10, background: UI.hover, display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted }}>
        <Icon name={icon} size={20} />
      </div>}
      <div style={{ fontSize: 14, fontWeight: 600, color: UI.text }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12.5, marginTop: 4 }}>{subtitle}</div>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

// ─── Avatar ────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 28, color = UI.navy }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 600, flexShrink: 0,
    }}>{initials}</div>
  );
}

window.UI = UI;
window.Icon = Icon;
window.Pill = Pill;
window.Button = Button;
window.Input = Input;
window.Card = Card;
window.CardHeader = CardHeader;
window.Modal = Modal;
window.EmptyState = EmptyState;
window.Avatar = Avatar;
