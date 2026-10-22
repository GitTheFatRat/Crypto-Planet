import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkline } from '../common/Sparkline';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export const TradeHistoryTable: React.FC = () => {
  const { orders, cancelOrder, coins, portfolio } = useApp();
  const [tab, setTab] = useState<'market' | 'open' | 'history' | 'portfolio'>('open');

  const openOrders = orders.filter(o => o.status === 'open');

  return (
    <div className="card" style={{ padding: 24, width: '100%' }}>
      {/* TABS */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-main)',
        marginBottom: 20,
        gap: 16,
        overflowX: 'auto'
      }}>
        {[
          { id: 'open', label: `Open Order (${openOrders.length})` },
          { id: 'market', label: 'Trade Market' },
          { id: 'history', label: 'Trade History' },
          { id: 'portfolio', label: 'Quick Portfolio' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            style={{
              paddingBottom: 12,
              fontSize: 14,
              fontWeight: tab === t.id ? 700 : 500,
              color: tab === t.id ? 'var(--color-brand)' : 'var(--text-muted)',
              borderBottom: tab === t.id ? '2px solid var(--color-brand)' : 'none',
              marginBottom: -1,
              whiteSpace: 'nowrap'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT BASED ON TAB */}
      {tab === 'open' && (
        <div style={{ overflowX: 'auto' }}>
          {openOrders.length === 0 ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              Không có lệnh chờ nào đang mở. Bạn có thể đặt lệnh mới từ khung bên phải!
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12 }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Thời gian</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Cặp giao dịch</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Loại</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>Mua/Bán</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Giá</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Số lượng</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right' }}>Tổng (USD)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {openOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                    <td style={{ padding: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {order.timestamp}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {order.pair}
                    </td>
                    <td style={{ padding: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                      {order.type}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: order.side === 'buy' ? 'var(--color-green-light)' : 'var(--color-red-light)',
                        color: order.side === 'buy' ? 'var(--color-green)' : 'var(--color-red)',
                        textTransform: 'uppercase'
                      }}>
                        {order.side}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                      ${order.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                      {order.amount}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      ${order.total.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => cancelOrder(order.id)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 4,
                          fontSize: 12,
                          backgroundColor: 'var(--color-red-light)',
                          color: 'var(--color-red)',
                          fontWeight: 600
                        }}
                      >
                        Hủy lệnh
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'market' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12 }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Coin Name</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Coin Price</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>24h %</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>24h High</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>24h Low</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Chart</th>
              </tr>
            </thead>
            <tbody>
              {coins.slice(0, 7).map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img src={c.icon} alt={c.name} style={{ width: 22, height: 22 }} />
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{c.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.symbol}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    ${c.price.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span className={c.change24h >= 0 ? 'badge-up' : 'badge-down'}>
                      {c.change24h >= 0 ? `+${c.change24h}%` : `${c.change24h}%`}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    ${c.high24h.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    ${c.low24h.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block' }}>
                      <Sparkline data={c.sparkline} isPositive={c.change24h >= 0} width={80} height={26} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'history' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12 }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Mã lệnh</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Thời gian</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Cặp giao dịch</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Loại</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Giá</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Số lượng</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Tổng (USD)</th>
                <th style={{ padding: '8px 12px', textAlign: 'center' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{o.id}</td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{o.timestamp}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{o.pair}</td>
                  <td style={{ padding: '12px', color: o.side === 'buy' ? 'var(--color-green)' : 'var(--color-red)', fontWeight: 600 }}>
                    {o.side.toUpperCase()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>${o.price.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{o.amount}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>${o.total.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      backgroundColor: o.status === 'filled' ? 'var(--color-green-light)' : o.status === 'open' ? 'rgba(59, 130, 246, 0.15)' : 'var(--color-red-light)',
                      color: o.status === 'filled' ? 'var(--color-green)' : o.status === 'open' ? 'var(--color-brand)' : 'var(--color-red)'
                    }}>
                      {o.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'portfolio' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12 }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Tài sản</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Giá mua TB</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Số lượng nắm giữ</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Tổng giá trị (USD)</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Lợi nhuận P&L</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img src={p.icon} alt={p.name} style={{ width: 22, height: 22 }} />
                      <span style={{ fontWeight: 700 }}>{p.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.symbol}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>${p.avgBuyPrice.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{p.holdings}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>${p.totalValue.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: p.profitLoss >= 0 ? 'var(--color-green)' : 'var(--color-red)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {p.profitLoss >= 0 ? `+$${p.profitLoss.toLocaleString()}` : `-$${Math.abs(p.profitLoss).toLocaleString()}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
