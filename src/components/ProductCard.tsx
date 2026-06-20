import React from 'react';
import type { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Eye, ShoppingCart, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If the product has options or sizes, navigate to details to select them.
    if (product.sizes && product.sizes.length > 0) {
      navigateTo('product', null, product.id);
    } else if (product.options && product.options.length > 0) {
      navigateTo('product', null, product.id);
    } else {
      addToCart(product, 1);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'revivalists': return 'Възрожденци & Царе';
      case 'pod': return 'Принт он Деманд';
      case '3dprint': return '3D Принтиране';
      default: return '';
    }
  };

  // Mock product styling based on its category/design
  const getFallbackGradient = (id: string) => {
    if (id.includes('botev')) return 'linear-gradient(135deg, #111, #800)';
    if (id.includes('levski')) return 'linear-gradient(135deg, #111, #004)';
    if (id.includes('simeon')) return 'linear-gradient(135deg, #111, #540)';
    if (id.includes('maistora')) return 'linear-gradient(135deg, #111, #305)';
    if (id.includes('mug')) return 'linear-gradient(135deg, #222, #444)';
    if (id.includes('cap')) return 'linear-gradient(135deg, #222, #111)';
    if (id.includes('keychain')) return 'linear-gradient(135deg, #422, #211)';
    return 'linear-gradient(135deg, #1e1e24, #0a0a0b)';
  };

  // Icon corresponding to the category
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

  return (
    <div className="product-card rock-card" onClick={() => navigateTo('product', null, product.id)}>
      {/* Category Tag */}
      <span className="product-category-tag">
        <Tag size={12} style={{ marginRight: '4px' }} />
        {getCategoryLabel(product.category)}
      </span>

      {/* Image Area */}
      <div className="product-image-container">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-card-image" />
        ) : (
          <div className="product-graphic-fallback" style={{ background: getFallbackGradient(product.id) }}>
            <span className="product-emoji">{getProductEmoji(product.id)}</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="product-image-overlay">
          <button className="overlay-btn headbang-hover" title="Преглед">
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-short-desc">
          {product.description.substring(0, 70)}...
        </p>

        <div className="product-footer">
          <div className="product-price">{product.price.toFixed(2)} €</div>
          
          <button 
            className="btn-quick-add pulse-glow"
            onClick={handleQuickAdd}
            title="Добави в количката"
          >
            <ShoppingCart size={16} />
            <span>Добави в количка</span>
          </button>
        </div>
      </div>

      <style>{`
        .product-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-category-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(10, 10, 11, 0.85);
          backdrop-filter: blur(4px);
          color: var(--color-gold);
          border: 1px solid rgba(255, 179, 0, 0.3);
          padding: 4px 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 4px;
          z-index: 10;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
        }

        .product-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border-color);
          background: #0f0f12;
        }

        .product-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-card-image {
          transform: scale(1.05);
        }

        .product-graphic-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          user-select: none;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-graphic-fallback {
          transform: scale(1.15) rotate(5deg);
        }

        .product-emoji {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }

        .product-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-image-overlay {
          opacity: 1;
        }

        .overlay-btn {
          background: var(--color-accent);
          color: var(--text-primary);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px var(--color-accent-glow);
          border: 1px solid #ff4d66;
        }

        .product-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-name {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.3;
          font-weight: 700;
          transition: color var(--transition-fast);
        }

        .product-card:hover .product-name {
          color: var(--color-accent);
        }

        .product-short-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.5;
          flex-grow: 1;
        }

        .product-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: stretch;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 15px;
        }

        .product-price {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .btn-quick-add {
          background: linear-gradient(135deg, var(--bg-hover) 0%, #17171d 100%);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 10px 16px;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 4px;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
        }

        .product-card:hover .btn-quick-add {
          border-color: var(--color-accent);
          background: linear-gradient(135deg, var(--color-accent) 0%, #a30018 100%);
          box-shadow: 0 4px 10px var(--color-accent-glow);
        }

        .btn-quick-add:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
};
