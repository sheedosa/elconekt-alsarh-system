// Elconekt — app shell (sidebar, topbar, routing, role state)

const { useState, useEffect, useMemo, useRef } = React;

const ROUTES = [
  { id: 'overview',   tKey: 'overview',       icon: 'overview',   adminOnly: true },
  { id: 'containers', tKey: 'containers',     icon: 'containers', adminOnly: true },
  { id: 'inventory',  tKey: 'inventory',      icon: 'inventory',  adminOnly: false },
  { id: 'clients',    tKey: 'clients',        icon: 'clients',    adminOnly: false },
  { id: 'invoices',   tKey: 'invoices',       icon: 'invoices',   adminOnly: false },
  { id: 'reports',    tKey: 'reports',        icon: 'reports',    adminOnly: true },
];

// ─── App context ───────────────────────────────────────────────────────────
const AppCtx = React.createContext(null);
function useApp() { return React.useContext(AppCtx); }

function useIsMobile(breakpoint = 768) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < breakpoint);
  useEffect(() => {
    const on = () => setM(window.innerWidth < breakpoint);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [breakpoint]);
  return m;
}

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ open, setOpen }) {
  const { route, navigate, role, setRole, lang, setLang, invoices } = useApp();
  const isMobile = useIsMobile();
  const items = ROUTES.filter(r => role === 'admin' || !r.adminOnly);
  const openInvoices = invoices.filter(i => i.status === 'draft' || i.status === 'issued').length;

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '18px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px 18px' }}>
        <img src="assets/elconekt-logo.png" alt="Elconekt" style={{ height: 22, width: 'auto' }} />
        {isMobile && (
          <button onClick={() => setOpen(false)} className="elk-btn-ghost" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, color: UI.muted, display: 'flex' }}>
            <Icon name="close" size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      <div style={{ fontSize: 10.5, fontWeight: 600, color: UI.faint, textTransform: 'uppercase', letterSpacing: 0.7, padding: '14px 8px 6px' }}>{t('workspace')}</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map(it => {
          const active = route === it.id;
          return (
            <button key={it.id} onClick={() => { navigate(it.id); if (isMobile) setOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '7px 8px', borderRadius: 6,
              background: active ? UI.accentSoft : 'transparent',
              color: active ? UI.accentText : UI.muted,
              fontSize: 13.5, fontWeight: active ? 600 : 450, cursor: 'pointer',
              border: 'none', textAlign: 'start', fontFamily: 'inherit', width: '100%',
            }}>
              <Icon name={it.icon} size={15} />
              <span>{t(it.tKey)}</span>
              {it.id === 'invoices' && role === 'agent' && openInvoices > 0 && <span className="elk-num" style={{ marginInlineStart: 'auto', fontSize: 10, background: UI.accent, color: '#fff', padding: '1px 6px', borderRadius: 999 }}>{openInvoices}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: 14 }}>
        {/* Language toggle */}
        <div style={{ fontSize: 10.5, fontWeight: 600, color: UI.faint, textTransform: 'uppercase', letterSpacing: 0.7, padding: '4px 8px 8px' }}>{t('language')}</div>
        <div style={{ display: 'flex', padding: 3, background: '#f4f4f5', borderRadius: 7, gap: 2, marginBottom: 12 }}>
          {[{ id: 'en', label: 'EN · English' }, { id: 'ar', label: 'AR · العربية' }].map(l => (
            <button key={l.id} onClick={() => setLang(l.id)} style={{
              flex: 1, padding: '6px 6px', fontSize: 11.5, fontWeight: 500, cursor: 'pointer',
              border: 'none', borderRadius: 5, fontFamily: 'inherit',
              background: lang === l.id ? UI.surface : 'transparent',
              color: lang === l.id ? UI.text : UI.muted,
              boxShadow: lang === l.id ? '0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)' : 'none',
            }}>{l.label}</button>
          ))}
        </div>

        <div style={{ fontSize: 10.5, fontWeight: 600, color: UI.faint, textTransform: 'uppercase', letterSpacing: 0.7, padding: '4px 8px 8px' }}>{t('viewingAs')}</div>
        <div style={{ display: 'flex', padding: 3, background: '#f4f4f5', borderRadius: 7, gap: 2 }}>
          {[{ id: 'admin', tKey: 'admin' }, { id: 'agent', tKey: 'sales' }].map(r => (
            <button key={r.id} onClick={() => { setRole(r.id); }} style={{
              flex: 1, padding: '6px 8px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
              border: 'none', borderRadius: 5, fontFamily: 'inherit',
              background: role === r.id ? UI.surface : 'transparent',
              color: role === r.id ? UI.text : UI.muted,
              boxShadow: role === r.id ? '0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)' : 'none',
            }}>{t(r.tKey)}</button>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '10px 8px', display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${UI.border}` }}>
          {role === 'admin' ? <Avatar initials="HA" /> : <Avatar initials="LB" color={UI.accent} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: UI.text }}>{role === 'admin' ? tAgentName('U-001') : tAgentName('U-002')}</div>
            <div style={{ fontSize: 11, color: UI.muted }}>{role === 'admin' ? `${t('admin')} · ${tCity('Tripoli')}` : `${t('salesAgent')} · ${tCity('Tripoli')}`}</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.32)', zIndex: 80, animation: 'elk-fade-in .15s' }} />}
        <aside style={{
          position: 'fixed', top: 0, bottom: 0,
          insetInlineStart: 0,
          width: 260, background: UI.surface,
          borderInlineEnd: `1px solid ${UI.border}`, zIndex: 81,
          transform: open ? 'translateX(0)' : (isRtl() ? 'translateX(100%)' : 'translateX(-100%)'),
          transition: 'transform .22s cubic-bezier(.2,.7,.3,1)',
        }}>{content}</aside>
      </>
    );
  }
  return <aside style={{ width: 232, background: UI.surface, borderInlineEnd: `1px solid ${UI.border}`, flexShrink: 0 }}>{content}</aside>;
}

// ─── Topbar ────────────────────────────────────────────────────────────────
function Topbar({ title, breadcrumbs, actions, onOpenSidebar }) {
  const isMobile = useIsMobile();
  return (
    <div style={{
      padding: isMobile ? '12px 16px' : '16px 28px',
      borderBottom: `1px solid ${UI.border}`, background: UI.surface,
      display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
    }}>
      {isMobile && (
        <button onClick={onOpenSidebar} className="elk-btn-ghost" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', color: UI.text }}>
          <Icon name="menu" size={20} strokeWidth={2} />
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {breadcrumbs && !isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: UI.muted, marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span>/</span>}
                <span style={{ color: i === breadcrumbs.length - 1 ? UI.text : UI.muted, cursor: b.onClick ? 'pointer' : 'default' }} onClick={b.onClick}>{b.label}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <div style={{ fontSize: isMobile ? 16 : 19, fontWeight: 600, letterSpacing: -0.2, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {actions}
      </div>
    </div>
  );
}

// ─── Toast / notification ──────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const map = {
    success: { bg: UI.greenSoft, fg: UI.green, icon: 'check' },
    info:    { bg: UI.accentSoft, fg: UI.accentText, icon: 'check' },
    error:   { bg: UI.roseSoft, fg: UI.rose, icon: 'close' },
  };
  const c = map[toast.type] || map.info;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: UI.text, color: '#fff', padding: '10px 16px', borderRadius: 8,
      fontSize: 13, fontWeight: 500, zIndex: 200, display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)', animation: 'elk-slide-up .2s ease',
    }}>
      <span style={{ width: 18, height: 18, borderRadius: '50%', background: c.fg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={c.icon} size={11} strokeWidth={3} />
      </span>
      {toast.message}
    </div>
  );
}

// ─── App provider ──────────────────────────────────────────────────────────
function App() {
  const [role, setRole] = useState('admin');
  const [route, _setRoute] = useState('containers');
  const [params, setParams] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [lang, _setLang] = useState(() => window.ELK_LANG || 'en');
  const isMobile = useIsMobile();

  // Sync language to globals + document on mount and changes.
  // setLang updates window.ELK_LANG synchronously BEFORE React re-renders,
  // so t() reads the new value during the render triggered by the state change.
  useEffect(() => {
    if (window.ELK_I18N) window.ELK_I18N.setLang(lang);
  }, []); // mount only

  const setLang = (l) => {
    if (window.ELK_I18N) window.ELK_I18N.setLang(l);
    else { window.ELK_LANG = l; document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; }
    _setLang(l);
  };

  // Mutable copies so we can simulate state changes during the demo
  const [containers, setContainers] = useState(ELK.CONTAINERS);
  const [inventory, setInventory] = useState(ELK.INVENTORY);
  const [invoices, setInvoices] = useState(ELK.INVOICES);
  const [clients, setClients] = useState(ELK.CLIENTS);

  // Mirror live state into the ELK helper registry before children render,
  // so every calculation (stock, sold, cost, revenue) uses the same data
  // the views are rendering.
  ELK.syncState({ containers, inventory, invoices });

  const navigate = (r, p = {}) => { _setRoute(r); setParams(p); window.scrollTo(0, 0); };

  // If switching to agent and currently on admin-only route, redirect to inventory
  useEffect(() => {
    const def = ROUTES.find(r => r.id === route);
    if (role === 'agent' && def?.adminOnly) navigate('inventory');
  }, [role]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
    setTimeout(() => setToast(null), 2800);
  };

  const ctx = {
    role, setRole, route, navigate, params,
    lang, setLang,
    containers, setContainers, inventory, setInventory, invoices, setInvoices, clients, setClients,
    modal, setModal, showToast, isMobile,
  };

  return (
    <AppCtx.Provider value={ctx}>
      <div className="elk-app" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ display: 'flex', height: '100vh', background: UI.bg, overflow: 'hidden' }}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <RouteContent onOpenSidebar={() => setSidebarOpen(true)} />
        </main>
        <ModalHost />
        <Toast toast={toast} />
      </div>
    </AppCtx.Provider>
  );
}

function RouteContent({ onOpenSidebar }) {
  const { route, role } = useApp();
  switch (route) {
    case 'overview':   return <OverviewView onOpenSidebar={onOpenSidebar} />;
    case 'containers': return <ContainersView onOpenSidebar={onOpenSidebar} />;
    case 'inventory':  return <InventoryView onOpenSidebar={onOpenSidebar} />;
    case 'clients':    return <ClientsView onOpenSidebar={onOpenSidebar} />;
    case 'invoices':   return <InvoicesView onOpenSidebar={onOpenSidebar} />;
    case 'reports':    return <ReportsView onOpenSidebar={onOpenSidebar} />;
    default:           return null;
  }
}

function ModalHost() {
  const { modal, setModal } = useApp();
  if (!modal) return null;
  const Comp = MODAL_REGISTRY[modal.type];
  if (!Comp) return null;
  return <Comp {...(modal.props || {})} onClose={() => setModal(null)} />;
}

// Modal registry populated by individual view files
window.MODAL_REGISTRY = {};

window.App = App;
window.useApp = useApp;
window.useIsMobile = useIsMobile;
window.Topbar = Topbar;
window.AppCtx = AppCtx;
