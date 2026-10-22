import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { WalletModals } from './components/wallet/WalletModals';
import { AuthModal } from './components/auth/AuthModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { MarketPage } from './pages/MarketPage';
import { TradingPage } from './pages/TradingPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { WalletPage } from './pages/WalletPage';
import { ProfileSettings } from './components/profile/ProfileSettings';
import { AdminPanel } from './components/admin/AdminPanel';

import './styles/global.css';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'market' && <MarketPage />}
        {activeTab === 'trading' && <TradingPage />}
        {activeTab === 'watchlist' && <WatchlistPage />}
        {activeTab === 'portfolio' && <PortfolioPage />}
        {activeTab === 'wallet' && <WalletPage />}
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <ToastContainer />
      <WalletModals />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
