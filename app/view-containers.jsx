// View 1 — Container Management (Admin only)
// Includes: List, Detail, New Container modal, Push-to-Inventory modal

const { useState: useStateC, useMemo: useMemoC } = React;

function ContainersView({ onOpenSidebar }) {
  const { params } = useApp();
  if (params.id) return <ContainerDetail id={params.id} onOpenSidebar={onOpenSidebar} />;
  return <ContainerList onOpenSidebar={onOpenSidebar} />;
}

function ContainerList({ onOpenSidebar }) {
  const { navigate, containers, setModal, isMobile, lang } = useApp();
  const [filter, setFilter] = useStateC('all');
  const [query, setQuery] = useStateC('');

  const filtered = containers.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (query) {
      const q = query.toLowerCase();
      return c.id.toLowerCase().includes(q) || c.bl.toLowerCase().includes(q) || c.origin.toLowerCase().includes(q);
    }
    return true;
  });

  const totalLanded = containers.reduce((s, c) => s + ELK.landedLyd(c), 0);
  const inTransit = containers.filter(c => c.status === 'in_transit').length;
  const arrived = containers.filter(c => c.status === 'arrived').length;
  const avgRate = containers.reduce((s, c) => s + c.rate, 0) / containers.length;
  const totalStock = containers.reduce((s, c) => s + (c.units - ELK.containerSold(c)), 0);

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('workspace') }, { label: t('containers') }]}
        title={t('containers')}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            {!isMobile && <Button variant="secondary" icon="filter" size="md">{t('filter')}</Button>}
            {!isMobile && <Button variant="secondary" size="md">{t('export')}</Button>}
            <Button variant="primary" icon="plus" size="md" onClick={() => setModal({ type: 'new-container' })}>
              {isMobile ? t('new') : t('newContainer')}
            </Button>
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        {/* KPIs */}
        <div style={{ padding: isMobile ? '16px 16px 0' : '20px 28px 0', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { label: t('activeContainers'), value: containers.length, sub: `${inTransit} ${t('inTransitSub')} · ${arrived} ${t('arrivedSub')}`, accent: UI.navy },
            { label: t('capitalDeployed'), value: `${(totalLanded/1_000_000).toFixed(2)}M`, suffix: ELK.currencyCode(), sub: t('acrossShipments'), accent: UI.accent },
            { label: t('avgLockedRate'), value: avgRate.toFixed(3), suffix: ELK.currencyPair(), sub: t('weightedAcross'), accent: UI.violet },
            { label: t('unitsInInventory'), value: totalStock.toLocaleString('en-US'), sub: t('pushedNotSold'), accent: UI.green },
          ].map((k, i) => (
            <Card key={i} padding={14} style={{ borderRadius: 10, boxShadow: `inset 0 2px 0 ${k.accent}` }}>
              <div style={{ fontSize: 11.5, color: UI.muted, marginBottom: 6 }}>{k.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <div className="elk-num" style={{ fontSize: 21, fontWeight: 600, letterSpacing: -0.3 }}>{k.value}</div>
                {k.suffix && <div style={{ fontSize: 11.5, color: UI.muted, fontWeight: 500 }}>{k.suffix}</div>}
              </div>
              <div style={{ fontSize: 11, color: UI.faint, marginTop: 3 }}>{k.sub}</div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div style={{ padding: isMobile ? '16px 16px 10px' : '20px 28px 10px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: t('all'), count: containers.length },
            { id: 'in_transit', label: t('statusInTransit'), count: inTransit },
            { id: 'arrived', label: t('statusArrived'), count: arrived },
            { id: 'closed', label: t('statusClosed'), count: containers.filter(c => c.status === 'closed').length },
          ].map(tab => (
            <button key={tab.id} onClick={() => setFilter(tab.id)} style={{
              padding: '5px 11px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${filter === tab.id ? UI.text : UI.border}`,
              background: filter === tab.id ? UI.text : UI.surface,
              color: filter === tab.id ? '#fff' : UI.muted,
            }}>{tab.label} <span style={{ opacity: 0.7 }}>· {tab.count}</span></button>
          ))}
          <div style={{ flex: 1 }} />
          {!isMobile && (
            <Input icon="search" placeholder={t('searchContainersFull')} value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 260 }} size="md" />
          )}
        </div>

        {isMobile && (
          <div style={{ padding: '0 16px 12px' }}>
            <Input icon="search" placeholder={t('searchContainers')} value={query} onChange={(e) => setQuery(e.target.value)} size="md" />
          </div>
        )}

        {/* Desktop: Table */}
        {!isMobile && (
          <div style={{ margin: '0 28px 28px', background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: UI.surfaceAlt, borderBottom: `1px solid ${UI.border}` }}>
                  {[
                    { l: t('container'), a: 'start' },
                    { l: t('statusCol'), a: 'start' },
                    { l: t('arrivalEta'), a: 'start' },
                    { l: t('usdRate'), a: 'end' },
                    { l: t('landedCost'), a: 'end' },
                    { l: t('units'), a: 'end' },
                    { l: t('sellThrough'), a: 'start' },
                    { l: '', a: 'end' },
                  ].map((h, i) => (
                    <th key={i} style={{ textAlign: h.a, padding: '10px 14px', fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4, whiteSpace: 'nowrap' }}>{h.l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, idx) => {
                  const sellPct = (ELK.containerSold(c) / c.units) * 100;
                  return (
                    <tr key={c.id} onClick={() => navigate('containers', { id: c.id })} className="elk-row-hover" style={{ borderBottom: idx === filtered.length - 1 ? 'none' : `1px solid ${UI.borderHair}`, cursor: 'pointer' }}>
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted }}>
                            <Icon name="containers" size={16} strokeWidth={1.6} />
                          </div>
                          <div>
                            <div className="elk-num" style={{ fontWeight: 600, fontSize: 13.5 }}>{c.id}</div>
                            <div style={{ fontSize: 11.5, color: UI.muted }}>{c.origin} · <span className="elk-num">{c.bl}</span></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '13px 14px' }}><Pill status={c.status} /></td>
                      <td style={{ padding: '13px 14px' }}>
                        {c.status === 'in_transit'
                          ? <span><span style={{ color: UI.muted, fontSize: 11.5 }}>{t('eta')} </span><span className="elk-num">{ELK.fmtDate(c.eta)}</span></span>
                          : <span className="elk-num">{ELK.fmtDate(c.arrival)}</span>}
                      </td>
                      <td className="elk-num" style={{ padding: '13px 14px', textAlign: 'end' }}>
                        <span style={{ fontWeight: 500 }}>{c.rate.toFixed(3)}</span>
                        <span style={{ color: UI.faint, fontSize: 11.5 }}> {ELK.currencyPair()}</span>
                      </td>
                      <td className="elk-num" style={{ padding: '13px 14px', textAlign: 'end', fontWeight: 500 }}>
                        {ELK.fmtLyd(ELK.landedLyd(c))} <span style={{ fontSize: 10.5, color: UI.faint, fontWeight: 400 }}>{ELK.currencyCode()}</span>
                      </td>
                      <td className="elk-num" style={{ padding: '13px 14px', textAlign: 'end' }}>{c.units.toLocaleString('en-US')}</td>
                      <td style={{ padding: '13px 14px', minWidth: 140 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 5, background: '#f4f4f5', borderRadius: 999, overflow: 'hidden', minWidth: 60 }}>
                            <div style={{ height: '100%', width: `${sellPct}%`, background: sellPct >= 99 ? UI.faint : UI.accent, borderRadius: 999 }} />
                          </div>
                          <div className="elk-num" style={{ fontSize: 11.5, color: UI.muted, minWidth: 32, textAlign: 'end' }}>{Math.round(sellPct)}%</div>
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

        {/* Mobile: card list */}
        {isMobile && (
          <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(c => {
              const sellPct = (ELK.containerSold(c) / c.units) * 100;
              return (
                <div key={c.id} onClick={() => navigate('containers', { id: c.id })} style={{ background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: 10, padding: 14, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 6, background: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: UI.muted }}>
                      <Icon name="containers" size={18} strokeWidth={1.6} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="elk-num" style={{ fontWeight: 600, fontSize: 14 }}>{c.id}</div>
                      <div style={{ fontSize: 11.5, color: UI.muted, marginTop: 2 }}>{c.origin}</div>
                    </div>
                    <Pill status={c.status} size="sm" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '8px 0', borderTop: `1px solid ${UI.borderHair}` }}>
                    <div>
                      <div style={{ fontSize: 10, color: UI.faint, textTransform: 'uppercase', letterSpacing: 0.4 }}>{t('usdRate')}</div>
                      <div className="elk-num" style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{c.rate.toFixed(3)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: UI.faint, textTransform: 'uppercase', letterSpacing: 0.4 }}>{t('landedCost')}</div>
                      <div className="elk-num" style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{ELK.fmtLyd(ELK.landedLyd(c)/1000)}K</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: UI.faint, textTransform: 'uppercase', letterSpacing: 0.4 }}>{t('sold')}</div>
                      <div className="elk-num" style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{Math.round(sellPct)}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

// ─── Container Detail ──────────────────────────────────────────────────────
function ContainerDetail({ id, onOpenSidebar }) {
  const { navigate, containers, setModal, isMobile, lang } = useApp();
  const c = containers.find(x => x.id === id);
  if (!c) return <EmptyState title={t('notFound')} />;

  const lU = ELK.landedUsd(c);
  const lL = ELK.landedLyd(c);
  const ucU = ELK.unitCostUsd(c);
  const ucL = ELK.unitCostLyd(c);
  const expRev = ELK.expectedRevenueLyd(c);
  const expProf = ELK.expectedProfitLyd(c);
  const margin = ELK.marginPct(c);
  const inInv = ELK.containerInInventory(c);
  const sold = ELK.containerSold(c);
  const sellPct = (sold / c.units) * 100;
  const remainingInContainer = c.units - inInv - sold;
  const canPush = remainingInContainer > 0 && c.status === 'arrived' && c.products.length > 0;

  return (
    <>
      <Topbar
        breadcrumbs={[{ label: t('containers'), onClick: () => navigate('containers') }, { label: c.id }]}
        title={c.id}
        onOpenSidebar={onOpenSidebar}
        actions={
          <>
            <Button variant="secondary" icon="arrowLeft" size="md" onClick={() => navigate('containers')}>{isMobile ? '' : t('back')}</Button>
            {!isMobile && <Button variant="secondary" icon="edit" size="md">{t('edit')}</Button>}
            <Button
              variant={canPush ? 'accent' : 'secondary'}
              icon="arrowDown"
              size="md"
              disabled={!canPush}
              onClick={() => setModal({ type: 'push-inventory', props: { containerId: c.id } })}
            >{isMobile ? t('push') : t('pushToInventory')}</Button>
          </>
        }
      />

      <div className="elk-scroll" style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: isMobile ? '16px' : '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', padding: '12px 16px', background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: 10 }}>
            <Pill status={c.status} />
            <div style={{ height: 16, width: 1, background: UI.border }} />
            <div style={{ fontSize: 12.5 }}>
              <span style={{ color: UI.muted }}>{t('from')} </span><span style={{ fontWeight: 500 }}>{c.origin}</span>
              <span style={{ color: UI.muted }}> {t('to')} </span><span style={{ fontWeight: 500 }}>{tLocation('Tripoli, LY')}</span>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 12.5, color: UI.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="clock" size={12} />
              {c.status === 'in_transit' ? `${t('eta')} ${ELK.fmtDate(c.eta)}` : `${t('arrived')} ${ELK.fmtDate(c.arrival)}`}
            </div>
          </div>

          {/* Dual rate hero */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            {/* Cost */}
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 12, color: UI.muted }}>{t('totalLandedCost')}</div>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: UI.muted, padding: '2px 8px', background: UI.hover, borderRadius: 999, letterSpacing: 0.4, textTransform: 'uppercase' }}>{t('cost')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <div className="elk-num" style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.6 }}>{ELK.fmtLyd(lL)}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: UI.muted }}>{ELK.currencyCode()}</div>
              </div>
              <div style={{ fontSize: 12.5, color: UI.muted }}>
                <span className="elk-num">{ELK.fmtUsd(lU)}</span> · {t('convertedAt')} <span className="elk-num" style={{ color: UI.text, fontWeight: 500 }}>{c.rate.toFixed(3)} {ELK.currencyPair()}</span>
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${UI.border}`, display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: UI.faint, marginBottom: 2 }}>{t('perUnitCost')}</div>
                  <div className="elk-num" style={{ fontSize: 14, fontWeight: 600 }}>{ELK.fmtLyd(ucL, { decimals: 2 })} <span style={{ color: UI.muted, fontSize: 11, fontWeight: 500 }}>{ELK.currencyCode()}</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: UI.faint, marginBottom: 2 }}>{t('units')}</div>
                  <div className="elk-num" style={{ fontSize: 14, fontWeight: 600 }}>{c.units.toLocaleString('en-US')}</div>
                </div>
              </div>
            </Card>
            {/* Profit */}
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 12, color: UI.muted, whiteSpace: 'nowrap' }}>{t('projectedProfit')}</div>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: expProf >= 0 ? UI.green : UI.rose, padding: '2px 8px', background: expProf >= 0 ? UI.greenSoft : UI.roseSoft, borderRadius: 999, letterSpacing: 0.4, textTransform: 'uppercase' }}>{expProf >= 0 ? t('profit') : t('loss')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <div className="elk-num" style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.6, color: expProf >= 0 ? UI.green : UI.rose }}>{ELK.fmtLyd(expProf, { sign: true })}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: UI.muted }}>{ELK.currencyCode()}</div>
              </div>
              <div style={{ fontSize: 12.5, color: UI.muted }}>
                <span className="elk-num">{margin.toFixed(1)}%</span> {t('margin')} · {t('atLockedRate')} <span className="elk-num" style={{ color: UI.text, fontWeight: 500 }}>{c.rate.toFixed(3)}</span>
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${UI.border}`, display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: UI.faint, marginBottom: 2 }}>{t('expectedRevenue')}</div>
                  <div className="elk-num" style={{ fontSize: 14, fontWeight: 600 }}>{ELK.fmtLyd(expRev)} <span style={{ color: UI.muted, fontSize: 11 }}>{ELK.currencyCode()}</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: UI.faint, marginBottom: 2 }}>{t('realised')} ({Math.round(sellPct)}%)</div>
                  <div className="elk-num" style={{ fontSize: 14, fontWeight: 600 }}>{ELK.fmtLyd(expRev * sellPct / 100)} <span style={{ color: UI.muted, fontSize: 11 }}>{ELK.currencyCode()}</span></div>
                </div>
              </div>
            </Card>
          </div>

          {/* Cost breakdown + shipment meta */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 12 }}>
            <Card>
              <CardHeader title={t('costBreakdown')} action={<span style={{ fontSize: 11, color: UI.muted, display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="clock" size={11} />{t('rateLocked')} <span className="elk-num">{ELK.fmtDate(c.rateDate)}</span></span>} />
              <div style={{ display: 'flex', fontSize: 11, fontWeight: 600, color: UI.faint, textTransform: 'uppercase', letterSpacing: 0.4, paddingBottom: 8, borderBottom: `1px solid ${UI.border}` }}>
                <div style={{ flex: 1 }}>{t('line')}</div>
                <div style={{ width: 110, textAlign: 'end' }}>USD</div>
                <div style={{ width: 130, textAlign: 'end' }}>{ELK.currencyCode()} @ <span className="elk-num">{c.rate.toFixed(3)}</span></div>
              </div>
              {[
                [t('purchasePriceGoods'), c.purchaseUsd],
                [t('shippingLogistics'), c.shippingUsd],
                [t('customsImportFees'), c.customsUsd],
              ].map(([label, usd]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', padding: '11px 0', borderBottom: `1px solid ${UI.border}` }}>
                  <div style={{ flex: 1, fontSize: 13, color: UI.muted }}>{label}</div>
                  <div className="elk-num" style={{ width: 110, textAlign: 'end', fontSize: 13, color: UI.muted }}>{ELK.fmtUsd(usd, { decimals: 2 })}</div>
                  <div className="elk-num" style={{ width: 130, textAlign: 'end', fontSize: 13, fontWeight: 500 }}>{ELK.fmtLyd(usd * c.rate, { decimals: 2 })}</div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'baseline', padding: '12px 0 0', fontWeight: 600 }}>
                <div style={{ flex: 1, fontSize: 13.5 }}>{t('totalLandedCost')}</div>
                <div className="elk-num" style={{ width: 110, textAlign: 'end', fontSize: 13.5 }}>{ELK.fmtUsd(lU, { decimals: 2 })}</div>
                <div className="elk-num" style={{ width: 130, textAlign: 'end', fontSize: 14 }}>{ELK.fmtLyd(lL, { decimals: 2 })}</div>
              </div>
              <div style={{ marginTop: 12, padding: 12, background: UI.surfaceAlt, borderRadius: 8, border: `1px solid ${UI.border}`, display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: UI.muted, marginBottom: 2 }}>{t('unitCostUsd')}</div>
                  <div className="elk-num" style={{ fontSize: 15, fontWeight: 600 }}>{ELK.fmtUsd(ucU, { decimals: 2 })}</div>
                </div>
                <div style={{ width: 1, background: UI.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: UI.muted, marginBottom: 2 }}>{t('unitCostLyd')}</div>
                  <div className="elk-num" style={{ fontSize: 15, fontWeight: 600 }}>{ELK.fmtLyd(ucL, { decimals: 2 })}</div>
                </div>
                <div style={{ width: 1, background: UI.border }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: UI.muted, marginBottom: 2 }}>{t('totalUnits')}</div>
                  <div className="elk-num" style={{ fontSize: 15, fontWeight: 600 }}>{c.units.toLocaleString('en-US')}</div>
                </div>
              </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card>
                <CardHeader title={t('shipment')} />
                {[
                  [t('blNumber'), c.bl, true],
                  [t('origin'), c.origin],
                  [t('destination'), tLocation('Tripoli, LY')],
                  [t('statusCol'), ELK.statusLabel(c.status)],
                  [c.status === 'in_transit' ? t('eta') : t('arrived'), ELK.fmtDate(c.arrival || c.eta), true],
                  [t('rateLockedOn'), ELK.fmtDate(c.rateDate), true],
                ].map(([k, v, isNum]) => (
                  <div key={k} style={{ display: 'flex', padding: '8px 0', fontSize: 13, borderBottom: `1px solid ${UI.borderHair}` }}>
                    <div style={{ flex: 1, color: UI.muted }}>{k}</div>
                    <div className={isNum ? 'elk-num' : ''} style={{ fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </Card>

              <Card>
                <CardHeader title={t('inventoryPipeline')} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: t('sold'), value: sold, color: UI.green, pct: (sold/c.units)*100 },
                    { label: t('inSalesInventory'), value: inInv, color: UI.accent, pct: (inInv/c.units)*100 },
                    { label: t('inContainerNotPushed'), value: remainingInContainer, color: UI.amber, pct: (remainingInContainer/c.units)*100 },
                  ].map(row => (
                    <div key={row.label}>
                      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 4 }}>
                        <div style={{ flex: 1, fontSize: 12, color: UI.muted }}>{row.label}</div>
                        <div className="elk-num" style={{ fontSize: 12.5, fontWeight: 500 }}>{row.value} <span style={{ color: UI.faint }}>({row.pct.toFixed(0)}%)</span></div>
                      </div>
                      <div style={{ height: 5, background: '#f4f4f5', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${row.pct}%`, background: row.color, borderRadius: 999 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Products */}
          <Card padding={0}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${UI.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t('productsInContainer')}</div>
                <div style={{ fontSize: 12, color: UI.muted, marginTop: 2 }}>{c.products.length} {t('skus')} · <span className="elk-num">{c.products.reduce((s,p) => s+p.qty, 0).toLocaleString('en-US')}</span> {t('unitsLabel')}</div>
              </div>
              <Button variant="secondary" size="sm" icon="edit">{t('editLines')}</Button>
            </div>
            {c.products.length === 0
              ? <EmptyState icon="package" title={t('noProductLinesYet')} subtitle={t('closedOrArchived')} />
              : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                    <thead>
                      <tr style={{ background: UI.surfaceAlt }}>
                        {[
                          { l: t('skuCol'), a: 'start' },
                          { l: t('product'), a: 'start' },
                          { l: t('brand'), a: 'start' },
                          { l: t('qty'), a: 'end' },
                          { l: t('costUsdShort'), a: 'end' },
                          { l: t('costLydShort'), a: 'end' },
                          { l: t('sellLyd'), a: 'end' },
                          { l: t('marginPerUnit'), a: 'end' },
                        ].map((h, i) => (
                          <th key={i} style={{ textAlign: h.a, padding: '9px 16px', fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4, whiteSpace: 'nowrap' }}>{h.l}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {c.products.map((p, i) => {
                        const unitLyd = p.costUsd * c.rate;
                        const profit = p.priceLyd - unitLyd;
                        const mPct = (profit / p.priceLyd) * 100;
                        return (
                          <tr key={p.sku} style={{ borderTop: `1px solid ${UI.borderHair}` }}>
                            <td className="elk-mono" style={{ padding: '11px 16px', fontSize: 11.5, color: UI.muted }}>{p.sku}</td>
                            <td style={{ padding: '11px 16px', fontWeight: 500, whiteSpace: 'nowrap' }}>{tProductName(p.sku, p.name)}</td>
                            <td style={{ padding: '11px 16px', color: UI.muted }}>{p.brand}</td>
                            <td className="elk-num" style={{ padding: '11px 16px', textAlign: 'end' }}>{p.qty}</td>
                            <td className="elk-num" style={{ padding: '11px 16px', textAlign: 'end', color: UI.muted }}>{ELK.fmtUsd(p.costUsd, { decimals: 2 })}</td>
                            <td className="elk-num" style={{ padding: '11px 16px', textAlign: 'end' }}>{ELK.fmtLyd(unitLyd, { decimals: 2 })}</td>
                            <td className="elk-num" style={{ padding: '11px 16px', textAlign: 'end', fontWeight: 500 }}>{ELK.fmtLyd(p.priceLyd, { decimals: 2 })}</td>
                            <td className="elk-num" style={{ padding: '11px 16px', textAlign: 'end', color: profit >= 0 ? UI.green : UI.rose, fontWeight: 500 }}>
                              {ELK.fmtLyd(profit, { decimals: 2, sign: true })} <span style={{ color: UI.faint, fontWeight: 400 }}>({mPct.toFixed(0)}%)</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            }
          </Card>
        </div>
      </div>
    </>
  );
}

// ─── Push-to-Inventory Modal ───────────────────────────────────────────────
function PushInventoryModal({ containerId, onClose }) {
  const { containers, inventory, setInventory, showToast } = useApp();
  const c = containers.find(x => x.id === containerId);
  if (!c) return null;

  const available = c.products.map(p => {
    const inInv = inventory.find(i => i.sku === p.sku)?.lots.find(l => l.container === c.id);
    const alreadyPushed = inInv?.qty || 0;
    return { ...p, available: p.qty - alreadyPushed, alreadyPushed };
  });

  const [qtys, setQtys] = useStateC(() => Object.fromEntries(available.map(p => [p.sku, Math.min(p.available, Math.floor(p.available * 0.5))])));
  const [step, setStep] = useStateC(1);

  const totalUnits = Object.values(qtys).reduce((s, n) => s + (n || 0), 0);
  const totalValue = available.reduce((s, p) => s + (qtys[p.sku] || 0) * p.priceLyd, 0);
  const totalCost = available.reduce((s, p) => s + (qtys[p.sku] || 0) * p.costUsd * c.rate, 0);

  const handlePush = () => {
    const newInv = inventory.map(item => ({ ...item, lots: [...item.lots] }));
    available.forEach(p => {
      const qty = qtys[p.sku] || 0;
      if (qty === 0) return;
      let item = newInv.find(i => i.sku === p.sku);
      if (!item) {
        item = { sku: p.sku, name: p.name, brand: p.brand, cat: p.cat, priceLyd: p.priceLyd, lots: [], sold: 0 };
        newInv.push(item);
      }
      const existingLot = item.lots.find(l => l.container === c.id);
      if (existingLot) existingLot.qty += qty;
      else item.lots.push({ container: c.id, qty, costUsd: p.costUsd, rate: c.rate });
    });
    setInventory(newInv);
    showToast(t('pushedUnits', { n: totalUnits }), 'success');
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={t('pushToInventory')}
      subtitle={t('pushSubtitle', { id: c.id, rate: c.rate.toFixed(3) })}
      width={780}
      footer={step === 1 ? (
        <>
          <Button variant="ghost" onClick={onClose}>{t('cancel')}</Button>
          <Button variant="accent" iconRight="arrowRight" onClick={() => setStep(2)} disabled={totalUnits === 0}>
            {t('reviewUnits', { n: totalUnits })}
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" onClick={() => setStep(1)}>{t('back')}</Button>
          <Button variant="accent" icon="check" onClick={handlePush}>{t('confirmPush')}</Button>
        </>
      )}
    >
      {step === 1 && (
        <div style={{ padding: 20 }}>
          <div style={{ padding: 12, background: UI.accentSoft, border: `1px solid ${UI.accent}22`, borderRadius: 8, marginBottom: 16, display: 'flex', gap: 10 }}>
            <Icon name="package" size={16} color={UI.accentText} />
            <div style={{ fontSize: 12.5, color: UI.accentText, lineHeight: 1.5 }}>
              {t('selectQuantities')} <b>{t('hiddenFromSales')}</b>{t('canBeReversed')}
            </div>
          </div>

          <div style={{ border: `1px solid ${UI.border}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 110px 100px', gap: 0, padding: '10px 14px', background: UI.surfaceAlt, fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.4, borderBottom: `1px solid ${UI.border}` }}>
              <div>{t('product')}</div>
              <div style={{ textAlign: 'end' }}>{t('inContainerLabel')}</div>
              <div style={{ textAlign: 'end' }}>{t('alreadyPushed')}</div>
              <div style={{ textAlign: 'end' }}>{t('pushNow')}</div>
              <div style={{ textAlign: 'end' }}>{t('valueLyd')}</div>
            </div>
            {available.map(p => (
              <div key={p.sku} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 110px 100px', gap: 0, padding: '12px 14px', borderTop: `1px solid ${UI.borderHair}`, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{tProductName(p.sku, p.name)}</div>
                  <div className="elk-mono" style={{ fontSize: 11, color: UI.muted, marginTop: 1 }}>{p.sku} · {p.brand}</div>
                </div>
                <div className="elk-num" style={{ textAlign: 'end', fontSize: 13 }}>{p.qty}</div>
                <div className="elk-num" style={{ textAlign: 'end', fontSize: 13, color: UI.faint }}>{p.alreadyPushed}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${UI.borderStrong}`, borderRadius: 6, overflow: 'hidden' }}>
                    <button onClick={() => setQtys({ ...qtys, [p.sku]: Math.max(0, (qtys[p.sku] || 0) - 10) })} style={{ width: 26, height: 28, border: 'none', background: UI.surface, cursor: 'pointer', color: UI.muted, fontSize: 14 }}>−</button>
                    <input
                      type="number"
                      value={qtys[p.sku] || 0}
                      onChange={(e) => setQtys({ ...qtys, [p.sku]: Math.max(0, Math.min(p.available, Number(e.target.value))) })}
                      style={{ width: 50, padding: '5px 4px', border: 'none', borderLeft: `1px solid ${UI.border}`, borderRight: `1px solid ${UI.border}`, fontSize: 12.5, textAlign: 'center', fontFamily: 'inherit', fontVariantNumeric: 'tabular-nums' }}
                    />
                    <button onClick={() => setQtys({ ...qtys, [p.sku]: Math.min(p.available, (qtys[p.sku] || 0) + 10) })} style={{ width: 26, height: 28, border: 'none', background: UI.surface, cursor: 'pointer', color: UI.muted, fontSize: 14 }}>+</button>
                  </div>
                </div>
                <div className="elk-num" style={{ textAlign: 'end', fontSize: 13, fontWeight: 500 }}>{ELK.fmtLyd((qtys[p.sku] || 0) * p.priceLyd)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ padding: 20 }}>
          <div style={{ padding: 16, background: UI.surfaceAlt, borderRadius: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{t('summary')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: UI.muted }}>{t('unitsPushed')}</div>
                <div className="elk-num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{totalUnits}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: UI.muted }}>{t('costBasis')}</div>
                <div className="elk-num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{ELK.fmtLyd(totalCost)}</div>
                <div style={{ fontSize: 10.5, color: UI.muted }}>{ELK.currencyCode()} @ <span className="elk-num">{c.rate.toFixed(3)}</span></div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: UI.muted }}>{t('sellableValue')}</div>
                <div className="elk-num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3, color: UI.green }}>{ELK.fmtLyd(totalValue)}</div>
                <div style={{ fontSize: 10.5, color: UI.muted }}>{t('atCurrentPrice')}</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{t('linesBeingPushed')}</div>
          {available.filter(p => (qtys[p.sku] || 0) > 0).map(p => (
            <div key={p.sku} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${UI.borderHair}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{tProductName(p.sku, p.name)}</div>
                <div className="elk-mono" style={{ fontSize: 11, color: UI.muted }}>{p.sku}</div>
              </div>
              <div className="elk-num" style={{ fontSize: 14, fontWeight: 600 }}>{qtys[p.sku]} {t('unitsLabel')}</div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

// ─── New Container Modal ───────────────────────────────────────────────────
function NewContainerModal({ onClose }) {
  const { containers, setContainers, showToast } = useApp();
  const [form, setForm] = useStateC({
    id: `ELK-2025-${String(containers.length + 8).padStart(3, '0')}`,
    bl: '', origin: 'Shanghai, CN', eta: '',
    rate: '5.45', purchaseUsd: '', shippingUsd: '', customsUsd: '',
  });

  const u = parseFloat(form.purchaseUsd || 0);
  const s = parseFloat(form.shippingUsd || 0);
  const cu = parseFloat(form.customsUsd || 0);
  const r = parseFloat(form.rate || 0);
  const total = u + s + cu;
  const totalLyd = total * r;

  const handleCreate = () => {
    if (!form.bl || !u) { showToast(t('fillRequired'), 'error'); return; }
    const next = { ...form, status: 'in_transit', purchaseUsd: u, shippingUsd: s, customsUsd: cu, rate: r,
                   rateDate: new Date().toISOString().slice(0,10), units: 0, arrival: null, products: [] };
    setContainers([next, ...containers]);
    showToast(t('containerCreated', { id: form.id }), 'success');
    onClose();
  };

  const Field = ({ label, hint, children }) => (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: UI.text, marginBottom: 5 }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: UI.muted, marginTop: 4 }}>{hint}</div>}
    </div>
  );
  const baseInput = { width: '100%', padding: '8px 11px', border: `1px solid ${UI.borderStrong}`, borderRadius: 6, fontSize: 13, fontFamily: 'inherit', background: UI.surface };

  return (
    <Modal
      open onClose={onClose}
      title={t('newContainer')}
      subtitle={t('newContainerSubtitle')}
      width={680}
      footer={<>
        <Button variant="ghost" onClick={onClose}>{t('cancel')}</Button>
        <Button variant="accent" onClick={handleCreate}>{t('createContainer')}</Button>
      </>}
    >
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label={t('containerId')}>
            <input style={baseInput} value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
          </Field>
          <Field label={t('billOfLading')}>
            <input style={baseInput} value={form.bl} onChange={(e) => setForm({ ...form, bl: e.target.value })} placeholder="BL-MSCU-..." />
          </Field>
          <Field label={t('originPort')}>
            <select style={baseInput} value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })}>
              <option>Shanghai, CN</option><option>Guangzhou, CN</option><option>Shenzhen, CN</option>
              <option>Ningbo, CN</option><option>Istanbul, TR</option><option>Hamburg, DE</option>
            </select>
          </Field>
          <Field label={t('expectedArrival')}>
            <input type="date" style={baseInput} value={form.eta} onChange={(e) => setForm({ ...form, eta: e.target.value })} />
          </Field>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>{t('costsUsd')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <Field label={t('purchasePrice')}>
              <input style={baseInput} type="number" value={form.purchaseUsd} onChange={(e) => setForm({ ...form, purchaseUsd: e.target.value })} placeholder="84500" />
            </Field>
            <Field label={t('shippingLogistics')}>
              <input style={baseInput} type="number" value={form.shippingUsd} onChange={(e) => setForm({ ...form, shippingUsd: e.target.value })} placeholder="6400" />
            </Field>
            <Field label={t('customsImport')}>
              <input style={baseInput} type="number" value={form.customsUsd} onChange={(e) => setForm({ ...form, customsUsd: e.target.value })} placeholder="9870" />
            </Field>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: UI.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>{t('exchangeRate')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14 }}>
            <Field label={t('usdRateAtPurchase')} hint={t('rateLocksHint')}>
              <input style={baseInput} type="number" step="0.01" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} />
            </Field>
            <Field label={t('totalLandedAuto')}>
              <div style={{ padding: '8px 11px', border: `1px solid ${UI.border}`, borderRadius: 6, background: UI.surfaceAlt, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div className="elk-num" style={{ fontSize: 14, fontWeight: 600 }}>{ELK.fmtUsd(total, { decimals: 2 })}</div>
                <div className="elk-num" style={{ fontSize: 14, fontWeight: 600, color: UI.accent }}>{ELK.fmtLyd(totalLyd, { decimals: 2 })} {ELK.currencyCode()}</div>
              </div>
            </Field>
          </div>
        </div>
      </div>
    </Modal>
  );
}

MODAL_REGISTRY['push-inventory'] = PushInventoryModal;
MODAL_REGISTRY['new-container'] = NewContainerModal;
window.ContainersView = ContainersView;
