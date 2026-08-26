# Bitanoor Electric - Electric Lamp Manufacturers Directory

> **مرکز عملیات فارسی (RTL) برای یافتن و ارزیابی تولیدکنندگان، مونتاژکنندگان و سازندگان چراغ‌های برقی در ایران**

A Persian (RTL) operations dashboard for finding and vetting electric lamp manufacturers, suppliers, and distributors in Iran: a seller map, an HTI industrial snapshot model, and an aggregated product catalog.

## Features

- **🗺 Seller Map** — Interactive Leaflet map (OpenStreetMap / Google tiles / Carto dark & light / custom vector Iran map) with **50+ Iranian + 100+ international** sellers, an Iran/World scope toggle, country filter, live filtering (search, product type, voltage class, etc.), P1–P3 lead-priority scoring, a sorted results table, and a "add to lead bank" workflow.

- **📨 Messaging Center** — Multi-channel panel inspired by the Clinic Signal workflow: **Telegram (@bitanoor_elec_bot) is live** (Bale support marked "به‌زودی"), channel selector, topic selector, message composer with **human-approval checkbox and Dry Run mode**, bot status panels, and a compliance checklist (no-contact list, opt-out, server-side keys).

- **🤖 RAG Catalog Analyzer** — Semantic catalog analysis view: knowledge-source index (PDF catalogs, datasheets, site audits), featured specs, vector-chunk status, and a query panel (demo data).

- **⚡ HTI Snap Model** — One-page industrial snapshot: audit signals, AI proposal package, KPI suggestions, and a 30/60/90-day advisory plan (print-friendly).

- **📄 Catalog View** — Aggregated lighting product specs for household and industrial segments, with CSV and standalone HTML/PDF-ready exports.

- **API Layer** — All routes run on the edge runtime for Cloudflare Pages compatibility.

## Live Demo

- **Production:** [https://bitanoor-electric.pages.dev](https://bitanoor-electric.pages.dev)
- **Custom Domain:** [https://bitanoor.exhibition2world.ir](https://bitanoor.exhibition2world.ir) (if configured)

Deployed on **Cloudflare Pages**, connected to this GitHub repository (`main` branch auto-deploys on push).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js](https://nextjs.org) **15.5.9** (App Router) + React 19 |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 |
| Icons | [lucide-react](https://lucide.dev) |
| Maps | [Leaflet](https://leafletjs.com) with multi-provider tiles |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) via [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) |
| Database (optional) | Cloudflare D1 via [Drizzle ORM](https://orm.drizzle.team) |
| Language | TypeScript, UI text in Persian (RTL) |

## Demo Accounts

All accounts use password: **`demo123`**

| Role | Name | Phone | Dashboard |
|------|------|-------|-----------|
| ادمین | مدیر سامانه | 09120000001 | users table, seller approvals, reports |
| فروشنده | نیان نور | 09123333333 | company profile, pricing, inbound leads |
| خریدار | رضا کریمی | 09121111111 | saved leads + prices, inquiries |
| مشتری | مهدی رضایی | 09125555555 | followed companies, sample orders |
| مشتری | سارا احمدی | 09126666666 | followed companies, sample orders |
| بازاریاب | زهرا موسوی | 09128888888 | lead hunting, referral commission, reports |

## Telegram Bot

The dashboard notifies the operator's Telegram chat through the [@bitanoor_elec_bot](https://t.me/bitanoor_elec_bot) bot:

- Adding a lead to the lead bank and pressing the HTI "send to messaging" buttons push a formatted message to Telegram.
- Data is served in both sources (site + chat): `/map` lists the top Iranian and international companies with sample prices, `/catalog` prints the full catalog table inside the chat.

### Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | شروع و راهنمای سریع |
| `/help` | راهنمای کامل |
| `/map` | نقشه فروشندگان ایران و جهانی |
| `/catalog` | کاتالوگ محصولات |
| `/leads` | بانک لید |
| `/rag` | RAG آنالیز کاتالوگ |
| `/hti` | مدل HTI Snap |
| `/contact` | تماس با ما |
| `/register` | ثبت‌نام |

## API Endpoints

| Route | Description |
|-------|-------------|
| `GET /api/sellers` | Search/filter sellers (JSON or `format=csv`) |
| `GET /api/catalog` | Aggregated catalog as JSON |
| `GET /api/catalog/csv` | Catalog as CSV (UTF-8 BOM, Excel-friendly) |
| `GET /api/catalog/html` | Standalone, printable HTML version of the catalog |
| `GET /api/health` | Health check (no database required) |
| `GET /api/telegram` | Telegram messaging center: status + send notifications |
| `POST /api/telegram` | Send Telegram message (admin only) |
| `POST /api/telegram/webhook` | Telegram bot webhook |

## Project Structure

```
bitanoor-electric/
├── src/
│   ├── app/
│   │   ├── (auth)/login/page.tsx          # Login page
│   │   ├── (auth)/register/page.tsx       # Registration page
│   │   ├── (dashboard)/admin/page.tsx     # Admin dashboard
│   │   ├── (dashboard)/seller/page.tsx    # Seller dashboard
│   │   ├── (dashboard)/buyer/page.tsx     # Buyer dashboard
│   │   ├── (dashboard)/customer/page.tsx  # Customer dashboard
│   │   ├── (dashboard)/marketer/page.tsx  # Marketer dashboard
│   │   ├── map/page.tsx                   # Interactive seller map
│   │   ├── catalog/page.tsx               # Product catalog
│   │   ├── rag/page.tsx                   # RAG catalog analyzer
│   │   ├── hti/page.tsx                   # HTI Snap Model
│   │   ├── api/                           # API routes
│   │   │   ├── sellers/route.ts           # Sellers API
│   │   │   ├── catalog/route.ts           # Catalog API
│   │   │   ├── telegram/route.ts          # Telegram webhook
│   │   │   └── health/route.ts            # Health check
│   │   ├── layout.tsx                     # Root layout
│   │   └── page.tsx                       # Home page
│   │
│   ├── data/
│   │   ├── sellers.ts                     # Seller data (50+ Iranian + 100+ international)
│   │   ├── catalog.ts                     # Product catalog (500+ products)
│   │   ├── accounts.ts                    # Demo accounts
│   │   └── pricing.ts                     # Pricing calculations
│   │
│   ├── db/
│   │   └── d1-schema.sql                  # Cloudflare D1 schema
│   │
│   └── lib/
│       ├── components/                    # React components
│       └── utils/                         # Utility functions
│
├── public/
│   └── images/                           # Static images
│
├── .env.example                          # Environment variables template
├── .gitignore                            # Git ignore
├── package.json                          # Dependencies
├── next.config.ts                        # Next.js config
├── tailwind.config.ts                    # Tailwind config
├── tsconfig.json                         # TypeScript config
├── drizzle.config.ts                     # Drizzle ORM config
├── postcss.config.mjs                    # PostCSS config
├── eslint.config.mjs                     # ESLint config
└── README.md                             # This file
```

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Websites-by-AI/Bitanoor.git
cd Bitanoor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
nano .env
```

Required variables:
```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_USERNAME=@bitanoor_elec_bot
TELEGRAM_WEBHOOK_SECRET=your_random_secret

# Website
NEXT_PUBLIC_SITE_URL=https://bitanoor-electric.pages.dev

# Optional: Cloudflare D1
DATABASE_TYPE=d1
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
D1_DATABASE_ID=your_database_id
D1_DATABASE_NAME=bitanoor_electric
```

### 4. Set up Cloudflare D1 (optional)

1. Go to Cloudflare Dashboard → Workers & Pages → D1
2. Click "Create database"
3. Name: `bitanoor_electric`
4. Run the SQL from `src/db/d1-schema.sql`
5. Update `.env` with your D1 credentials

### 5. Set Telegram webhook

```bash
# Set webhook
curl -X POST "https://api.telegram.org/botYOUR_TOKEN/setWebhook" \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://bitanoor-electric.pages.dev/api/telegram", "secret_token": "YOUR_SECRET"}'

# Set commands
curl -X POST "https://api.telegram.org/botYOUR_TOKEN/setMyCommands" \
  -H 'Content-Type: application/json' \
  -d '{"commands": [{"command":"start","description":"شروع و راهنمای سریع"},{"command":"help","description":"راهنمای کامل"},{"command":"map","description":"نقشه فروشندگان"},{"command":"catalog","description":"کاتالوگ محصولات"},{"command":"leads","description":"بانک لید"},{"command":"rag","description":"RAG آنالیز"},{"command":"hti","description":"مدل HTI"},{"command":"contact","description":"تماس با ما"},{"command":"register","description":"ثبت‌نام"}]}'
```

### 6. Deploy to Cloudflare Pages

1. Go to Cloudflare Dashboard → Workers & Pages → Pages
2. Click "Create application" → "Connect GitHub account"
3. Select your `Bitanoor` repository
4. Project name: `bitanoor-electric`
5. Production branch: `main`
6. Build command: `npm run build`
7. Start command: `npm start`
8. Click "Save and Deploy"

### 7. Configure environment variables in Cloudflare

In your Pages project → Settings → Environment variables, add:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_BOT_USERNAME`
- `TELEGRAM_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `CLOUDFLARE_ACCOUNT_ID` (if using D1)
- `CLOUDFLARE_API_TOKEN` (if using D1)
- `D1_DATABASE_ID` (if using D1)

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Disclaimer

> ⚠️ The dataset shipped with this repo is **demo/public-approximation data**.
> All specs, scores and contacts must be verified with the seller before any purchase.
> See the disclaimer in-app and in the API responses.

## License

MIT

## Contact

- **Telegram Bot:** [@bitanoor_elec_bot](https://t.me/bitanoor_elec_bot)
- **Website:** [https://bitanoor.com](https://bitanoor.com)
- **Email:** info@bitanoor.com

---

**Bitanoor Electric © 2026**
