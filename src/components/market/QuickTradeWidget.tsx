import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftRight, Check } from 'lucide-react';

interface QuickTradeWidgetProps {
  mode?: 'trading' | 'exchange';
}

export const QuickTradeWidget: React.FC<QuickTradeWidgetProps> = ({ mode = 'trading' }) => {
  const { selectedCoin, fiatBalance, placeOrder, swapCoins, coins } = useApp();

  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'exchange'>(mode === 'exchange' ? 'exchange' : 'buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('market');
  const [quantity, setQuantity] = useState<string>('');
  const [exchangeFrom, setExchangeFrom] = useState<string>('BTC');
  const [exchangeTo, setExchangeTo] = useState<string>('USD');

  const currentPrice = selectedCoin.price;
  const numQuantity = parseFloat(quantity) || 0;
  const calculatedTotal = (numQuantity * currentPrice).toFixed(2);

  const handleAction = async () => {
    if (activeTab === 'exchange') {
      if (numQuantity <= 0) return;
      swapCoins(exchangeFrom, exchangeTo, numQuantity);
      setQuantity('');
      return;
    }

    if (numQuantity <= 0) return;
    const success = await placeOrder({
      pair: `${selectedCoin.symbol}/USD`,
      side: activeTab === 'buy' ? 'buy' : 'sell',
      type: orderType,
      price: currentPrice,
      amount: numQuantity,
      total: parseFloat(calculatedTotal),
      status: 'open',
    });

    if (success) {
      setQuantity('');
    }
  };

  return (
    <div className="card" style={{ padding: 24, width: '100%', maxWidth: 360 }}>
      {/* TABS */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-main)',
        marginBottom: 20
      }}>
        <button
          onClick={() => setActiveTab('buy')}
          style={{
            flex: 1,
            paddingBottom: 12,
            fontSize: 14,
            fontWeight: 700,
            color: activeTab === 'buy' ? 'var(--color-brand)' : 'var(--text-muted)',
            borderBottom: activeTab === 'buy' ? '2px solid var(--color-brand)' : 'none',
            textAlign: 'center',
            marginBottom: -1
          }}
        >
          Buy {selectedCoin.symbol}
        </button>

        <button
          onClick={() => setActiveTab('sell')}
          style={{
            flex: 1,
            paddingBottom: 12,
            fontSize: 14,
            fontWeight: 700,
            color: activeTab === 'sell' ? 'var(--color-red)' : 'var(--text-muted)',
            borderBottom: activeTab === 'sell' ? '2px solid var(--color-red)' : 'none',
            textAlign: 'center',
            marginBottom: -1
          }}
        >
          Sell {selectedCoin.symbol}
        </button>

        <button
          onClick={() => setActiveTab('exchange')}
          style={{
            flex: 1,
            paddingBottom: 12,
            fontSize: 14,
            fontWeight: 700,
            color: activeTab === 'exchange' ? 'var(--color-brand)' : 'var(--text-muted)',
            borderBottom: activeTab === 'exchange' ? '2px solid var(--color-brand)' : 'none',
            textAlign: 'center',
            marginBottom: -1
          }}
        >
          Swap
        </button>
      </div>

      {activeTab !== 'exchange' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* LIMIT / MARKET TOGGLE */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-tag)',
            padding: 4,
            borderRadius: 'var(--radius-sm)'
          }}>
            <button
              onClick={() => setOrderType('limit')}
              style={{
                flex: 1,
                padding: '6px 0',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 'var(--radius-xs)',
                backgroundColor: orderType === 'limit' ? 'var(--bg-card)' : 'transparent',
                color: orderType === 'limit' ? 'var(--text-main)' : 'var(--text-muted)',
                boxShadow: orderType === 'limit' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Limit
            </button>
            <button
              onClick={() => setOrderType('market')}
              style={{
                flex: 1,
                padding: '6px 0',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 'var(--radius-xs)',
                backgroundColor: orderType === 'market' ? 'var(--bg-card)' : 'transparent',
                color: orderType === 'market' ? 'var(--text-main)' : 'var(--text-muted)',
                boxShadow: orderType === 'market' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Market
            </button>
          </div>

          {/* PRICE ROW */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Price
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              color: 'var(--text-main)'
            }}>
              <span>${currentPrice.toLocaleString()}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>USD</span>
            </div>
          </div>

          {/* QUANTITY INPUT */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Quantity ({selectedCoin.symbol})
              </label>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Avail: ${fiatBalance.toLocaleString()} USD
              </span>
            </div>
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          {/* TOTAL IN USD */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              {activeTab === 'buy' ? 'Buy For (USD)' : 'Receive (USD)'}
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-main)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              color: 'var(--text-main)'
            }}>
              <span>${calculatedTotal}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>USD</span>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Phí sàn (0.1%):</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>${(parseFloat(calculatedTotal) * 0.001).toFixed(3)} USD</span>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleAction}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '12px 0',
              fontSize: 14,
              backgroundColor: activeTab === 'buy' ? 'var(--color-brand)' : 'var(--color-red)'
            }}
          >
            {activeTab === 'buy' ? `Buy ${selectedCoin.symbol}` : `Sell ${selectedCoin.symbol}`}
          </button>
        </div>
      ) : (
        /* SWAP / EXCHANGE COIN FORM */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              From
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                placeholder="0.00"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                style={{ flex: 1, fontFamily: 'var(--font-mono)' }}
              />
              <select
                value={exchangeFrom}
                onChange={e => setExchangeFrom(e.target.value)}
                style={{ width: 100, fontWeight: 700 }}
              >
                {coins.map(c => (
                  <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => {
                const temp = exchangeFrom;
                setExchangeFrom(exchangeTo === 'USD' ? 'ETH' : exchangeTo);
                setExchangeTo(temp);
              }}
              className="btn-icon"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <ArrowLeftRight size={16} />
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              To
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{
                flex: 1,
                padding: '10px 14px',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-main)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: 14
              }}>
                ${(numQuantity * (coins.find(c => c.symbol === exchangeFrom)?.price || 1)).toLocaleString()}
              </div>
              <select
                value={exchangeTo}
                onChange={e => setExchangeTo(e.target.value)}
                style={{ width: 100, fontWeight: 700 }}
              >
                <option value="USD">USD</option>
                {coins.map(c => (
                  <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Tỷ giá được cập nhật theo thời gian thực (Zero Slippage).
          </div>

          <button
            onClick={handleAction}
            className="btn-primary"
            style={{ width: '100%', padding: '12px 0' }}
          >
            Exchange Now
          </button>
        </div>
      )}
    </div>
  );
};
