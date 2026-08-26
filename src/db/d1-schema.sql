-- Bitanoor Electric Database Schema
-- Cloudflare D1 / SQLite / PostgreSQL compatible

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    phone TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,  -- In production, use hashed passwords
    name TEXT NOT NULL,
    company TEXT,
    city TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'seller', 'buyer', 'customer', 'marketer')),
    email TEXT,
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT TRUE
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_city ON users(city);

-- ============================================
-- SELLERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sellers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description TEXT,
    description_en TEXT,
    type TEXT NOT NULL CHECK (type IN ('manufacturer', 'distributor', 'assembler', 'importer')),
    production_types JSON NOT NULL,  -- Array of production types
    location_city TEXT NOT NULL,
    location_city_en TEXT NOT NULL,
    location_address TEXT,
    location_address_en TEXT,
    location_lat REAL NOT NULL,
    location_lng REAL NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    contact_website TEXT,
    contact_telegram TEXT,
    products JSON NOT NULL,  -- Array of product names
    catalog_available BOOLEAN DEFAULT FALSE,
    lead_priority TEXT NOT NULL CHECK (lead_priority IN ('P1', 'P2', 'P3')),
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    sample_price_per_lumen INTEGER DEFAULT 0,
    unit_cost_estimate INTEGER DEFAULT 0,
    bulk_saving_percent REAL DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    country TEXT NOT NULL,
    country_en TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for sellers
CREATE INDEX IF NOT EXISTS idx_sellers_name ON sellers(name);
CREATE INDEX IF NOT EXISTS idx_sellers_type ON sellers(type);
CREATE INDEX IF NOT EXISTS idx_sellers_country ON sellers(country);
CREATE INDEX IF NOT EXISTS idx_sellers_priority ON sellers(lead_priority);
CREATE INDEX IF NOT EXISTS idx_sellers_featured ON sellers(is_featured);
CREATE INDEX IF NOT EXISTS idx_sellers_catalog ON sellers(catalog_available);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description TEXT,
    description_en TEXT,
    category_id TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    specs JSON NOT NULL,  -- Product specifications
    price INTEGER NOT NULL,  -- Price in IRR
    price_usd REAL,  -- Price in USD
    currency TEXT NOT NULL DEFAULT 'IRR',
    images JSON NOT NULL,  -- Array of image URLs
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    is_new BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    warranty TEXT,
    tags JSON NOT NULL,  -- Array of tags
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES product_categories(id),
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
);

-- Indexes for products
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- ============================================
-- PRODUCT CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS product_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description TEXT,
    description_en TEXT,
    icon TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    product_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'negotiating', 'closed', 'lost')),
    priority TEXT NOT NULL CHECK (priority IN ('P1', 'P2', 'P3')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES sellers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Indexes for leads
CREATE INDEX IF NOT EXISTS idx_leads_user ON leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_seller ON leads(seller_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);

-- ============================================
-- MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('telegram', 'bale', 'email', 'sms')),
    status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'delivered', 'read')) DEFAULT 'draft',
    is_approved BOOLEAN DEFAULT FALSE,
    dry_run BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);

-- ============================================
-- TELEGRAM USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS telegram_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER NOT NULL UNIQUE,
    user_id INTEGER,  -- Link to users table
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    language_code TEXT,
    phone TEXT,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for telegram users
CREATE INDEX IF NOT EXISTS idx_telegram_users_chat ON telegram_users(chat_id);
CREATE INDEX IF NOT EXISTS idx_telegram_users_phone ON telegram_users(phone);

-- ============================================
-- BALE USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bale_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT NOT NULL UNIQUE,
    user_id INTEGER,  -- Link to users table
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for bale users
CREATE INDEX IF NOT EXISTS idx_bale_users_chat ON bale_users(chat_id);
CREATE INDEX IF NOT EXISTS idx_bale_users_phone ON bale_users(phone);

-- ============================================
-- SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for sessions
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- ============================================
-- INITIAL DATA INSERT (Optional)
-- ============================================
-- Uncomment below to insert initial data
-- Note: For production, use proper data migration scripts

-- INSERT INTO product_categories (id, name, name_en, description, description_en, icon) VALUES
-- ('outdoor', 'چراغ‌های فضای باز', 'Outdoor Lighting', 'چراغ‌های مناسب برای فضای باز', 'Lights for outdoor spaces', '🌳'),
-- ('indoor', 'چراغ‌های داخلی', 'Indoor Lighting', 'چراغ‌های مناسب برای فضای داخلی', 'Lights for indoor spaces', '🏠'),
-- ('industrial', 'چراغ‌های صنعتی', 'Industrial Lighting', 'چراغ‌های مقاوم برای فضاهای صنعتی', 'Durable lights for industrial spaces', '🏭'),
-- ('decorative', 'چراغ‌های تزئینی', 'Decorative Lighting', 'چراغ‌های هنری و تزئینی', 'Artistic and decorative lights', '🎨'),
-- ('smart', 'چراغ‌های هوشمند', 'Smart Lighting', 'چراغ‌های قابل کنترل از راه دور', 'Remotely controllable lights', '🤖'),
-- ('solar', 'چراغ‌های خورشیدی', 'Solar Lighting', 'چراغ‌های با انرژی خورشیدی', 'Solar-powered lights', '☀️'),
-- ('commercial', 'چراغ‌های تجاری', 'Commercial Lighting', 'چراغ‌های مناسب برای فضاهای تجاری', 'Lights for commercial spaces', '🏢'),
-- ('accessories', 'لوازم جانبی', 'Accessories', 'لوازم جانبی چراغ‌ها', 'Lighting accessories', '🔧');

-- ============================================
-- TRIGGERS (Cloudflare D1 doesn't support triggers yet)
-- ============================================
-- For other databases, you can add triggers for updated_at

-- ============================================
-- VIEWS (Optional)
-- ============================================
-- CREATE VIEW IF NOT EXISTS featured_sellers AS
-- SELECT * FROM sellers WHERE is_featured = TRUE ORDER BY rating DESC;

-- CREATE VIEW IF NOT EXISTS featured_products AS
-- SELECT * FROM products WHERE is_featured = TRUE ORDER BY rating DESC;
