import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast({
      type: 'success',
      title: 'Đăng ký thành công!',
      message: `Bản tin Crypto Planet đã được gửi tới ${email}`
    });
    setEmail('');
  };

  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border-main)',
      padding: '60px 0 30px',
      marginTop: 60,
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container">
        {/* TOP BRAND & DOWNLOAD ROW */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
          paddingBottom: 40,
          borderBottom: '1px solid var(--border-main)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="3" rx="1.5" fill="#ffffff" />
                <rect x="3" y="10.5" width="18" height="3" rx="1.5" fill="#ffffff" />
                <rect x="3" y="16" width="18" height="3" rx="1.5" fill="#ffffff" />
              </svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)' }}>Crypto Planet</span>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Windows', 'MacOS', 'App Store', 'Google Play'].map(platform => (
              <div
                key={platform}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  backgroundColor: 'var(--bg-tag)',
                  border: '1px solid var(--border-main)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <span>Download for {platform}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 COLUMNS NAVIGATION */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 36,
          padding: '40px 0',
          borderBottom: '1px solid var(--border-main)'
        }}>
          {/* Col 1 */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 18 }}>Exchange</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
              <li><a href="#exchange" style={{ transition: 'color 0.2s' }}>Exchange Home</a></li>
              <li><a href="#margin">Margin Trading</a></li>
              <li><a href="#derivatives">Derivatives Trading</a></li>
              <li><a href="#supercharger">Supercharger</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 18 }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
              <li><a href="#request">Request Form</a></li>
              <li><a href="#contact">Contact Support</a></li>
              <li><a href="#faq">FAQ & Guides</a></li>
              <li><a href="#security">Security Center</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 18 }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#news">News & Media</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 18 }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
              <li><a href="#downloads">Downloads</a></li>
              <li><a href="#desktop">Desktop Application</a></li>
              <li><a href="#buy">Buy Crypto</a></li>
              <li><a href="#referral">Referral Program</a></li>
            </ul>
          </div>

          {/* Col 5 - Newsletter */}
          <div style={{ gridColumn: 'span 1' }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 12 }}>Newsletter</h4>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, minWidth: 0, padding: '8px 12px', fontSize: 13 }}
                required
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: 13 }}>
                Send
              </button>
            </form>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
              We accept following payment systems:
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {['PayPal', 'MasterCard', 'Bitcoin', 'Visa'].map(brand => (
                <div
                  key={brand}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    backgroundColor: 'var(--bg-tag)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-main)'
                  }}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          paddingTop: 24,
          fontSize: 13,
          color: 'var(--text-muted)'
        }}>
          <div>© 2026 Crypto Planet. All rights reserved. &nbsp;·&nbsp; Privacy &nbsp;·&nbsp; Terms &nbsp;·&nbsp; Sitemap</div>
          <div style={{ display: 'flex', gap: 16, color: 'var(--text-secondary)' }}>
            <span>Facebook</span>
            <span>Instagram</span>
            <span>YouTube</span>
            <span>Twitter</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
