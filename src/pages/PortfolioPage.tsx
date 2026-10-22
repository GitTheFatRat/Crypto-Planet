import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuickTradeWidget } from '../components/market/QuickTradeWidget';
import { MarketSidebar } from '../components/market/MarketSidebar';
import { Eye, EyeOff, Plus, Edit, TrendingUp, DollarSign } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { portfolio, fiatBalance, addToast } = useApp();
  const [hidePrice, setHidePrice] = useState(false);

  const totalInvestment = 30455.12;
  const totalReturn = 32455.12;
  const allTimeProfit = 2000.12;
  const allTimeProfitPercent = 3.0;

  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(300px, 360px)',
        gap: 24,
        alignItems: 'start'
      }} className="portfolio-layout">
        {/* LEFT COLUMN: PORTFOLIO STATS & COIN ALLOCATION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          {/* Portfolio Summary Card */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 24
            }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                  Portfolio
                </h2>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Update 15/02/2026 at 02:30 PM
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => addToast({ type: 'info', title: 'Chế độ chỉnh sửa danh mục được bật' })}
                  className="btn-secondary"
                  style={{ fontSize: 12, padding: '6px 14px' }}
                >
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => addToast({ type: 'success', title: 'Tạo Portfolio mới thành công!' })}
                  className="btn-primary"
                  style={{ fontSize: 12, padding: '6px 14px' }}
                >
                  <Plus size={14} />
                  <span>Create New Portfolio</span>
                </button>
              </div>
            </div>

            {/* BALANCE CARDS ROW */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16
            }}>
              {/* Available Balance */}
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Available Balance</span>
                  <button
                    onClick={() => setHidePrice(!hidePrice)}
                    style={{ fontSize: 11, color: 'var(--color-brand)', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    {hidePrice ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{hidePrice ? 'Show Price' : 'Hide Price'}</span>
                  </button>
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                  {hidePrice ? '••••••••' : `$${fiatBalance.toLocaleString()}`}
                </div>
              </div>

              {/* Total Investment */}
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Total Investment</div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                  {hidePrice ? '••••••••' : `$${totalInvestment.toLocaleString()}`}
                </div>
              </div>

              {/* Total Return */}
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Total Return</div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                  {hidePrice ? '••••••••' : `$${totalReturn.toLocaleString()}`}
                </div>
              </div>

              {/* All Time Profit / Loss */}
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>All Time Profit / Loss</div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-green)' }}>
                  {hidePrice ? '••••••••' : `+$${allTimeProfit.toLocaleString()} (+${allTimeProfitPercent}%)`}
                </div>
              </div>
            </div>
          </div>

          {/* Coin Allocation Table */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)' }}>
                  Coin Allocation
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Phân bổ tài sản nắm giữ và hiệu suất P&amp;L</p>
              </div>

              <select style={{ fontSize: 12, padding: '4px 10px' }}>
                <option>Month View</option>
                <option>Week View</option>
                <option>Year View</option>
              </select>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 680 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }}>
                    <th style={{ padding: '12px 8px' }}>Pair / Holdings</th>
                    <th style={{ padding: '12px 10px', textAlign: 'center' }}>In Order Qty</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Price / Avg Buy</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Holdings Assets</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Total Asset Value</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right' }}>Profit / Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map(p => {
                    const isPos = p.profitLoss >= 0;
                    return (
                      <tr
                        key={p.id}
                        style={{ borderBottom: '1px solid var(--border-main)' }}
                      >
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={p.icon} alt={p.name} style={{ width: 28, height: 28, borderRadius: 'var(--radius-full)' }} />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.symbol}</span>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '16px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {p.inOrderQty}
                        </td>

                        <td style={{ padding: '16px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                          <div>${(p.avgBuyPrice * 1.1).toFixed(2)}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>${p.avgBuyPrice.toFixed(2)}</div>
                        </td>

                        <td style={{ padding: '16px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                          <div>{p.holdings}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Assets</div>
                        </td>

                        <td style={{ padding: '16px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          <div>${p.totalValue.toLocaleString()}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>USD</div>
                        </td>

                        <td style={{ padding: '16px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          <div style={{ color: isPos ? 'var(--color-green)' : 'var(--color-red)' }}>
                            {isPos ? `+$${p.profitLoss.toLocaleString()}` : `-$${Math.abs(p.profitLoss).toLocaleString()}`}
                          </div>
                          <div style={{ fontSize: 11, color: isPos ? 'var(--color-green)' : 'var(--color-red)' }}>
                            {isPos ? `+${p.profitLossPercent}%` : `${p.profitLossPercent}%`}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK SWAP & GAINERS SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <QuickTradeWidget mode="exchange" />
          <MarketSidebar />
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .portfolio-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
