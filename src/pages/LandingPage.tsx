import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkline } from '../components/common/Sparkline';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Percent,
  Gift,
  Lock,
  UserCheck,
  Headphones,
  CheckCircle,
  Smartphone,
  Download
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { coins, setActiveTab, setSelectedCoin } = useApp();

  const topCoins = coins.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48,
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              backgroundColor: 'var(--color-brand-glow)',
              color: 'var(--color-brand)',
              borderRadius: 'var(--radius-full)',
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 16
            }}>
              <Zap size={14} /> Sàn Giao Dịch Đáng Tin Cậy Nhất 2026
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text-main)',
              marginBottom: 20
            }}>
              Buy &amp; Sell <br />
              <span style={{ color: 'var(--color-brand)' }}>Crypto Instant</span>
            </h1>

            <p style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 480
            }}>
              Giao dịch Bitcoin, Ethereum và hơn 100+ loại tiền mã hóa khác với thanh khoản sâu, phí cực thấp và độ trễ dưới 1 mili-giây.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('trading')}
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: 16 }}
              >
                <span>Start Trading</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setActiveTab('market')}
                className="btn-secondary"
                style={{ padding: '14px 24px', fontSize: 16 }}
              >
                Explore Market
              </button>
            </div>
          </div>

          {/* LAPTOP / TRADING GRAPHIC DISPLAY */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 520,
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-modal)',
              border: '1px solid var(--border-main)',
              backgroundColor: 'var(--bg-card)',
              padding: 16
            }}>
              {/* Header Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>Crypto Planet Pro Terminal v2.4</span>
              </div>

              {/* Graphic elements */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                <div style={{ padding: 14, backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>BTC/USD Live</div>
                  <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-green)' }}>$43,975.72</div>
                  <div style={{ margin: '14px 0' }}>
                    <Sparkline data={coins[0]?.sparkline || [40, 42, 45, 43, 47]} width={260} height={90} isPositive={true} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {coins.slice(1, 4).map(c => (
                    <div key={c.id} style={{ padding: 10, backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700 }}>{c.symbol}</div>
                      <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>${c.price}</div>
                      <div style={{ fontSize: 10, color: c.change24h >= 0 ? 'var(--color-green)' : 'var(--color-red)' }}>
                        {c.change24h >= 0 ? `+${c.change24h}%` : `${c.change24h}%`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP MARKET COINS TICKER */}
      <section>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: 1 }}>Top Market</span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-main)', marginTop: 4 }}>Get Various Crypto Coin</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20
          }}>
            {topCoins.map(coin => {
              const isPos = coin.change24h >= 0;
              return (
                <div
                  key={coin.id}
                  onClick={() => { setSelectedCoin(coin); setActiveTab('trading'); }}
                  className="card"
                  style={{
                    padding: 20,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={coin.icon} alt={coin.name} style={{ width: 32, height: 32, borderRadius: 'var(--radius-full)' }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{coin.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{coin.symbol}</div>
                      </div>
                    </div>
                    <span className={isPos ? 'badge-up' : 'badge-down'}>
                      {isPos ? `+${coin.change24h}%` : `${coin.change24h}%`}
                    </span>
                  </div>

                  <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', marginBottom: 14 }}>
                    ${coin.price.toLocaleString()}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Sparkline data={coin.sparkline} isPositive={isPos} width={220} height={44} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EASY WAY TO GET STARTED */}
      <section style={{ backgroundColor: 'var(--bg-card-secondary)', padding: '60px 0', borderRadius: 'var(--radius-xl)' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40,
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Bắt Đầu Nhanh
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-main)', margin: '8px 0 16px' }}>
              Easy Way to Get Started
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
              Chỉ với vài thao tác đơn giản, bạn đã có thể sở hữu và giao dịch danh mục tiền điện tử đầu tiên của mình với độ bảo mật tuyệt đối.
            </p>
            <button onClick={() => setActiveTab('wallet')} className="btn-primary">
              <span>Nạp tiền ngay</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { num: '01', title: 'Create an Account', desc: 'Đăng ký nhanh chóng chỉ bằng Email hoặc Số điện thoại' },
              { num: '02', title: 'Verify Bank Account', desc: 'Liên kết ngân hàng hoặc thẻ tín dụng an toàn qua KYC' },
              { num: '03', title: 'Add Funds to Wallet', desc: 'Nạp USD hoặc chuyển crypto trực tiếp vào ví sàn' },
              { num: '04', title: 'Start Trading Instantly', desc: 'Mua bán các đồng coin tiềm năng và thu lợi nhuận' },
            ].map(step => (
              <div key={step.num} className="card" style={{ padding: 20 }}>
                <div style={{
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-brand)',
                  marginBottom: 8
                }}>
                  {step.num}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR BEST SERVICE */}
      <section>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-brand)', textTransform: 'uppercase', letterSpacing: 1 }}>Benefits</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-main)', marginTop: 4 }}>Our Best Service</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 540, margin: '8px auto 0' }}>
              Nền tảng giao dịch toàn diện được tối ưu hóa cho cả nhà đầu tư mới lẫn trader chuyên nghiệp.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20
          }}>
            {[
              { icon: ShieldCheck, title: 'Safety Comes First', desc: 'Quỹ bảo chứng Proof of Reserves 1:1, lưu trữ lạnh 98% tài sản.' },
              { icon: Zap, title: 'Easy Deposit & Withdrawals', desc: 'Nạp rút tiền nhanh chóng 24/7 qua cổng ngân hàng và thẻ Visa/MasterCard.' },
              { icon: Percent, title: 'Low Charges', desc: 'Phí giao dịch cạnh tranh nhất thị trường chỉ từ 0.1%, 0 phí nạp coin.' },
              { icon: Gift, title: 'Bonus & Referral', desc: 'Nhận hoa hồng trọn đời lên tới 40% khi giới thiệu bạn bè tham gia.' },
              { icon: TrendingUp, title: 'Fast Transactions', desc: 'Engine khớp lệnh xử lý hơn 1,000,000 lệnh mỗi giây không giật lag.' },
              { icon: Lock, title: 'Deep Encryption', desc: 'Mã hóa đa tầng AES-256 bảo vệ dữ liệu và khóa riêng tư.' },
              { icon: UserCheck, title: 'Fast KYC', desc: 'Xác minh tài liệu tự động bằng trí tuệ nhân tạo chỉ trong 5 phút.' },
              { icon: Headphones, title: '24/7 Support', desc: 'Đội ngũ hỗ trợ trực tuyến giải đáp mọi thắc mắc của bạn bất cứ lúc nào.' },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-tag)',
                    color: 'var(--color-brand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>{srv.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Start Trading Call To Action */}
      <section>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 40px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div>
              <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
                Start trading now on Crypto Planet
              </h3>
              <p style={{ fontSize: 14, opacity: 0.9 }}>
                Tham gia cùng hàng triệu nhà đầu tư và nhận ngay gói quà tặng chào mừng trị giá 50 USDT.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('trading')}
              style={{
                backgroundColor: '#ffffff',
                color: '#1e40af',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 15,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              Mở Tài Khoản &amp; Giao Dịch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
