# 🌞 SUNRAY ECOSYSTEM

<div align="center">

![SUNRAY ECOSYSTEM](https://img.shields.io/badge/SUNRAY-ECOSYSTEM-FFD700?style=for-the-badge&labelColor=0D0D1A)
![Version](https://img.shields.io/badge/Version-2.0-00CED1?style=for-the-badge&labelColor=0D0D1A)
![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge&labelColor=0D0D1A)

**Investment & Vendor Platform with 15-25% Monthly Returns**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## 🏢 About

**SUNRAY ECOSYSTEM** is a comprehensive investment and vendor platform developed by **BRAVE ECOM PVT LTD**. It combines e-commerce, investment opportunities, and vendor management into a single, powerful platform.

### Key Highlights
- 💰 **15% Monthly Returns** for investors
- 🏪 **25% Active Vendor Returns** with ₹100,000 fixed ROI
- 🌐 **Global Platform** with IP-based localization
- 🛍️ **Multi-source Products** from Amazon, eBay, AliExpress, Meesho, Blinkit, Zepto, IndiaMART

---

## ✨ Features

### 🛒 E-Commerce Store
- **Product Categories**: FMCG, Electronics, Groceries, Personal Care, Household, and more
- **Daily Deals**: Time-limited offers with vendor margin protection
- **Shopify-style Popups**: Real-time sold notifications
- **Multi-currency Support**: 30+ currencies with auto-conversion
- **Multi-language Support**: 30+ languages with native display

### 💼 Investment Platform
- **7 Investment Tiers**: From ₹1,000 to ₹10,00,000+
- **15% Monthly Returns**: Guaranteed returns on investment
- **6-Level Commission Structure**: Up to 20% referral commissions
- **Royalty Ranks**: Bronze to Crown Ambassador

### 🏪 Vendor Platform
- **85/15 Revenue Split**: Vendors keep 85% of profits
- **25% Active Returns**: For active vendors
- **₹100,000 Fixed ROI**: Guaranteed vendor returns
- **Product Management**: Easy listing and inventory control

### 🌍 Global Features
- **IP Geolocation**: Auto-detect user location
- **Currency Conversion**: Real-time exchange rates
- **Language Detection**: Native language display
- **Timezone Support**: Local time display

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Animations** | Framer Motion |
| **State Management** | Zustand |
| **Form Validation** | React Hook Form + Zod |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/braveecom/sunray-ecosystem.git

# Navigate to project directory
cd sunray-ecosystem

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

---

## 📦 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/braveecom/sunray-ecosystem)

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the repository
4. Deploy!

### Environment Variables

Create a `.env.local` file with:

```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 📁 Project Structure

```
sunray-ecosystem/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── splash/          # Splash screen
│   │   ├── store/           # E-commerce store
│   │   ├── registration/    # User registration
│   │   ├── investment/      # Investment plans
│   │   ├── vendor/          # Vendor dashboard
│   │   ├── commission/      # Commission display
│   │   ├── dashboard/       # User dashboard
│   │   └── popups/          # Notification popups
│   ├── lib/
│   │   ├── config/          # Configuration files
│   │   ├── services/        # Services (geolocation, products)
│   │   └── validations/     # Zod schemas
│   └── store/               # Zustand store
├── public/                  # Static assets
└── download/                # Generated files
```

---

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0D0D1A` | Primary background |
| Gold | `#FFD700` | Primary accent |
| Teal | `#00CED1` | Secondary accent |
| Purple | `#8B5CF6` | Tertiary accent |

### Features
- Dark theme with glassmorphism
- Responsive design (mobile-first)
- Smooth animations
- Accessible components

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contact

**BRAVE ECOM PVT LTD**

- Website: [braveecom.com](https://braveecom.com)
- Email: contact@braveecom.com
- GitHub: [@braveecom](https://github.com/braveecom)

---

<div align="center">

**Built with ❤️ by BRAVE ECOM PVT LTD**

</div>
