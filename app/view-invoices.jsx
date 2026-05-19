// View 3 part 2 — Invoices list, detail, builder

const { useState: useStateInv, useMemo: useMemoInv } = React;

function InvoicesView({ onOpenSidebar }) {
  const { params } = useApp();
  if (params.id) return <InvoiceDetail id={params.id} onOpenSidebar={onOpenSidebar} />;
  return <InvoiceList onOpenSidebar={onOpenSidebar} />;
}

function InvoiceList({ onOpenSidebar }) {
  const { navigate, invoices, role, isMobile, setModal, lang } = useApp();
  const [statusFilter, setStatusFilter] = useStateInv('all');
  const [query, setQuery] = useStateInv('');
  const [agentFilter, setAgentFilter] = useStateInv('all');

  const filtered = invoices.filter(inv => {
    if (statusFilter !== 'all' && inv.status !== statusFilter) return false;
    if (agentFilter !== 'all' && inv.agentId !== agentFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      const client = ELK.findClient(inv.clientId);
      return inv.id.toLowerCase().includes(q) || client?.name.toLowerCase().includes(q);
    }
    return true;
  });

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + ELK.invoiceTotal(i), 0);
  const totalProfit = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + ELK.invoiceProfit(i), 0);
  const totalDraft = invoices.filter(i => i.status === 'draft').reduce((s, i) => s + ELK.invoiceTotal(i), 0);
  const totalIssued = invoices.filter(i => i.status === 'issued').reduce((s, i) => s + ELK.invoiceTotal(i), 0);

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('workspace') }, { label: t('invoices') }]}
        title={t('invoices')}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            {!isMobile && <Button variant="secondary" icon="filter">{t('filter')}</Button>}
            {!isMobile && <Button variant="secondary">{t('export')}</Button>}
            <Button variant="accent" icon="plus" size="md" onClick={() => setModal({ type: 'new-invoice' })}>{isMobile ? t('new') : t('newInvoice')}</Button>
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: isMobile ? '16px 16px 0' : '20px 28px 0', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { label: t('revenuePaid'), value: ELK.fmtLyd(totalRevenue/1000) + 'K', suffix: ELK.currencyCode(), sub: `${invoices.filter(i => i.status === 'paid').length} ${t('paidInvoices')}` },
            ...(role === 'admin' ? [{ label: t('grossProfitPaid'), value: ELK.fmtLyd(totalProfit/1000) + 'K', suffix: ELK.currencyCode(), sub: `${((totalProfit/totalRevenue)*100).toFixed(1)}% ${t('margin')}`, color: UI.green }] : [{ label: t('activeInvoices'), value: invoices.filter(i => ['issued', 'draft'].includes(i.status)).length, sub: t('awaitingAction') }]),
            { label: t('awaitingPayment'), value: ELK.fmtLyd(totalIssued/1000) + 'K', suffix: ELK.currencyCode(), sub: `${invoices.filter(i => i.status === 'issued').length} ${t('invoicesIssued')}` },
            { label: t('drafts'), value: ELK.fmtLyd(totalDraft/1000) + 'K', suffix: ELK.currencyCode(), sub: `${invoices.filter(i => i.status === 'draft').length} ${t('draftInvoices')}` },
          ].map((k, i) => (
            <Card key={i} padding={14}>
              <div style={{ fontSize: 11.5, color: UI.muted, marginBottom: 6 }}>{k.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <div className="elk-num" style={{ fontSize: 21, fontWeight: 600, letterSpacing: -0.3, color: k.color }}>{k.value}</div>
                {k.suffix && <div style={{ fontSize: 11.5, color: UI.muted, fontWeight: 500 }}>{k.suffix}</div>}
              </div>
              <div style={{ fontSize: 11, color: UI.faint, marginTop: 3 }}>{k.sub}</div>
            </Card>
          ))}
        </div>

        <div style={{ padding: isMobile ? '16px 16px 10px' : '20px 28px 10px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: t('all'), count: invoices.length },
            { id: 'draft', label: t('drafts'), count: invoices.filter(i => i.status === 'draft').length },
            { id: 'issued', label: t('statusIssued'), count: invoices.filter(i => i.status === 'issued').length },
            { id: 'paid', label: t('statusPaid'), count: invoices.filter(i => i.status === 'paid').length },
            { id: 'refunded', label: t('refunded'), count: invoices.filter(i => i.status === 'refunded').length },
          ].map(tab => (
            <button key={tab.id} onClick={() => setStatusFilter(tab.id)} style={{
              padding: '5px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${statusFilter === tab.id ? UI.text : UI.border}`,
              background: statusFilter === tab.id ? UI.text : UI.surface,
              color: statusFilter === tab.id ? '#fff' : UI.muted,
            }}>{tab.label} <span style={{ opacity: 0.7 }}>· {tab.count}</span></button>
          ))}
          <div style={{ flex: 1 }} />
          {role === 'admin' && !isMobile && (
            <select onChange={(e) => setAgentFilter(e.target.value)} value={agentFilter} style={{ padding: '6px 10px', border: `1px solid ${UI.borderStrong}`, borderRadius: 6, fontSize: 12.5, fontFamily: 'inherit', background: UI.surface }}>
              <option value="all">{t('allAgents')}</option>
              {ELK.AGENTS.filter(a => a.role === 'agent').map(a => <option key={a.id} value={a.id}>{tAgentName(a.id, a.name)}</option>)}
            </select>
          )}
          {!isMobile && <Input icon="search" placeholder={t('invoiceOrClient')} value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 240 }} />}
        </div>

        {isMobile && <div style={{ padding: '0 16px 12px' }}><Input icon="search" placeholder={t('searchInvoices')} value={query} onChange={(e) => setQuery(e.target.value)} /></div>}

        {!isMobile && (
          <div style={{ margin: '0 28px 28px', background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: UI.surfaceAlt, borderBottom: `1px solid ${UI.border}` }}>
                  {[
                    { l: t('invoiceShort'), a: 'start' },
                    { l: t('statusCol'), a: 'start' },
                    { l: t('client'), a: 'start' },
                    { l: t('agent'), a: 'start' },
                    { l: t('date'), a: 'start' },
                    { l: t('lines'), a: 'end' },
                    { l: t('total'), a: 'end' },
                    { l: '', a: 'end' },
                  ].map((h, i) => (
                    <th key={i} style={{ textAlign: h.a, padding: '10px 14px', fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4 }}>{h.l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv, idx) => {
                  const client = ELK.findClient(inv.clientId);
                  const agent = ELK.findAgent(inv.agentId);
                  return (
                    <tr key={inv.id} onClick={() => navigate('invoices', { id: inv.id })} className="elk-row-hover" style={{ borderBottom: idx === filtered.length - 1 ? 'none' : `1px solid ${UI.borderHair}`, cursor: 'pointer' }}>
                      <td className="elk-num" style={{ padding: '13px 14px', fontWeight: 600 }}>{inv.id}</td>
                      <td style={{ padding: '13px 14px' }}><Pill status={inv.status} /></td>
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ fontWeight: 500 }}>{tClientName(client?.id, client?.name)}</div>
                        <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 1 }}>{tCompanyName(client?.company) || '—'}</div>
                      </td>
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <Avatar initials={agent?.initials} size={22} color={UI.accent} />
                          <span style={{ fontSize: 12.5 }}>{tAgentName(inv.agentId, agent?.name)}</span>
                        </div>
                      </td>
                      <td className="elk-num" style={{ padding: '13px 14px', color: UI.muted }}>{ELK.fmtDate(inv.date)}</td>
                      <td className="elk-num" style={{ padding: '13px 14px', textAlign: 'end', color: UI.muted }}>{inv.lines.length}</td>
                      <td className="elk-num" style={{ padding: '13px 14px', textAlign: 'end', fontWeight: 500 }}>
                        {ELK.fmtLyd(ELK.invoiceTotal(inv))} <span style={{ fontSize: 10.5, color: UI.faint, fontWeight: 400 }}>{ELK.currencyCode()}</span>
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
            {filtered.map(inv => {
              const client = ELK.findClient(inv.clientId);
              return (
                <Card key={inv.id} padding={12} style={{ cursor: 'pointer' }}>
                  <div onClick={() => navigate('invoices', { id: inv.id })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div className="elk-num" style={{ fontSize: 13, fontWeight: 600 }}>{inv.id}</div>
                      <Pill status={inv.status} size="sm" />
                      <div className="elk-num" style={{ marginInlineStart: 'auto', fontSize: 14, fontWeight: 600 }}>{ELK.fmtLyd(ELK.invoiceTotal(inv))}</div>
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{tClientName(client?.id, client?.name)}</div>
                    <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 1 }}><span className="elk-num">{ELK.fmtDate(inv.date)}</span> · {inv.lines.length} {t('lines').toLowerCase()}</div>
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

function InvoiceDetail({ id, onOpenSidebar }) {
  const { navigate, invoices, setInvoices, role, isMobile, showToast, lang } = useApp();
  const inv = invoices.find(i => i.id === id);
  if (!inv) return <EmptyState title={t('notFound')} />;

  const client = ELK.findClient(inv.clientId);
  const agent = ELK.findAgent(inv.agentId);
  const total = ELK.invoiceTotal(inv);
  const profit = ELK.invoiceProfit(inv);

  const handleIssue = () => {
    setInvoices(invoices.map(i => i.id === inv.id ? { ...i, status: 'issued' } : i));
    showToast(t('invoiceIssued', { id: inv.id }));
  };
  const handlePaid = () => {
    setInvoices(invoices.map(i => i.id === inv.id ? { ...i, status: 'paid' } : i));
    showToast(t('invoiceMarkedPaid', { id: inv.id }));
  };
  const handleRefund = () => {
    setInvoices(invoices.map(i => i.id === inv.id ? { ...i, status: 'refunded' } : i));
    showToast(t('invoiceRefunded', { id: inv.id }));
  };

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('invoices'), onClick: () => navigate('invoices') }, { label: inv.id }]}
        title={inv.id}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            <Button variant="secondary" icon="arrowLeft" size="md" onClick={() => navigate('invoices')}>{isMobile ? '' : t('back')}</Button>
            {!isMobile && <Button variant="secondary" icon="download">{t('downloadPdf')}</Button>}
            {inv.status === 'draft' && <Button variant="accent" onClick={handleIssue}>{t('issueInvoice')}</Button>}
            {inv.status === 'issued' && <Button variant="accent" icon="check" onClick={handlePaid}>{t('markAsPaid')}</Button>}
            {role === 'admin' && inv.status === 'paid' && <Button variant="danger" onClick={handleRefund}>{t('refund')}</Button>}
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: isMobile ? 16 : '24px 28px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 980, margin: '0 auto', width: '100%' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <div className="elk-num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>{inv.id}</div>
                  <Pill status={inv.status} />
                </div>
                <div style={{ fontSize: 12.5, color: UI.muted }}>{t('issuedBy', { date: ELK.fmtDate(inv.date), name: tAgentName(inv.agentId, agent?.name || '') })}</div>
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ minWidth: 150 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{t('billedTo')}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{tClientName(client?.id, client?.name)}</div>
                  <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{tCompanyName(client?.company)}</div>
                  <div style={{ fontSize: 12, color: UI.muted }}>{tCity(client?.city)}</div>
                  <div className="elk-num" style={{ fontSize: 12, color: UI.muted, marginTop: 3 }}>{client?.phone}</div>
                </div>
                <div style={{ minWidth: 150 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{t('fromShort')}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>Elconekt</div>
                  <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{tLocation('Tripoli, LY')}</div>
                  <div style={{ fontSize: 12, color: UI.muted }}>elconekt.ly</div>
                </div>
              </div>
            </div>
          </Card>

          <Card padding={0}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: UI.surfaceAlt, borderBottom: `1px solid ${UI.border}` }}>
                    {[
                      { l: t('description'), a: 'start' },
                      { l: t('skuCol'), a: 'start' },
                      { l: t('qty'), a: 'end' },
                      { l: t('unitPrice'), a: 'end' },
                      { l: t('total'), a: 'end' },
                    ].map((h, i) => (
                      <th key={i} style={{ textAlign: h.a, padding: '11px 16px', fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4 }}>{h.l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inv.lines.map((line, i) => {
                    const item = ELK.findInvSku(line.sku);
                    return (
                      <tr key={i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${UI.borderHair}` }}>
                        <td style={{ padding: '13px 16px', fontWeight: 500 }}>{tProductName(line.sku, item?.name || line.sku)}</td>
                        <td className="elk-mono" style={{ padding: '13px 16px', color: UI.muted, fontSize: 12 }}>{line.sku}</td>
                        <td className="elk-num" style={{ padding: '13px 16px', textAlign: 'end' }}>{line.qty}</td>
                        <td className="elk-num" style={{ padding: '13px 16px', textAlign: 'end' }}>{ELK.fmtLyd(line.priceLyd, { decimals: 2 })}</td>
                        <td className="elk-num" style={{ padding: '13px 16px', textAlign: 'end', fontWeight: 500 }}>{ELK.fmtLyd(line.qty * line.priceLyd, { decimals: 2 })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ borderTop: `1px solid ${UI.border}`, padding: '14px 16px', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: 280 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: UI.muted }}>
                  <span>{t('subtotal')}</span>
                  <span className="elk-num">{ELK.fmtLyd(total, { decimals: 2 })} {ELK.currencyCode()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: UI.muted }}>
                  <span>{t('vat')}</span>
                  <span className="elk-num">0.00 {ELK.currencyCode()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', fontSize: 16, fontWeight: 700, borderTop: `1px solid ${UI.border}`, marginTop: 6 }}>
                  <span>{t('total')}</span>
                  <span className="elk-num">{ELK.fmtLyd(total, { decimals: 2 })} {ELK.currencyCode()}</span>
                </div>
              </div>
            </div>
          </Card>

          {role === 'admin' && (
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: UI.muted, padding: '2px 8px', background: UI.hover, borderRadius: 999, letterSpacing: 0.4, textTransform: 'uppercase' }}>{t('adminOnly')}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: UI.muted }}>{t('grossProfitOnInvoice')}</div>
                  <div style={{ fontSize: 11, color: UI.faint, marginTop: 2 }}>{t('calculatedFromLots')}</div>
                </div>
                <div className="elk-num" style={{ fontSize: 22, fontWeight: 700, color: profit >= 0 ? UI.green : UI.rose, letterSpacing: -0.3 }}>{ELK.fmtLyd(profit, { sign: true })} {ELK.currencyCode()}</div>
                <div className="elk-num" style={{ fontSize: 13, color: UI.muted, fontWeight: 500 }}>{((profit/total)*100).toFixed(1)}% {t('margin')}</div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function NewInvoiceModal({ clientId, onClose }) {
  const { invoices, setInvoices, clients, inventory, role, showToast } = useApp();
  const [selectedClient, setSelectedClient] = useStateInv(clientId || null);
  const [clientSearch, setClientSearch] = useStateInv('');
  const [lines, setLines] = useStateInv([]);
  const [productSearch, setProductSearch] = useStateInv('');

  const filteredClients = clients.filter(c => {
    if (!clientSearch) return true;
    const q = clientSearch.toLowerCase();
    return c.name.toLowerCase().includes(q) || (c.company || '').toLowerCase().includes(q);
  }).slice(0, 6);

  const availableProducts = inventory.filter(item => {
    const stock = ELK.invStock(item);
    if (stock <= 0) return false;
    if (productSearch) {
      const q = productSearch.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q);
    }
    return true;
  });

  const addLine = (item) => {
    const existing = lines.find(l => l.sku === item.sku);
    if (existing) setLines(lines.map(l => l.sku === item.sku ? { ...l, qty: l.qty + 1 } : l));
    else setLines([...lines, { sku: item.sku, qty: 1, priceLyd: item.priceLyd }]);
    setProductSearch('');
  };
  const updateLine = (sku, patch) => setLines(lines.map(l => l.sku === sku ? { ...l, ...patch } : l));
  const removeLine = (sku) => setLines(lines.filter(l => l.sku !== sku));

  const subtotal = lines.reduce((s, l) => s + l.qty * l.priceLyd, 0);

  const handleSave = (issue = false) => {
    if (!selectedClient) { showToast(t('selectClientFirst'), 'error'); return; }
    if (lines.length === 0) { showToast(t('addAtLeastOne'), 'error'); return; }
    const id = `INV-2025-${String(invoices.length + 185).padStart(4, '0')}`;
    const next = {
      id, date: new Date().toISOString().slice(0, 10),
      clientId: selectedClient, agentId: role === 'admin' ? 'U-001' : 'U-002',
      status: issue ? 'issued' : 'draft', lines,
    };
    setInvoices([next, ...invoices]);
    showToast(issue ? t('invoiceSavedIssued', { id }) : t('invoiceSavedDraft', { id }), 'success');
    onClose();
  };

  const client = selectedClient ? ELK.findClient(selectedClient) : null;

  return (
    <Modal
      open onClose={onClose}
      title={t('newInvoice')}
      subtitle={role === 'agent' ? t('newInvoiceSubtitleAgent') : t('newInvoiceSubtitle')}
      width={820}
      footer={<>
        <Button variant="ghost" onClick={onClose}>{t('cancel')}</Button>
        <Button variant="secondary" onClick={() => handleSave(false)}>{t('saveDraft')}</Button>
        <Button variant="accent" icon="check" onClick={() => handleSave(true)}>{t('issueInvoice')}</Button>
      </>}
    >
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{t('client')}</div>
          {client ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: `1px solid ${UI.borderStrong}`, borderRadius: 8 }}>
              <Avatar initials={client.name.split(' ').map(p => p[0]).slice(0,2).join('')} color={UI.accent} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{tClientName(client.id, client.name)}</div>
                <div style={{ fontSize: 11.5, color: UI.muted }}>{tCompanyName(client.company) || t('individual')} · {tCity(client.city)}</div>
              </div>
              <Pill status={client.type} />
              <Button variant="ghost" size="sm" onClick={() => setSelectedClient(null)}>{t('change')}</Button>
            </div>
          ) : (
            <div>
              <Input icon="search" placeholder={t('searchClientsFull')} value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
              {clientSearch && (
                <div style={{ marginTop: 8, border: `1px solid ${UI.border}`, borderRadius: 8, maxHeight: 200, overflow: 'auto' }} className="elk-scroll">
                  {filteredClients.map(c => (
                    <div key={c.id} onClick={() => { setSelectedClient(c.id); setClientSearch(''); }} className="elk-row-hover" style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${UI.borderHair}` }}>
                      <Avatar initials={c.name.split(' ').map(p => p[0]).slice(0,2).join('')} size={26} color={UI.muted} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{tClientName(c.id, c.name)}</div>
                        <div style={{ fontSize: 11.5, color: UI.muted }}>{tCompanyName(c.company) || t('individual')}</div>
                      </div>
                      <Pill status={c.type} size="sm" />
                    </div>
                  ))}
                  {filteredClients.length === 0 && <div style={{ padding: 14, color: UI.muted, fontSize: 12.5 }}>{t('noMatches')}</div>}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{t('lineItems')}</div>
          <div style={{ border: `1px solid ${UI.border}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ position: 'relative', padding: 10, background: UI.surfaceAlt, borderBottom: `1px solid ${UI.border}` }}>
              <Input icon="search" placeholder={t('searchSkuToAdd')} value={productSearch} onChange={(e) => setProductSearch(e.target.value)} />
              {productSearch && (
                <div style={{ position: 'absolute', top: '100%', insetInlineStart: 10, insetInlineEnd: 10, marginTop: 4, background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.08)', maxHeight: 240, overflow: 'auto', zIndex: 5 }} className="elk-scroll">
                  {availableProducts.slice(0, 8).map(item => (
                    <div key={item.sku} onClick={() => addLine(item)} className="elk-row-hover" style={{ padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${UI.borderHair}` }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{tProductName(item.sku, item.name)}</div>
                        <div className="elk-mono" style={{ fontSize: 11, color: UI.muted }}>{item.sku} · {item.brand} · {ELK.invStock(item)} {t('inStockShort')}</div>
                      </div>
                      <div className="elk-num" style={{ fontSize: 13, fontWeight: 600 }}>{ELK.fmtLyd(item.priceLyd)} {ELK.currencyCode()}</div>
                    </div>
                  ))}
                  {availableProducts.length === 0 && <div style={{ padding: 14, fontSize: 12.5, color: UI.muted }}>{t('noProductsMatch')}</div>}
                </div>
              )}
            </div>
            {lines.length === 0 ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', color: UI.muted, fontSize: 13 }}>
                {t('searchAboveAdd')}
              </div>
            ) : (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 110px 30px', gap: 0, padding: '8px 14px', background: UI.surfaceAlt, fontSize: 10.5, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4, borderBottom: `1px solid ${UI.border}` }}>
                  <div>{t('product')}</div>
                  <div style={{ textAlign: 'end' }}>{t('qty')}</div>
                  <div style={{ textAlign: 'end' }}>{t('unitPrice')}</div>
                  <div style={{ textAlign: 'end' }}>{t('lineTotal')}</div>
                  <div></div>
                </div>
                {lines.map(line => {
                  const item = ELK.findInvSku(line.sku);
                  const lineTotal = line.qty * line.priceLyd;
                  return (
                    <div key={line.sku} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 110px 30px', gap: 0, padding: '10px 14px', alignItems: 'center', borderTop: `1px solid ${UI.borderHair}` }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{tProductName(line.sku, item?.name)}</div>
                        <div className="elk-mono" style={{ fontSize: 10.5, color: UI.muted }}>{line.sku}</div>
                      </div>
                      <input type="number" value={line.qty} onChange={(e) => updateLine(line.sku, { qty: Math.max(1, Number(e.target.value)) })} className="elk-num" style={{ width: '100%', padding: '5px 6px', border: `1px solid ${UI.border}`, borderRadius: 4, fontSize: 12.5, textAlign: 'end', fontFamily: 'inherit' }} />
                      <input type="number" value={line.priceLyd} onChange={(e) => updateLine(line.sku, { priceLyd: Math.max(0, Number(e.target.value)) })} className="elk-num" style={{ width: '100%', padding: '5px 6px', border: `1px solid ${UI.border}`, borderRadius: 4, fontSize: 12.5, textAlign: 'end', fontFamily: 'inherit' }} />
                      <div className="elk-num" style={{ textAlign: 'end', fontWeight: 500 }}>{ELK.fmtLyd(lineTotal, { decimals: 2 })}</div>
                      <button onClick={() => removeLine(line.sku)} className="elk-btn-ghost" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: UI.faint, padding: 4 }}><Icon name="close" size={14} strokeWidth={2.2} /></button>
                    </div>
                  );
                })}
                <div style={{ padding: '12px 14px', background: UI.surfaceAlt, borderTop: `1px solid ${UI.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t('total')}</div>
                  <div className="elk-num" style={{ fontSize: 18, fontWeight: 700 }}>{ELK.fmtLyd(subtotal, { decimals: 2 })} <span style={{ fontSize: 12, color: UI.muted, fontWeight: 500 }}>{ELK.currencyCode()}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

MODAL_REGISTRY['new-invoice'] = NewInvoiceModal;
window.InvoicesView = InvoicesView;
