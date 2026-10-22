import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Theme,
  Coin,
  UserProfile,
  PortfolioItem,
  WalletTransaction,
  CoinWalletItem,
  Order,
  PriceAlert,
  SupportTicket,
  PaymentMethodItem,
  ApiKeyItem,
} from '../types/crypto';
import {
  INITIAL_COINS,
  MOCK_USER,
  MOCK_PORTFOLIO,
  MOCK_WALLET_HISTORY,
  MOCK_COIN_WALLETS,
  INITIAL_ORDERS,
  INITIAL_SUPPORT_TICKETS,
  MOCK_PAYMENT_METHODS,
  MOCK_API_KEYS,
} from '../data/mockCrypto';
import { supabase } from '../lib/supabase';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  role: Role;
  setRole: (role: Role) => void;
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  coins: Coin[];
  selectedCoin: Coin;
  setSelectedCoin: (coin: Coin) => void;
  watchlist: string[];
  toggleWatchlist: (coinId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Wallet & Portfolio State
  fiatBalance: number;
  portfolio: PortfolioItem[];
  walletTransactions: WalletTransaction[];
  coinWallets: CoinWalletItem[];
  orders: Order[];
  
  // Authentication
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (email: string, password: string, name?: string, phone?: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  recoverPassword: (email: string) => Promise<boolean>;

  // Actions
  depositFiat: (amount: number, method: string) => Promise<void>;
  depositCrypto: (symbol: string, amount: number) => Promise<void>;
  withdrawCrypto: (symbol: string, amount: number, address: string) => Promise<boolean>;
  placeOrder: (order: Omit<Order, 'id' | 'timestamp'>) => Promise<boolean>;
  cancelOrder: (orderId: string) => Promise<void>;
  swapCoins: (fromSymbol: string, toSymbol: string, fromAmount: number) => boolean;
  
  // Modals & Popups
  activeModal: string | null;
  openModal: (modalName: string, modalData?: any) => void;
  closeModal: () => void;
  modalData: any;
  
  // Auth state
  authMode: 'split' | 'modal';
  setAuthMode: (mode: 'split' | 'modal') => void;
  authView: 'login' | 'register' | 'recover' | 'confirm' | 'otp';
  setAuthView: (view: 'login' | 'register' | 'recover' | 'confirm' | 'otp') => void;
  
  // Support & Alerts
  supportTickets: SupportTicket[];
  addSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => Promise<void>;
  priceAlerts: PriceAlert[];
  addPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  
  // Payment methods & API keys
  paymentMethods: PaymentMethodItem[];
  addPaymentMethod: (method: PaymentMethodItem) => Promise<void>;
  removePaymentMethod: (id: string) => Promise<void>;
  apiKeys: ApiKeyItem[];
  addApiKey: (key: ApiKeyItem) => Promise<void>;
  deleteApiKey: (id: string) => Promise<void>;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [role, setRoleState] = useState<Role>('trader');
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [coins, setCoins] = useState<Coin[]>(INITIAL_COINS);
  const [selectedCoin, setSelectedCoin] = useState<Coin>(INITIAL_COINS[0]);
  const [watchlist, setWatchlist] = useState<string[]>(['bitcoin', 'ethereum', 'binancecoin', 'ripple', 'matic-network']);
  const [activeTab, setActiveTab] = useState<string>('market');
  
  const [fiatBalance, setFiatBalance] = useState<number>(32455.12);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(MOCK_PORTFOLIO);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(MOCK_WALLET_HISTORY);
  const [coinWallets, setCoinWallets] = useState<CoinWalletItem[]>(MOCK_COIN_WALLETS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'split' | 'modal'>('modal');
  const [authView, setAuthView] = useState<'login' | 'register' | 'recover' | 'confirm' | 'otp'>('login');
  
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(INITIAL_SUPPORT_TICKETS);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([
    { id: 'alrt_1', coinSymbol: 'BTC', targetPrice: 45000, condition: 'above', isActive: true, createdAt: '2026-02-15' },
    { id: 'alrt_2', coinSymbol: 'ETH', targetPrice: 2800, condition: 'below', isActive: true, createdAt: '2026-02-15' }
  ]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>(MOCK_PAYMENT_METHODS);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(MOCK_API_KEYS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Check session on startup
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          setIsAuthenticated(true);
          await loadUserProfile(session.user.id, session.user.email || '');
        }
      } catch (err) {
        console.warn('Session check fallback:', err);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        setIsAuthenticated(true);
        await loadUserProfile(session.user.id, session.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUser(MOCK_USER);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('crypto_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setUser({
          id: data.id,
          name: data.name || email.split('@')[0],
          email: data.email || email,
          username: data.username || email.split('@')[0],
          avatar: data.avatar || MOCK_USER.avatar,
          phone: data.phone || '+84 987654321',
          role: (data.role as Role) || 'trader',
          kycStatus: data.kyc_status || 'unverified',
          twoFactorEnabled: {
            email: data.two_factor_email ?? false,
            sms: data.two_factor_sms ?? true,
            google: data.two_factor_google ?? false,
          },
          notificationPreferences: data.notification_preferences || MOCK_USER.notificationPreferences,
          currencyPreference: data.currency_preference || 'USD',
        });
        if (data.fiat_balance) setFiatBalance(Number(data.fiat_balance));
        if (data.role) setRoleState(data.role as Role);
      }

      // Also load real user orders, transactions, payment methods, api keys
      const [ordRes, txRes, payRes, keyRes] = await Promise.all([
        supabase.from('crypto_orders').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('crypto_transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('crypto_payment_methods').select('*').eq('user_id', userId),
        supabase.from('crypto_api_keys').select('*').eq('user_id', userId),
      ]);

      if (ordRes.data && ordRes.data.length > 0) {
        setOrders(ordRes.data.map(o => ({
          id: o.id,
          pair: o.pair,
          side: o.side as 'buy' | 'sell',
          type: o.type as 'limit' | 'market',
          price: Number(o.price),
          amount: Number(o.amount),
          total: Number(o.total),
          status: o.status as 'open' | 'filled' | 'cancelled',
          timestamp: o.created_at,
        })));
      }

      if (txRes.data && txRes.data.length > 0) {
        setWalletTransactions(txRes.data.map(t => ({
          id: t.id,
          action: t.action as 'Deposited' | 'Withdrawn',
          amount: Number(t.amount),
          currency: t.currency,
          date: new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          status: t.status as 'Successful' | 'Rejected' | 'Pending',
          method: t.method,
          txHash: t.tx_hash,
        })));
      }

      if (payRes.data && payRes.data.length > 0) {
        setPaymentMethods(payRes.data.map(p => ({
          id: p.id,
          type: p.type as 'bank' | 'card' | 'upi',
          bankName: p.bank_name,
          accountNumber: p.account_number,
          accountHolder: p.account_holder,
          ifscCode: p.ifsc_code,
          upiApp: p.upi_app,
          upiId: p.upi_id,
          cardNumber: p.card_number,
          cardExpiry: p.card_expiry,
          cardName: p.card_name,
        })));
      }

      if (keyRes.data && keyRes.data.length > 0) {
        setApiKeys(keyRes.data.map(k => ({
          id: k.id,
          name: k.name,
          key: k.key,
          createdDate: new Date(k.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          permissions: k.permissions || ['Read Only'],
        })));
      }
    } catch (err) {
      console.warn('Error fetching profile from Supabase:', err);
    }
  };

  // REAL LOGIN
  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If email not confirmed or auth error, alert user
        addToast({
          type: 'error',
          title: 'Đăng nhập không thành công',
          message: error.message || 'Email hoặc mật khẩu không chính xác.'
        });
        return false;
      }

      if (data.user) {
        setIsAuthenticated(true);
        await loadUserProfile(data.user.id, data.user.email || email);
        addToast({
          type: 'success',
          title: 'Đăng nhập thành công',
          message: `Chào mừng ${data.user.email}!`
        });
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Lỗi kết nối', message: err.message || 'Không thể kết nối máy chủ xác thực' });
      return false;
    }
  };

  // Registration
  const registerUser = async (email: string, password: string, name?: string, phone?: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0],
            phone: phone || '+84 987654321',
          }
        }
      });

      if (error) {
        addToast({
          type: 'error',
          title: 'Đăng ký thất bại',
          message: error.message
        });
        return false;
      }

      if (data.user) {
        // Create profile record in crypto_profiles table
        const profileData = {
          id: data.user.id,
          email,
          name: name || email.split('@')[0],
          username: email.split('@')[0],
          phone: phone || '+84 987654321',
          role: 'trader',
          kyc_status: 'unverified',
          fiat_balance: 10000.00,
        };

        await supabase.from('crypto_profiles').upsert(profileData);
        setIsAuthenticated(true);
        await loadUserProfile(data.user.id, email);

        addToast({
          type: 'success',
          title: 'Đăng ký tài khoản thành công',
          message: 'Tài khoản của bạn đã được kích hoạt thành công!'
        });
        return true;
      }
      return false;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Lỗi đăng ký', message: err.message });
      return false;
    }
  };

  // Logout
  const logoutUser = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(MOCK_USER);
      addToast({ type: 'info', title: 'Đã đăng xuất khỏi hệ thống' });
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  // Password Recovery
  const recoverPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) {
        addToast({ type: 'error', title: 'Lỗi khôi phục', message: error.message });
        return false;
      }
      addToast({
        type: 'success',
        title: 'Email đặt lại mật khẩu đã được gửi',
        message: `Vui lòng kiểm tra hòm thư ${email} để tạo mật khẩu mới.`
      });
      return true;
    } catch (err: any) {
      addToast({ type: 'error', title: 'Lỗi', message: err.message });
      return false;
    }
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    setUser(prev => ({
      ...prev,
      role: newRole,
      name: newRole === 'admin' ? 'System Administrator' : newRole === 'viewer' ? 'Guest Visitor' : user.name,
      email: newRole === 'admin' ? 'admin@cryptoplanet.com' : newRole === 'viewer' ? 'visitor@cryptoplanet.com' : user.email,
    }));
    addToast({
      type: 'info',
      title: `Chuyển quyền sang: ${newRole.toUpperCase()}`,
      message: newRole === 'viewer' ? 'Chế độ người xem (chỉ xem thị trường)' : newRole === 'admin' ? 'Chế độ Quản trị viên (quản lý toàn sàn)' : 'Chế độ Trader (giao dịch đầy đủ)',
    });
  };

  const updateUser = async (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
    addToast({ type: 'success', title: 'Cập nhật hồ sơ thành công!' });

    // Sync to Supabase if authenticated
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('crypto_profiles').update({
          name: updates.name,
          phone: updates.phone,
          kyc_status: updates.kycStatus,
          currency_preference: updates.currencyPreference,
          two_factor_email: updates.twoFactorEnabled?.email,
          two_factor_sms: updates.twoFactorEnabled?.sms,
          two_factor_google: updates.twoFactorEnabled?.google,
          notification_preferences: updates.notificationPreferences,
          updated_at: new Date().toISOString(),
        }).eq('id', session.user.id);
      }
    } catch (e) {
      console.warn('Update user profile sync error:', e);
    }
  };

  const toggleWatchlist = (coinId: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(coinId);
      const updated = exists ? prev.filter(id => id !== coinId) : [...prev, coinId];
      addToast({
        type: exists ? 'info' : 'success',
        title: exists ? 'Đã xóa khỏi Watchlist' : 'Đã thêm vào Watchlist'
      });
      return updated;
    });
  };

  const openModal = (modalName: string, data?: any) => {
    setActiveModal(modalName);
    setModalData(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // Deposit Fiat balance
  const depositFiat = async (amount: number, method: string) => {
    if (amount <= 0) return;
    const newBalance = fiatBalance + amount;
    setFiatBalance(newBalance);

    const txId = `tx_${Date.now()}`;
    const newTx: WalletTransaction = {
      id: txId,
      action: 'Deposited',
      amount,
      currency: 'USD',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Successful',
      method,
    };
    setWalletTransactions(prev => [newTx, ...prev]);

    addToast({
      type: 'success',
      title: 'Nạp tiền thành công!',
      message: `+$${amount.toLocaleString()} USD qua ${method}`
    });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id || null;
      await supabase.from('crypto_transactions').insert({
        id: txId,
        user_id: userId,
        action: 'Deposited',
        amount,
        currency: 'USD',
        method,
        status: 'Successful',
      });
      if (userId) {
        await supabase.from('crypto_profiles').update({ fiat_balance: newBalance }).eq('id', userId);
      }
    } catch (e) {
      console.warn('Transaction DB insert:', e);
    }
  };

  // Deposit Crypto
  const depositCrypto = async (symbol: string, amount: number) => {
    setCoinWallets(prev =>
      prev.map(c => (c.symbol === symbol ? { ...c, availBalance: c.availBalance + amount, amount: c.amount + amount } : c))
    );
    addToast({
      type: 'success',
      title: 'Nạp Crypto thành công',
      message: `+${amount} ${symbol} đã vào ví của bạn`
    });
  };

  // Withdraw Crypto
  const withdrawCrypto = async (symbol: string, amount: number, address: string): Promise<boolean> => {
    const coinWallet = coinWallets.find(c => c.symbol === symbol);
    if (!coinWallet || coinWallet.availBalance < amount) {
      addToast({ type: 'error', title: 'Số dư không đủ', message: `Số dư khả dụng chỉ còn ${coinWallet?.availBalance || 0} ${symbol}` });
      return false;
    }
    setCoinWallets(prev =>
      prev.map(c => (c.symbol === symbol ? { ...c, availBalance: c.availBalance - amount, amount: c.amount - amount } : c))
    );
    const txId = `tx_${Date.now()}`;
    const newTx: WalletTransaction = {
      id: txId,
      action: 'Withdrawn',
      amount: amount * (coins.find(c => c.symbol === symbol)?.price || 1),
      currency: symbol,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Successful',
      method: `${symbol} Blockchain Transfer`,
      txHash: `0x${Math.random().toString(16).substring(2, 18)}...`,
    };
    setWalletTransactions(prev => [newTx, ...prev]);

    addToast({
      type: 'success',
      title: 'Lệnh rút tiền đã gửi!',
      message: `Rút ${amount} ${symbol} tới ${address.substring(0, 8)}...`
    });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      await supabase.from('crypto_transactions').insert({
        id: txId,
        user_id: session?.user?.id || null,
        action: 'Withdrawn',
        amount: newTx.amount,
        currency: symbol,
        method: newTx.method,
        status: 'Successful',
        tx_hash: newTx.txHash,
      });
    } catch (e) {
      console.warn('Withdraw DB insert:', e);
    }
    return true;
  };

  // Place Order
  const placeOrder = async (orderData: Omit<Order, 'id' | 'timestamp'>): Promise<boolean> => {
    if (role === 'viewer') {
      addToast({
        type: 'error',
        title: 'Chức năng bị giới hạn',
        message: 'Tài khoản Viewer chỉ có quyền xem. Vui lòng chuyển sang role Trader để đặt lệnh!'
      });
      return false;
    }

    const totalCost = orderData.price * orderData.amount;
    if (orderData.side === 'buy' && fiatBalance < totalCost) {
      addToast({
        type: 'error',
        title: 'Số dư không đủ',
        message: `Cần $${totalCost.toLocaleString()} USD nhưng chỉ còn $${fiatBalance.toLocaleString()} USD`
      });
      return false;
    }

    const newBalance = orderData.side === 'buy' ? fiatBalance - totalCost : fiatBalance;
    if (orderData.side === 'buy') {
      setFiatBalance(newBalance);
    }

    const orderId = `ord_${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    setOrders(prev => [newOrder, ...prev]);
    addToast({
      type: 'success',
      title: `Đặt lệnh ${orderData.side.toUpperCase()} thành công!`,
      message: `${orderData.type.toUpperCase()} ${orderData.amount} ${orderData.pair} @ $${orderData.price}`
    });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      await supabase.from('crypto_orders').insert({
        id: orderId,
        user_id: session?.user?.id || null,
        pair: orderData.pair,
        side: orderData.side,
        type: orderData.type,
        price: orderData.price,
        amount: orderData.amount,
        total: orderData.total,
        status: 'open',
      });
    } catch (e) {
      console.warn('Order DB insert:', e);
    }

    return true;
  };

  // Cancel Order
  const cancelOrder = async (orderId: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
    );
    addToast({ type: 'info', title: 'Đã hủy lệnh giao dịch' });

    try {
      await supabase.from('crypto_orders').update({ status: 'cancelled' }).eq('id', orderId);
    } catch (e) {
      console.warn('Cancel order DB update:', e);
    }
  };

  // Swap Coins
  const swapCoins = (fromSymbol: string, toSymbol: string, fromAmount: number): boolean => {
    if (role === 'viewer') {
      addToast({ type: 'error', title: 'Hạn chế quyền', message: 'Viewer không được phép hoán đổi tiền điện tử!' });
      return false;
    }
    addToast({
      type: 'success',
      title: 'Hoán đổi thành công!',
      message: `Đã đổi ${fromAmount} ${fromSymbol} sang ${toSymbol}`
    });
    return true;
  };

  // Support & Alerts
  const addSupportTicket = async (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => {
    const ticketId = `tkt_${Date.now()}`;
    const newTicket: SupportTicket = {
      ...ticket,
      id: ticketId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    addToast({ type: 'success', title: 'Đã gửi yêu cầu hỗ trợ! Đội ngũ sẽ phản hồi trong 15 phút.' });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      await supabase.from('crypto_support_tickets').insert({
        id: ticketId,
        user_id: session?.user?.id || null,
        user_email: ticket.userEmail,
        user_name: ticket.userName,
        subject: ticket.subject,
        message: ticket.message,
        status: 'open',
        priority: ticket.priority,
      });
    } catch (e) {
      console.warn('Ticket DB insert:', e);
    }
  };

  const addPriceAlert = (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: `alrt_${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setPriceAlerts(prev => [newAlert, ...prev]);
    addToast({ type: 'success', title: `Đã thiết lập cảnh báo giá cho ${alert.coinSymbol}!` });
  };

  // Payment methods
  const addPaymentMethod = async (method: PaymentMethodItem) => {
    setPaymentMethods(prev => [...prev, method]);
    addToast({ type: 'success', title: 'Đã thêm phương thức thanh toán mới!' });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      await supabase.from('crypto_payment_methods').insert({
        id: method.id,
        user_id: session?.user?.id || null,
        type: method.type,
        bank_name: method.bankName,
        account_number: method.accountNumber,
        account_holder: method.accountHolder,
        ifsc_code: method.ifscCode,
        upi_app: method.upiApp,
        upi_id: method.upiId,
        card_number: method.cardNumber,
        card_expiry: method.cardExpiry,
        card_name: method.cardName,
      });
    } catch (e) {
      console.warn('Payment method DB insert:', e);
    }
  };

  const removePaymentMethod = async (id: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
    addToast({ type: 'info', title: 'Đã xóa phương thức thanh toán' });
    try {
      await supabase.from('crypto_payment_methods').delete().eq('id', id);
    } catch (e) {
      console.warn('Payment delete error:', e);
    }
  };

  // API keys
  const addApiKey = async (key: ApiKeyItem) => {
    setApiKeys(prev => [...prev, key]);
    addToast({ type: 'success', title: 'Khởi tạo API Key thành công!' });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await supabase.from('crypto_api_keys').insert({
        id: key.id,
        user_id: session?.user?.id || null,
        name: key.name,
        key: key.key,
        permissions: key.permissions,
      });
    } catch (e) {
      console.warn('API key insert:', e);
    }
  };

  const deleteApiKey = async (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    addToast({ type: 'info', title: 'Đã vô hiệu hóa API Key' });
    try {
      await supabase.from('crypto_api_keys').delete().eq('id', id);
    } catch (e) {
      console.warn('API key delete:', e);
    }
  };

  // Live price tick simulation for crypto market
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins =>
        prevCoins.map(coin => {
          if (coin.category === 'Stablecoin') return coin;
          const fluctuation = (Math.random() - 0.495) * 0.003;
          const newPrice = Number((coin.price * (1 + fluctuation)).toFixed(2));
          const newChange = Number((coin.change24h + fluctuation * 10).toFixed(2));
          return {
            ...coin,
            price: newPrice,
            change24h: newChange,
            sparkline: [...coin.sparkline.slice(1), newPrice],
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        role,
        setRole,
        user,
        updateUser,
        coins,
        selectedCoin,
        setSelectedCoin,
        watchlist,
        toggleWatchlist,
        activeTab,
        setActiveTab,
        fiatBalance,
        portfolio,
        walletTransactions,
        coinWallets,
        orders,
        isAuthenticated,
        loginUser,
        registerUser,
        logoutUser,
        recoverPassword,
        depositFiat,
        depositCrypto,
        withdrawCrypto,
        placeOrder,
        cancelOrder,
        swapCoins,
        activeModal,
        openModal,
        closeModal,
        modalData,
        authMode,
        setAuthMode,
        authView,
        setAuthView,
        supportTickets,
        addSupportTicket,
        priceAlerts,
        addPriceAlert,
        paymentMethods,
        addPaymentMethod,
        removePaymentMethod,
        apiKeys,
        addApiKey,
        deleteApiKey,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
