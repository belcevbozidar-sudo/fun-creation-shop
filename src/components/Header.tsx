import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Menu, X, ShieldAlert, Award, Printer, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  const { cartCount, toggleCart, currentPage, navigateTo } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'revivalists', label: 'Възрожденци & Царе', icon: <Award size={18} /> },
    { id: 'pod', label: 'Принт он Деманд', icon: <Printer size={18} /> },
    { id: '3dprint', label: '3D Принтиране', icon: <Cpu size={18} /> },
  ];

  const handleNavClick = (page: 'home' | 'category' | 'custom' | 'admin', categoryId?: string) => {
    setIsMobileMenuOpen(false);
    if (page === 'category' && categoryId) {
      navigateTo('category', categoryId);
    } else {
      navigateTo(page);
    }
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Logo */}
        <div className="logo-container" onClick={() => handleNavClick('home')}>
          <img src="/logo.png" alt="Fun Creation Logo" className="logo-img" />
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Начало
          </button>
          
          {navItems.map(item => (
            <button
              key={item.id}
              className="nav-link"
              onClick={() => handleNavClick('category', item.id)}
            >
              {item.label}
            </button>
          ))}

          <button 
            className={`nav-link-highlight ${currentPage === 'custom' ? 'active' : ''}`}
            onClick={() => handleNavClick('custom')}
          >
            Къстъм Поръчка 🤘
          </button>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Admin panel button */}
          <button 
            className="admin-btn-header" 
            title="Админ панел (Поръчки)"
            onClick={() => handleNavClick('admin')}
          >
            <ShieldAlert size={20} />
          </button>

          {/* Cart Trigger */}
          <button className="cart-trigger headbang-hover" onClick={() => toggleCart(true)}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="cart-badge pulse-glow">{cartCount}</span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button className="mobile-menu-trigger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <button 
            className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Начало
          </button>

          {navItems.map(item => (
            <button
              key={item.id}
              className="mobile-nav-link"
              onClick={() => handleNavClick('category', item.id)}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <button 
            className="mobile-nav-link custom-highlight"
            onClick={() => handleNavClick('custom')}
          >
            <span className="mobile-nav-icon">🤘</span>
            Индивидуална Поръчка
          </button>

          <button 
            className="mobile-nav-link admin-highlight"
            onClick={() => handleNavClick('admin')}
          >
            <span className="mobile-nav-icon"><ShieldAlert size={18} /></span>
            Админ Панел
          </button>
        </nav>
      </div>

      {/* Header CSS injected specifically for details */}
      <style>{`
        .main-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(10, 10, 11, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          z-index: 900;
          transition: var(--transition-normal);
        }
        
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .logo-container {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(255, 179, 0, 0.2));
        }

        .desktop-nav {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 8px 12px;
          border-radius: 4px;
          transition: var(--transition-fast);
          position: relative;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--color-accent);
          box-shadow: 0 0 8px var(--color-accent);
        }

        .nav-link-highlight {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
          padding: 8px 16px;
          border-radius: 4px;
          transition: var(--transition-fast);
          background: rgba(255, 42, 75, 0.05);
        }

        .nav-link-highlight:hover, .nav-link-highlight.active {
          background: var(--color-accent);
          color: var(--text-dark);
          box-shadow: 0 0 15px var(--color-accent-glow);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .admin-btn-header {
          color: var(--text-secondary);
          transition: var(--transition-fast);
          padding: 8px;
          border-radius: 50%;
        }

        .admin-btn-header:hover {
          color: var(--color-gold);
          background: rgba(255, 179, 0, 0.1);
        }

        .cart-trigger {
          position: relative;
          color: var(--text-primary);
          padding: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-trigger:hover {
          border-color: var(--color-accent);
          box-shadow: 0 0 10px var(--border-glow);
          background: rgba(255, 42, 75, 0.05);
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--color-accent);
          color: var(--text-primary);
          font-size: 0.7rem;
          font-weight: 800;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-primary);
        }

        .mobile-menu-trigger {
          display: none;
          color: var(--text-primary);
          padding: 8px;
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          height: calc(100vh - 80px);
          background: rgba(10, 10, 11, 0.98);
          backdrop-filter: blur(15px);
          z-index: 850;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-nav-drawer.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          padding: 40px 30px;
          gap: 20px;
        }

        .mobile-nav-link {
          font-size: 1.4rem;
          font-weight: 700;
          text-align: left;
          color: var(--text-primary);
          padding: 12px 20px;
          border-radius: 8px;
          border-left: 3px solid transparent;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: rgba(255, 255, 255, 0.03);
          border-left-color: var(--color-accent);
          padding-left: 25px;
        }

        .mobile-nav-icon {
          color: var(--color-accent);
        }

        .custom-highlight {
          color: var(--color-accent);
          background: rgba(255, 42, 75, 0.05);
          border: 1px solid rgba(255, 42, 75, 0.2);
        }

        .admin-highlight {
          color: var(--color-gold);
          font-size: 1.1rem;
          margin-top: 20px;
          border-top: 1px solid var(--border-color);
          border-radius: 0;
          padding-top: 20px;
        }

        .admin-highlight .mobile-nav-icon {
          color: var(--color-gold);
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-trigger {
            display: block;
          }
          .logo-main {
            font-size: 1.4rem;
          }
          .header-container {
            height: 70px;
          }
          .mobile-nav-drawer {
            top: 70px;
            height: calc(100vh - 70px);
          }
        }
      `}</style>
    </header>
  );
};
