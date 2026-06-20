import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowLeft, Send, CheckCircle } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, placeOrder, navigateTo } = useStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod = Cash on Delivery
  const [notes, setNotes] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const shippingDetails = {
      fullName,
      email,
      phone,
      city,
      address,
      paymentMethod: paymentMethod === 'cod' ? 'Наложен платеж' : 'Кредитна/Дебитна карта (симулирано)',
      notes: notes || undefined
    };

    const newOrder = placeOrder(shippingDetails);
    setPlacedOrder(newOrder);
    setIsSuccess(true);
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

  if (isSuccess && placedOrder) {
    return (
      <div className="checkout-success-container fade-in">
        <div className="success-badge-icon">
          <CheckCircle size={60} className="text-neon-gold" />
        </div>
        <h2 className="rock-title text-neon-red">Поръчката е приета!</h2>
        <p className="success-order-num">
          Номер на поръчката: <strong className="text-neon-gold">{placedOrder.id}</strong>
        </p>
        <p className="success-text-info">
          Благодарим ти за доверието, <strong>{placedOrder.shippingDetails.fullName}</strong>! Изпратихме потвърждение на <strong>{placedOrder.shippingDetails.email}</strong>.
          Нашият рок консултант ще се свърже с теб на <strong>{placedOrder.shippingDetails.phone}</strong> за финално потвърждение преди изпращането.
        </p>

        <div className="order-summary-box rock-card">
          <h3>Резюме на поръчката:</h3>
          <div className="summary-items">
            {placedOrder.items.map((item: any, idx: number) => (
              <div key={idx} className="summary-item-row">
                <span className="summary-item-name">
                  {getProductEmoji(item.product.id)} {item.product.name} 
                  {item.selectedSize && ` (Размер: ${item.selectedSize})`}
                  {item.selectedOption && ` (${item.selectedOption})`}
                  <strong> x{item.quantity}</strong>
                </span>
                <span className="summary-item-price">{(item.product.price * item.quantity).toFixed(2)} лв.</span>
              </div>
            ))}
          </div>
          <div className="summary-total-row">
            <span>Общо платено:</span>
            <span className="total-val text-neon-red">{placedOrder.total.toFixed(2)} лв.</span>
          </div>
          <div className="delivery-details-summary">
            <p><strong>Адрес за доставка:</strong> гр. {placedOrder.shippingDetails.city}, {placedOrder.shippingDetails.address}</p>
            <p><strong>Метод на плащане:</strong> {placedOrder.shippingDetails.paymentMethod}</p>
          </div>
        </div>

        <button className="btn-rock" onClick={() => navigateTo('home')}>
          Обратно към Магазина 🤘
        </button>

        <style>{`
          .checkout-success-container {
            max-width: 650px;
            margin: 50px auto;
            text-align: center;
            padding: 20px;
          }

          .success-badge-icon {
            margin-bottom: 20px;
            animation: headbang 1s infinite alternate;
          }

          .success-order-num {
            font-size: 1.2rem;
            margin: 15px 0 20px;
          }

          .success-text-info {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 30px;
          }

          .order-summary-box {
            background: #111114;
            padding: 25px;
            text-align: left;
            margin-bottom: 30px;
          }

          .order-summary-box h3 {
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 10px;
            margin-bottom: 15px;
          }

          .summary-items {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 15px;
          }

          .summary-item-row {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: var(--text-secondary);
          }

          .summary-item-name strong {
            color: var(--text-primary);
          }

          .summary-total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--border-color);
            padding-top: 15px;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 15px;
          }

          .total-val {
            font-size: 1.3rem;
            font-weight: 800;
          }

          .delivery-details-summary {
            font-size: 0.85rem;
            color: var(--text-secondary);
            background: rgba(0, 0, 0, 0.15);
            padding: 12px;
            border-radius: 4px;
            border: 1px solid var(--border-color);
          }

          .delivery-details-summary p {
            margin-bottom: 6px;
          }
          
          .delivery-details-summary p:last-child {
            margin-bottom: 0;
          }
        `}</style>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container error-container fade-in">
        <ShoppingBag size={48} className="text-secondary" />
        <h2 className="rock-title text-neon-red">Количката ти е празна</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Добави рок продукти в количката, преди да финализираш поръчката.</p>
        <button className="btn-rock" onClick={() => navigateTo('home')}>
          Към Магазина 🤘
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page container fade-in">
      <button className="back-btn-checkout" onClick={() => navigateTo('home')}>
        <ArrowLeft size={16} />
        <span>Назад към началото</span>
      </button>

      <h1 className="checkout-title rock-title text-neon-red">Завършване на поръчката</h1>

      <div className="checkout-grid">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="checkout-form-col rock-card">
          <h2 className="column-title">1. Данни за доставка</h2>
          
          <div className="form-group">
            <label className="rock-label">Две имена</label>
            <input
              type="text"
              required
              className="rock-input"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="напр. Христо Ботев"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="rock-label">Имейл адрес</label>
              <input
                type="email"
                required
                className="rock-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="heavy@metal.bg"
              />
            </div>
            <div className="form-group">
              <label className="rock-label">Телефон за връзка</label>
              <input
                type="tel"
                required
                className="rock-input"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0888123456"
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="rock-label">Град</label>
              <input
                type="text"
                required
                className="rock-input"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="София"
              />
            </div>
            <div className="form-group">
              <label className="rock-label">Адрес или офис на Спиди/Еконт</label>
              <input
                type="text"
                required
                className="rock-input"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="ул. Рок звезда 12"
              />
            </div>
          </div>

          <h2 className="column-title" style={{ marginTop: '20px' }}>2. Начин на плащане</h2>
          <div className="payment-toggle-group">
            <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="payment" 
                value="cod" 
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="hidden-radio"
              />
              <span>Наложен платеж (в брой/карта при доставка)</span>
            </label>
            <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="payment" 
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="hidden-radio"
              />
              <span>Дебитна / Кредитна карта (Симулация)</span>
            </label>
          </div>

          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="rock-label">Бележка към поръчката (Опционално)</label>
            <textarea
              rows={3}
              className="rock-textarea"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Бележка към куриера, указания за доставка..."
            />
          </div>
        </form>

        {/* Order Details Column */}
        <div className="checkout-summary-col">
          <div className="rock-card summary-inner-box">
            <h2 className="column-title">3. Твоят избор</h2>

            <div className="checkout-items-list">
              {cart.map((item, idx) => (
                <div key={idx} className="checkout-item-row">
                  <div className="checkout-item-preview-tiny">
                    <span>{getProductEmoji(item.product.id)}</span>
                  </div>
                  <div className="checkout-item-details-tiny">
                    <h4>{item.product.name}</h4>
                    <p>
                      {item.selectedSize && `Размер: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedOption && ' | '}
                      {item.selectedOption && `${item.selectedOption}`}
                    </p>
                    <span className="qty-and-price">{item.quantity} x {item.product.price.toFixed(2)} лв.</span>
                  </div>
                  <div className="checkout-item-total-tiny">
                    {(item.product.price * item.quantity).toFixed(2)} лв.
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-calc-block">
              <div className="calc-row">
                <span>Междинна сума:</span>
                <span>{cartTotal.toFixed(2)} лв.</span>
              </div>
              <div className="calc-row">
                <span>Доставка:</span>
                <span className="text-neon-gold">БЕЗПЛАТНА 🤘</span>
              </div>
              <div className="calc-row total-calc-row">
                <span>Общо:</span>
                <span className="text-neon-red">{cartTotal.toFixed(2)} лв.</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-rock checkout-submit-btn pulse-glow"
              onClick={(e) => {
                const form = document.querySelector('.checkout-form-col') as HTMLFormElement;
                if (form && form.reportValidity()) {
                  handleSubmit(e);
                }
              }}
            >
              <Send size={16} />
              <span>Потвърди Поръчката</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-page {
          padding-top: 40px;
          padding-bottom: 80px;
        }

        .back-btn-checkout {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.9rem;
          transition: var(--transition-fast);
          margin-bottom: 20px;
        }

        .back-btn-checkout:hover {
          color: var(--color-accent);
          transform: translateX(-4px);
        }

        .checkout-title {
          font-size: 2.2rem;
          margin-bottom: 45px;
        }

        /* Grid */
        .checkout-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        /* Form Col */
        .checkout-form-col {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .column-title {
          font-size: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          margin-bottom: 10px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        /* Payment Select */
        .payment-toggle-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payment-option {
          background: #0f0f12;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 15px 20px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
        }

        .payment-option.active {
          border-color: var(--color-accent);
          background: rgba(255, 42, 75, 0.04);
          box-shadow: 0 0 10px var(--border-glow);
        }

        .hidden-radio {
          margin-right: 12px;
          accent-color: var(--color-accent);
        }

        /* Summary Col */
        .summary-inner-box {
          padding: 30px;
        }

        .checkout-items-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-height: 250px;
          overflow-y: auto;
          margin-bottom: 20px;
          padding-right: 5px;
        }

        .checkout-item-row {
          display: flex;
          gap: 12px;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 12px;
        }

        .checkout-item-preview-tiny {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .checkout-item-details-tiny {
          flex-grow: 1;
        }

        .checkout-item-details-tiny h4 {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .checkout-item-details-tiny p {
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin: 2px 0;
        }

        .qty-and-price {
          font-size: 0.75rem;
          color: var(--color-gold);
          font-weight: 700;
        }

        .checkout-item-total-tiny {
          font-size: 0.9rem;
          font-weight: 700;
          white-space: nowrap;
        }

        /* Calculation block */
        .checkout-calc-block {
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color);
          padding: 20px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 25px;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .total-calc-row {
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .checkout-submit-btn {
          width: 100%;
          height: 48px;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};
