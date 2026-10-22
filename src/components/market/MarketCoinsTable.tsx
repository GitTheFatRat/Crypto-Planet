import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkline } from '../common/Sparkline';
import { Coin } from '../../types/crypto';
import {
  Search,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const MarketCoinsTable: React.FC = () => {
  const {
    coins,
    watchlist,
    toggleWatchlist,
    setSelectedCoin,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filtered & searched coins
  const filteredCoins = useMemo(() => {
    return coins.filter(coin => {
      const matchSearch =
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (activeCategory === 'gainers') return coin.change24h > 1.0;
      if (activeCategory === 'losers') return coin.change24h < 0;
      if (activeCategory === 'trading') return coin.volume24h > 1000000000;
      if (activeCategory === 'volume') return coin.volume24h > 2000000000;

      if (selectedIndustry !== 'all' && coin.category !== selectedIndustry) return false;

      return true;
    });
  }, [coins, searchQuery, activeCategory, selectedIndustry]);

  const totalPages = Math.ceil(filteredCoins.length / pageSize) || 1;
  const paginatedCoins = filteredCoins.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCoinRowClick = (coin: Coin) => {
    setSelectedCoin(coin);
    setActiveTab('trading');
  };

  return (
    <div className="card" style={{ padding: 24, width: '100%' }}>
      {/* HEADER SECTION: CATEGORY TABS & SEARCH */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 20
      }}>
        {/* TABS */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Coins' },
            { id: 'gainers', label: 'Top Gainers' },
            { id: 'losers', label: 'Top Loser' },
            { id: 'trading', label: 'Top in trading' },
            { id: 'volume', label: 'Top in Volume' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveCategory(tab.id); setCurrentPage(1); }}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 13,
                fontWeight: 600,
                backgroundColor: activeCategory === tab.id ? 'var(--color-brand)' : 'var(--bg-tag)',
                color: activeCategory === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-main)',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SEARCH BOX */}
        <div style={{ position: 'relative', width: 240, maxWidth: '100%' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search Coin Name..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            style={{ width: '100%', paddingLeft: 36, fontSize: 13 }}
          />
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingBottom: 16,
        marginBottom: 16,
        borderBottom: '1px solid var(--border-main)'
      }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
            <Filter size={14} />
            <span>Category:</span>
          </div>

          <select
            value={selectedIndustry}
            onChange={e => setSelectedIndustry(e.target.value)}
            style={{ padding: '6px 10px', fontSize: 12 }}
          >
            <option value="all">All Sectors</option>
            <option value="Layer 1">Layer 1</option>
            <option value="DeFi">DeFi</option>
            <option value="Stablecoin">Stablecoin</option>
            <option value="Meme">Meme</option>
          </select>

          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            style={{ padding: '6px 10px', fontSize: 12 }}
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
          </select>

          {(searchQuery || activeCategory !== 'all' || selectedIndustry !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedIndustry('all');
              }}
              style={{ fontSize: 12, color: 'var(--color-brand)', fontWeight: 600, padding: '4px 8px' }}
            >
              Clear Filter
            </button>
          )}
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredCoins.length)} of {filteredCoins.length} assets
        </div>
      </div>

      {/* TABLE */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }}>
              <th style={{ padding: '12px 8px', width: 40 }}>#</th>
              <th style={{ padding: '12px 12px' }}>Coin Name</th>
              <th style={{ padding: '12px 12px', textAlign: 'right' }}>Coin Price</th>
              <th style={{ padding: '12px 12px', textAlign: 'right' }}>24h %</th>
              <th style={{ padding: '12px 12px', textAlign: 'right' }}>24h High</th>
              <th style={{ padding: '12px 12px', textAlign: 'right' }}>24h Low</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', width: 140 }}>Chart</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCoins.map(coin => {
              const isWatchlisted = watchlist.includes(coin.id);
              const isPositive = coin.change24h >= 0;

              return (
                <tr
                  key={coin.id}
                  onClick={() => handleCoinRowClick(coin)}
                  style={{
                    borderBottom: '1px solid var(--border-main)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* STAR & RANK */}
                  <td style={{ padding: '16px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleWatchlist(coin.id);
                        }}
                        style={{ color: isWatchlisted ? '#f59e0b' : 'var(--text-muted)' }}
                      >
                        <Star size={16} fill={isWatchlisted ? '#f59e0b' : 'none'} />
                      </button>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{coin.rank}</span>
                    </div>
                  </td>

                  {/* COIN NAME & ICON */}
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={coin.icon} alt={coin.name} style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)' }}>{coin.name}</span>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          backgroundColor: 'var(--bg-tag)',
                          padding: '2px 6px',
                          borderRadius: 4,
                          color: 'var(--text-secondary)'
                        }}>
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* COIN PRICE */}
                  <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14 }}>
                    ${coin.price >= 1 ? coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : coin.price.toFixed(4)}
                  </td>

                  {/* 24H % */}
                  <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                    <span className={isPositive ? 'badge-up' : 'badge-down'}>
                      {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {isPositive ? `+${coin.change24h}%` : `${coin.change24h}%`}
                    </span>
                  </td>

                  {/* 24H HIGH */}
                  <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>
                    ${coin.high24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* 24H LOW */}
                  <td style={{ padding: '16px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>
                    ${coin.low24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* SPARKLINE */}
                  <td style={{ padding: '16px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block' }}>
                      <Sparkline data={coin.sparkline} isPositive={isPositive} width={110} height={32} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 16,
        borderTop: '1px solid var(--border-main)',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Trang {currentPage} trên {totalPages}
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="btn-icon"
            style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-xs)',
                fontSize: 13,
                fontWeight: currentPage === page ? 700 : 500,
                backgroundColor: currentPage === page ? 'var(--color-brand)' : 'var(--bg-tag)',
                color: currentPage === page ? '#ffffff' : 'var(--text-main)',
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn-icon"
            style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
