# TRUSTIVA - Tokenized Real-World Assets Platform

TRUSTIVA is a comprehensive platform for tokenizing real-world assets and issuing multi-chain stablecoins on the XRP Ledger.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Deployment

This site is configured for GitHub Pages deployment to **trustiva.io**.

### Deploy to GitHub Pages

1. **Set up DNS** (see [DNS-SETUP.md](DNS-SETUP.md))
   - Add 4 A records for apex domain
   - Add CNAME for www subdomain

2. **Push to main branch**
   - GitHub Actions will automatically build and deploy

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: GitHub Actions
   - Custom domain: trustiva.io

4. **Verify deployment**
   ```bash
   chmod +x verify-dns.sh
   ./verify-dns.sh
   ```

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions.

## 🛠️ Development

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Phosphor Icons
- **Forms**: React Hook Form + Zod

## 📋 Features

- **Asset Tokenization**: Issue and manage tokenized real-world assets
- **Multi-Chain Stablecoins**: Deploy stablecoins across multiple blockchains
- **Compliance Framework**: Built-in KYC/AML compliance tools
- **Broker Network**: Partner with registered broker-dealers
- **XRPL Integration**: Leverage XRP Ledger's security and speed

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Complete GitHub Pages setup
- [DNS Setup](DNS-SETUP.md) - Quick reference for GoDaddy
- [PRD](PRD.md) - Product requirements and design system

## 🔐 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
