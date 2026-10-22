import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CURRENCIES } from '../../data/mockCrypto';
import {
  User,
  Shield,
  Bell,
  DollarSign,
  FileCheck,
  CreditCard,
  Key,
  Plus,
  Trash2,
  Check,
  Upload,
  Copy,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const {
    user,
    updateUser,
    paymentMethods,
    removePaymentMethod,
    apiKeys,
    addApiKey,
    deleteApiKey,
    openModal,
    addToast
  } = useApp();

  const [activeMenu, setActiveMenu] = useState<'security' | 'notification' | 'currency' | 'kyc' | 'payment' | 'api'>('security');

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // KYC state
  const [docType, setDocType] = useState('National ID');
  const [idNumber, setIdNumber] = useState('CB 1030494');
  const [fullName, setFullName] = useState(user.name);
  const [kycSubmitted, setKycSubmitted] = useState(false);

  // New API Key state
  const [newKeyName, setNewKeyName] = useState('');
  const [showAddKeyModal, setShowAddKeyModal] = useState(false);

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addToast({ type: 'error', title: 'Mật khẩu mới không khớp' });
      return;
    }
    addToast({ type: 'success', title: 'Đã đổi mật khẩu tài khoản thành công!' });
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKycSubmitted(true);
    updateUser({ kycStatus: 'pending' });
    addToast({
      type: 'success',
      title: 'Hồ sơ KYC đã được gửi!',
      message: 'Hệ thống đang đối soát tài liệu, kết quả sẽ gửi qua email trong vòng 24 giờ.'
    });
  };

  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const key = `cp_live_${Math.random().toString(36).substring(2, 18)}${Math.random().toString(36).substring(2, 10)}`;
    addApiKey({
      id: `api_${Date.now()}`,
      name: newKeyName,
      key,
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      permissions: ['Read Only', 'Trade Execution'],
    });
    setNewKeyName('');
    setShowAddKeyModal(false);
  };

  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 300px) 1fr',
        gap: 28,
        alignItems: 'start'
      }}>
        {/* LEFT PROFILE SIDEBAR */}
        <div className="card" style={{ padding: 24, textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 88,
                height: 88,
                borderRadius: 'var(--radius-full)',
                objectFit: 'cover',
                border: '3px solid var(--color-brand)'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: 'var(--color-green)',
              border: '2px solid var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Check size={13} />
            </div>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 2 }}>
            {user.name}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
            @{user.username}
          </p>

          {/* MENU ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
            {[
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'notification', label: 'Notification Preferences', icon: Bell },
              { id: 'currency', label: 'Currency Preferences', icon: DollarSign },
              { id: 'kyc', label: 'KYC Verification', icon: FileCheck },
              { id: 'payment', label: 'Payment Option', icon: CreditCard },
              { id: 'api', label: 'API Management', icon: Key },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? 'var(--bg-tag)' : 'transparent',
                    color: isActive ? 'var(--color-brand)' : 'var(--text-secondary)',
                    transition: 'all 0.15s'
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT CONTENT PANEL */}
        <div className="card" style={{ padding: 32 }}>
          {/* 16_Profile_Security */}
          {activeMenu === 'security' && (
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginBottom: 24 }}>
                Security Settings
              </h3>

              {/* 2FA OPTIONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
                {[
                  {
                    title: 'Email Authentication',
                    desc: 'Dùng mã OTP gửi qua email xác thực khi đăng nhập và rút tiền',
                    enabled: user.twoFactorEnabled.email,
                    key: 'email',
                  },
                  {
                    title: 'SMS Authentication',
                    desc: 'Dùng mã OTP gửi qua tin nhắn điện thoại để bảo mật tài khoản',
                    enabled: user.twoFactorEnabled.sms,
                    key: 'sms',
                  },
                  {
                    title: 'Google Authentication',
                    desc: 'Xác thực qua ứng dụng Google Authenticator trên thiết bị di động',
                    enabled: user.twoFactorEnabled.google,
                    key: 'google',
                  },
                ].map(item => (
                  <div
                    key={item.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-main)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)', marginBottom: 4 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {item.desc}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        updateUser({
                          twoFactorEnabled: {
                            ...user.twoFactorEnabled,
                            [item.key]: !item.enabled
                          }
                        });
                      }}
                      style={{
                        padding: '6px 16px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: 12,
                        fontWeight: 700,
                        backgroundColor: item.enabled ? 'var(--color-brand)' : 'var(--bg-tag)',
                        color: item.enabled ? '#ffffff' : 'var(--text-secondary)',
                        border: '1px solid var(--border-main)'
                      }}
                    >
                      {item.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                ))}
              </div>

              {/* CHANGE PASSWORD */}
              <form onSubmit={handlePasswordSave} style={{ borderTop: '1px solid var(--border-main)', paddingTop: 28 }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                  Password
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                  Set a unique password to protect your personal account.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      Old Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      style={{ width: '100%' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        style={{ width: '100%' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                        Re-enter password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        style={{ width: '100%' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Save Password
                </button>
              </form>
            </div>
          )}

          {/* 17_Profile_Notification Preferences */}
          {activeMenu === 'notification' && (
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginBottom: 24 }}>
                Notification Preferences
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { key: 'priceAlerts', title: 'Price Alerts', desc: 'Thông báo khi giá coin chạm ngưỡng thiết lập' },
                  { key: 'referralAlerts', title: 'Referral Commission Alerts', desc: 'Nhận thông báo khi bạn bè giao dịch phát sinh hoa hồng' },
                  { key: 'deviceLoginAlerts', title: 'Device Login Alerts', desc: 'Cảnh báo đăng nhập từ thiết bị lạ hoặc IP mới' },
                  { key: 'emailNotification', title: 'Email Notification', desc: 'Nhận bản tóm tắt giao dịch hàng tuần qua email' },
                  { key: 'systemAlerts', title: 'System Security Alerts', desc: 'Thông báo khẩn về bảo trì hoặc an toàn ví' },
                ].map(item => {
                  const isChecked = (user.notificationPreferences as any)[item.key];
                  return (
                    <div
                      key={item.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-main)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)' }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                      </div>

                      <button
                        onClick={() => {
                          updateUser({
                            notificationPreferences: {
                              ...user.notificationPreferences,
                              [item.key]: !isChecked
                            }
                          });
                        }}
                        style={{
                          width: 44,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: isChecked ? 'var(--color-brand)' : 'var(--border-main)',
                          position: 'relative',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <div style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          position: 'absolute',
                          top: 3,
                          left: isChecked ? 23 : 3,
                          transition: 'left 0.2s'
                        }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 18_Profile_Currency Preferences */}
          {activeMenu === 'currency' && (
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
                Currency Preferences
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
                Chọn đơn vị tiền tệ cơ sở hiển thị toàn bộ giá trị tài sản
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 16
              }}>
                {MOCK_CURRENCIES.map(curr => {
                  const isSelected = user.currencyPreference === curr.code;
                  return (
                    <div
                      key={curr.code}
                      onClick={() => updateUser({ currencyPreference: curr.code })}
                      style={{
                        padding: 16,
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? 'var(--bg-tag)' : 'var(--bg-input)',
                        border: `2px solid ${isSelected ? 'var(--color-brand)' : 'var(--border-main)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)' }}>
                          {curr.code} - {curr.symbol}
                        </span>
                        {isSelected && (
                          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-brand)' }} />
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {curr.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 19_Profile_KYC Verification */}
          {activeMenu === 'kyc' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                    KYC Verification
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Xác minh danh tính để nâng hạn mức rút tiền không giới hạn
                  </p>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 12,
                  fontWeight: 700,
                  backgroundColor: user.kycStatus === 'verified' ? 'var(--color-green-light)' : 'rgba(59, 130, 246, 0.15)',
                  color: user.kycStatus === 'verified' ? 'var(--color-green)' : 'var(--color-brand)'
                }}>
                  {user.kycStatus.toUpperCase()}
                </span>
              </div>

              <form onSubmit={handleKycSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      Choose Document Type
                    </label>
                    <select value={docType} onChange={e => setDocType(e.target.value)} style={{ width: '100%' }}>
                      <option value="National ID">National ID Card (CCCD/CMND)</option>
                      <option value="Passport">Passport (Hộ chiếu)</option>
                      <option value="Driver License">Driver's License (GPLX)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      ID Card Number
                    </label>
                    <input
                      type="text"
                      value={idNumber}
                      onChange={e => setIdNumber(e.target.value)}
                      style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      Full Name on Card
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      style={{ width: '100%' }}
                      required
                    />
                  </div>
                </div>

                {/* UPLOAD ZONES */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--text-main)', marginBottom: 12 }}>
                    Upload ID Card & Selfie
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 16
                  }}>
                    {['Identify Document Front Side', 'Identify Document Back Side', 'A Selfie with your Identity'].map((label, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: '2px dashed var(--border-main)',
                          borderRadius: 'var(--radius-md)',
                          padding: '28px 16px',
                          textAlign: 'center',
                          backgroundColor: 'var(--bg-input)',
                          cursor: 'pointer'
                        }}
                      >
                        <Upload size={24} color="var(--color-brand)" style={{ marginBottom: 8 }} />
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
                          {label}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          Drop your file upload or <span style={{ color: 'var(--color-brand)' }}>Browse</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Tài khoản được đăng ký ngày: 15/01/2026
                  </span>
                  <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
                    Submit Verification
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 20_Profile_Payment Option */}
          {activeMenu === 'payment' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)' }}>
                  Payment Options
                </h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openModal('add_bank')} className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
                    <Plus size={14} /> Add Bank
                  </button>
                  <button onClick={() => openModal('add_card')} className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
                    <Plus size={14} /> Add Card
                  </button>
                  <button onClick={() => openModal('add_upi')} className="btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
                    <Plus size={14} /> Add UPI
                  </button>
                </div>
              </div>

              {/* LIST OF PAYMENT CARDS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* BANK ACCOUNTS */}
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12 }}>
                    Bank Accounts
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                    {paymentMethods.filter(p => p.type === 'bank').map(bank => (
                      <div
                        key={bank.id}
                        style={{
                          padding: 20,
                          backgroundColor: 'var(--bg-input)',
                          border: '1px solid var(--border-main)',
                          borderRadius: 'var(--radius-md)',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-main)' }}>{bank.bankName}</span>
                          <button onClick={() => removePaymentMethod(bank.id)} style={{ color: 'var(--text-muted)' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div>Chủ tài khoản: <strong style={{ color: 'var(--text-main)' }}>{bank.accountHolder}</strong></div>
                          <div>Số TK: <span style={{ fontFamily: 'var(--font-mono)' }}>{bank.accountNumber}</span></div>
                          <div>Mã IFSC: <span style={{ fontFamily: 'var(--font-mono)' }}>{bank.ifscCode}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CREDIT CARDS */}
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12 }}>
                    Credit & Debit Cards
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                    {paymentMethods.filter(p => p.type === 'card').map(card => (
                      <div
                        key={card.id}
                        style={{
                          padding: 20,
                          backgroundColor: 'var(--bg-input)',
                          border: '1px solid var(--border-main)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-main)' }}>Visa / MasterCard</span>
                          <button onClick={() => removePaymentMethod(card.id)} style={{ color: 'var(--text-muted)' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 8 }}>
                          {card.cardNumber}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{card.cardName}</span>
                          <span>Hết hạn: {card.cardExpiry}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UPI PAYMENTS */}
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12 }}>
                    UPI Accounts
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                    {paymentMethods.filter(p => p.type === 'upi').map(upi => (
                      <div
                        key={upi.id}
                        style={{
                          padding: 20,
                          backgroundColor: 'var(--bg-input)',
                          border: '1px solid var(--border-main)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-main)' }}>{upi.upiApp}</span>
                          <button onClick={() => removePaymentMethod(upi.id)} style={{ color: 'var(--text-muted)' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{upi.upiId}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 24_Profile_Api Management */}
          {activeMenu === 'api' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                    API Management
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Quản lý khóa API cho bot tự động và dịch vụ bên thứ ba
                  </p>
                </div>
                <button
                  onClick={() => setShowAddKeyModal(true)}
                  className="btn-primary"
                  style={{ fontSize: 13 }}
                >
                  Create Private API Key
                </button>
              </div>

              {showAddKeyModal && (
                <form
                  onSubmit={handleCreateApiKey}
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-main)',
                    borderRadius: 'var(--radius-md)',
                    padding: 20,
                    marginBottom: 24
                  }}
                >
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Tạo API Key Mới</h4>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <input
                      type="text"
                      placeholder="Nhập tên mô tả (ví dụ: Arbitrage Bot #1)"
                      value={newKeyName}
                      onChange={e => setNewKeyName(e.target.value)}
                      style={{ flex: 1 }}
                      required
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0 20px' }}>
                      Generate Key
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddKeyModal(false)}
                      className="btn-secondary"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {apiKeys.map(key => (
                  <div
                    key={key.id}
                    style={{
                      padding: 20,
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-main)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 12
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-main)' }}>{key.name}</span>
                        <span style={{ fontSize: 11, backgroundColor: 'var(--bg-tag)', padding: '2px 8px', borderRadius: 4, color: 'var(--text-secondary)' }}>
                          Tạo ngày {key.createdDate}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)' }}>
                        <span>{key.key}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(key.key);
                            addToast({ type: 'success', title: 'Đã sao chép API Key' });
                          }}
                          style={{ color: 'var(--color-brand)' }}
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteApiKey(key.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--color-red-light)',
                        color: 'var(--color-red)',
                        fontSize: 12,
                        fontWeight: 600
                      }}
                    >
                      Revoke Key
                    </button>
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
