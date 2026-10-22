import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Moon,
  Wallet as WalletIcon,
  Zap,
  Menu,
  X,
  Shield,
  User,
  ChevronDown,
  Sparkles,
  Layers,
  LogOut,
  Sliders,
  DollarSign
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    role,
    setRole,
    user,
    activeTab,
    setActiveTab,
    openModal,
    setAuthMode,
    setAuthView,
    isAuthenticated,
    logoutUser,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (view: 'login' | 'register', mode: 'modal' | 'split') => {
    setAuthMode(mode);
    setAuthView(view);
    openModal('auth');
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg-navbar)',
      borderBottom: '1px solid var(--border-main)',
      backdropFilter: 'blur(10px)',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 72
      }}>
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div
            onClick={() => handleNavClick('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="3" rx="1.5" fill="#ffffff" />
                <rect x="3" y="10.5" width="18" height="3" rx="1.5" fill="#ffffff" />
                <rect x="3" y="16" width="18" height="3" rx="1.5" fill="#ffffff" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: 'var(--text-main)' }}>
                Crypto Planet
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Online Exchange
              </span>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
            {[
              { id: 'landing', label: 'Home' },
              { id: 'market', label: 'Market' },
              { id: 'trading', label: 'Trading Pro' },
              { id: 'watchlist', label: 'Watchlist' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'wallet', label: 'Wallet' },
              ...(role === 'admin' ? [{ id: 'admin', label: '⚙️ Admin Panel' }] : [])
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    padding: '8px 14px',
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--color-brand)' : 'var(--text-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'var(--bg-tag)' : 'transparent',
                    position: 'relative',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-main)')}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--color-brand)' : 'var(--text-secondary)')}
                >
                  {item.label}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: -16,
                      left: '20%',
                      right: '20%',
                      height: 3,
                      borderRadius: 3,
                      backgroundColor: 'var(--color-brand)'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* RIGHT CONTROLS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* ROLE SWITCHER PILL */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: role === 'admin' ? 'rgba(239, 68, 68, 0.15)' : role === 'trader' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                color: role === 'admin' ? 'var(--color-red)' : role === 'trader' ? 'var(--color-brand)' : 'var(--color-green)',
                border: '1px solid currentColor',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}
            >
              {role === 'admin' && <Shield size={13} />}
              {role === 'trader' && <Sparkles size={13} />}
              {role === 'viewer' && <User size={13} />}
              <span>Role: {role}</span>
              <ChevronDown size={12} />
            </button>

            {roleDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                backgroundColor: 'var(--bg-modal)',
                border: '1px solid var(--border-main)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: 6,
                minWidth: 180,
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', padding: '6px 10px' }}>
                  CHỌN VAI TRÒ HỆ THỐNG
                </div>
                {[
                  { r: 'trader', label: 'Trader (Giao dịch đầy đủ)', desc: 'Nạp/rút, mua bán, portfolio' },
                  { r: 'viewer', label: 'Viewer (Chỉ xem)', desc: 'Xem thị trường, biểu đồ' },
                  { r: 'admin', label: 'Admin (Quản trị)', desc: 'Bảng điều khiển hệ thống' },
                ].map(item => (
                  <button
                    key={item.r}
                    onClick={() => {
                      setRole(item.r as any);
                      setRoleDropdownOpen(false);
                      if (item.r === 'admin') setActiveTab('admin');
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: role === item.r ? 'var(--bg-hover)' : 'transparent',
                      color: role === item.r ? 'var(--color-brand)' : 'var(--text-main)',
                      fontSize: 13,
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title={theme === 'dark' ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
          </button>

          {/* DESKTOP QUICK BUTTONS */}
          <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Trade History */}
            <button
              onClick={() => handleNavClick('trading')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-tag)',
                color: 'var(--text-main)',
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid var(--border-main)'
              }}
            >
              <Zap size={15} color="var(--color-brand)" />
              <span>Trade History</span>
            </button>

            {/* Wallet Button */}
            <button
              onClick={() => handleNavClick('wallet')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-tag)',
                color: 'var(--text-main)',
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid var(--border-main)'
              }}
            >
              <WalletIcon size={15} color="var(--color-brand)" />
              <span>Wallet</span>
            </button>

            {/* User Profile / Auth */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '4px 8px 4px 4px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-tag)',
                    border: '1px solid var(--border-main)',
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: 32, height: 32, borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} color="var(--text-secondary)" />
                </button>

                {profileDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    backgroundColor: 'var(--bg-modal)',
                    border: '1px solid var(--border-main)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-modal)',
                    padding: 12,
                    minWidth: 240,
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '1px solid var(--border-main)' }}>
                      <img src={user.avatar} alt={user.name} style={{ width: 40, height: 40, borderRadius: 'var(--radius-full)' }} />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)' }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{user.email}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => { handleNavClick('profile'); setProfileDropdownOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', fontSize: 13, borderRadius: 'var(--radius-xs)', color: 'var(--text-main)', textAlign: 'left' }}
                    >
                      <Sliders size={16} />
                      <span>Cài đặt Hồ sơ & Bảo mật</span>
                    </button>

                    <div style={{ borderTop: '1px solid var(--border-main)', paddingTop: 6 }}>
                      <button
                        onClick={async () => {
                          setProfileDropdownOpen(false);
                          await logoutUser();
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', fontSize: 13, borderRadius: 'var(--radius-xs)', color: 'var(--color-red)', width: '100%', textAlign: 'left' }}
                      >
                        <LogOut size={16} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => handleOpenAuth('login', 'modal')}
                  style={{
                    padding: '8px 14px',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-tag)',
                    border: '1px solid var(--border-main)',
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleOpenAuth('register', 'modal')}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: 13 }}
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              padding: 8,
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-main)',
              display: 'none'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          top: 72,
          backgroundColor: 'var(--bg-navbar)',
          borderTop: '1px solid var(--border-main)',
          zIndex: 99,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>MENU ĐIỀU HƯỚNG</div>
          {[
            { id: 'landing', label: 'Trang chủ (Home)' },
            { id: 'market', label: 'Thị trường (Market)' },
            { id: 'trading', label: 'Giao dịch (Trading Pro)' },
            { id: 'watchlist', label: 'Theo dõi (Watchlist)' },
            { id: 'portfolio', label: 'Danh mục tài sản (Portfolio)' },
            { id: 'wallet', label: 'Ví & Nạp rút (Wallet)' },
            { id: 'profile', label: 'Cài đặt Hồ sơ & KYC (Profile)' },
            ...(role === 'admin' ? [{ id: 'admin', label: '⚙️ Bảng Quản trị Admin' }] : [])
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                fontSize: 16,
                fontWeight: activeTab === item.id ? 700 : 500,
                color: activeTab === item.id ? 'var(--color-brand)' : 'var(--text-main)',
                backgroundColor: activeTab === item.id ? 'var(--bg-tag)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {item.label}
            </button>
          ))}

          <div style={{ borderTop: '1px solid var(--border-main)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => handleOpenAuth('login', 'modal')}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Đăng nhập / Đăng ký
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
