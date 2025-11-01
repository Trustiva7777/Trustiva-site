# 🚀 Deploy Trustiva to trustiva.io

Your GoDaddy DNS is **already configured correctly**! Follow these simple steps to get your site live.

---

## ✅ What's Already Done

Your GoDaddy DNS records are perfect:
- ✅ A records point to GitHub Pages (185.199.108-111.153)
- ✅ CNAME for `www` points to trustiva7777.github.io
- ✅ CNAME file exists in this project (`public/CNAME`)

---

## 🎯 3 Steps to Go Live

### Step 1: Push This Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Deploy Trustiva website"

# Add your GitHub repository
git remote add origin https://github.com/trustiva7777/trustiva7777.github.io.git

# Push to main branch
git push -u origin main
```

> **Note:** If you're using a different repository name, adjust the URL above.

---

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/trustiva7777/trustiva7777.github.io`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** Select `main` and folder `/ (root)`
   - Click **Save**
5. Under **Custom domain**:
   - Enter: `trustiva.io`
   - Click **Save**
   - Wait a minute, then check **Enforce HTTPS**

---

### Step 3: Wait for DNS to Propagate

- **Time needed:** 5 minutes to 48 hours (usually ~30 minutes)
- **Check status:** Visit https://dnschecker.org and enter `trustiva.io`
- **When ready:** Visit https://trustiva.io 🎉

---

## 🔧 Alternative: Automated Deployment

If you want automatic deployments when you push code changes, create this file:

**`.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then in GitHub Settings → Pages, change source to **GitHub Actions**.

---

## 🐛 Troubleshooting

### "404 - There isn't a GitHub Pages site here"
- Wait a few more minutes for GitHub to build
- Verify the CNAME file is in the `public/` folder
- Check that GitHub Pages is enabled in Settings

### "DNS_PROBE_FINISHED_NXDOMAIN"
- DNS hasn't propagated yet - wait longer
- Check https://dnschecker.org to see propagation status
- Try clearing your browser cache or use incognito mode

### Site shows but no HTTPS (red warning)
- Wait for DNS to fully propagate first
- Go to GitHub Settings → Pages
- Check the box for "Enforce HTTPS"
- GitHub auto-provisions SSL (can take 24 hours)

### Changes not showing up
- Clear your browser cache
- Wait a few minutes for GitHub to rebuild
- Check if you pushed to the correct branch

---

## 📋 Quick Reference

**Your DNS Records (GoDaddy):**
```
Type    Name    Value                    TTL
A       @       185.199.108.153         1 Hour
A       @       185.199.109.153         1 Hour
A       @       185.199.110.153         1 Hour
A       @       185.199.111.153         1 Hour
CNAME   www     trustiva7777.github.io  1 Hour
```

**GitHub Repository:** trustiva7777.github.io  
**Custom Domain:** trustiva.io  
**CNAME File Location:** `/public/CNAME`  
**CNAME File Content:** `trustiva.io`

---

## 🔗 Helpful Links

- [Check DNS Propagation](https://dnschecker.org)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GoDaddy DNS Help](https://www.godaddy.com/help/manage-dns-records-680)

---

## ⚡ Current Subdomains

Active subdomains from your DNS:
- `pay.trustiva.io` → GoDaddy Commerce  
- `spark.trustiva.io` → GitHub Pages  
- `www.trustiva.io` → GitHub Pages (your main site)

---

**You're all set!** Just push to GitHub, enable Pages, and wait for DNS. Your site will be live at https://trustiva.io
