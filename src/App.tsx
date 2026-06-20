import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductDetail } from './pages/ProductDetail';
import { CustomOrders } from './pages/CustomOrders';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';

const AppContent: React.FC = () => {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'category':
        return <Category />;
      case 'product':
        return <ProductDetail />;
      case 'custom':
        return <CustomOrders />;
      case 'checkout':
        return <Checkout />;
      case 'admin':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-layout">
      <Header />
      
      <main className="main-content-area">
        {renderPage()}
      </main>

      <Footer />
      
      {/* Slide-in cart */}
      <CartDrawer />

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content-area {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
