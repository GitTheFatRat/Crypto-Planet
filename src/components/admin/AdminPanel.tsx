import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Receipt,
  Coins,
  Repeat,
  BarChart3,
  BellRing,
  LifeBuoy,
  ShieldAlert,
  Terminal,
  PiggyBank,
  Percent,
  Tag,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Edit2,
  Search,
} from 'lucide-react';
import {
  INITIAL_TRADING_PAIRS,
  INITIAL_PROMOTIONS,
} from '../../data/mockCrypto';
import {
  TradingPairSetting,
  PromotionCampaign,
} from '../../types/crypto';

export const AdminPanel: React.FC = () => {
  const {
    coins,
    walletTransactions,
    supportTickets,
    addToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<string>('users');

  // User Management State
  const [userList, setUserList] = useState([
    { id: 'usr_1', name: 'Allie Grater', email: 'allie@example.com', role: 'trader', kyc: 'verified', status: 'active', balance: 32455.12 },
    { id: 'usr_2', name: 'Nguyen Van A', email: 'nguyenvana@gmail.com', role: 'trader', kyc: 'pending', status: 'active', balance: 5400.00 },
    { id: 'usr_3', name: 'David Smith', email: 'dsmith@crypto.net', role: 'viewer', kyc: 'unverified', status: 'active', balance: 0.00 },
    { id: 'usr_4', name: 'Elena Rostova', email: 'elena@finance.eu', role: 'trader', kyc: 'verified', status: 'suspended', balance: 18200.50 },
    { id: 'usr_5', name: 'Admin Master', email: 'admin@cryptoplanet.com', role: 'admin', kyc: 'verified', status: 'active', balance: 1500000.00 },
  ]);

  // Trading Pairs State
  const [tradingPairs, setTradingPairs] = useState<TradingPairSetting[]>(INITIAL_TRADING_PAIRS);

  // Promotion State
  const [promotions, setPromotions] = useState<PromotionCampaign[]>(INITIAL_PROMOTIONS);

  // Announcements State
  const [announcements, setAnnouncements] = useState([
    { id: 'ann_1', title: 'Bảo trì hệ thống ví BTC định kỳ', date: '2026-02-20', role: 'Trader', active: true },
    { id: 'ann_2', title: 'Chương trình Airdrop 100,000 USD chào xuân', date: '2026-02-15', role: 'All', active: true },
  ]);
  const [newAnnTitle, setNewAnnTitle] = useState('');

  // Fees State
  const [makerFee, setMakerFee] = useState('0.1');
  const [takerFee, setTakerFee] = useState('0.15');
  const [withdrawFee, setWithdrawFee] = useState('0.0005');

  // Toggle user status
  const toggleUserStatus = (userId: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        addToast({ type: 'info', title: `Đã đổi trạng thái ${u.name} thành: ${nextStatus}` });
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const deleteUser = (userId: string) => {
    setUserList(prev => prev.filter(u => u.id !== userId));
    addToast({ type: 'success', title: 'Đã xóa người dùng khỏi hệ thống' });
  };

  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(240px, 280px) 1fr',
        gap: 24,
        alignItems: 'start'
      }}>
        {/* ADMIN SIDEBAR */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--border-main)', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-brand)' }}>
              ⚙️ QUẢN TRỊ VIÊN
            </h3>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Trung tâm điều hành sàn giao dịch
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { id: 'users', label: 'Quản lý người dùng', icon: Users },
              { id: 'transactions', label: 'Quản lý giao dịch', icon: Receipt },
              { id: 'assets', label: 'Quản lý tài sản', icon: Coins },
              { id: 'pairs', label: 'Cặp giao dịch', icon: Repeat },
              { id: 'reports', label: 'Báo cáo & Thống kê', icon: BarChart3 },
              { id: 'notifications', label: 'Quản lý thông báo', icon: BellRing },
              { id: 'support', label: 'Quản lý hỗ trợ', icon: LifeBuoy },
              { id: 'security', label: 'Quản lý bảo mật', icon: ShieldAlert },
              { id: 'api', label: 'Quản lý API Dev', icon: Terminal },
              { id: 'financial', label: 'Quản lý tài chính', icon: PiggyBank },
              { id: 'fees', label: 'Quản lý phí sàn', icon: Percent },
              { id: 'promotions', label: 'Quản lý khuyến mãi', icon: Tag },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? 'var(--color-brand)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    textAlign: 'left'
                  }}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ADMIN MAIN CONTENT */}
        <div className="card" style={{ padding: 28 }}>
          {/* USER MANAGEMENT */}
          {activeAdminTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800 }}>Quản Lý Người Dùng</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Xem, kích hoạt, đình chỉ hoặc xóa người dùng</p>
                </div>
                <button
                  onClick={() => {
                    const name = prompt('Nhập họ tên người dùng:');
                    if (name) {
                      const email = `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`;
                      setUserList(prev => [...prev, {
                        id: `usr_${Date.now()}`,
                        name,
                        email,
                        role: 'trader',
                        kyc: 'verified',
                        status: 'active',
                        balance: 1000
                      }]);
                      addToast({ type: 'success', title: `Đã thêm người dùng: ${name}` });
                    }
                  }}
                  className="btn-primary"
                  style={{ fontSize: 12 }}
                >
                  <Plus size={14} /> Thêm người dùng
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12 }}>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Họ tên</th>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Role</th>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>KYC</th>
                      <th style={{ padding: '10px 8px', textAlign: 'right' }}>Số dư USD</th>
                      <th style={{ padding: '10px 8px', textAlign: 'center' }}>Trạng thái</th>
                      <th style={{ padding: '10px 8px', textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                        <td style={{ padding: '12px 8px', fontWeight: 700 }}>{u.name}</td>
                        <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{u.email}</td>
                        <td style={{ padding: '12px 8px', textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>{u.role}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            backgroundColor: u.kyc === 'verified' ? 'var(--color-green-light)' : 'rgba(239, 68, 68, 0.15)',
                            color: u.kyc === 'verified' ? 'var(--color-green)' : 'var(--color-red)'
                          }}>
                            {u.kyc}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>${u.balance.toLocaleString()}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            backgroundColor: u.status === 'active' ? 'var(--color-green-light)' : 'var(--color-red-light)',
                            color: u.status === 'active' ? 'var(--color-green)' : 'var(--color-red)'
                          }}>
                            {u.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button
                              onClick={() => toggleUserStatus(u.id)}
                              style={{ padding: 4, color: 'var(--color-brand)' }}
                              title="Khóa / Mở khóa"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => deleteUser(u.id)}
                              style={{ padding: 4, color: 'var(--color-red)' }}
                              title="Xóa tài khoản"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TRANSACTION MANAGEMENT */}
          {activeAdminTab === 'transactions' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quản Lý &amp; Kiểm Duyệt Giao Dịch</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Duyệt các lệnh nạp rút và giao dịch hệ thống</p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12 }}>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Mã GD</th>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Hành động</th>
                      <th style={{ padding: '10px 8px', textAlign: 'right' }}>Số tiền</th>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Phương thức</th>
                      <th style={{ padding: '10px 8px', textAlign: 'left' }}>Thời gian</th>
                      <th style={{ padding: '10px 8px', textAlign: 'center' }}>Trạng thái</th>
                      <th style={{ padding: '10px 8px', textAlign: 'center' }}>Duyệt lệnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletTransactions.map(tx => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                        <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>{tx.id}</td>
                        <td style={{ padding: '12px 8px', fontWeight: 600 }}>{tx.action}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          ${tx.amount.toLocaleString()} {tx.currency}
                        </td>
                        <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{tx.method}</td>
                        <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{tx.date}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            backgroundColor: tx.status === 'Successful' ? 'var(--color-green-light)' : 'var(--color-red-light)',
                            color: tx.status === 'Successful' ? 'var(--color-green)' : 'var(--color-red)'
                          }}>
                            {tx.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <button
                            onClick={() => addToast({ type: 'success', title: `Đã phê duyệt lệnh ${tx.id}` })}
                            className="btn-secondary"
                            style={{ fontSize: 11, padding: '4px 8px' }}
                          >
                            Phê duyệt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ASSET MANAGEMENT */}
          {activeAdminTab === 'assets' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quản Lý Tài Sản Tiền Điện Tử</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Quản lý niêm yết các đồng coin trên sàn</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                {coins.map(c => (
                  <div key={c.id} style={{ padding: 16, border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-input)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <img src={c.icon} alt={c.name} style={{ width: 28, height: 28 }} />
                      <div>
                        <div style={{ fontWeight: 800 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.symbol}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Giá: ${c.price.toLocaleString()}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>Cung: {c.circulatingSupply}</div>
                    <button
                      onClick={() => addToast({ type: 'info', title: `Đã cập nhật trạng thái niêm yết: ${c.name}` })}
                      className="btn-secondary"
                      style={{ width: '100%', fontSize: 11, padding: '4px 0' }}
                    >
                      Bật/Tắt giao dịch
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRADING PAIRS */}
          {activeAdminTab === 'pairs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800 }}>Quản Lý Cặp Giao Dịch</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Thiết lập tỷ lệ và mức phí cho từng cặp coin</p>
                </div>
                <button
                  onClick={() => {
                    const base = prompt('Nhập mã token cơ sở (ví dụ: ADA):');
                    if (base) {
                      setTradingPairs(prev => [...prev, {
                        id: `pair_${base.toLowerCase()}_usdt`,
                        baseSymbol: base.toUpperCase(),
                        quoteSymbol: 'USDT',
                        minAmount: 0.1,
                        makerFee: 0.1,
                        takerFee: 0.15,
                        isActive: true
                      }]);
                      addToast({ type: 'success', title: `Đã thêm cặp giao dịch mới: ${base.toUpperCase()}/USDT` });
                    }
                  }}
                  className="btn-primary"
                  style={{ fontSize: 12 }}
                >
                  <Plus size={14} /> Thêm cặp giao dịch
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12 }}>
                    <th style={{ padding: '10px 8px', textAlign: 'left' }}>Cặp coin</th>
                    <th style={{ padding: '10px 8px', textAlign: 'right' }}>Khối lượng tối thiểu</th>
                    <th style={{ padding: '10px 8px', textAlign: 'right' }}>Phí Maker (%)</th>
                    <th style={{ padding: '10px 8px', textAlign: 'right' }}>Phí Taker (%)</th>
                    <th style={{ padding: '10px 8px', textAlign: 'center' }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {tradingPairs.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 800 }}>{p.baseSymbol}/{p.quoteSymbol}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{p.minAmount}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{p.makerFee}%</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{p.takerFee}%</td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          backgroundColor: p.isActive ? 'var(--color-green-light)' : 'var(--color-red-light)',
                          color: p.isActive ? 'var(--color-green)' : 'var(--color-red)'
                        }}>
                          {p.isActive ? 'ACTIVE' : 'DISABLED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* REPORTS & STATS */}
          {activeAdminTab === 'reports' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Báo Cáo &amp; Xuất Dữ Liệu</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24 }}>Tổng quan thanh khoản, doanh thu và người dùng</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
                {[
                  { label: 'Tổng Khối Lượng 24h', val: '$148,920,400 USD', change: '+12.4%' },
                  { label: 'Phí Giao Dịch Thu Được', val: '$148,920 USD', change: '+8.1%' },
                  { label: 'Trader Hoạt Động', val: '24,850 Người', change: '+5.6%' },
                  { label: 'Tài Sản Lưu Ký (AUM)', val: '$892,100,000 USD', change: '+3.2%' },
                ].map((s, idx) => (
                  <div key={idx} style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', marginBottom: 4 }}>{s.val}</div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-green)' }}>{s.change}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addToast({ type: 'success', title: 'Đã xuất file báo cáo CryptoPlanet_Report_2026.csv thành công!' })}
                className="btn-primary"
              >
                Xuất Báo Cáo Tài Chính CSV
              </button>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeAdminTab === 'notifications' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quản Lý Thông Báo Hệ Thống</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Gửi thông báo đẩy đến Trader và Viewer</p>

              <form onSubmit={e => {
                e.preventDefault();
                if (!newAnnTitle) return;
                setAnnouncements(prev => [{
                  id: `ann_${Date.now()}`,
                  title: newAnnTitle,
                  date: new Date().toISOString().substring(0, 10),
                  role: 'All',
                  active: true
                }, ...prev]);
                addToast({ type: 'success', title: 'Đã phát thông báo mới tới toàn sàn!' });
                setNewAnnTitle('');
              }} style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                <input
                  type="text"
                  placeholder="Nhập nội dung thông báo hệ thống..."
                  value={newAnnTitle}
                  onChange={e => setNewAnnTitle(e.target.value)}
                  style={{ flex: 1 }}
                  required
                />
                <button type="submit" className="btn-primary">Gửi Thông Báo</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {announcements.map(ann => (
                  <div key={ann.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 14, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{ann.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Mục tiêu: {ann.role} · Ngày: {ann.date}</div>
                    </div>
                    <span style={{ color: 'var(--color-green)', fontSize: 12, fontWeight: 600 }}>Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUPPORT MANAGEMENT */}
          {activeAdminTab === 'support' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quản Lý Hỗ Trợ Khách Hàng</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Tiếp nhận và giải quyết yêu cầu kỹ thuật</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {supportTickets.map(ticket => (
                  <div key={ticket.id} style={{ padding: 18, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{ticket.subject}</span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: ticket.status === 'resolved' ? 'var(--color-green-light)' : 'rgba(59, 130, 246, 0.15)',
                        color: ticket.status === 'resolved' ? 'var(--color-green)' : 'var(--color-brand)'
                      }}>
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>{ticket.message}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
                      <span>Từ: {ticket.userName} ({ticket.userEmail})</span>
                      <button
                        onClick={() => addToast({ type: 'success', title: `Đã phản hồi vé ${ticket.id}` })}
                        className="btn-secondary"
                        style={{ fontSize: 11, padding: '4px 10px' }}
                      >
                        Trả lời Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECURITY AUDIT */}
          {activeAdminTab === 'security' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quản Lý &amp; Thiết Lập Bảo Mật</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Giám sát tường lửa, mã hóa SSL và chống DDOS</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { title: 'Bắt buộc xác thực 2FA cho mọi lệnh rút tiền', active: true },
                  { title: 'Bảo vệ ví nóng bằng chữ ký đa điểm (Multi-Sig 3/5)', active: true },
                  { title: 'Tự động khóa IP khi đăng nhập sai quá 5 lần', active: true },
                  { title: 'Kiểm toán smart contract thanh khoản tự động', active: true },
                ].map((sec, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{sec.title}</span>
                    <span style={{ color: 'var(--color-green)', fontWeight: 700, fontSize: 12 }}>ENABLED</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API DEV MANAGEMENT */}
          {activeAdminTab === 'api' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quản Lý API Nhà Phát Triển</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Kiểm soát rate-limit và phân quyền endpoint REST/WebSocket</p>
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-main)' }}>
                <div style={{ marginBottom: 12, fontSize: 13 }}>Tốc độ giới hạn chuẩn: <strong>50 requests / second</strong></div>
                <div style={{ marginBottom: 12, fontSize: 13 }}>Tổng số API Keys kích hoạt: <strong>1,420 Keys</strong></div>
                <button onClick={() => addToast({ type: 'success', title: 'Đã lưu cấu hình API Gateway' })} className="btn-primary">
                  Cập Nhật Hạn Mức Toàn Sàn
                </button>
              </div>
            </div>
          )}

          {/* FINANCIAL MANAGEMENT */}
          {activeAdminTab === 'financial' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quản Lý Tài Chính Hệ Thống</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Báo cáo doanh thu, quỹ dự trữ bảo chứng Proof of Reserves</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-main)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Quỹ Dự Trữ Cold Wallet</div>
                  <div style={{ fontSize: 24, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--color-green)', marginTop: 6 }}>100% Phủ Kín (1:1)</div>
                </div>
                <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-main)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Lợi Nhuận Ròng Tháng Này</div>
                  <div style={{ fontSize: 24, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--color-brand)', marginTop: 6 }}>$412,890 USD</div>
                </div>
              </div>
            </div>
          )}

          {/* TRADING FEES */}
          {activeAdminTab === 'fees' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Thiết Lập Biểu Phí Giao Dịch</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Điều chỉnh phí maker, taker và phí rút blockchain</p>

              <form onSubmit={e => {
                e.preventDefault();
                addToast({ type: 'success', title: 'Đã lưu biểu phí sàn giao dịch mới!' });
              }} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Maker Fee (%)</label>
                  <input type="text" value={makerFee} onChange={e => setMakerFee(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Taker Fee (%)</label>
                  <input type="text" value={takerFee} onChange={e => setTakerFee(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Phí Rút BTC Mặc định</label>
                  <input type="text" value={withdrawFee} onChange={e => setWithdrawFee(e.target.value)} style={{ width: '100%' }} />
                </div>
                <button type="submit" className="btn-primary">Lưu Thay Đổi</button>
              </form>
            </div>
          )}

          {/* PROMOTIONS */}
          {activeAdminTab === 'promotions' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800 }}>Quản Lý Khuyến Mãi &amp; Ưu Đãi</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tạo chiến dịch tặng thưởng và mã giảm phí</p>
                </div>
                <button
                  onClick={() => {
                    const title = prompt('Nhập tên chương trình khuyến mãi:');
                    if (title) {
                      setPromotions(prev => [...prev, {
                        id: `prm_${Date.now()}`,
                        title,
                        code: 'DISCOUNT50',
                        description: 'Ưu đãi đặc biệt cho người dùng mới',
                        discountRate: 50,
                        validUntil: '2026-12-31',
                        isActive: true
                      }]);
                      addToast({ type: 'success', title: `Đã tạo chiến dịch: ${title}` });
                    }
                  }}
                  className="btn-primary"
                  style={{ fontSize: 12 }}
                >
                  <Plus size={14} /> Tạo khuyến mãi
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {promotions.map(promo => (
                  <div key={promo.id} style={{ padding: 18, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{promo.title}</span>
                      <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, backgroundColor: 'var(--color-green-light)', color: 'var(--color-green)' }}>
                        CODE: {promo.code}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{promo.description}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hạn sử dụng: {promo.validUntil}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
