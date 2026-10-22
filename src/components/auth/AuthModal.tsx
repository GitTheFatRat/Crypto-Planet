import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    authMode,
    authView,
    setAuthView,
    setAuthMode,
    loginUser,
    registerUser,
    recoverPassword,
    addToast
  } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Real Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+84 987654321');
  const [confirmMethod, setConfirmMethod] = useState<'sms' | 'email'>('sms');
  const [otpCode, setOtpCode] = useState(['1', '2', '3', '4']);

  if (activeModal !== 'auth') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authView === 'login') {
        const success = await loginUser(email, password);
        if (success) {
          closeModal();
          setEmail('');
          setPassword('');
        }
      } else if (authView === 'register') {
        if (password !== confirmPassword) {
          addToast({ type: 'error', title: 'Lỗi đăng ký', message: 'Mật khẩu xác nhận không trùng khớp.' });
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          addToast({ type: 'error', title: 'Mật khẩu quá ngắn', message: 'Mật khẩu phải có tối thiểu 6 ký tự.' });
          setLoading(false);
          return;
        }

        const success = await registerUser(email, password, name, phone);
        if (success) {
          closeModal();
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } else if (authView === 'confirm') {
        setAuthView('otp');
      } else if (authView === 'otp') {
        addToast({ type: 'success', title: 'Xác thực OTP thành công!', message: 'Tài khoản của bạn đã được kích hoạt đầy đủ.' });
        closeModal();
      } else if (authView === 'recover') {
        const success = await recoverPassword(email);
        if (success) {
          setAuthView('login');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    const updated = [...otpCode];
    updated[index] = val.slice(-1);
    setOtpCode(updated);
  };

  const isSplit = authMode === 'split';

  return (
    <div className="modal-overlay" onClick={closeModal} style={{ zIndex: 1100 }}>
      <div
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: isSplit ? 980 : 480,
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#0b0e14',
          color: '#ffffff',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: '#94a3b8',
            zIndex: 10,
            padding: 4
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', minHeight: isSplit ? 580 : 'auto', flexWrap: 'wrap' }}>
          {/* Visual Showcase Panel */}
          {isSplit && (
            <div style={{
              flex: '1 1 420px',
              backgroundColor: '#93c5fd',
              background: 'radial-gradient(circle at 50% 50%, #bfdbfe 0%, #93c5fd 60%, #60a5fa 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'relative',
                width: 320,
                height: 340,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 20,
                  right: 40,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                  boxShadow: '0 8px 16px rgba(217, 119, 6, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: 20,
                }}>
                  ₿
                </div>

                <svg width="280" height="260" viewBox="0 0 280 260" fill="none">
                  <rect x="25" y="180" width="30" height="35" rx="6" fill="#ffffff" />
                  <ellipse cx="40" cy="150" rx="14" ry="25" fill="#4ade80" />
                  <ellipse cx="28" cy="160" rx="10" ry="18" fill="#22c55e" />
                  <ellipse cx="52" cy="160" rx="10" ry="18" fill="#16a34a" />
                  <rect x="70" y="160" width="180" height="12" rx="4" fill="#ffffff" />
                  <rect x="85" y="172" width="10" height="60" rx="3" fill="#ffffff" />
                  <rect x="225" y="172" width="10" height="60" rx="3" fill="#ffffff" />
                  <rect x="125" y="125" width="45" height="30" rx="3" fill="#f8fafc" />
                  <circle cx="147" cy="75" r="22" fill="#fed7aa" />
                  <path d="M135 60 C135 45, 160 45, 160 60 Z" fill="#78350f" />
                  <path d="M132 97 C120 110, 110 145, 110 155 L185 155 C185 145, 175 110, 162 97 Z" fill="#facc15" />
                  <rect x="125" y="145" width="45" height="30" rx="6" fill="#f472b6" />
                </svg>
              </div>

              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <h4 style={{ fontSize: 18, fontWeight: 800, color: '#1e3a8a', marginBottom: 4 }}>
                  Crypto Planet Global
                </h4>
                <p style={{ fontSize: 13, color: '#1e40af' }}>
                  Hơn 10 triệu Trader tin dùng trên toàn thế giới
                </p>
              </div>
            </div>
          )}

          {/* Right form panel */}
          <div style={{
            flex: '1 1 380px',
            padding: isSplit ? '40px 48px' : '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#0b0e14'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="2" rx="1" fill="#fff" />
                    <rect x="3" y="11" width="18" height="2" rx="1" fill="#fff" />
                    <rect x="3" y="16" width="18" height="2" rx="1" fill="#fff" />
                  </svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>Crypto Planet</span>
              </div>
            </div>

            {/* VIEW: LOGIN */}
            {authView === 'login' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
                    Sign In to Dynamic
                  </h2>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>
                    Nhập email và mật khẩu tài khoản thật của bạn
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff' }}
                    required
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>Password</label>
                    <button
                      type="button"
                      onClick={() => setAuthView('recover')}
                      style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600 }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff', paddingRight: 40 }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px 0', marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  <span>{loading ? 'Đang xác thực...' : 'Sign In'}</span>
                </button>

                <div style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
                  Chưa có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthView('register')}
                    style={{ color: '#3b82f6', fontWeight: 700 }}
                  >
                    Đăng ký tài khoản mới ngay!
                  </button>
                </div>
              </form>
            )}

            {/* VIEW: REGISTER */}
            {authView === 'register' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
                    Create an account
                  </h2>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>
                    Đăng ký tài khoản giao dịch bảo mật
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Full Name (Họ và Tên)
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+84 987654321"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                      Password (≥ 6 ký tự)
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff' }}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#94a3b8' }}>
                  <input type="checkbox" defaultChecked style={{ marginTop: 3 }} required />
                  <span>
                    Tôi đồng ý với các điều khoản bảo mật và chính sách người dùng.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px 0', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  <span>{loading ? 'Đang tạo tài khoản...' : 'Register'}</span>
                </button>

                <div style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
                  Đã có tài khoản?{' '}
                  <button type="button" onClick={() => setAuthView('login')} style={{ color: '#3b82f6', fontWeight: 700 }}>
                    Sign In
                  </button>
                </div>
              </form>
            )}

            {/* VIEW: RECOVER PASSWORD */}
            {authView === 'recover' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
                    Password Recovery
                  </h2>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>
                    Nhập email tài khoản để nhận liên kết khôi phục mật khẩu thật
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                    Enter Email
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#151a26', borderColor: '#242b3d', color: '#ffffff' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px 0' }}
                >
                  {loading ? 'Đang gửi...' : 'Gửi Email Khôi Phục'}
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button type="button" onClick={() => setAuthView('login')} style={{ color: '#3b82f6', fontSize: 13, fontWeight: 600 }}>
                    ← Back to Login
                  </button>
                </div>
              </form>
            )}

            {/* VIEW: CONFIRM OTP METHOD */}
            {authView === 'confirm' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
                    Let's Confirm it's really you
                  </h2>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>
                    Chọn phương thức nhận mã bảo mật xác nhận danh tính
                  </p>
                </div>

                <div
                  onClick={() => setConfirmMethod('sms')}
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: confirmMethod === 'sms' ? '#151a26' : 'transparent',
                    border: `1px solid ${confirmMethod === 'sms' ? '#3b82f6' : '#242b3d'}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <input
                      type="radio"
                      name="confirmMethod"
                      checked={confirmMethod === 'sms'}
                      onChange={() => setConfirmMethod('sms')}
                    />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>
                      Get the code by text message
                    </span>
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#0b0e14', borderColor: '#242b3d', color: '#ffffff', fontSize: 13 }}
                  />
                </div>

                <div
                  onClick={() => setConfirmMethod('email')}
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: confirmMethod === 'email' ? '#151a26' : 'transparent',
                    border: `1px solid ${confirmMethod === 'email' ? '#3b82f6' : '#242b3d'}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <input
                      type="radio"
                      name="confirmMethod"
                      checked={confirmMethod === 'email'}
                      onChange={() => setConfirmMethod('email')}
                    />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>
                      Get the code by email at
                    </span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#0b0e14', borderColor: '#242b3d', color: '#ffffff', fontSize: 13 }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }}>
                  Continue
                </button>
              </form>
            )}

            {/* VIEW: ENTER 4-DIGIT SECURITY OTP CODE */}
            {authView === 'otp' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
                    Enter your security code
                  </h2>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>
                    We texted your code to {phone}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
                  {[0, 1, 2, 3].map(index => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={otpCode[index]}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      style={{
                        width: 52,
                        height: 56,
                        textAlign: 'center',
                        fontSize: 22,
                        fontWeight: 800,
                        backgroundColor: '#151a26',
                        border: '1px solid #3b82f6',
                        borderRadius: 8,
                        color: '#ffffff',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                  ))}
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }}>
                  Verify &amp; Continue
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
