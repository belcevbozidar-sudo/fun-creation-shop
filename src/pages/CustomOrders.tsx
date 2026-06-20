import React from 'react';
import { CustomOrderForm } from '../components/CustomOrderForm';
import { Layers, Hammer } from 'lucide-react';

export const CustomOrders: React.FC = () => {
  return (
    <div className="custom-orders-page fade-in container">
      {/* Intro Header */}
      <div className="custom-orders-header">
        <h1 className="rock-title text-neon-red">Индивидуални Проекти</h1>
        <p className="subtitle">
          Материализираме твоите идеи. Без значение дали става въпрос за уникален рок мърч или сложен 3D принтиран модел – ние сме насреща.
        </p>
      </div>

      {/* Render the Form */}
      <CustomOrderForm initialType="pod" />

      {/* Process & Technologies section */}
      <section className="tech-process-section">
        <h2 className="section-title rock-title">Как работи?</h2>
        
        <div className="process-steps-grid">
          <div className="step-card rock-card">
            <div className="step-num text-neon-red">01</div>
            <h3>Заявка</h3>
            <p>Опиши идеята си във формата по-горе и качи модел или дизайн, ако разполагаш с такъв.</p>
          </div>
          <div className="step-card rock-card">
            <div className="step-num text-neon-gold">02</div>
            <h3>Оценка</h3>
            <p>Нашите рок инженери разглеждат проекта и ти изпращат оферта с цена до няколко часа.</p>
          </div>
          <div className="step-card rock-card">
            <div className="step-num text-neon-red">03</div>
            <h3>Изработка</h3>
            <p>След одобрение стартираме производството – принтираме, бродираме или печатаме с прецизност.</p>
          </div>
          <div className="step-card rock-card">
            <div className="step-num text-neon-gold">04</div>
            <h3>Доставка</h3>
            <p>Изпращаме готовия продукт по Спиди или Еконт с опция за преглед и тест.</p>
          </div>
        </div>

        <div className="tech-showcase rock-card">
          <div className="tech-col">
            <h3 className="tech-col-title text-neon-red">
              <Layers size={20} className="tech-icon" />
              Принт Он Деманд Технологии
            </h3>
            <ul>
              <li><strong>Ситопечат и DTG печат:</strong> Дълготрайни цветове, които не се напукват или белят след пране.</li>
              <li><strong>3D Бродерия:</strong> Премиум релефна бродерия за шапки, якета и нашивки с изключителен контраст.</li>
              <li><strong>Лазерно гравиране:</strong> Прецизно гравиране върху кожа, метал (за ключодържатели) и дърво.</li>
            </ul>
          </div>
          
          <div className="tech-divider"></div>
          
          <div className="tech-col">
            <h3 className="tech-col-title text-neon-gold">
              <Hammer size={20} className="tech-icon" />
              3D Принтиране & Оборудване
            </h3>
            <ul>
              <li><strong>FDM Принтиране:</strong> Големи, здрави конструктивни детайли от PLA, PETG, ABS и карбонов Nylon.</li>
              <li><strong>SLA (Resin) Принтиране:</strong> Невероятно детайлни фигури и миниатюри с разделителна способност до 4K.</li>
              <li><strong>Пост-обработка:</strong> Ръчно шлайфане, грундиране и боядисване с акрилни бои за автентичен износен или рок ефект.</li>
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        .custom-orders-page {
          padding-top: 40px;
          padding-bottom: 80px;
        }

        .custom-orders-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .custom-orders-header h1 {
          font-size: 2.8rem;
        }

        .custom-orders-header .subtitle {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        /* Steps */
        .tech-process-section {
          margin-top: 80px;
        }

        .tech-process-section .section-title {
          font-size: 2rem;
          margin-bottom: 40px;
        }

        .process-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 50px;
        }

        @media (max-width: 900px) {
          .process-steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .process-steps-grid {
            grid-template-columns: 1fr;
          }
        }

        .step-card {
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }

        .step-num {
          font-family: var(--font-logo);
          font-size: 2.2rem;
          line-height: 1;
        }

        .step-card h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .step-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Tech Showcase */
        .tech-showcase {
          display: flex;
          padding: 40px;
          gap: 40px;
          background: #101013;
        }

        .tech-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tech-col-title {
          font-size: 1.2rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tech-icon {
          flex-shrink: 0;
        }

        .tech-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .tech-col li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .tech-col li strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 4px;
        }

        .tech-divider {
          width: 1px;
          background: var(--border-color);
          align-self: stretch;
        }

        @media (max-width: 768px) {
          .tech-showcase {
            flex-direction: column;
            padding: 25px;
            gap: 30px;
          }
          .tech-divider {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
};
