import React from 'react';
import { useApp } from '../context/AppContext';
import { CandlestickChart } from '../components/trading/CandlestickChart';
import { OrderBook } from '../components/trading/OrderBook';
import { TradeHistoryTable } from '../components/trading/TradeHistoryTable';
import { QuickTradeWidget } from '../components/market/QuickTradeWidget';
import { Star, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

export const TradingPage: React.FC = () => {
  const { selectedCoin, watchlist, toggleWatchlist } = useApp();

  const isWatchlisted = watchlist.includes(selectedCoin.id);
  const isPos = selectedCoin.change24h >= 0;

  return (
    <div className="container" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Market Stats Header Bar */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          alignItems: 'center',
          borderBottom: '1px solid var(--border-main)',
          paddingBottom: 20,
          marginBottom: 20
        }}>
          {/* COIN IDENTIFIER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={selectedCoin.icon} alt={selectedCoin.name} style={{ width: 44, height: 44, borderRadius: 'var(--radius-full)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)' }}>{selectedCoin.name}</h2>
                <span className="badge-tag">{selectedCoin.symbol}</span>
                <button
                  onClick={() => toggleWatchlist(selectedCoin.id)}
                  style={{ color: isWatchlisted ? '#f59e0b' : 'var(--text-muted)' }}
                >
                  <Star size={18} fill={isWatchlisted ? '#f59e0b' : 'none'} />
                </button>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Rank #{selectedCoin.rank} · On 2,771,173 watchlists
              </div>
            </div>
          </div>

          {/* CURRENT PRICE & 24H CHANGE */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                ${selectedCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={isPos ? 'badge-up' : 'badge-down'}>
                {isPos ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {isPos ? `+${selectedCoin.change24h}%` : `${selectedCoin.change24h}%`}
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              Bitcoin Price (USD) Live
            </div>
          </div>

          {/* 24H HIGH / LOW PROGRESS BAR */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>Low: ${selectedCoin.low24h.toLocaleString()}</span>
              <span style={{ fontWeight: 600 }}>24h Range</span>
              <span>High: ${selectedCoin.high24h.toLocaleString()}</span>
            </div>
            <div style={{ height: 6, backgroundColor: 'var(--bg-tag)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)' }} />
            </div>
          </div>
        </div>

        {/* 4 STATS METRIC TILES */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16
        }}>
          {[
            { label: 'Market Cap', val: `$${(selectedCoin.marketCap / 1e9).toFixed(2)}B`, sub: '+2.1% 24h' },
            { label: 'Full Diluted Valuation', val: `$${((selectedCoin.marketCap * 1.05) / 1e9).toFixed(2)}B`, sub: '-0.8% 24h' },
            { label: '24h Volume', val: `$${(selectedCoin.volume24h / 1e9).toFixed(2)}B`, sub: '+14.2% 24h' },
            { label: 'Circulating Supply', val: selectedCoin.circulatingSupply, sub: `Max: ${selectedCoin.maxSupply || 'N/A'}` },
          ].map((stat, idx) => (
            <div key={idx} style={{ padding: '12px 16px', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-main)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', marginBottom: 2 }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: 'var(--color-brand)', fontWeight: 600 }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN TRADING TERMINAL GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(320px, 360px)',
        gap: 24,
        alignItems: 'start'
      }} className="trading-layout">
        {/* LEFT COLUMN: CANDLESTICK CHART & BOTTOM TABLES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          <CandlestickChart />
          <TradeHistoryTable />
        </div>

        {/* RIGHT COLUMN: ORDER FORM & ORDER BOOK */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <QuickTradeWidget mode="trading" />
          <OrderBook />
        </div>
      </div>

      <style>{`
        @media (max-width: 1120px) {
          .trading-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
