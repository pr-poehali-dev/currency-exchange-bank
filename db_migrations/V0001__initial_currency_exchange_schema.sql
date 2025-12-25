-- Создание таблицы валют
CREATE TABLE IF NOT EXISTS currencies (
    id SERIAL PRIMARY KEY,
    code VARCHAR(3) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    flag VARCHAR(10) NOT NULL,
    rate_to_rub NUMERIC(12, 4) NOT NULL DEFAULT 1.0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы транзакций
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    from_currency VARCHAR(3) NOT NULL,
    to_currency VARCHAR(3) NOT NULL,
    from_amount NUMERIC(12, 2) NOT NULL,
    to_amount NUMERIC(12, 2) NOT NULL,
    rate NUMERIC(12, 4) NOT NULL,
    status VARCHAR(20) DEFAULT 'completed',
    office VARCHAR(100) DEFAULT 'Москва, Центр',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных по валютам
INSERT INTO currencies (code, name, flag, rate_to_rub) VALUES
('RUB', 'Российский рубль', '🇷🇺', 1.0000),
('USD', 'Доллар США', '🇺🇸', 94.2000),
('EUR', 'Евро', '🇪🇺', 102.1000),
('GBP', 'Фунт стерлингов', '🇬🇧', 118.5000),
('CNY', 'Китайский юань', '🇨🇳', 13.4000),
('JPY', 'Японская йена', '🇯🇵', 0.6500)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    flag = EXCLUDED.flag,
    rate_to_rub = EXCLUDED.rate_to_rub,
    updated_at = CURRENT_TIMESTAMP;

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_currencies_code ON currencies(code);
