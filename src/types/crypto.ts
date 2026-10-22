export type Role = 'admin' | 'trader' | 'viewer';
export type Theme = 'dark' | 'light';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  circulatingSupply: string;
  maxSupply?: string;
  rank: number;
  category: 'Layer 1' | 'DeFi' | 'NFT' | 'Metaverse' | 'Meme' | 'Stablecoin';
  sparkline: number[];
  color?: string;
}

export interface OrderBookItem {
  price: number;
  amount: number;
  total: number;
  depthPercent: number;
}

export interface Order {
  id: string;
  pair: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: number;
  amount: number;
  total: number;
  status: 'open' | 'filled' | 'cancelled';
  timestamp: string;
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  inOrderQty: number;
  avgBuyPrice: number;
  holdings: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface WalletTransaction {
  id: string;
  action: 'Deposited' | 'Withdrawn';
  amount: number;
  currency: string;
  date: string;
  status: 'Successful' | 'Rejected' | 'Pending';
  method: string;
  txHash?: string;
}

export interface CoinWalletItem {
  symbol: string;
  name: string;
  icon: string;
  availBalance: number;
  locked: number;
  amount: number;
  valueUsd: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  phone: string;
  role: Role;
  kycStatus: 'verified' | 'pending' | 'unverified';
  twoFactorEnabled: {
    email: boolean;
    sms: boolean;
    google: boolean;
  };
  notificationPreferences: {
    priceAlerts: boolean;
    referralAlerts: boolean;
    deviceLoginAlerts: boolean;
    emailNotification: boolean;
    systemAlerts: boolean;
  };
  currencyPreference: string;
}

export interface PaymentMethodItem {
  id: string;
  type: 'bank' | 'upi' | 'card';
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  ifscCode?: string;
  upiApp?: string;
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardName?: string;
  isDefault?: boolean;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  createdDate: string;
  permissions: string[];
}

export interface PriceAlert {
  id: string;
  coinSymbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface SystemAnnouncement {
  id: string;
  title: string;
  content: string;
  targetRole: 'all' | 'trader' | 'viewer';
  date: string;
  active: boolean;
}

export interface TradingPairSetting {
  id: string;
  baseSymbol: string;
  quoteSymbol: string;
  minAmount: number;
  makerFee: number;
  takerFee: number;
  isActive: boolean;
}

export interface PromotionCampaign {
  id: string;
  title: string;
  code: string;
  description: string;
  discountRate: number;
  validUntil: string;
  isActive: boolean;
}
