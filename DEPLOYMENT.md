# GitHub Pages Deployment Guide for TRUSTIVA

## 📋 Detected Setup

- **Repository**: spark-template (Vite + React SPA)
- **Build Command**: `npm run build`
- **Build Output**: `dist/` directory
- **Static Site Generator**: Vite
- **Current CNAME**: None detected
- **Target Domain**: trustiva.io
- **GitHub Username**: kevanbtc

---

## 🎯 Choose Domain Mode

**Option A: Apex domain (trustiva.io + www.trustiva.io)** ✅ RECOMMENDED
- Primary: trustiva.io
- Redirect: www.trustiva.io → trustiva.io

**Option B: Subdomain only (spark.trustiva.io)**
- Primary: spark.trustiva.io

**Decision**: Using **Option A** (apex domain) for TRUSTIVA

---

## 🌐 GoDaddy DNS Records

### Required DNS Configuration

| Type | Host | Value | TTL | Notes |
|------|------|-------|-----|-------|
| A | @ | 185.199.108.153 | 1 hour | GitHub Pages IP #1 |
| A | @ | 185.199.109.153 | 1 hour | GitHub Pages IP #2 |
| A | @ | 185.199.110.153 | 1 hour | GitHub Pages IP #3 |
| A | @ | 185.199.111.153 | 1 hour | GitHub Pages IP #4 |
| CNAME | www | kevanbtc.github.io. | 1 hour | Subdomain redirect |

### ⚠️ Important DNS Rules

1. **DO NOT** add an A record for `www` - only use CNAME
2. **KEEP** all existing MX records (Zoho email) untouched
3. **DELETE** any existing A records for @ if they don't match the four GitHub IPs above
4. **DELETE** any existing CNAME for @ (apex domains can't use CNAME)
5. The trailing dot in `kevanbtc.github.io.` is optional in GoDaddy's interface

### Step-by-Step in GoDaddy

1. Log in to GoDaddy → My Products → DNS
2. Find "trustiva.io" and click "Manage DNS"
3. **Add/Update A Records**:
   - Click "Add" → Select "A"
   - Host: `@` | Points to: `185.199.108.153` | TTL: `1 hour`
   - Repeat for the other three IPs (.109, .110, .111)
4. **Add CNAME for www**:
   - Click "Add" → Select "CNAME"
   - Host: `www` | Points to: `kevanbtc.github.io` | TTL: `1 hour`
5. Click "Save" at the bottom

---

## 📁 Repo Changes

### 1. Create CNAME File

**File**: `public/CNAME`
**Content**:
```
trustiva.io
```

Create this file in your repository:

```bash
mkdir -p public
echo "trustiva.io" > public/CNAME
git add public/CNAME
git commit -m "Add CNAME for GitHub Pages custom domain"
git push
```

### 2. Create GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

This workflow will:
- Build your Vite app on every push to main
- Deploy to GitHub Pages automatically
- Preserve the CNAME file

### 3. Update vite.config.ts (if needed)

Ensure your base path is set correctly. For apex domains, base should be `/`.

### 4. Enable GitHub Pages

1. Go to: https://github.com/kevanbtc/spark-template/settings/pages
2. Under "Source", select "GitHub Actions"
3. Once deployed, under "Custom domain", enter: `trustiva.io`
4. Wait ~1 minute, then check the "Enforce HTTPS" box

---

## ✅ Verification Steps

### Step 1: Check DNS Propagation

Wait 5-60 minutes after making DNS changes, then run:

```bash
# Check apex domain resolves to GitHub Pages IPs
nslookup trustiva.io

# Expected output (any of these IPs):
# Address: 185.199.108.153
# Address: 185.199.109.153
# Address: 185.199.110.153
# Address: 185.199.111.153

# Check www subdomain points to GitHub
nslookup www.trustiva.io

# Expected output:
# www.trustiva.io canonical name = kevanbtc.github.io
```

### Step 2: Verify with dig (more detailed)

```bash
dig trustiva.io +short
# Should return all four GitHub IPs

dig www.trustiva.io +short
# Should return: kevanbtc.github.io
# Then the four GitHub IPs
```

### Step 3: Check HTTP/HTTPS

```bash
# Check if site is accessible
curl -I https://trustiva.io

# Expected: HTTP/2 200 OK

# Check www redirect
curl -I https://www.trustiva.io

# Expected: Should redirect to https://trustiva.io
```

### Step 4: Browser Test

1. Visit: https://trustiva.io (should load your site)
2. Visit: https://www.trustiva.io (should redirect to trustiva.io)
3. Visit: http://trustiva.io (should redirect to https://trustiva.io)

---

## 🤖 Optional: DNS Monitoring CI Workflow

**File**: `.github/workflows/dns-monitor.yml`

This workflow runs:
- On every push to main
- Nightly at 2 AM UTC
- Manual trigger

It verifies:
- Apex domain resolves to correct GitHub IPs
- WWW subdomain CNAMEs to your GitHub Pages URL
- HTTPS is working

---

## 📝 Deployment Checklist

- [ ] Create `public/CNAME` with `trustiva.io`
- [ ] Create `.github/workflows/deploy.yml` workflow
- [ ] Push changes to main branch
- [ ] Update GoDaddy DNS with 4 A records and 1 CNAME
- [ ] Wait for DNS propagation (5-60 minutes)
- [ ] Enable GitHub Pages in repo settings (Source: GitHub Actions)
- [ ] Add custom domain `trustiva.io` in GitHub Pages settings
- [ ] Wait ~1 minute after DNS verification
- [ ] Enable "Enforce HTTPS" in GitHub Pages settings
- [ ] Test https://trustiva.io in browser
- [ ] Test https://www.trustiva.io redirects properly
- [ ] (Optional) Add DNS monitoring workflow

---

## 🐛 Troubleshooting

### "Domain's DNS record could not be retrieved"
- DNS hasn't propagated yet - wait 5-60 minutes
- Run `nslookup trustiva.io` to check if A records are visible
- Clear GitHub's DNS cache by removing and re-adding the custom domain

### "Certificate error" or "Not secure"
- DNS is working but HTTPS cert hasn't been issued yet
- Wait 5-10 minutes after DNS verifies
- GitHub auto-provisions Let's Encrypt certificates
- Don't enable "Enforce HTTPS" until the cert is ready

### "404 - There isn't a GitHub Pages site here"
- Workflow hasn't run yet or failed - check Actions tab
- CNAME file is missing from `dist/` - ensure it's in `public/`
- GitHub Pages source isn't set to "GitHub Actions"

### www subdomain not redirecting
- Check CNAME record: `dig www.trustiva.io`
- Should see: `www.trustiva.io CNAME kevanbtc.github.io`
- GoDaddy sometimes adds an @ instead of www - delete and recreate

### Build fails
- Check Node version in workflow matches your local version
- Ensure `npm run build` works locally
- Check workflow logs in Actions tab

---

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
- [GoDaddy DNS Management](https://www.godaddy.com/help/manage-dns-680)
