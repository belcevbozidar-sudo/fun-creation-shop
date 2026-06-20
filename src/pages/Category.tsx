import React from 'react';
import { useStore } from '../context/StoreContext';
import { products, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Wand2 } from 'lucide-react';

export const Category: React.FC = () => {
  const { activeCategoryId, navigateTo } = useStore();

  const category = activeCategoryId ? (CATEGORIES as any)[activeCategoryId] : null;
  const categoryProducts = products.filter(p => p.category === activeCategoryId);

  if (!category) {
    return (
      <div className="container error-container fade-in">
        <h2 className="rock-title text-neon-red">Категорията не е намерена</h2>
        <button className="btn-rock" onClick={() => navigateTo('home')}>
          Обратно към началото
        </button>
      </div>
    );
  }

  return (
    <div className="category-page fade-in">
      {/* Category Header */}
      <div className="category-header-banner">
        <div className="container banner-content">
          <button className="back-btn" onClick={() => navigateTo('home')}>
            <ArrowLeft size={16} />
            <span>Назад</span>
          </button>
          
          <h1 className="category-title rock-title rock-glow">{category.title}</h1>
          <p className="category-subtitle text-neon-gold">{category.subtitle}</p>
          <p className="category-desc">{category.description}</p>
        </div>
      </div>

      {/* Custom Call-to-action for PoD and 3D printing */}
      {(activeCategoryId === 'pod' || activeCategoryId === '3dprint') && (
        <div className="container">
          <div className="custom-promo-bar rock-card pulse-glow">
            <div className="promo-info">
              <div className="promo-title">
                <Wand2 className="promo-icon text-neon-red animate-pulse" size={24} />
                <h3>Търсиш нещо изцяло персонализирано?</h3>
              </div>
              <p className="promo-text">
                {activeCategoryId === '3dprint' 
                  ? 'Имаш готов 3D модел или конкретен детайл за принтиране? Изпрати ни файловете си и ще изчислим цена веднага.'
                  : 'Поръчай тениски, чаши, шапки или нашивки с логото на твоята банда или твой собствен рок дизайн.'
                }
              </p>
            </div>
            <button className="btn-rock promo-btn" onClick={() => navigateTo('custom')}>
              Заяви Къстъм Проект 🤘
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="container category-products-section">
        {categoryProducts.length === 0 ? (
          <p className="no-products">В момента няма продукти в тази категория.</p>
        ) : (
          <div className="category-products-grid">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .category-page {
          padding-bottom: 80px;
        }

        .category-header-banner {
          background: linear-gradient(180deg, #111115 0%, #0a0a0b 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 50px 0;
          margin-bottom: 40px;
        }

        .banner-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }

        .back-btn:hover {
          color: var(--color-accent);
          transform: translateX(-4px);
        }

        .category-title {
          font-size: 2.5rem;
          margin-top: 10px;
        }

        .category-subtitle {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .category-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 700px;
          line-height: 1.6;
        }

        /* Custom Promo Bar */
        .custom-promo-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px;
          background: #141417;
          border: 1px solid var(--color-accent);
          margin-bottom: 40px;
          gap: 20px;
        }

        .promo-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .promo-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .promo-title h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .promo-icon {
          color: var(--color-accent);
          animation: headbang 1s infinite alternate;
        }

        .promo-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .promo-btn {
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .custom-promo-bar {
            flex-direction: column;
            align-items: stretch;
            padding: 20px;
            text-align: center;
          }
          .promo-title {
            justify-content: center;
          }
          .promo-btn {
            width: 100%;
          }
        }

        /* Grid */
        .category-products-section {
          margin-top: 20px;
        }

        .category-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        @media (max-width: 1024px) {
          .category-products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .category-products-grid {
            grid-template-columns: 1fr;
          }
        }

        .no-products {
          text-align: center;
          color: var(--text-secondary);
          padding: 40px 0;
          font-size: 1.1rem;
        }

        .error-container {
          padding: 100px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
        }
      `}</style>
    </div>
  );
};
