import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Send, Upload, Cpu, Printer } from 'lucide-react';

interface CustomOrderFormProps {
  initialType?: 'pod' | '3dprint';
}

export const CustomOrderForm: React.FC<CustomOrderFormProps> = ({ initialType = 'pod' }) => {
  const { placeCustomRequest } = useStore();
  const [type, setType] = useState<'pod' | '3dprint'>(initialType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // 3D Print specific
  const [material, setMaterial] = useState('PLA');
  const [color, setColor] = useState('Черно');
  
  // File upload simulation
  const [fileLink, setFileLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setFileName(file.name);
      // Simulate network upload delay
      setTimeout(() => {
        setIsUploading(false);
        setFileLink(`https://anarchy-heritage.bg/uploads/mock_${Date.now()}_${file.name}`);
      }, 1200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestData = {
      type,
      fullName,
      email,
      phone,
      description,
      quantity,
      fileLink: fileLink || undefined,
      ...(type === '3dprint' ? { material, color } : {})
    };

    const request = placeCustomRequest(requestData);
    setSubmittedRequest(request);
    setIsSuccess(true);

    // Reset Form
    setFullName('');
    setEmail('');
    setPhone('');
    setDescription('');
    setQuantity(1);
    setFileName('');
    setFileLink('');
  };

  if (isSuccess && submittedRequest) {
    return (
      <div className="custom-order-success-card fade-in">
        <div className="success-icon-container">
          <span className="success-emoji">🤘</span>
        </div>
        <h3 className="rock-title text-neon-red">Заявката е получена!</h3>
        <p className="success-message">
          Здравей, <strong>{submittedRequest.fullName}</strong>. Твоята къстъм поръчка беше записана под номер 
          <span className="request-id text-neon-gold"> {submittedRequest.id}</span>.
        </p>
        <p className="success-details">
          Нашите рок инженери ще прегледат детайлите и ще се свържат с теб на <strong>{submittedRequest.email}</strong> или 
          <strong> {submittedRequest.phone}</strong> в рамките на 24 часа за уточняване на цената и доставката.
        </p>
        <div className="success-summary">
          <h4>Детайли по заявката:</h4>
          <ul>
            <li><strong>Тип:</strong> {submittedRequest.type === '3dprint' ? '3D Принтиране' : 'Принт он Деманд'}</li>
            <li><strong>Описание:</strong> {submittedRequest.description}</li>
            {submittedRequest.type === '3dprint' && (
              <>
                <li><strong>Материал:</strong> {submittedRequest.material}</li>
                <li><strong>Цвят:</strong> {submittedRequest.color}</li>
              </>
            )}
            <li><strong>Количество:</strong> {submittedRequest.quantity} бр.</li>
            {submittedRequest.fileLink && (
              <li><strong>Качен файл:</strong> <span className="file-link-text">{fileName || 'Прикачен файл'}</span></li>
            )}
          </ul>
        </div>
        <button className="btn-rock" onClick={() => setIsSuccess(false)}>
          Нова Заявка
        </button>

        <style>{`
          .custom-order-success-card {
            background: var(--bg-card);
            border: 1px solid var(--color-accent);
            box-shadow: 0 10px 30px var(--color-accent-glow);
            border-radius: 8px;
            padding: 40px 30px;
            text-align: center;
            max-width: 600px;
            margin: 40px auto;
          }

          .success-icon-container {
            font-size: 3.5rem;
            margin-bottom: 20px;
            animation: headbang 1s infinite alternate;
          }

          .success-message {
            font-size: 1.1rem;
            margin-top: 20px;
            color: var(--text-primary);
          }

          .request-id {
            font-weight: 800;
            font-size: 1.2rem;
          }

          .success-details {
            font-size: 0.95rem;
            color: var(--text-secondary);
            margin: 15px 0 25px;
          }

          .success-summary {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            padding: 20px;
            border-radius: 6px;
            text-align: left;
            margin-bottom: 30px;
          }

          .success-summary h4 {
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-primary);
            margin-bottom: 12px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 6px;
          }

          .success-summary ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 0.9rem;
          }

          .file-link-text {
            color: var(--color-gold);
            font-family: monospace;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="custom-order-form-container rock-card rock-accent-border">
      <div className="form-heading">
        <h3 className="rock-title text-neon-red">Индивидуална рок поръчка</h3>
        <p className="form-subtitle">
          Имаш шантава идея за мърч или ти трябва детайлен 3D модел? Опиши ни я и ние ще я материализираме!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="custom-form">
        {/* Toggle Custom Type */}
        <div className="type-toggle-group">
          <button
            type="button"
            className={`type-toggle-btn ${type === 'pod' ? 'active' : ''}`}
            onClick={() => setType('pod')}
          >
            <Printer size={18} />
            <span>Принт он Деманд (Мърч)</span>
          </button>
          <button
            type="button"
            className={`type-toggle-btn ${type === '3dprint' ? 'active' : ''}`}
            onClick={() => setType('3dprint')}
          >
            <Cpu size={18} />
            <span>3D Принтиране</span>
          </button>
        </div>

        {/* Two columns for contact */}
        <div className="form-row-2">
          <div className="form-group">
            <label className="rock-label">Име и Фамилия</label>
            <input
              type="text"
              required
              className="rock-input"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="напр. Иван Иванов"
            />
          </div>
          <div className="form-row-inner-2">
            <div className="form-group">
              <label className="rock-label">Имейл адрес</label>
              <input
                type="email"
                required
                className="rock-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ivan@metal.com"
              />
            </div>
            <div className="form-group">
              <label className="rock-label">Телефон</label>
              <input
                type="tel"
                required
                className="rock-input"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0888XXXXXX"
              />
            </div>
          </div>
        </div>

        {/* 3D Print Specific Fields */}
        {type === '3dprint' && (
          <div className="form-row-2 3d-specific-fields fade-in">
            <div className="form-group">
              <label className="rock-label">Материал</label>
              <select 
                className="rock-select" 
                value={material} 
                onChange={e => setMaterial(e.target.value)}
              >
                <option value="PLA">PLA (Екологичен, стандартен)</option>
                <option value="PETG">PETG (Издръжлив, температуроустойчив)</option>
                <option value="Resin">Resin (Висока детайлност, фигурки)</option>
                <option value="ABS/Nylon">ABS/Nylon (Максимална здравина)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="rock-label">Цвят на принтиране</label>
              <select 
                className="rock-select"
                value={color}
                onChange={e => setColor(e.target.value)}
              >
                <option value="Черно">Черно мат</option>
                <option value="Сиво">Метално сиво</option>
                <option value="Червено">Огнено червено</option>
                <option value="Кост">Костен цвят (износен)</option>
                <option value="Бяло">Чисто бяло</option>
              </select>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="form-group">
          <label className="rock-label">
            {type === '3dprint' 
              ? 'Опиши проекта (размери, предназначение, изисквания)' 
              : 'Опиши твоята идея (позиция на логото, тип артикул, текст)'
            }
          </label>
          <textarea
            required
            rows={4}
            className="rock-textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={type === '3dprint'
              ? 'Искам да принтирам череп-стойка за слушалки с височина 20 см...'
              : 'Искам черна тениска с голямо червено лого на гърдите с надпис "Heavy Metal Forever"...'
            }
          />
        </div>

        {/* Bottom controls */}
        <div className="form-row-2">
          {/* File simulation upload */}
          <div className="form-group">
            <label className="rock-label">Качи дизайн / 3D модел (STL, PNG, JPG)</label>
            <div className="upload-wrapper">
              <label className="upload-trigger-btn">
                <Upload size={16} />
                <span>{fileName ? 'Промени файла' : 'Избери файл'}</span>
                <input 
                  type="file" 
                  accept=".stl,.obj,.png,.jpg,.jpeg" 
                  onChange={handleFileUploadSim}
                  className="hidden-file-input"
                />
              </label>
              
              {fileName && (
                <div className="file-status">
                  {isUploading ? (
                    <span className="upload-status uploading">Качва се...</span>
                  ) : (
                    <span className="upload-status success">
                      {fileName} (Качен)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="form-row-inner-2">
            <div className="form-group qty-group">
              <label className="rock-label">Количество</label>
              <input
                type="number"
                min={1}
                required
                className="rock-input qty-input"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="form-group submit-group">
              <label className="rock-label label-empty">&nbsp;</label>
              <button 
                type="submit" 
                className="btn-rock submit-btn pulse-glow"
                disabled={isUploading}
              >
                <Send size={16} />
                <span>Изпрати Заявка</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .custom-order-form-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 35px;
        }

        .form-heading {
          margin-bottom: 30px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 20px;
        }

        .form-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 8px;
        }

        .custom-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .type-toggle-group {
          display: flex;
          gap: 15px;
          margin-bottom: 10px;
        }

        .type-toggle-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
          font-weight: 700;
          transition: var(--transition-normal);
        }

        .type-toggle-btn.active {
          border-color: var(--color-accent);
          background: rgba(255, 42, 75, 0.08);
          color: var(--text-primary);
          box-shadow: 0 0 15px var(--border-glow);
        }

        .type-toggle-btn:hover:not(.active) {
          border-color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-row-inner-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        @media (max-width: 768px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .custom-order-form-container {
            padding: 20px;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .label-empty {
          display: block;
        }

        @media (max-width: 768px) {
          .label-empty {
            display: none;
          }
        }

        /* Custom File Upload Styling */
        .upload-wrapper {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #0f0f11;
          border: 1px dashed var(--border-color);
          border-radius: 4px;
          padding: 8px 12px;
          height: 48px;
        }

        .upload-trigger-btn {
          background: var(--bg-hover);
          border: 1px solid var(--border-color);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .upload-trigger-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .hidden-file-input {
          display: none;
        }

        .file-status {
          font-size: 0.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
        }

        .upload-status.uploading {
          color: var(--color-gold);
        }

        .upload-status.success {
          color: #4caf50;
        }

        .qty-input {
          text-align: center;
        }

        .submit-btn {
          height: 48px;
          width: 100%;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};
