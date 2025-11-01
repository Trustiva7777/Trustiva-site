# TRUSTIVA Platform

> **Precision in Motion. Power in Trust.**
> 
> A global, compliance-native platform for tokenized real-world assets and multi-chain stablecoins built on the XRP Ledger.

---

## 📑 Table of Contents

| Section | Description |
|---------|-------------|
| 🎯 [Overview](#-overview) | Platform vision and core value proposition |
| 🏗️ [Architecture](#-architecture) | System design and component flow |
| 🔑 [Key Features](#-key-features) | Core capabilities and differentiators |
| 👥 [User Personas](#-user-personas) | Issuer, Broker, and Investor workflows |
| ⚙️ [Technical Stack](#-technical-stack) | Technologies and dependencies |
| 🚀 [Getting Started](#-getting-started) | Development setup and local run |
| 📦 [Build & Deploy](#-build--deploy) | Production build and deployment |
| 🔐 [Security & Compliance](#-security--compliance) | Compliance framework and best practices |
| 🌐 [DNS & Domain Setup](#-dns--domain-setup) | GoDaddy configuration |
| 📝 [Documentation](#-documentation) | API, component, and workflow docs |
| 🤝 [Contributing](#-contributing) | Development guidelines |
| 📄 [License](#-license) | License information |

---

## 🎯 Overview

**TRUSTIVA** is a comprehensive platform designed for institutional-grade tokenization of real-world assets (RWA) and multi-chain stablecoin infrastructure. Built on the XRP Ledger for settlement certainty and compliance at scale, TRUSTIVA serves three core market participants:

- **Issuers** – Tokenize physical or digital assets with full compliance workflows
- **Brokers** – Partner and distribute tokenized securities across jurisdictions
- **Investors** – Access curated, KYC-verified investment opportunities

### Core Value Propositions

| Value | Benefit |
|-------|---------|
| **Compliance-First Design** | Built-in KYC, AML, and jurisdiction-aware rules from day one |
| **XRP Ledger Settlement** | Fast, deterministic finality with minimal fees |
| **Institutional Grade** | Audit-ready architecture, role-based access, immutable audit trails |
| **Multi-Asset Support** | Equities, bonds, commodities, and custom asset classes |
| **Global Reach** | Multi-jurisdiction support with localized compliance workflows |

---

## 🏗️ Architecture

### System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     TRUSTIVA Platform                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │   Frontend   │    │   Backend    │    │  Compliance  │    │
│  │   (React)    │◄──►│   (REST API) │◄──►│  (Rules Eng) │    │
│  └──────────────┘    └──────────────┘    └──────────────┘    │
│         ▲                    ▲                    ▲             │
│         │                    │                    │             │
│         └────────────────────┼────────────────────┘             │
│                              │                                 │
│                   ┌──────────▼──────────┐                      │
│                   │   Database Layer    │                      │
│                   │  (PostgreSQL/Redis) │                      │
│                   └─────────────────────┘                      │
│                              │                                 │
│                   ┌──────────▼──────────┐                      │
│                   │  XRP Ledger Bridge  │                      │
│                   │  (Settlement Layer) │                      │
│                   └─────────────────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Onboarding Flow                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  New User ──► Role Selection ──► KYC Intake ──► Verification   │
│                                                    │             │
│                ┌───────────────────────────────────┘             │
│                │                                                │
│                ▼                                                │
│      ┌──────────────────┐                                      │
│      │  Investor Flow   │  ◄──► Portfolio Dashboard            │
│      └──────────────────┘                                      │
│                │                                                │
│      ┌──────────────────┐                                      │
│      │  Issuer Flow     │  ◄──► Asset Tokenization             │
│      └──────────────────┘                                      │
│                │                                                │
│      ┌──────────────────┐                                      │
│      │  Broker Flow     │  ◄──► Partnership Management         │
│      └──────────────────┘                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── components/
│   ├── Hero.tsx                  # Landing hero section
│   ├── Navigation.tsx            # Global navigation & auth
│   ├── PlatformFeatures.tsx      # Feature showcase
│   ├── IssuerIntake.tsx          # Issuer onboarding form
│   ├── InvestorKYC.tsx           # Investor KYC workflow
│   ├── BrokerPartnership.tsx     # Broker partner portal
│   ├── XRPLSection.tsx           # XRP Ledger integration info
│   ├── Stablecoins.tsx           # Stablecoin offerings
│   ├── RWA.tsx                   # Real-world asset showcase
│   ├── Compliance.tsx            # Compliance framework display
│   ├── Hummingbird.tsx           # Animated mascot component
│   ├── Onboarding.tsx            # Master onboarding component
│   ├── Footer.tsx                # Footer with links & info
│   └── ui/                       # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── dialog.tsx
│       └── ... (shadcn/ui library)
├── hooks/
│   ├── use-language.ts           # Multi-language support
│   └── use-mobile.ts             # Responsive design detection
├── lib/
│   ├── translations.ts           # i18n configuration
│   └── utils.ts                  # Utility functions
├── styles/
│   ├── theme.css                 # Design tokens
│   └── main.css                  # Global styles
└── App.tsx                       # Root component
```

---

## � Key Features

### For Issuers
- **Asset Tokenization Wizard** – Step-by-step guided process to tokenize RWAs
- **Compliance Automation** – Built-in jurisdiction rules, KYC requirements, restrictions
- **Multi-Asset Support** – Equities, bonds, commodities, and custom asset classes
- **Real-time Analytics** – Track investor interest, cap table, and secondary market activity
- **Regulatory Dashboard** – Compliance status, audit trails, reporting ready

### For Brokers
- **Partnership Portal** – Manage relationships, commissions, and distribution agreements
- **Curated Marketplace** – Vetted assets with built-in compliance filters
- **White-Label Options** – Customize branding and workflows for end customers
- **Revenue Analytics** – Track fees, commissions, and deal flow
- **Investor Management** – Centralized KYC, account management, and portfolio oversight

### For Investors
- **Discovery & Due Diligence** – Search, filter, and review tokenized assets
- **Digital Wallet Integration** – Seamless custody and trading on XRP Ledger
- **Portfolio Dashboard** – Track holdings, returns, and compliance status
- **Fractional Ownership** – Invest in fractions of high-value assets
- **Instant Settlement** – T+0 settlement on the XRP Ledger

---

## 👥 User Personas

### Issuer Persona: "Alice" – Asset Originator
- **Goal:** Tokenize $50M real estate fund in 90 days
- **Pain Point:** Complex compliance across multiple jurisdictions
- **Solution Path:** IssuerIntake → Asset Onboarding → Compliance Dashboard

### Broker Persona: "Bob" – Distribution Partner
- **Goal:** Offer 100+ tokenized assets to 5K+ clients
- **Pain Point:** Managing multiple asset sources and compliance frameworks
- **Solution Path:** BrokerPartnership → Marketplace Curation → Revenue Tracking

### Investor Persona: "Carol" – Institutional Buyer
- **Goal:** Diversify portfolio with tokenized RWAs
- **Pain Point:** Lack of transparency and regulatory clarity
- **Solution Path:** Discovery → KYC Verification → Portfolio Management

---

## ⚙️ Technical Stack

### Frontend
- **React 18** – UI library with hooks
- **TypeScript** – Type safety and better DX
- **Vite** – Lightning-fast build tool and dev server
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Pre-built, accessible components
- **React Router v6** – Client-side routing for SPA
- **Phosphor Icons** – Beautiful, professional icon library

### Styling & Design
- **Tailwind CSS 3** – Utility-first CSS framework
- **Custom Theme** – TRUSTIVA brand colors and tokens
- **Responsive Design** – Mobile-first approach
- **Dark Mode Support** – Built-in theme switching

### Internationalization
- **i18n Configuration** – Multi-language support ready
- **Custom Translations Hook** – `use-language.ts` for easy language switching

### Build & Deployment
- **Vite** – Modern, fast build bundler
- **GitHub Pages** – Free, reliable hosting
- **GitHub Actions** – Automated CI/CD pipeline
- **Node.js 20** – Runtime for build and scripts

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20+ (check: `node --version`)
- **npm** 10+ (check: `npm --version`)
- **Git** (check: `git --version`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Trustiva7777/Trustiva-site.git
cd Trustiva-site

# Install dependencies
npm ci

# Install pnpm (optional, if using pnpm)
npm install -g pnpm
pnpm install
```

### Local Development

```bash
# Start the development server
npm run dev

# Server runs at: http://localhost:5173/
# Hot reload enabled – changes reflect instantly

# Open in browser
open http://localhost:5173
```

### Linting & Type Checking

```bash
# Run ESLint
npm run lint

# Type check with TypeScript
tsc -b --noCheck
```

---

## 📦 Build & Deploy

### Production Build

```bash
# Build for production
npm run build

# Output: dist/ directory
# Optimized, minified bundles ready for deployment
```

### Local Testing (Production Build)

```bash
# Build and serve locally to test
npm run build
npm run preview

# Test at: http://localhost:4173/
```

### Deploy to GitHub Pages

The deployment is **automated** via GitHub Actions:

1. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Update content"
   git push -u origin main
   ```

2. **Workflow runs automatically:**
   - GitHub Actions triggers on every push to `main`
   - Builds project with Node 20
   - Generates SPA 404 fallback for client-side routing
   - Deploys to `https://trustiva.io`

3. **Monitor deployment:**
   - Go to: `https://github.com/Trustiva7777/Trustiva-site/actions`
   - View latest workflow run status
   - Check deployment logs if needed

---

## 🔐 Security & Compliance

### Frontend Security
- **CSP Headers** – Content Security Policy to prevent XSS
- **HTTPS Enforced** – All traffic encrypted
- **No Sensitive Data** – Backend handles all private keys and credentials
- **Audit Ready** – All user actions logged and traceable

### Compliance Framework
- **KYC Integration** – Multi-stage identity verification
- **AML Checks** – Sanction list screening
- **Jurisdiction Rules** – Locale-specific restrictions encoded
- **Audit Trail** – Immutable activity logs

### Best Practices
- **Role-Based Access Control (RBAC)** – Issuer, Broker, Investor roles
- **Data Encryption** – End-to-end encryption for sensitive flows
- **Regular Security Audits** – Third-party penetration testing
- **Incident Response Plan** – 24/7 security monitoring

---

## 🌐 DNS & Domain Setup

### GoDaddy Configuration for trustiva.io

#### Step 1: Point Domain to GitHub Pages

1. **Log in to GoDaddy:** `https://www.godaddy.com/domains`
2. **Select trustiva.io domain**
3. **Go to DNS Management**
4. **Add/Update these records:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 1 Hour |
| A | @ | 185.199.109.153 | 1 Hour |
| A | @ | 185.199.110.153 | 1 Hour |
| A | @ | 185.199.111.153 | 1 Hour |
| CNAME | www | trustiva7777.github.io | 1 Hour |

**Why these IPs?** These are GitHub's IPv4 addresses for Pages hosting. They route traffic to the GitHub Pages infrastructure.

#### Step 2: Configure GitHub Pages

1. **Go to:** `https://github.com/Trustiva7777/Trustiva-site/settings/pages`
2. **Source:** Select `GitHub Actions`
3. **Custom Domain:** Enter `trustiva.io` → **Save**
4. **GitHub validates CNAME**
5. Once verified: Check **Enforce HTTPS**

#### Step 3: Verify DNS Propagation

```bash
# Check A records point to GitHub
dig +short trustiva.io A

# Expected output:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check www CNAME
dig +short www.trustiva.io CNAME

# Expected output:
# trustiva7777.github.io.
```

#### Step 4: Test HTTPS

```bash
# Test HTTP redirect to HTTPS
curl -I http://trustiva.io

# Expected: 301 redirect to https://trustiva.io

# Test HTTPS works
curl -I https://trustiva.io

# Expected: 200 OK with SSL certificate
```

#### Step 5: Access the Live Site

- **Apex domain:** `https://trustiva.io`
- **WWW subdomain:** `https://www.trustiva.io`
- Both should serve your TRUSTIVA site

### Troubleshooting

| Issue | Solution |
|-------|----------|
| **404 on custom domain** | Ensure `dist/CNAME` exists in build artifact; workflow copies it |
| **DNS not resolving** | Wait 15-30 minutes for propagation; use `nslookup trustiva.io` |
| **Mixed content warnings** | Ensure all assets use `https://` and Vite `base: "/"` is set |
| **Build fails in Actions** | Check workflow logs; verify `npm ci` and `npm run build` succeed locally |
| **HTTPS cert not issued** | GitHub typically auto-provisions; wait up to 1 hour after CNAME is verified |

---

## 📝 Documentation

### Component Documentation

#### Hero Component (`Hero.tsx`)
- Landing page hero section with CTA
- Responsive design for mobile/desktop
- Animated background or gradient

#### Navigation Component (`Navigation.tsx`)
- Global header with logo and menu
- Auth/login integration placeholder
- Mobile hamburger menu

#### IssuerIntake Component (`IssuerIntake.tsx`)
- Multi-step form for asset tokenization
- Real-time validation
- Compliance rules engine integration

#### InvestorKYC Component (`InvestorKYC.tsx`)
- Identity verification workflow
- Document upload and verification
- Multi-stage approval process

#### BrokerPartnership Component (`BrokerPartnership.tsx`)
- Partnership management dashboard
- Commission tracking
- Asset distribution portal

### API Integration Points (Future)
- **Auth API** – Login, OAuth2, JWT tokens
- **KYC API** – Identity verification, document processing
- **Asset API** – Tokenization, metadata, ownership
- **Trading API** – Orders, settlements, portfolio
- **Compliance API** – Rules engine, sanctions screening, audit logs

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and create PR:**
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. **PR template:**
   - Description of changes
   - Related issue (if applicable)
   - Testing steps
   - Screenshots (if UI changes)

### Code Style
- **ESLint** – Enforce consistent code style
- **TypeScript** – Strict mode for type safety
- **Prettier** (optional) – Auto-format code

### Commit Convention
```
feat:    A new feature
fix:     A bug fix
docs:    Documentation changes
style:   Formatting, missing semicolons, etc.
refactor: Code refactoring without feature changes
test:    Adding or updating tests
chore:   Dependencies, tooling, etc.
```

Example: `git commit -m "feat: add multi-language support"`

---

## 📄 License

This project is licensed under the **MIT License** – see [LICENSE](./LICENSE) file for details.

---

## 🔗 Quick Links

- **Live Site:** `https://trustiva.io`
- **GitHub Repo:** `https://github.com/Trustiva7777/Trustiva-site`
- **GitHub Issues:** Report bugs and request features
- **Actions Dashboard:** Monitor deployments
- **DNS Manager:** GoDaddy domain management

---

## 📞 Support

For questions, issues, or contributions:

1. **Open an issue** on GitHub: `https://github.com/Trustiva7777/Trustiva-site/issues`
2. **Check documentation** in this README
3. **Review existing issues** for similar problems

---

**Built with ❤️ by the TRUSTIVA team.**

*Precision in Motion. Power in Trust.*
- **Broker Network**: Partner with registered broker-dealers
- **XRPL Integration**: Leverage XRP Ledger's security and speed

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Complete GitHub Pages setup
- [DNS Setup](DNS-SETUP.md) - Quick reference for GoDaddy
- [PRD](PRD.md) - Product requirements and design system

## 🔐 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
