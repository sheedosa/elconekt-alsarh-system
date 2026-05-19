// View 3 part 1 — CRM (Clients list + Client profile)

const { useState: useStateCl } = React;

function ClientsView({ onOpenSidebar }) {
  const { params } = useApp();
  if (params.id) return <ClientProfile id={params.id} onOpenSidebar={onOpenSidebar} />;
  return <ClientList onOpenSidebar={onOpenSidebar} />;
}

function ClientList({ onOpenSidebar }) {
  const { navigate, clients, role, isMobile, setModal, lang } = useApp();
  const [query, setQuery] = useStateCl('');
  const [typeFilter, setTypeFilter] = useStateCl('all');

  const filtered = clients.filter(c => {
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('workspace') }, { label: t('clients') }]}
        title={t('clients')}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            {!isMobile && <Button variant="secondary" size="md">{t('import')}</Button>}
            <Button variant="primary" icon="plus" size="md" onClick={() => setModal({ type: 'new-client' })}>{isMobile ? t('new') : t('newClient')}</Button>
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: isMobile ? '16px 16px 10px' : '20px 28px 12px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: t('all'), count: clients.length },
            { id: 'contractor', label: t('contractors'), count: clients.filter(c => c.type === 'contractor').length },
            { id: 'retailer', label: t('retailers'), count: clients.filter(c => c.type === 'retailer').length },
            { id: 'individual', label: t('individuals'), count: clients.filter(c => c.type === 'individual').length },
          ].map(tab => (
            <button key={tab.id} onClick={() => setTypeFilter(tab.id)} style={{
              padding: '5px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${typeFilter === tab.id ? UI.text : UI.border}`,
              background: typeFilter === tab.id ? UI.text : UI.surface,
              color: typeFilter === tab.id ? '#fff' : UI.muted,
            }}>{tab.label} <span style={{ opacity: 0.7 }}>· {tab.count}</span></button>
          ))}
          <div style={{ flex: 1 }} />
          {!isMobile && <Input icon="search" placeholder={t('searchClients')} value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 260 }} />}
        </div>
        {isMobile && <div style={{ padding: '0 16px 12px' }}><Input icon="search" placeholder={t('searchClients')} value={query} onChange={(e) => setQuery(e.target.value)} /></div>}

        {!isMobile && (
          <div style={{ margin: '0 28px 28px', background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: UI.surfaceAlt, borderBottom: `1px solid ${UI.border}` }}>
                  {[
                    { l: t('client'), a: 'start' },
                    { l: t('type'), a: 'start' },
                    { l: t('contact'), a: 'start' },
                    { l: t('city'), a: 'start' },
                    { l: t('orders'), a: 'end' },
                    { l: t('totalSpent'), a: 'end' },
                    { l: t('tags'), a: 'start' },
                    { l: '', a: 'end' },
                  ].map((h, i) => (
                    <th key={i} style={{ textAlign: h.a, padding: '10px 14px', fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4 }}>{h.l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, idx) => {
                  const invs = ELK.clientInvoices(c.id);
                  const spend = ELK.clientSpend(c.id);
                  return (
                    <tr key={c.id} onClick={() => navigate('clients', { id: c.id })} className="elk-row-hover" style={{ borderBottom: idx === filtered.length - 1 ? 'none' : `1px solid ${UI.borderHair}`, cursor: 'pointer' }}>
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar initials={c.name.split(' ').map(p => p[0]).slice(0,2).join('')} size={32} color={c.type === 'contractor' ? UI.navy : c.type === 'retailer' ? UI.accent : UI.violet} />
                          <div>
                            <div style={{ fontWeight: 500 }}>{tClientName(c.id, c.name)}</div>
                            <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 1 }}>{tCompanyName(c.company) || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '13px 14px' }}><Pill status={c.type} /></td>
                      <td style={{ padding: '13px 14px' }}>
                        <div className="elk-num" style={{ fontSize: 12.5 }}>{c.phone}</div>
                        <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 1 }}>{c.email}</div>
                      </td>
                      <td style={{ padding: '13px 14px', color: UI.muted, fontSize: 12.5 }}>{tCity(c.city)}</td>
                      <td className="elk-num" style={{ padding: '13px 14px', textAlign: 'end' }}>{invs.length}</td>
                      <td className="elk-num" style={{ padding: '13px 14px', textAlign: 'end', fontWeight: 500 }}>
                        {ELK.fmtLyd(spend)} <span style={{ fontSize: 10.5, color: UI.faint, fontWeight: 400 }}>{ELK.currencyCode()}</span>
                      </td>
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {c.tags.map(tag => <Pill key={tag} status={tag} size="sm" />)}
                        </div>
                      </td>
                      <td style={{ padding: '13px 14px', textAlign: 'end' }}>
                        <span className="elk-icon-flip" style={{ display: 'inline-flex' }}>
                          <Icon name="chevron" size={14} color={UI.faint} strokeWidth={2} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {isMobile && (
          <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(c => {
              const invs = ELK.clientInvoices(c.id);
              const spend = ELK.clientSpend(c.id);
              return (
                <Card key={c.id} padding={12} style={{ cursor: 'pointer' }}>
                  <div onClick={() => navigate('clients', { id: c.id })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <Avatar initials={c.name.split(' ').map(p => p[0]).slice(0,2).join('')} size={32} color={c.type === 'contractor' ? UI.navy : c.type === 'retailer' ? UI.accent : UI.violet} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 500, fontSize: 13.5 }}>{tClientName(c.id, c.name)}</div>
                        <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 1 }}>{tCompanyName(c.company) || c.phone}</div>
                      </div>
                      <Pill status={c.type} size="sm" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: `1px solid ${UI.borderHair}` }}>
                      <span style={{ fontSize: 11.5, color: UI.muted }}>{invs.length} {t('orders').toLowerCase()}</span>
                      <span className="elk-num" style={{ fontSize: 13, fontWeight: 600 }}>{ELK.fmtLyd(spend)} {ELK.currencyCode()}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function ClientProfile({ id, onOpenSidebar }) {
  const { navigate, clients, role, isMobile, setModal, lang } = useApp();
  const client = clients.find(c => c.id === id);
  if (!client) return <EmptyState title={t('notFound')} />;

  const invs = ELK.clientInvoices(id);
  const totalSpend = ELK.clientSpend(id);
  const totalInvoices = invs.length;
  const lastInvoice = invs[0];
  const clientNameLocalized = tClientName(client.id, client.name);

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('clients'), onClick: () => navigate('clients') }, { label: clientNameLocalized }]}
        title={clientNameLocalized}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            <Button variant="secondary" icon="arrowLeft" size="md" onClick={() => navigate('clients')}>{isMobile ? '' : t('back')}</Button>
            {!isMobile && <Button variant="secondary" icon="edit" size="md">{t('edit')}</Button>}
            <Button variant="accent" icon="plus" size="md" onClick={() => setModal({ type: 'new-invoice', props: { clientId: id } })}>
              {isMobile ? t('invoiceShort') : t('newInvoice')}
            </Button>
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: isMobile ? 16 : '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <Avatar initials={client.name.split(' ').map(p => p[0]).slice(0,2).join('')} size={56} color={client.type === 'contractor' ? UI.navy : client.type === 'retailer' ? UI.accent : UI.violet} />
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.2 }}>{clientNameLocalized}</div>
                  <Pill status={client.type} />
                  {client.tags.map(tag => <Pill key={tag} status={tag} size="sm" />)}
                </div>
                <div style={{ fontSize: 13, color: UI.muted, marginTop: 4 }}>{tCompanyName(client.company) || t('individual')}</div>
                <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap', fontSize: 12.5, color: UI.muted }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="phone" size={13} /> <span className="elk-num">{client.phone}</span></span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="mail" size={13} /> {client.email}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="pin" size={13} /> {tCity(client.city)}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, paddingInlineStart: 16, borderInlineStart: `1px solid ${UI.border}`, flexShrink: 0 }}>
                <div>
                  <div style={{ fontSize: 11, color: UI.muted }}>{t('totalInvoices')}</div>
                  <div className="elk-num" style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3, marginTop: 2 }}>{totalInvoices}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: UI.muted }}>{t('lifetimeSpend')}</div>
                  <div className="elk-num" style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3, marginTop: 2 }}>{ELK.fmtLyd(totalSpend)} <span style={{ fontSize: 11, fontWeight: 500, color: UI.muted }}>{ELK.currencyCode()}</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: UI.muted }}>{t('lastOrder')}</div>
                  <div className="elk-num" style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{lastInvoice ? ELK.fmtDate(lastInvoice.date) : '—'}</div>
                </div>
              </div>
            </div>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card>
                <CardHeader title={t('notes')} action={<button className="elk-btn-ghost" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: UI.muted, padding: 4 }}><Icon name="edit" size={13} /></button>} />
                <div style={{ fontSize: 13, color: client.notes ? UI.text : UI.faint, lineHeight: 1.55 }}>
                  {client.notes ? tNote(client.notes) : t('noNotesYet')}
                </div>
              </Card>
              <Card>
                <CardHeader title={t('quickActions')} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <button className="elk-btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'transparent', border: `1px solid ${UI.border}`, borderRadius: 6, cursor: 'pointer', textAlign: 'start', fontSize: 13, fontFamily: 'inherit', color: UI.text }}>
                    <Icon name="invoice" size={14} color={UI.muted} /> {t('createInvoice')}
                  </button>
                  <button className="elk-btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'transparent', border: `1px solid ${UI.border}`, borderRadius: 6, cursor: 'pointer', textAlign: 'start', fontSize: 13, fontFamily: 'inherit', color: UI.text }}>
                    <Icon name="clock" size={14} color={UI.muted} /> {t('scheduleFollowUp')}
                  </button>
                  <button className="elk-btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'transparent', border: `1px solid ${UI.border}`, borderRadius: 6, cursor: 'pointer', textAlign: 'start', fontSize: 13, fontFamily: 'inherit', color: UI.text }}>
                    <Icon name="mail" size={14} color={UI.muted} /> {t('sendStatement')}
                  </button>
                </div>
              </Card>
            </div>

            <Card padding={0}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${UI.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t('orderHistory')}</div>
                  <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{invs.length} {t('invoiceShort').toLowerCase()}</div>
                </div>
              </div>
              {invs.length === 0
                ? <EmptyState icon="invoice" title={t('noOrdersYet')} subtitle={t('notInvoiced')} />
                : (
                  <div>
                    {invs.map((inv, i) => {
                      const agent = ELK.findAgent(inv.agentId);
                      return (
                        <div key={inv.id} onClick={() => navigate('invoices', { id: inv.id })} className="elk-row-hover" style={{ padding: '12px 20px', borderTop: i === 0 ? 'none' : `1px solid ${UI.borderHair}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                              <div className="elk-num" style={{ fontSize: 13, fontWeight: 600 }}>{inv.id}</div>
                              <Pill status={inv.status} size="sm" />
                            </div>
                            <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 3 }}>
                              <span className="elk-num">{ELK.fmtDate(inv.date)}</span> · {inv.lines.length} {t('lines').toLowerCase()} · {t('by')} {tAgentName(inv.agentId, agent?.name || '—')}
                            </div>
                          </div>
                          <div className="elk-num" style={{ fontSize: 14, fontWeight: 600 }}>
                            {ELK.fmtLyd(ELK.invoiceTotal(inv))} <span style={{ fontSize: 11, color: UI.muted, fontWeight: 500 }}>{ELK.currencyCode()}</span>
                          </div>
                          <span className="elk-icon-flip" style={{ display: 'inline-flex' }}>
                            <Icon name="chevron" size={14} color={UI.faint} strokeWidth={2} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )
              }
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function NewClientModal({ onClose }) {
  const { clients, setClients, showToast } = useApp();
  const [form, setForm] = useStateCl({ name: '', company: '', type: 'contractor', phone: '', email: '', city: 'Tripoli', notes: '' });

  const handleCreate = () => {
    if (!form.name) { showToast(t('nameRequired'), 'error'); return; }
    const next = { ...form, id: `C-${String(clients.length + 100).padStart(4, '0')}`, tags: [] };
    setClients([next, ...clients]);
    showToast(t('clientAdded', { name: form.name }), 'success');
    onClose();
  };

  const baseInput = { width: '100%', padding: '8px 11px', border: `1px solid ${UI.borderStrong}`, borderRadius: 6, fontSize: 13, fontFamily: 'inherit', background: UI.surface };

  return (
    <Modal open onClose={onClose} title={t('newClient')} width={560}
      footer={<><Button variant="ghost" onClick={onClose}>{t('cancel')}</Button><Button variant="accent" onClick={handleCreate}>{t('createClient')}</Button></>}>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>{t('nameRequiredFull')}</label>
            <input style={baseInput} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>{t('company')}</label>
            <input style={baseInput} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>{t('type')}</label>
            <select style={baseInput} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="contractor">{t('statusContractor')}</option><option value="retailer">{t('statusRetailer')}</option><option value="individual">{t('statusIndividual')}</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>{t('city')}</label>
            <input style={baseInput} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>{t('phone')}</label>
            <input style={baseInput} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+218 91 ..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>{t('email')}</label>
            <input style={baseInput} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>{t('notes')}</label>
          <textarea style={{ ...baseInput, resize: 'vertical', minHeight: 70, fontFamily: 'inherit' }} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder={t('notesPlaceholder')} />
        </div>
      </div>
    </Modal>
  );
}

MODAL_REGISTRY['new-client'] = NewClientModal;
window.ClientsView = ClientsView;
