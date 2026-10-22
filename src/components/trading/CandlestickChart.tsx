import React, { useState } from 'react';
import { MOCK_CANDLES, CandleData } from '../../data/mockCrypto';
import { useApp } from '../../context/AppContext';
import { Maximize2, BarChart2, TrendingUp, Calendar } from 'lucide-react';

export const CandlestickChart: React.FC = () => {
  const { selectedCoin } = useApp();
  const [viewType, setViewType] = useState<'price' | 'marketcap' | 'tradeview'>('price');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  const candles = MOCK_CANDLES;
  const width = 760;
  const height = 300;
  const padding = { top: 20, right: 60, bottom: 30, left: 20 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const minPrice = Math.min(...candles.map(c => c.low)) * 0.99;
  const maxPrice = Math.max(...candles.map(c => c.high)) * 1.01;
  const priceRange = maxPrice - minPrice;

  const candleWidth = (plotWidth / candles.length) * 0.6;
  const step = plotWidth / candles.length;

  const getY = (val: number) => padding.top + plotHeight - ((val - minPrice) / priceRange) * plotHeight;

  return (
    <div className="card" style={{ padding: 24, width: '100%' }}>
      {/* CHART HEADER CONTROLS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>
            {selectedCoin.name} to USD Chart
          </span>
          {hoveredCandle ? (
            <div style={{
              display: 'flex',
              gap: 12,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)'
            }}>
              <span>O: <strong style={{ color: 'var(--text-main)' }}>${hoveredCandle.open}</strong></span>
              <span>H: <strong style={{ color: 'var(--color-green)' }}>${hoveredCandle.high}</strong></span>
              <span>L: <strong style={{ color: 'var(--color-red)' }}>${hoveredCandle.low}</strong></span>
              <span>C: <strong style={{ color: 'var(--text-main)' }}>${hoveredCandle.close}</strong></span>
            </div>
          ) : (
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Hover trên nến để xem chi tiết</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* VIEW TABS */}
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-tag)', padding: 3, borderRadius: 'var(--radius-sm)' }}>
            {(['price', 'marketcap', 'tradeview'] as const).map(vt => (
              <button
                key={vt}
                onClick={() => setViewType(vt)}
                style={{
                  padding: '4px 10px',
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 4,
                  backgroundColor: viewType === vt ? 'var(--color-brand)' : 'transparent',
                  color: viewType === vt ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                {vt === 'price' ? 'Price' : vt === 'marketcap' ? 'Market Cap' : 'Trade View'}
              </button>
            ))}
          </div>

          {/* TIMEFRAME */}
          <select
            value={timeframe}
            onChange={e => setTimeframe(e.target.value as any)}
            style={{ padding: '4px 8px', fontSize: 12 }}
          >
            <option value="24h">24h</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
          </select>
        </div>
      </div>

      {/* SVG CANDLESTICK GRAPH */}
      <div style={{ overflowX: 'auto', position: 'relative' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', minWidth: 600, height: 'auto', display: 'block' }}
        >
          {/* BACKGROUND GRID LINES */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = padding.top + plotHeight * pct;
            const priceLabel = (maxPrice - priceRange * pct).toFixed(0);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="var(--border-main)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={width - padding.right + 8}
                  y={y + 4}
                  fill="var(--text-muted)"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                >
                  ${Number(priceLabel).toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* CANDLESTICKS */}
          {candles.map((candle, idx) => {
            const isBullish = candle.close >= candle.open;
            const candleColor = isBullish ? '#10b981' : '#ef4444';
            const xCenter = padding.left + idx * step + step / 2;
            const x = xCenter - candleWidth / 2;

            const yOpen = getY(candle.open);
            const yClose = getY(candle.close);
            const yHigh = getY(candle.high);
            const yLow = getY(candle.low);

            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);

            return (
              <g
                key={candle.time}
                onMouseEnter={() => setHoveredCandle(candle)}
                onMouseLeave={() => setHoveredCandle(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* WICK / SHADOW */}
                <line
                  x1={xCenter}
                  y1={yHigh}
                  x2={xCenter}
                  y2={yLow}
                  stroke={candleColor}
                  strokeWidth="1.5"
                />

                {/* REAL BODY */}
                <rect
                  x={x}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={candleColor}
                  rx="2"
                />

                {/* DATE LABEL */}
                <text
                  x={xCenter}
                  y={height - 8}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                >
                  {candle.time}
                </text>
              </g>
            );
          })}

          {/* CURRENT PRICE HIGHLIGHT LINE */}
          <line
            x1={padding.left}
            y1={getY(selectedCoin.price)}
            x2={width - padding.right}
            y2={getY(selectedCoin.price)}
            stroke="var(--color-brand)"
            strokeDasharray="2 2"
            strokeWidth="1.5"
          />
          <rect
            x={width - padding.right + 4}
            y={getY(selectedCoin.price) - 10}
            width={54}
            height={20}
            rx={4}
            fill="var(--color-brand)"
          />
          <text
            x={width - padding.right + 31}
            y={getY(selectedCoin.price) + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontWeight="bold"
            fontFamily="var(--font-mono)"
          >
            ${selectedCoin.price >= 1000 ? `${(selectedCoin.price / 1000).toFixed(1)}k` : selectedCoin.price}
          </text>
        </svg>
      </div>
    </div>
  );
};
