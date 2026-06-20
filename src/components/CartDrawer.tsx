import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotal, 
    navigateTo 
  } = useStore();

  const handleCheckoutClick = () => {
    toggleCart(false);
    navigateTo('checkout');
  };

  const getProductEmoji = (id: string) => {
    if (id.includes('botev')) return '🔥';
    if (id.includes('levski')) return '🦁';
    if (id.includes('simeon')) return '👑';
    if (id.includes('maistora')) return '🎨';
    if (id.includes('mug')) return '☕';
    if (id.includes('cap')) return '🧢';
    if (id.includes('keychain')) return '🔑';
    if (id.includes('skull')) return '💀';
    if (id.includes('rock-hand')) return '🤘';
    if (id.includes('claw')) return '🎸';
    return '📦';
  };

  const getFallbackGradient = (id: string) => {
    if (id.includes('botev')) return '#800';
    if (id.includes('levski')) return '#004';
    if (id.includes('simeon')) return '#540';
    if (id.includes('maistora')) return '#305';
    return '#222';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`drawer-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={() => toggleCart(false)}
      />

      {/* Cart Drawer */}
      <div className={`cart-drawer-panel ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="rock-title text-neon-red">Количка</h2>
          <button className="cart-close-btn" onClick={() => toggleCart(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="empty-cart-icon text-secondary" />
              <p className="empty-text">Количката ти е празна...</p>
              <button 
                className="btn-rock" 
                onClick={() => { toggleCart(false); navigateTo('home'); }}
              >
                Към Магазина 🤘
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedOption || ''}-${idx}`} className="cart-item">
                  {/* Small preview */}
                  <div 
                    className="cart-item-preview" 
                    style={{ background: item.product.image ? 'none' : getFallbackGradient(item.product.id) }}
                  >
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="cart-preview-image" />
                    ) : (
                      <span>{getProductEmoji(item.product.id)}</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.product.name}</h4>
                    
                    {/* Size and Options */}
                    {(item.selectedSize || item.selectedOption) && (
                      <div className="cart-item-meta">
                        {item.selectedSize && <span className="meta-tag">Размер: {item.selectedSize}</span>}
                        {item.selectedOption && <span className="meta-tag">{item.selectedOption}</span>}
                      </div>
                    )}

                    <div className="cart-item-footer">
                      <div className="cart-item-qty">
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedOption)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedOption)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="cart-item-price-calc">
                        <span>{(item.product.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedOption)}
                    title="Премахни"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer-summary">
            <div className="cart-summary-row">
              <span className="summary-label">Обща сума:</span>
              <span className="summary-value text-neon-red">{cartTotal.toFixed(2)} €</span>
            </div>
            
            <button 
              className="btn-rock checkout-btn pulse-glow"
              onClick={handleCheckoutClick}
            >
              Финализирай Поръчката 🤘
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-drawer-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          height: 100vh;
          background: #0f0f12;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.7);
          z-index: 1050;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          visibility: hidden;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s;
          border-left: 1px solid var(--border-color);
        }

        .cart-drawer-panel.open {
          transform: translateX(0);
          visibility: visible;
        }

        @media (max-width: 480px) {
          .cart-drawer-panel {
            width: 100%;
          }
        }

        .cart-header {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }

        .cart-header h2 {
          font-size: 1.4rem;
        }

        .cart-close-btn {
          color: var(--text-secondary);
          transition: var(--transition-fast);
          padding: 6px;
        }

        .cart-close-btn:hover {
          color: var(--color-accent);
          transform: rotate(90deg);
        }

        .cart-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 20px;
        }

        /* Empty State */
        .empty-cart-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 20px;
        }

        .empty-cart-icon {
          animation: headbang 1s infinite alternate;
        }

        .empty-text {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        /* Cart Item */
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .cart-item {
          display: flex;
          gap: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 6px;
          position: relative;
          transition: var(--transition-fast);
        }

        .cart-item:hover {
          border-color: rgba(255, 42, 75, 0.3);
          background: rgba(255, 255, 255, 0.04);
        }

        .cart-item-preview {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
          overflow: hidden;
        }

        .cart-preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .cart-item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-right: 20px;
        }

        .cart-item-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 4px;
        }

        .cart-item-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }

        .meta-tag {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cart-item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-item-qty {
          display: flex;
          align-items: center;
          background: #19191d;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 2px;
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          border-radius: 3px;
        }

        .qty-btn:hover {
          color: var(--color-accent);
          background: rgba(255, 42, 75, 0.1);
        }

        .qty-value {
          font-size: 0.85rem;
          font-weight: 700;
          min-width: 24px;
          text-align: center;
        }

        .cart-item-price-calc {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cart-item-remove {
          position: absolute;
          top: 10px;
          right: 10px;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          padding: 4px;
        }

        .cart-item-remove:hover {
          color: var(--color-accent);
        }

        /* Cart Summary */
        .cart-footer-summary {
          padding: 24px 20px;
          border-top: 1px solid var(--border-color);
          background: #0b0b0d;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .summary-value {
          font-size: 1.4rem;
          font-weight: 800;
        }

        .checkout-btn {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
        }
      `}</style>
    </>
  );
};
