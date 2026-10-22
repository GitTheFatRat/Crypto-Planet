import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkline } from '../components/common/Sparkline';
import { QuickTradeWidget } from '../components/market/QuickTradeWidget';
import { MarketSidebar } from '../components/market/MarketSidebar';
import { Star, Trash2, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';

export const WatchlistPage: React.FC = () => {
  const { coins, watchlist, toggleWatchlist, setSelectedCoin, setActiveTab } = useApp();

  const watchedCoins = coins.filter(c => watchlist.includes(c.id));

  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(300px, 360px)',
        gap: 24,
        alignItems: 'start'
      }} className="watchlist-layout">
        {/* LEFT COLUMN: WATCHLIST TABLE */}
        <div className="card" style={{ padding: 24, minWidth: 0 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20
          }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                My Watchlist
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Cập nhật biến động các đồng coin yêu thích trong thời gian thực
              </p>
            </div>

            <button
              onClick={() => setActiveTab('market')}
              className="btn-primary"
              style={{ fontSize: 13 }}
            >
              <Plus size={16} />
              <span>Add Coin</span>
            </button>
          </div>

          {watchedCoins.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <Star size={44} style={{ marginBottom: 12, opacity: 0.4 }} />
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                Chưa có đồng coin nào trong danh sách theo dõi
              </div>
              <p style={{ fontSize: 13, marginBottom: 20 }}>
                Nhấn vào biểu tượng ngôi sao bên cạnh bất kỳ đồng coin nào trên trang Thị trường để theo dõi.
              </p>
              <button onClick={() => setActiveTab('market')} className="btn-primary">
                Xem Bảng Giá Thị Trường
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 640 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }}>
                    <th style={{ padding: '12px 8px' }}>Coin Name</th>
                    <th style={{ padding: '12px 12px', textAlign: 'right' }}>Price (USD)</th>
                    <th style={{ padding: '12px 12px', textAlign: 'right' }}>24h %</th>
                    <th style={{ padding: '12px 12px', textAlign: 'right' }}>24h High</th>
                    <th style={{ padding: '12px 12px', textAlign: 'right' }}>24h Low</th>
                    <th style={{ padding: '12px 12px', textAlign: 'center' }}>Chart</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center' }}>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {watchedCoins.map(coin => {
                    const isPos = coin.change24h >= 0;
                    return (
                      <tr
                        key={coin.id}
                        onClick={() => { setSelectedCoin(coin); setActiveTab('trading'); }}
                        style={{
                          borderBottom: '1px solid var(--border-main)',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s'
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={coin.icon} alt={coin.name} style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)' }} />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 14 }}>{coin.name}</div>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{coin.symbol}</span>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          ${coin.price.toLocaleString()}
                        </td>

                        <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                          <span className={isPos ? 'badge-up' : 'badge-down'}>
                            {isPos ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                            {isPos ? `+${coin.change24h}%` : `${coin.change24h}%`}
                          </span>
                        </td>

                        <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                          ${coin.high24h.toLocaleString()}
                        </td>

                        <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                          ${coin.low24h.toLocaleString()}
                        </td>

                        <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-block' }}>
                            <Sparkline data={coin.sparkline} isPositive={isPos} width={90} height={30} />
                          </div>
                        </td>

                        <td style={{ padding: '16px 8px', textAlign: 'center' }}>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              toggleWatchlist(coin.id);
                            }}
                            style={{ color: 'var(--text-muted)', padding: 4 }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: QUICK SWAP & GAINERS SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <QuickTradeWidget mode="exchange" />
          <MarketSidebar />
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .watchlist-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
