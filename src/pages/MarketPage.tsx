import React from 'react';
import { useApp } from '../context/AppContext';
import { MarketCoinsTable } from '../components/market/MarketCoinsTable';
import { MarketSidebar } from '../components/market/MarketSidebar';
import { QuickTradeWidget } from '../components/market/QuickTradeWidget';
import { Sparkline } from '../components/common/Sparkline';

export const MarketPage: React.FC = () => {
  const { coins, setSelectedCoin, setActiveTab } = useApp();

  const featured = coins.slice(1, 5);

  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      {/* Featured Ticker Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        marginBottom: 32
      }}>
        {featured.map(coin => {
          const isPos = coin.change24h >= 0;
          return (
            <div
              key={coin.id}
              onClick={() => { setSelectedCoin(coin); setActiveTab('trading'); }}
              className="card"
              style={{
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <img src={coin.icon} alt={coin.name} style={{ width: 22, height: 22, borderRadius: 'var(--radius-full)' }} />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{coin.name}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  ${coin.price.toLocaleString()}
                </div>
                <span className={isPos ? 'badge-up' : 'badge-down'} style={{ marginTop: 4 }}>
                  {isPos ? `+${coin.change24h}%` : `${coin.change24h}%`}
                </span>
              </div>

              <div>
                <Sparkline data={coin.sparkline} isPositive={isPos} width={90} height={32} />
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(300px, 360px)',
        gap: 24,
        alignItems: 'start'
      }} className="market-layout">
        {/* LEFT: MARKET COINS TABLE */}
        <div style={{ minWidth: 0 }}>
          <MarketCoinsTable />
        </div>

        {/* RIGHT: QUICK TRADE WIDGET & SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <QuickTradeWidget mode="trading" />
          <MarketSidebar />
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .market-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
