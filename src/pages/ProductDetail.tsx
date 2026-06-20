import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, ShoppingCart, Info, Check, Plus, Minus } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { activeProductId, navigateTo, addToCart } = useStore();

  const product = products.find(p => p.id === activeProductId);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Auto-select first size/option if they exist
  React.useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.options && product.options.length > 0) {
        setSelectedOption(product.options[0]);
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container error-container fade-in">
        <h2 className="rock-title text-neon-red">Продуктът не е намерен</h2>
        <button className="btn-rock" onClick={() => navigateTo('home')}>
          Обратно към началото
        </button>
      </div>
    );
  }

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || undefined, selectedOption || undefined);
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
    if (id.includes('botev')) return 'linear-gradient(135deg, #111, #800)';
    if (id.includes('levski')) return 'linear-gradient(135deg, #111, #004)';
    if (id.includes('simeon')) return 'linear-gradient(135deg, #111, #540)';
    if (id.includes('maistora')) return 'linear-gradient(135deg, #111, #305)';
    if (id.includes('mug')) return 'linear-gradient(135deg, #222, #444)';
    if (id.includes('cap')) return 'linear-gradient(135deg, #222, #111)';
    if (id.includes('keychain')) return 'linear-gradient(135deg, #422, #211)';
    return 'linear-gradient(135deg, #1e1e24, #0a0a0b)';
  };

  return (
    <div className="product-detail-page fade-in container">
      {/* Back navigation */}
      <button className="back-btn-detail" onClick={() => navigateTo('category', product.category)}>
        <ArrowLeft size={16} />
        <span>Обратно в колекцията</span>
      </button>

      {/* Main product card */}
      <div className="product-detail-grid">
        {/* Gallery / Image Column */}
        <div className="detail-image-col">
          <div className="large-image-holder" style={{ background: getFallbackGradient(product.id) }}>
            <span className="large-emoji">{getProductEmoji(product.id)}</span>
          </div>

          {/* Simulated thumbnails */}
          <div className="thumbnail-list">
            <div className="thumbnail-item active" style={{ background: getFallbackGradient(product.id) }}>
              <span>{getProductEmoji(product.id)}</span>
            </div>
            <div className="thumbnail-item" style={{ background: getFallbackGradient(product.id), opacity: 0.5 }}>
              <span>🖤</span>
            </div>
            <div className="thumbnail-item" style={{ background: getFallbackGradient(product.id), opacity: 0.5 }}>
              <span>🤘</span>
            </div>
          </div>
        </div>

        {/* Purchase / Description Column */}
        <div className="detail-info-col">
          <h1 className="detail-name">{product.name}</h1>
          <div className="detail-price-row">
            <span className="detail-price text-neon-red">{product.price.toFixed(2)} лв.</span>
            <span className="stock-status"><Check size={14} /> Налично</span>
          </div>

          <p className="detail-desc">{product.description}</p>

          <div className="options-divider"></div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="option-select-group">
              <label className="rock-label">Избери размер</label>
              <div className="size-selector-grid">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Options Selection */}
          {product.options && product.options.length > 0 && (
            <div className="option-select-group">
              <label className="rock-label">Избери вариант</label>
              <div className="option-selector-column">
                {product.options.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`option-btn ${selectedOption === opt ? 'active' : ''}`}
                    onClick={() => setSelectedOption(opt)}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Purchase Action */}
          <div className="purchase-controls-row">
            <div className="qty-picker">
              <button className="qty-picker-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus size={14} />
              </button>
              <span className="qty-picker-val">{quantity}</span>
              <button className="qty-picker-btn" onClick={() => setQuantity(q => q + 1)}>
                <Plus size={14} />
              </button>
            </div>

            <button className="btn-rock detail-buy-btn pulse-glow" onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              <span>Добави в количката</span>
            </button>
          </div>

          {/* Specs / Bullet points */}
          <div className="specs-card rock-card">
            <h3 className="specs-title"><Info size={16} /> Характеристики</h3>
            <ul className="specs-list">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related items */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2 className="related-title rock-title">Още от тази категория</h2>
          <div className="related-grid">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        .product-detail-page {
          padding-top: 40px;
          padding-bottom: 80px;
        }

        .back-btn-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.9rem;
          transition: var(--transition-fast);
          margin-bottom: 30px;
        }

        .back-btn-detail:hover {
          color: var(--color-accent);
          transform: translateX(-4px);
        }

        /* Grid */
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 50px;
          margin-bottom: 80px;
        }

        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Left Col */
        .detail-image-col {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .large-image-holder {
          height: 450px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .large-emoji {
          font-size: 8rem;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));
        }

        .thumbnail-list {
          display: flex;
          gap: 12px;
        }

        .thumbnail-item {
          width: 75px;
          height: 75px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: var(--transition-fast);
        }

        .thumbnail-item:hover, .thumbnail-item.active {
          border-color: var(--color-accent);
          opacity: 1 !important;
          box-shadow: 0 0 10px var(--border-glow);
        }

        /* Right Col */
        .detail-info-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-name {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .detail-price-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .detail-price {
          font-size: 2rem;
          font-weight: 800;
        }

        .stock-status {
          background: rgba(76, 175, 80, 0.15);
          color: #4caf50;
          border: 1px solid rgba(76, 175, 80, 0.3);
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .detail-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1rem;
        }

        .options-divider {
          border-top: 1px solid var(--border-color);
        }

        /* Custom options select */
        .option-select-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .size-selector-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .size-btn {
          width: 50px;
          height: 50px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          background: #0f0f12;
          color: var(--text-primary);
          font-weight: 700;
          transition: var(--transition-fast);
        }

        .size-btn:hover {
          border-color: var(--text-secondary);
        }

        .size-btn.active {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--text-dark);
          box-shadow: 0 0 10px var(--color-accent-glow);
        }

        .option-selector-column {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .option-btn {
          text-align: left;
          padding: 12px 16px;
          background: #0f0f12;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .option-btn:hover {
          border-color: var(--text-secondary);
        }

        .option-btn.active {
          border-color: var(--color-accent);
          background: rgba(255, 42, 75, 0.05);
          box-shadow: 0 0 10px var(--border-glow);
        }

        /* Purchase Row */
        .purchase-controls-row {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-top: 10px;
        }

        .qty-picker {
          display: flex;
          align-items: center;
          background: #0f0f12;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 4px;
          height: 48px;
        }

        .qty-picker-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          border-radius: 3px;
        }

        .qty-picker-btn:hover {
          color: var(--color-accent);
          background: rgba(255, 42, 75, 0.1);
        }

        .qty-picker-val {
          font-size: 1.1rem;
          font-weight: 700;
          min-width: 40px;
          text-align: center;
        }

        .detail-buy-btn {
          flex-grow: 1;
          height: 48px;
          font-size: 1rem;
        }

        @media (max-width: 480px) {
          .purchase-controls-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .qty-picker {
            justify-content: space-between;
          }
        }

        /* Specs block */
        .specs-card {
          padding: 24px;
          background: rgba(0, 0, 0, 0.2);
        }

        .specs-title {
          font-size: 1.05rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 15px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .specs-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .specs-list li {
          position: relative;
          padding-left: 15px;
        }

        .specs-list li::before {
          content: '🤘';
          position: absolute;
          left: 0;
          top: 0;
          font-size: 0.65rem;
        }

        /* Related products */
        .related-section {
          border-top: 1px solid var(--border-color);
          padding-top: 60px;
        }

        .related-title {
          font-size: 1.8rem;
          margin-bottom: 30px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        @media (max-width: 900px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
