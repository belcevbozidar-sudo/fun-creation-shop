import React from 'react';
import { useStore } from '../context/StoreContext';
import { FileText, ShoppingBag, Trash2, ArrowLeft, CheckCircle2, User, Phone, Mail } from 'lucide-react';

export const Admin: React.FC = () => {
  const { orders, customRequests, navigateTo } = useStore();

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

  const handleClearDatabase = () => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете всички поръчки и заявки от LocalStorage?')) {
      localStorage.removeItem('anarchy_orders');
      localStorage.removeItem('anarchy_custom_requests');
      window.location.reload();
    }
  };

  return (
    <div className="admin-page container fade-in">
      <button className="back-btn-admin" onClick={() => navigateTo('home')}>
        <ArrowLeft size={16} />
        <span>Към магазина</span>
      </button>

      <div className="admin-header-row">
        <h1 className="rock-title text-neon-gold">Админ Табло</h1>
        <button className="clear-db-btn" onClick={handleClearDatabase}>
          <Trash2 size={16} />
          <span>Изчисти Базата</span>
        </button>
      </div>

      <p className="admin-desc">
        В това табло се записват в реално време всички направени поръчки и запитвания за индивидуални проекти от сесиите на браузъра (съхраняват се в LocalStorage).
      </p>

      {/* Grid of panels */}
      <div className="admin-grid">
        
        {/* Panel 1: Orders */}
        <div className="admin-panel rock-card">
          <div className="panel-header text-neon-red">
            <ShoppingBag size={20} />
            <h2>Кошница - Поръчки ({orders.length})</h2>
          </div>

          <div className="panel-body">
            {orders.length === 0 ? (
              <p className="empty-panel-text">Няма регистрирани поръчки...</p>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="admin-order-card">
                    <div className="card-top">
                      <span className="order-id text-neon-gold">{order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>

                    <div className="client-details">
                      <p><User size={12} /> {order.shippingDetails.fullName}</p>
                      <p><Phone size={12} /> {order.shippingDetails.phone} | <Mail size={12} /> {order.shippingDetails.email}</p>
                      <p className="address-text"><strong>Адрес:</strong> гр. {order.shippingDetails.city}, {order.shippingDetails.address}</p>
                      {order.shippingDetails.notes && (
                        <p className="notes-text"><strong>Бележка:</strong> {order.shippingDetails.notes}</p>
                      )}
                    </div>

                    <div className="order-items">
                      <h4>Поръчани продукти:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item-row">
                          <span>
                            {getProductEmoji(item.product.id)} {item.product.name} 
                            {item.selectedSize && ` (Разм: ${item.selectedSize})`}
                            {item.selectedOption && ` (${item.selectedOption})`}
                            <strong> x{item.quantity}</strong>
                          </span>
                          <span>{(item.product.price * item.quantity).toFixed(2)} лв.</span>
                        </div>
                      ))}
                    </div>

                    <div className="card-footer">
                      <span><strong>Плащане:</strong> {order.shippingDetails.paymentMethod}</span>
                      <span className="order-total text-neon-red">Общо: {order.total.toFixed(2)} лв.</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Panel 2: Custom Requests */}
        <div className="admin-panel rock-card">
          <div className="panel-header text-neon-gold">
            <FileText size={20} />
            <h2>Къстъм Заявки PoD & 3D ({customRequests.length})</h2>
          </div>

          <div className="panel-body">
            {customRequests.length === 0 ? (
              <p className="empty-panel-text">Няма запитвания за индивидуални проекти...</p>
            ) : (
              <div className="orders-list">
                {customRequests.map(req => (
                  <div key={req.id} className="admin-order-card request-card">
                    <div className="card-top">
                      <span className="order-id text-neon-gold">{req.id}</span>
                      <span className="order-date">{req.date}</span>
                    </div>

                    <div className="client-details">
                      <p><User size={12} /> {req.fullName}</p>
                      <p><Phone size={12} /> {req.phone} | <Mail size={12} /> {req.email}</p>
                      <p className="type-badge-row">
                        <strong>Тип: </strong> 
                        <span className={`req-type-badge ${req.type === '3dprint' ? 'type-3d' : 'type-pod'}`}>
                          {req.type === '3dprint' ? '3D Принтиране' : 'Принт он Деманд'}
                        </span>
                      </p>
                    </div>

                    <div className="request-desc-box">
                      <h4>Идея / Описание на клиента:</h4>
                      <p className="desc-text">"{req.description}"</p>
                      
                      {req.type === '3dprint' && (
                        <div className="req-specs">
                          <span><strong>Материал:</strong> {req.material}</span>
                          <span><strong>Цвят:</strong> {req.color}</span>
                        </div>
                      )}

                      {req.fileLink && (
                        <p className="file-box">
                          <strong>Дизайн файл:</strong> 
                          <a href={req.fileLink} target="_blank" rel="noreferrer" className="admin-file-link">
                             Линк към файла &rarr;
                          </a>
                        </p>
                      )}
                    </div>

                    <div className="card-footer">
                      <span><strong>Бройки:</strong> {req.quantity} бр.</span>
                      <span className="status-label pending-status"><CheckCircle2 size={12} /> Изчаква оферта</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .admin-page {
          padding-top: 40px;
          padding-bottom: 80px;
        }

        .back-btn-admin {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.9rem;
          transition: var(--transition-fast);
          margin-bottom: 20px;
        }

        .back-btn-admin:hover {
          color: var(--color-accent);
          transform: translateX(-4px);
        }

        .admin-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .clear-db-btn {
          background: rgba(255, 42, 75, 0.1);
          color: var(--color-accent);
          border: 1px solid rgba(255, 42, 75, 0.3);
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-fast);
        }

        .clear-db-btn:hover {
          background: var(--color-accent);
          color: var(--text-dark);
          box-shadow: 0 0 12px var(--color-accent-glow);
        }

        .admin-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 40px;
          line-height: 1.5;
        }

        /* Grid */
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .admin-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Panel details */
        .admin-panel {
          border-radius: 8px;
          overflow: hidden;
        }

        .panel-header {
          background: #111115;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .panel-header h2 {
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .panel-body {
          padding: 20px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .empty-panel-text {
          text-align: center;
          color: var(--text-secondary);
          padding: 40px 0;
          font-size: 0.95rem;
        }

        /* Order Card */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-order-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 10px;
        }

        .order-id {
          font-family: monospace;
          font-weight: 800;
          font-size: 1.05rem;
        }

        .order-date {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .client-details {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .client-details p {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .address-text, .notes-text {
          margin-top: 4px;
        }

        .address-text strong, .notes-text strong {
          color: var(--text-primary);
        }

        .order-items {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          padding: 12px;
        }

        .order-items h4, .request-desc-box h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .order-item-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .order-item-row:last-child {
          margin-bottom: 0;
        }

        .card-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .order-total {
          font-weight: 800;
          font-size: 1.1rem;
        }

        /* Request specific styling */
        .type-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .req-type-badge {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 3px;
        }

        .type-3d {
          background: rgba(255, 179, 0, 0.15);
          color: var(--color-gold);
          border: 1px solid rgba(255, 179, 0, 0.3);
        }

        .type-pod {
          background: rgba(255, 42, 75, 0.15);
          color: var(--color-accent);
          border: 1px solid rgba(255, 42, 75, 0.3);
        }

        .request-desc-box {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 12px;
          border-radius: 4px;
        }

        .desc-text {
          font-style: italic;
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .req-specs {
          display: flex;
          gap: 15px;
          font-size: 0.8rem;
          margin-top: 10px;
          color: var(--text-secondary);
        }

        .req-specs strong {
          color: var(--text-primary);
        }

        .file-box {
          margin-top: 10px;
          font-size: 0.8rem;
        }

        .admin-file-link {
          color: var(--color-gold);
          font-weight: 600;
          margin-left: 6px;
        }

        .admin-file-link:hover {
          text-decoration: underline;
        }

        .status-label {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .pending-status {
          color: var(--color-gold);
        }
      `}</style>
    </div>
  );
};
