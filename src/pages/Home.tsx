import React from 'react';
import { useStore } from '../context/StoreContext';
import { products, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Shield, Sparkles, Truck, Flame } from 'lucide-react';

export const Home: React.FC = () => {
  const { navigateTo } = useStore();
  
  // Pick some featured products
  const featuredProducts = products.filter(p => 
    ['hristo-botev-metal', '3d-skull-organizer', 'pod-rock-cap', '3d-rock-hand-holder'].includes(p.id)
  );

  const handleCategoryClick = (catId: string) => {
    navigateTo('category', catId);
  };

  const getCategoryEmoji = (id: string) => {
    if (id === 'revivalists') return '🦁';
    if (id === 'pod') return '☕';
    return '💀';
  };

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="badge-promo pulse-glow"><Flame size={14} /> НОВА РОК КОЛЕКЦИЯ</div>
          <h1 className="hero-title rock-title rock-glow">FUN CREATION</h1>
          <p className="hero-subtitle">
            Историята на България оживява в тежък китарен риф. Авторски тениски с възрожденци, принт он деманд мърч и луди 3D принтирани рок артикули.
          </p>
          <div className="hero-cta-group">
            <button className="btn-rock" onClick={() => navigateTo('category', 'revivalists')}>
              Разгледай Тениските 🤘
            </button>
            <button className="btn-rock-secondary" onClick={() => navigateTo('custom')}>
              Направи Си Мърч
            </button>
          </div>
        </div>

        {/* Infinite Scrolling Ticker Ribbon */}
        <div className="hero-ticker-wrap">
          <div className="hero-ticker">
            <span className="ticker-text">ВЪЗРОЖДЕНЦИ, ЦАРЕ & ХУДОЖНИЦИ 🤘</span>
            <span className="ticker-text">ПРИНТ ОН ДЕМАНД (PoD) 🤘</span>
            <span className="ticker-text">3D ПРИНТИРАНЕ 🤘</span>
            <span className="ticker-text">ВЪЗРОЖДЕНЦИ, ЦАРЕ & ХУДОЖНИЦИ 🤘</span>
            <span className="ticker-text">ПРИНТ ОН ДЕМАНД (PoD) 🤘</span>
            <span className="ticker-text">3D ПРИНТИРАНЕ 🤘</span>
            <span className="ticker-text">ВЪЗРОЖДЕНЦИ, ЦАРЕ & ХУДОЖНИЦИ 🤘</span>
            <span className="ticker-text">ПРИНТ ОН ДЕМАНД (PoD) 🤘</span>
            <span className="ticker-text">3D ПРИНТИРАНЕ 🤘</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section container">
        <h2 className="section-title rock-title">Категории</h2>
        <div className="categories-grid">
          {Object.values(CATEGORIES).map(cat => (
            <div 
              key={cat.id} 
              className="category-hero-card rock-card"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div className="category-bg-effect">
                <span className="category-emoji-huge">{getCategoryEmoji(cat.id)}</span>
              </div>
              <div className="category-card-content">
                <h3 className="category-card-title text-neon-red">{cat.title}</h3>
                <p className="category-card-desc">{cat.description}</p>
                <span className="category-card-link">
                  Влез в селекцията &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section container">
        <div className="section-header-flex">
          <h2 className="section-title rock-title">Бестселъри</h2>
          <button 
            className="view-all-btn text-neon-gold"
            onClick={() => navigateTo('category', 'revivalists')}
          >
            Виж всички продукти &rarr;
          </button>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Rock Features / Benefits */}
      <section className="features-benefits container">
        <div className="benefits-grid">
          <div className="benefit-card rock-card">
            <Shield size={36} className="benefit-icon text-neon-red" />
            <h3 className="benefit-title">Българска изработка</h3>
            <p className="benefit-desc">Всички тениски се отпечатват и пакетират ръчно в България с изключително внимание.</p>
          </div>
          <div className="benefit-card rock-card">
            <Sparkles size={36} className="benefit-icon text-neon-gold" />
            <h3 className="benefit-title">Безкомпромисно качество</h3>
            <p className="benefit-desc">100% органичен памук, премиум емайлирани канчета и прецизно 3D принтиране с висока плътност.</p>
          </div>
          <div className="benefit-card rock-card">
            <Truck size={36} className="benefit-icon text-neon-red" />
            <h3 className="benefit-title">Бърза доставка</h3>
            <p className="benefit-desc">Доставка до 48 часа с куриер до всяка точка на България с опция преглед и тест.</p>
          </div>
        </div>
      </section>

      <style>{`
        .home-page {
          padding-bottom: 80px;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          background: linear-gradient(rgba(10, 10, 11, 0.4), rgba(10, 10, 11, 0.95)), 
                      radial-gradient(circle at 80% 20%, rgba(255, 42, 75, 0.15) 0%, transparent 50%),
                      #0c0c0e;
          padding: 140px 0 100px;
          text-align: center;
          border-bottom: 1px solid var(--border-color);
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: var(--color-accent);
          padding: 12px 0;
          margin-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(255, 42, 75, 0.2);
          display: flex;
          align-items: center;
        }

        .hero-ticker {
          display: flex;
          white-space: nowrap;
          animation: ticker-scroll 20s linear infinite;
        }

        .ticker-text {
          display: inline-block;
          padding: 0 40px;
          font-size: 0.95rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #ffffff;
          letter-spacing: 1.5px;
        }

        @keyframes ticker-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.33%, 0, 0);
          }
        }

        .badge-promo {
          background: rgba(255, 42, 75, 0.15);
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 4.5rem;
          margin-bottom: 20px;
          line-height: 1;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 650px;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-cta-group {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .hero-section {
            padding: 90px 0 70px;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            padding: 0 20px;
            gap: 12px;
          }
        }

        /* Section Commons */
        .section-title {
          font-size: 2.2rem;
          margin-bottom: 30px;
          text-align: left;
        }

        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 30px;
        }

        .view-all-btn {
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 10px;
          transition: var(--transition-fast);
        }

        .view-all-btn:hover {
          letter-spacing: 0.5px;
        }

        /* Categories Section */
        .categories-section {
          padding-top: 80px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        @media (max-width: 900px) {
          .categories-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .category-hero-card {
          cursor: pointer;
          height: 280px;
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          position: relative;
        }

        .category-bg-effect {
          position: absolute;
          top: 20px;
          right: 20px;
          opacity: 0.08;
          transition: var(--transition-normal);
        }

        .category-hero-card:hover .category-bg-effect {
          opacity: 0.15;
          transform: scale(1.1) rotate(-10deg);
        }

        .category-emoji-huge {
          font-size: 6rem;
          line-height: 1;
        }

        .category-card-content {
          position: relative;
          z-index: 5;
        }

        .category-card-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
          font-weight: 800;
        }

        .category-card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .category-card-link {
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
          transition: var(--transition-fast);
        }

        .category-hero-card:hover .category-card-link {
          color: var(--color-accent);
        }

        /* Featured Section */
        .featured-section {
          padding-top: 80px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
          .section-header-flex {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }

        /* Features & Benefits */
        .features-benefits {
          padding-top: 80px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .benefit-card {
          padding: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .benefit-icon {
          filter: drop-shadow(0 0 8px var(--color-accent-glow));
        }

        .benefit-title {
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .benefit-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};
