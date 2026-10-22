import React, { useState } from 'react';
import { MOCK_ORDER_BOOK } from '../../data/mockCrypto';
import { useApp } from '../../context/AppContext';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const OrderBook: React.FC = () => {
  const { selectedCoin } = useApp();
  const [filter, setFilter] = useState<'all' | 'asks' | 'bids'>('all');

  const asks = filter === 'bids' ? [] : MOCK_ORDER_BOOK.asks;
  const bids = filter === 'asks' ? [] : MOCK_ORDER_BOOK.bids;

  return (
    <div className="card" style={{ padding: 20, width: '100%', maxWidth: 360 }}>
      {/* HEADER TABS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>
          Order Book
        </div>

        <div style={{ display: 'flex', backgroundColor: 'var(--bg-tag)', padding: 2, borderRadius: 'var(--radius-xs)' }}>
          {(['all', 'asks', 'bids'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '3px 8px',
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 3,
                backgroundColor: filter === f ? 'var(--color-brand)' : 'transparent',
                color: filter === f ? '#ffffff' : 'var(--text-muted)'
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* COLUMN HEADERS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 1.2fr',
        fontSize: 11,
        color: 'var(--text-muted)',
        fontWeight: 600,
        paddingBottom: 8,
        borderBottom: '1px solid var(--border-main)'
      }}>
        <div>Price (USD)</div>
        <div style={{ textAlign: 'center' }}>Qty ({selectedCoin.symbol})</div>
        <div style={{ textAlign: 'right' }}>Total (USD)</div>
      </div>

      {/* ASKS (SELL ORDERS) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '6px 0' }}>
        {asks.map((item, idx) => (
          <div
            key={`ask_${idx}`}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1.2fr',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              padding: '3px 4px',
              borderRadius: 3,
            }}
          >
            {/* DEPTH FILL BAR */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: `${item.depthPercent}%`,
                backgroundColor: 'var(--orderbook-ask)',
                borderRadius: 3,
                pointerEvents: 'none'
              }}
            />
            <span style={{ color: 'var(--color-red)', fontWeight: 600, position: 'relative' }}>
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span style={{ color: 'var(--text-secondary)', textAlign: 'center', position: 'relative' }}>
              {item.amount.toFixed(4)}
            </span>
            <span style={{ color: 'var(--text-main)', textAlign: 'right', position: 'relative' }}>
              ${item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>

      {/* SPREAD INDICATOR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 0',
        margin: '6px 0',
        backgroundColor: 'var(--bg-tag)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-green)',
        fontSize: 15,
        fontWeight: 800,
        fontFamily: 'var(--font-mono)'
      }}>
        <ArrowUp size={16} />
        <span>${selectedCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>

      {/* BIDS (BUY ORDERS) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '6px 0' }}>
        {bids.map((item, idx) => (
          <div
            key={`bid_${idx}`}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1.2fr',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              padding: '3px 4px',
              borderRadius: 3,
            }}
          >
            {/* DEPTH FILL BAR */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: `${item.depthPercent}%`,
                backgroundColor: 'var(--orderbook-bid)',
                borderRadius: 3,
                pointerEvents: 'none'
              }}
            />
            <span style={{ color: 'var(--color-green)', fontWeight: 600, position: 'relative' }}>
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span style={{ color: 'var(--text-secondary)', textAlign: 'center', position: 'relative' }}>
              {item.amount.toFixed(4)}
            </span>
            <span style={{ color: 'var(--text-main)', textAlign: 'right', position: 'relative' }}>
              ${item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
