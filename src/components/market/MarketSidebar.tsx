import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, ArrowUpRight, ArrowDownRight, ChevronRight, Star } from 'lucide-react';

export const MarketSidebar: React.FC = () => {
  const { coins, watchlist, setSelectedCoin, setActiveTab } = useApp();
  const [tab, setTab] = useState<'gainers' | 'losers' | 'new'>('gainers');

  const topGainers = [...coins].sort((a, b) => b.change24h - a.change24h).slice(0, 6);
  const topLosers = [...coins].sort((a, b) => a.change24h - b.change24h).slice(0, 6);
  const newCoins = [...coins].slice(6, 12);

  const displayedList = tab === 'gainers' ? topGainers : tab === 'losers' ? topLosers : newCoins;
  const watchlistCoins = coins.filter(c => watchlist.includes(c.id)).slice(0, 6);

  const handleCoinClick = (coin: any) => {
    setSelectedCoin(coin);
    setActiveTab('trading');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 360 }}>
      {/* TOP GAINERS / LOSERS CARD */}
      <div className="card" style={{ padding: 20 }}>
        {/* TAB BUTTONS */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-main)',
          marginBottom: 16,
          gap: 16
        }}>
          {[
            { id: 'gainers', label: 'Top Gainers' },
            { id: 'losers', label: 'Top Loser' },
            { id: 'new', label: 'New in market' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              style={{
                paddingBottom: 10,
                fontSize: 13,
                fontWeight: tab === t.id ? 700 : 500,
                color: tab === t.id ? 'var(--color-brand)' : 'var(--text-muted)',
                borderBottom: tab === t.id ? '2px solid var(--color-brand)' : 'none',
                marginBottom: -1
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* COIN LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {displayedList.map(coin => {
            const isPos = coin.change24h >= 0;
            return (
              <div
                key={coin.id}
                onClick={() => handleCoinClick(coin)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={coin.icon} alt={coin.name} style={{ width: 26, height: 26, borderRadius: 'var(--radius-full)' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>{coin.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{coin.symbol}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    ${coin.price >= 1 ? coin.price.toLocaleString() : coin.price.toFixed(4)}
                  </div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isPos ? 'var(--color-green)' : 'var(--color-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 2
                  }}>
                    {isPos ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {isPos ? `+${coin.change24h}%` : `${coin.change24h}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WATCHLIST WIDGET */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>
            <Star size={16} fill="var(--color-brand)" color="var(--color-brand)" />
            <span>Watchlist</span>
          </div>
          <button
            onClick={() => setActiveTab('watchlist')}
            style={{ fontSize: 12, color: 'var(--color-brand)', display: 'flex', alignItems: 'center', gap: 2, fontWeight: 600 }}
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {watchlistCoins.length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>
              Chưa có coin trong danh sách theo dõi
            </div>
          ) : (
            watchlistCoins.map(coin => {
              const isPos = coin.change24h >= 0;
              return (
                <div
                  key={coin.id}
                  onClick={() => handleCoinClick(coin)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={coin.icon} alt={coin.name} style={{ width: 24, height: 24, borderRadius: 'var(--radius-full)' }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>{coin.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{coin.symbol}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      ${coin.price.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: isPos ? 'var(--color-green)' : 'var(--color-red)'
                    }}>
                      {isPos ? `+${coin.change24h}%` : `${coin.change24h}%`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
