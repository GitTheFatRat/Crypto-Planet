import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, QrCode, ArrowDownRight, ArrowUpRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export const WalletModals: React.FC = () => {
  const {
    activeModal,
    closeModal,
    modalData,
    coins,
    coinWallets,
    depositCrypto,
    withdrawCrypto,
    addPaymentMethod,
    addToast
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [withdrawCoin, setWithdrawCoin] = useState(modalData?.symbol || 'BTC');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Add Bank form states
  const [bankName, setBankName] = useState('HDFC Bank');
  const [bankAccount, setBankAccount] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');

  // Add Card form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Add UPI form states
  const [upiApp, setUpiApp] = useState('Paytm');
  const [upiName, setUpiName] = useState('');
  const [upiId, setUpiId] = useState('');

  if (!activeModal) return null;

  const currentCoinSymbol = modalData?.symbol || 'BTC';
  const targetWallet = coinWallets.find(c => c.symbol === withdrawCoin) || coinWallets[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast({ type: 'success', title: 'Đã sao chép địa chỉ ví vào bộ nhớ tạm!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0 || !withdrawAddress) {
      addToast({ type: 'error', title: 'Thông tin chưa hợp lệ', message: 'Vui lòng nhập địa chỉ ví và số lượng rút.' });
      return;
    }
    const success = await withdrawCrypto(withdrawCoin, amount, withdrawAddress);
    if (success) {
      closeModal();
      setWithdrawAmount('');
      setWithdrawAddress('');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={e => e.stopPropagation()} style={{ padding: 28 }}>
        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'var(--text-muted)',
            padding: 4,
            borderRadius: 'var(--radius-xs)'
          }}
        >
          <X size={20} />
        </button>

        {/* Crypto Deposit Modal */}
        {activeModal === 'deposit_crypto' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
                {currentCoinSymbol} Deposit Address
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Scan QR code to Deposit {currentCoinSymbol}
              </p>
            </div>

            {/* REALISTIC QR CODE SVG */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              width: 190,
              height: 190,
              margin: '0 auto 20px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <svg width="150" height="150" viewBox="0 0 100 100" fill="#000000">
                <rect width="100" height="100" fill="#ffffff"/>
                {/* Corner Markers */}
                <rect x="10" y="10" width="24" height="24" fill="#000000"/>
                <rect x="14" y="14" width="16" height="16" fill="#ffffff"/>
                <rect x="18" y="18" width="8" height="8" fill="#000000"/>

                <rect x="66" y="10" width="24" height="24" fill="#000000"/>
                <rect x="70" y="14" width="16" height="16" fill="#ffffff"/>
                <rect x="74" y="18" width="8" height="8" fill="#000000"/>

                <rect x="10" y="66" width="24" height="24" fill="#000000"/>
                <rect x="14" y="70" width="16" height="16" fill="#ffffff"/>
                <rect x="18" y="74" width="8" height="8" fill="#000000"/>

                {/* Random QR Patterns */}
                <rect x="38" y="12" width="6" height="6" fill="#000000"/>
                <rect x="48" y="18" width="8" height="6" fill="#000000"/>
                <rect x="42" y="30" width="16" height="6" fill="#000000"/>
                <rect x="12" y="44" width="8" height="8" fill="#000000"/>
                <rect x="28" y="48" width="6" height="12" fill="#000000"/>
                <rect x="66" y="40" width="12" height="6" fill="#000000"/>
                <rect x="80" y="48" width="8" height="12" fill="#000000"/>
                <rect x="40" y="52" width="18" height="14" fill="#000000"/>
                <rect x="48" y="74" width="10" height="14" fill="#000000"/>
                <rect x="68" y="68" width="16" height="8" fill="#000000"/>
                <rect x="74" y="80" width="12" height="8" fill="#000000"/>
              </svg>
            </div>

            {/* DESTINATION ADDRESS BOX */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Destination Address ({currentCoinSymbol})
              </label>
              <div style={{
                display: 'flex',
                gap: 8,
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-main)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                alignItems: 'center'
              }}>
                <span style={{
                  flex: 1,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--text-main)',
                  wordBreak: 'break-all'
                }}>
                  bc1q9vhxmdgu394h1sikh3aw5k08832a8z
                </span>
                <button
                  onClick={() => handleCopy('bc1q9vhxmdgu394h1sikh3aw5k08832a8z')}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: 12, flexShrink: 0 }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* QUICK DEPOSIT BUTTON */}
            <div style={{ marginBottom: 16 }}>
              <button
                onClick={() => {
                  depositCrypto(currentCoinSymbol, 0.25);
                  closeModal();
                }}
                className="btn-secondary"
                style={{ width: '100%', fontSize: 13 }}
              >
                ⚡ Nạp nhanh +0.25 {currentCoinSymbol} vào ví
              </button>
            </div>

            {/* DISCLAIMER */}
            <div style={{
              backgroundColor: 'var(--bg-tag)',
              borderRadius: 'var(--radius-sm)',
              padding: 12,
              fontSize: 11,
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              border: '1px solid var(--border-main)'
            }}>
              <strong style={{ color: 'var(--color-red)' }}>Disclaimer:</strong> Please deposit only {currentCoinSymbol} to this address. If you deposit any other coins, it will be lost forever.
            </div>
          </div>
        )}

        {/* Crypto Withdraw Modal */}
        {activeModal === 'withdraw_crypto' && (
          <form onSubmit={handleWithdrawSubmit}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
                Withdraw Coin From Wallet to Another
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Chuyển coin an toàn qua mạng blockchain
              </p>
            </div>

            {/* COIN SELECTOR & AVAILABLE */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <select
                  value={withdrawCoin}
                  onChange={e => setWithdrawCoin(e.target.value)}
                  style={{ fontWeight: 700, fontSize: 14 }}
                >
                  {coinWallets.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.name} ({c.symbol})</option>
                  ))}
                </select>
              </div>
              <div style={{ textAlign: 'right', fontSize: 12 }}>
                <div style={{ color: 'var(--text-muted)' }}>Khả dụng:</div>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {targetWallet.availBalance.toFixed(4)} {withdrawCoin}
                </div>
              </div>
            </div>

            {/* DESTINATION ADDRESS */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Destination Address
              </label>
              <input
                type="text"
                placeholder="Paste receiver crypto wallet address"
                value={withdrawAddress}
                onChange={e => setWithdrawAddress(e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: 13 }}
                required
              />
            </div>

            {/* AMOUNT */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Amount
                </label>
                <button
                  type="button"
                  onClick={() => setWithdrawAmount((targetWallet.availBalance * 0.99).toFixed(4))}
                  style={{ fontSize: 12, color: 'var(--color-brand)', fontWeight: 600 }}
                >
                  Rút tối đa (MAX)
                </button>
              </div>
              <input
                type="number"
                step="any"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: 14 }}
                required
              />
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                Transaction Fee: 0.0005 {withdrawCoin}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px 0', fontSize: 14, marginBottom: 16 }}
            >
              Proceed Withdrawal
            </button>

            <div style={{
              backgroundColor: 'var(--bg-tag)',
              borderRadius: 'var(--radius-sm)',
              padding: 12,
              fontSize: 11,
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              border: '1px solid var(--border-main)'
            }}>
              <strong style={{ color: 'var(--text-main)' }}>Disclaimer:</strong> Please check the destination address carefully. Transactions cannot be reversed once processed on the blockchain.
            </div>
          </form>
        )}

        {/* Add Bank Account Modal */}
        {activeModal === 'add_bank' && (
          <form onSubmit={e => {
            e.preventDefault();
            addPaymentMethod({
              id: `bank_${Date.now()}`,
              type: 'bank',
              bankName,
              accountNumber: bankAccount,
              accountHolder: 'Allie Grater',
              ifscCode: bankIfsc,
            });
            closeModal();
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>
              Bank Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Bank Name
                </label>
                <select value={bankName} onChange={e => setBankName(e.target.value)} style={{ width: '100%' }}>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Vietcombank">Vietcombank</option>
                  <option value="Techcombank">Techcombank</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Account Number"
                  value={bankAccount}
                  onChange={e => setBankAccount(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  IFSC / Branch Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. HDFC000189"
                  value={bankIfsc}
                  onChange={e => setBankIfsc(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }}>
              Proceed
            </button>
          </form>
        )}

        {/* Add Credit/Debit Card Modal */}
        {activeModal === 'add_card' && (
          <form onSubmit={e => {
            e.preventDefault();
            addPaymentMethod({
              id: `card_${Date.now()}`,
              type: 'card',
              cardNumber: `**** **** **** ${cardNumber.slice(-4) || '9999'}`,
              cardExpiry,
              cardName,
            });
            closeModal();
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>
              Add New Card
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9876 4563"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Valid Thru
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="***"
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }}>
              Proceed
            </button>
          </form>
        )}

        {/* Add UPI Account Modal */}
        {activeModal === 'add_upi' && (
          <form onSubmit={e => {
            e.preventDefault();
            addPaymentMethod({
              id: `upi_${Date.now()}`,
              type: 'upi',
              upiApp,
              accountHolder: upiName,
              upiId,
            });
            closeModal();
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>
              Add UPI Account
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  UPI App
                </label>
                <select value={upiApp} onChange={e => setUpiApp(e.target.value)} style={{ width: '100%' }}>
                  <option value="Paytm">Paytm</option>
                  <option value="Google Pay">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={upiName}
                  onChange={e => setUpiName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. name@paytm"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }}>
              Proceed
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
