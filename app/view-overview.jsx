// Overview dashboard (admin) + Reports stub

function OverviewView({ onOpenSidebar }) {
  const { navigate, containers, inventory, invoices, clients, isMobile, lang } = useApp();

  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const totalRevenue = paidInvoices.reduce((s, i) => s + ELK.invoiceTotal(i), 0);
  const totalProfit = paidInvoices.reduce((s, i) => s + ELK.invoiceProfit(i), 0);
  const totalUnitsInInv = inventory.reduce((s, i) => s + ELK.invStock(i), 0);
  const totalInvValue = inventory.reduce((s, i) => s + ELK.invStock(i) * i.priceLyd, 0);
  const activeContainers = containers.filter(c => c.status !== 'closed').length;
  const inTransit = containers.filter(c => c.status === 'in_transit').length;

  // Everyone with paid revenue belongs on the board (admin-created invoices
  // count toward totals, so they must be visible here too).
  const agentBoard = ELK.AGENTS.filter(a => a.role === 'agent' || ELK.agentSales(a.id, 'paid') > 0).map(a => ({
    agent: a,
    revenue: ELK.agentSales(a.id, 'paid'),
    count: invoices.filter(i => i.agentId === a.id && i.status === 'paid').length,
  })).sort((a, b) => b.revenue - a.revenue);
  const topAgentRevenue = Math.max(...agentBoard.map(a => a.revenue), 1);

  const topClients = clients.map(c => ({
    client: c,
    spend: ELK.clientSpend(c.id),
    count: ELK.clientInvoices(c.id).length,
  })).sort((a, b) => b.spend - a.spend).slice(0, 5);

  const recent = invoices.slice(0, 5);

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('workspace') }, { label: t('overview') }]}
        title={t('overview')}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            {!isMobile && <Button variant="secondary" icon="filter">{t('thisMonth')}</Button>}
            <Button variant="primary" icon="download" size="md">{isMobile ? '' : t('exportReport')}</Button>
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: isMobile ? 16 : '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
            {[
              { label: t('revenueMay'), value: ELK.fmtCompactLyd(totalRevenue), suffix: ELK.currencyCode(), sub: `${paidInvoices.length} ${t('paidInvoices')}`, accent: UI.accent },
              { label: t('grossProfit'), value: ELK.fmtCompactLyd(totalProfit), suffix: ELK.currencyCode(), sub: `${ELK.fmtPct(ELK.pct(totalProfit, totalRevenue))} ${t('margin')}`, accent: UI.green },
              { label: t('inventoryValue'), value: ELK.fmtCompactLyd(totalInvValue), suffix: ELK.currencyCode(), sub: `${totalUnitsInInv.toLocaleString('en-US')} ${t('unitsLabel')}`, accent: UI.violet },
              { label: t('activeContainers'), value: activeContainers, sub: `${inTransit} ${t('inTransitSub')}`, accent: UI.navy },
            ].map((k, i) => (
              <Card key={i} padding={16} style={{ boxShadow: `inset 0 2px 0 ${k.accent}` }}>
                <div style={{ fontSize: 12, color: UI.muted, marginBottom: 8 }}>{k.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <div className="elk-num" style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, color: UI.text }}>{k.value}</div>
                  {k.suffix && <div style={{ fontSize: 12, color: UI.muted, fontWeight: 500 }}>{k.suffix}</div>}
                </div>
                <div style={{ fontSize: 11.5, color: UI.faint, marginTop: 4 }}>{k.sub}</div>
              </Card>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 12 }}>
            <Card>
              <CardHeader
                title={t('revenueThisWeek')}
                subtitle={t('dailyTotals')}
                action={<div style={{ display: 'flex', gap: 14, fontSize: 11, color: UI.muted }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: UI.navy }} /> {t('revenue')}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: UI.green }} /> {t('profit')}</span>
                </div>}
              />
              <RevenueBars invoices={invoices} />
            </Card>

            <Card>
              <CardHeader title={t('agentLeaderboard')} subtitle={t('paidRevenuePeriod')} action={<Button variant="ghost" size="sm" onClick={() => navigate('reports')}>{t('viewAll')}</Button>} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {agentBoard.map(({ agent, revenue, count }) => (
                  <div key={agent.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      <Avatar initials={agent.initials} size={26} color={UI.accent} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{tAgentName(agent.id, agent.name)}</div>
                        <div style={{ fontSize: 11, color: UI.muted }}>{count} {t('invoiceShort').toLowerCase()} · {tCity(agent.city)}</div>
                      </div>
                      <div className="elk-num" style={{ fontSize: 13.5, fontWeight: 600 }}>{ELK.fmtLyd(revenue)} <span style={{ fontSize: 10.5, color: UI.muted }}>{ELK.currencyCode()}</span></div>
                    </div>
                    <div style={{ height: 4, background: '#f4f4f5', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(revenue/topAgentRevenue)*100}%`, background: UI.accent, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            <Card padding={0}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${UI.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t('containerPipeline')}</div>
                  <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{t('activeShipments')}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('containers')}>{t('viewAll')}</Button>
              </div>
              <div>
                {containers.filter(c => c.status !== 'closed').slice(0, 4).map((c, i) => (
                  <div key={c.id} onClick={() => navigate('containers', { id: c.id })} className="elk-row-hover" style={{ padding: '12px 20px', borderTop: i === 0 ? 'none' : `1px solid ${UI.borderHair}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 6, background: UI.hover, display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted }}>
                      <Icon name="containers" size={14} strokeWidth={1.6} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="elk-num" style={{ fontSize: 13, fontWeight: 600 }}>{c.id}</div>
                      <div style={{ fontSize: 11, color: UI.muted, marginTop: 1 }}>{c.origin} · @ <span className="elk-num">{c.rate.toFixed(3)} {ELK.currencyPair()}</span></div>
                    </div>
                    <Pill status={c.status} size="sm" />
                    <div className="elk-num" style={{ fontSize: 12.5, color: UI.muted, minWidth: 80, textAlign: 'end' }}>{ELK.fmtDate(c.arrival || c.eta)}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding={0}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${UI.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t('topClients')}</div>
                  <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{t('byLifetimeSpend')}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('clients')}>{t('viewAll')}</Button>
              </div>
              <div>
                {topClients.map((tc, i) => (
                  <div key={tc.client.id} onClick={() => navigate('clients', { id: tc.client.id })} className="elk-row-hover" style={{ padding: '12px 20px', borderTop: i === 0 ? 'none' : `1px solid ${UI.borderHair}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar initials={tc.client.name.split(' ').map(p => p[0]).slice(0,2).join('')} size={30} color={tc.client.type === 'contractor' ? UI.navy : tc.client.type === 'retailer' ? UI.accent : UI.violet} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{tClientName(tc.client.id, tc.client.name)}</div>
                      <div style={{ fontSize: 11, color: UI.muted }}>{tCompanyName(tc.client.company) || t('individual')} · {tc.count} {t('orders').toLowerCase()}</div>
                    </div>
                    <div className="elk-num" style={{ fontSize: 13, fontWeight: 600, textAlign: 'end' }}>
                      {ELK.fmtLyd(tc.spend)} <span style={{ fontSize: 10.5, color: UI.muted, fontWeight: 500 }}>{ELK.currencyCode()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card padding={0}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${UI.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t('recentActivity')}</div>
                <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{t('latestSales')}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('invoices')}>{t('viewAll')}</Button>
            </div>
            <div>
              {recent.map((inv, i) => {
                const client = ELK.findClient(inv.clientId);
                const agent = ELK.findAgent(inv.agentId);
                return (
                  <div key={inv.id} onClick={() => navigate('invoices', { id: inv.id })} className="elk-row-hover" style={{ padding: '12px 20px', borderTop: i === 0 ? 'none' : `1px solid ${UI.borderHair}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="elk-num" style={{ fontSize: 12, color: UI.muted, minWidth: 60 }}>{ELK.fmtDateShort(inv.date)}</div>
                    <div className="elk-num" style={{ fontSize: 12.5, fontWeight: 600, minWidth: 110 }}>{inv.id}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500 }}>{tClientName(client?.id, client?.name)}</div>
                      <div style={{ fontSize: 11, color: UI.muted }}>{t('by')} {tAgentName(inv.agentId, agent?.name)} · {inv.lines.length} {t('lines').toLowerCase()}</div>
                    </div>
                    <Pill status={inv.status} size="sm" />
                    <div className="elk-num" style={{ fontSize: 13, fontWeight: 600, minWidth: 110, textAlign: 'end' }}>
                      {ELK.fmtLyd(ELK.invoiceTotal(inv))} <span style={{ fontSize: 10.5, color: UI.muted, fontWeight: 500 }}>{ELK.currencyCode()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function RevenueBars({ invoices }) {
  // Actual paid revenue and profit per day over the last 7 calendar days of
  // recorded activity (was previously hardcoded demo data).
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const paid = invoices.filter(i => i.status === 'paid' && i.date);
  const lastDate = invoices.reduce((m, i) => (i.date && i.date > m ? i.date : m), '');
  const end = lastDate ? new Date(lastDate + 'T00:00:00') : new Date();
  const days = Array.from({ length: 7 }, (_, k) => {
    const d = new Date(end);
    d.setDate(end.getDate() - (6 - k));
    const iso = d.toISOString().slice(0, 10);
    const dayInvoices = paid.filter(i => i.date === iso);
    return {
      d: WEEKDAYS[d.getDay()],
      revenue: dayInvoices.reduce((s, i) => s + ELK.invoiceTotal(i), 0),
      profit: dayInvoices.reduce((s, i) => s + ELK.invoiceProfit(i), 0),
    };
  });
  const max = Math.max(...days.map(d => d.revenue), 1);
  return (
    // Day columns must stretch to the full 180px so the % bar heights resolve.
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 12, height: 180, padding: '12px 0 0' }}>
      {days.map((d, i) => {
        const rh = (d.revenue / max) * 100;
        const ph = (Math.max(d.profit, 0) / max) * 100;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ flex: 1, height: `${rh}%`, background: UI.navy, borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height .25s' }}>
                <div className="elk-num" style={{ position: 'absolute', top: -18, insetInlineStart: '50%', transform: 'translateX(-50%)', fontSize: 10, color: UI.muted, whiteSpace: 'nowrap' }}>{ELK.fmtCompactLyd(d.revenue)}</div>
              </div>
              <div style={{ flex: 1, height: `${ph}%`, background: UI.green, borderRadius: '4px 4px 0 0' }} />
            </div>
            <div style={{ fontSize: 11, color: UI.muted, textAlign: 'center' }}>{t(d.d)}</div>
          </div>
        );
      })}
    </div>
  );
}

function ReportsView({ onOpenSidebar }) {
  const { isMobile, lang } = useApp();
  return (
    <>
      <Topbar breadcrumbs={[{ label: t('workspace') }, { label: t('reports') }]} title={t('reports')} onOpenSidebar={onOpenSidebar} />
      <div style={{ flex: 1, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: 12, background: UI.hover, display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted }}>
            <Icon name="reports" size={26} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{t('reportsComing')}</div>
          <div style={{ fontSize: 13, color: UI.muted, lineHeight: 1.55 }}>
            {t('reportsDesc')}
          </div>
        </Card>
      </div>
    </>
  );
}

window.OverviewView = OverviewView;
window.ReportsView = ReportsView;
