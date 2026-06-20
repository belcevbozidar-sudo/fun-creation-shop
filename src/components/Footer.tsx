import React from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Disc } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        {/* Info Column */}
        <div className="footer-col brand-col">
          <div className="logo-main rock-title">FUN CREATION</div>
          <p className="footer-desc">
            Онлайн магазин за бунтари с българско самосъзнание. Съчетаваме националната ни гордост и история със суровата сила на рока и метъла.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-icon-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Youtube" className="social-icon-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
            <a href="#" aria-label="Spotify" className="social-icon-link" title="Нашият рок плейлист"><Disc size={18} /></a>
          </div>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h3 className="footer-title text-neon-red">Категории</h3>
          <ul className="footer-links">
            <li><button onClick={() => navigateTo('category', 'revivalists')}>Възрожденци & Царе</button></li>
            <li><button onClick={() => navigateTo('category', 'pod')}>Принт он Деманд (PoD)</button></li>
            <li><button onClick={() => navigateTo('category', '3dprint')}>3D Принтиране</button></li>
            <li><button onClick={() => navigateTo('custom')}>Индивидуални поръчки</button></li>
          </ul>
        </div>

        {/* Contacts Column */}
        <div className="footer-col">
          <h3 className="footer-title text-neon-gold">Контакти</h3>
          <ul className="contact-list">
            <li>
              <Phone size={16} className="contact-icon" />
              <span>089 2 3 4 2 8 6 0</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>heavy@anarchy-heritage.bg</span>
            </li>
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>ул. Рок сцена 66, София, България</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-col newsletter-col">
          <h3 className="footer-title">Влез в клуба</h3>
          <p className="newsletter-text">Абонирай се за най-новите ни рок модели и ексклузивни оферти.</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Добре дошъл в клуба на бунтарите! 🤘'); }}>
            <input type="email" placeholder="Твоят рок имейл..." required className="rock-input newsletter-input" />
            <button type="submit" className="btn-rock newsletter-btn">Абонирай се</button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} FUN CREATION. Всички права запазени. Made with metal in Bulgaria.
          </p>
          <div className="bottom-links">
            <a href="#" className="bottom-link">Условия за ползване</a>
            <a href="#" className="bottom-link">Поверителност</a>
          </div>
        </div>
      </div>

      <style>{`
        .main-footer {
          background: #08080a;
          border-top: 1px solid var(--border-color);
          padding-top: 60px;
          margin-top: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 2fr;
          gap: 40px;
          padding-bottom: 50px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .brand-col .logo-main {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .footer-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-icon-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .social-icon-link:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
          box-shadow: 0 0 10px var(--color-accent-glow);
          transform: translateY(-2px);
        }

        .footer-title {
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--color-accent);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links button {
          text-align: left;
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          padding: 2px 0;
        }

        .footer-links button:hover {
          color: var(--color-accent);
          padding-left: 5px;
        }

        .contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 15px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .contact-icon {
          color: var(--color-accent);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .newsletter-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .newsletter-input {
          background: #0c0c0e;
        }

        .newsletter-btn {
          padding: 10px 20px;
          font-size: 0.9rem;
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          background: #050506;
          padding: 25px 0;
        }

        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .bottom-links {
          display: flex;
          gap: 20px;
        }

        .bottom-link:hover {
          color: var(--color-accent);
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
            padding-bottom: 30px;
          }
          .bottom-container {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};
