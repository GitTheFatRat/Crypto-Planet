import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  Plus,
  CreditCard,
  Calendar,
  Lock,
  Search,
  CheckCircle2,
  XCircle,
  QrCode
} from 'lucide-react';

export const WalletPage: React.FC = () => {
  const {
    fiatBalance,
    walletTransactions,
    coinWallets,
    depositFiat,
    openModal,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wallet' | 'coin'>('wallet');
  const [hideBalance, setHideBalance] = useState(false);

  // Payment form state
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [depositAmount, setDepositAmount] = useState('1000');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('1234 5678 9876 4563');
  const [cardExpiry, setCardExpiry] = useState('02/02/2028');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardName, setCardName] = useState('Allie Grater');

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) {
      addToast({ type: 'error', title: 'Số tiền nạp không hợp lệ' });
      return;
    }
    depositFiat(amount, paymentMethod === 'card' ? 'Credit & Debit Card' : 'PayPal');
  };

  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(320px, 380px)',
        gap: 24,
        alignItems: 'start'
      }} className="wallet-layout">
        {/* LEFT COLUMN: WALLET BALANCE & TRANSACTION HISTORY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          {/* Wallet Balance Card */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                  Wallet Overview
                </h2>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Update 15/02/2026 at 02:30 PM
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => addToast({ type: 'info', title: 'Chế độ quản lý ví đã mở' })}
                  className="btn-secondary"
                  style={{ fontSize: 12, padding: '6px 14px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal('deposit_crypto', { symbol: 'BTC' })}
                  className="btn-primary"
                  style={{ fontSize: 12, padding: '6px 14px' }}
                >
                  <Plus size={14} />
                  <span>Deposit Crypto</span>
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16
            }}>
              {/* Wallet Balance */}
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Wallet Balance</span>
                  <button
                    onClick={() => setHideBalance(!hideBalance)}
                    style={{ fontSize: 11, color: 'var(--color-brand)', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    {hideBalance ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{hideBalance ? 'Show' : 'Hide'}</span>
                  </button>
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                  {hideBalance ? '••••••••' : `$${fiatBalance.toLocaleString()}`}
                </div>
              </div>

              {/* Total Deposited */}
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                  <ArrowDownLeft size={16} color="var(--color-green)" />
                  <span>Total Deposited</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-green)' }}>
                  {hideBalance ? '••••••••' : `+$${fiatBalance.toLocaleString()}`}
                </div>
              </div>

              {/* Total Withdrawals */}
              <div style={{ padding: 20, backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                  <ArrowUpRight size={16} color="var(--color-red)" />
                  <span>Total Withdrawals</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-red)' }}>
                  {hideBalance ? '••••••••' : `-$2,000.12`}
                </div>
              </div>
            </div>
          </div>

          {/* 2. TRANSACTION HISTORY & COIN WALLET TABS */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              borderBottom: '1px solid var(--border-main)',
              paddingBottom: 12
            }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <button
                  onClick={() => setActiveTab('wallet')}
                  style={{
                    fontSize: 15,
                    fontWeight: activeTab === 'wallet' ? 800 : 500,
                    color: activeTab === 'wallet' ? 'var(--color-brand)' : 'var(--text-muted)',
                    borderBottom: activeTab === 'wallet' ? '2px solid var(--color-brand)' : 'none',
                    paddingBottom: 12,
                    marginBottom: -13
                  }}
                >
                  Wallet History
                </button>
                <button
                  onClick={() => setActiveTab('coin')}
                  style={{
                    fontSize: 15,
                    fontWeight: activeTab === 'coin' ? 800 : 500,
                    color: activeTab === 'coin' ? 'var(--color-brand)' : 'var(--text-muted)',
                    borderBottom: activeTab === 'coin' ? '2px solid var(--color-brand)' : 'none',
                    paddingBottom: 12,
                    marginBottom: -13
                  }}
                >
                  Coin Wallet ({coinWallets.length})
                </button>
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Filter by Month
              </div>
            </div>

            {/* TAB: WALLET HISTORY */}
            {activeTab === 'wallet' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }}>
                      <th style={{ padding: '12px 8px' }}>Action</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Amount</th>
                      <th style={{ padding: '12px 10px', textAlign: 'left' }}>Date / Time</th>
                      <th style={{ padding: '12px 10px', textAlign: 'left' }}>Method</th>
                      <th style={{ padding: '12px 8px', textAlign: 'center' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletTransactions.map(tx => {
                      const isSuccess = tx.status === 'Successful';
                      return (
                        <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-main)' }}>
                          <td style={{ padding: '14px 8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
                              {tx.action === 'Deposited' ? (
                                <ArrowDownLeft size={16} color="var(--color-green)" />
                              ) : (
                                <ArrowUpRight size={16} color="var(--color-red)" />
                              )}
                              <span>{tx.action}</span>
                            </div>
                          </td>

                          <td style={{ padding: '14px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                            ${tx.amount.toLocaleString()} {tx.currency}
                          </td>

                          <td style={{ padding: '14px 10px', color: 'var(--text-muted)', fontSize: 13 }}>
                            {tx.date}
                          </td>

                          <td style={{ padding: '14px 10px', color: 'var(--text-secondary)', fontSize: 13 }}>
                            {tx.method}
                          </td>

                          <td style={{ padding: '14px 8px', textAlign: 'center' }}>
                            <span style={{
                              padding: '3px 10px',
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 700,
                              backgroundColor: isSuccess ? 'var(--color-green-light)' : 'var(--color-red-light)',
                              color: isSuccess ? 'var(--color-green)' : 'var(--color-red)'
                            }}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB: COIN WALLET */}
            {activeTab === 'coin' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 640 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-main)', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700 }}>
                      <th style={{ padding: '12px 8px' }}>Pair</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Avail. Balance</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Locked</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Amount</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coinWallets.map(c => (
                      <tr key={c.symbol} style={{ borderBottom: '1px solid var(--border-main)' }}>
                        <td style={{ padding: '14px 8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={c.icon} alt={c.name} style={{ width: 26, height: 26, borderRadius: 'var(--radius-full)' }} />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.symbol}</span>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          {c.availBalance.toFixed(4)} {c.symbol}
                        </td>

                        <td style={{ padding: '14px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {c.locked}
                        </td>

                        <td style={{ padding: '14px 10px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                          ${c.amount.toLocaleString()}
                        </td>

                        <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button
                              onClick={() => openModal('deposit_crypto', { symbol: c.symbol })}
                              className="btn-primary"
                              style={{ padding: '4px 10px', fontSize: 11 }}
                            >
                              Deposit
                            </button>
                            <button
                              onClick={() => openModal('withdraw_crypto', { symbol: c.symbol })}
                              className="btn-secondary"
                              style={{ padding: '4px 10px', fontSize: 11 }}
                            >
                              Withdraw
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Currency & Payment Form */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 20 }}>
            Select Currency and Payment
          </h3>

          <form onSubmit={handleDepositSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* SELECT CURRENCY */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Select Currency
              </label>
              <select
                value={selectedCurrency}
                onChange={e => setSelectedCurrency(e.target.value)}
                style={{ width: '100%', fontWeight: 700 }}
              >
                <option value="USD">$ USD - US Dollar</option>
                <option value="EUR">€ EUR - Euro</option>
                <option value="GBP">£ GBP - Pound Sterling</option>
              </select>
            </div>

            {/* AMOUNT */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Amount
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.target.value)}
                  style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700 }}
                  required
                />
              </div>
            </div>

            {/* CHOOSE PAYMENT METHOD RADIO */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Choose Payment method:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* PAYPAL */}
                <div
                  onClick={() => setPaymentMethod('paypal')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${paymentMethod === 'paypal' ? 'var(--color-brand)' : 'var(--border-main)'}`,
                    backgroundColor: paymentMethod === 'paypal' ? 'var(--bg-tag)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>PayPal</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#0070ba' }}>PayPal</span>
                </div>

                {/* CREDIT & DEBIT CARD */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${paymentMethod === 'card' ? 'var(--color-brand)' : 'var(--border-main)'}`,
                    backgroundColor: paymentMethod === 'card' ? 'var(--bg-tag)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Credit &amp; Debit Card</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-secondary)' }}>VISA / MC</span>
                </div>
              </div>
            </div>

            {/* CARD INPUTS (When card chosen) */}
            {paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                    Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                      Valid
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
                    Name on card
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px 0', fontSize: 14, marginTop: 8 }}
            >
              Add money (${depositAmount || 0})
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .wallet-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
