# GoDaddy DNS Setup for trustiva.io → GitHub Pages

This guide walks you through configuring your GoDaddy domain (`trustiva.io`) to point to GitHub Pages hosting.

---

## 🎯 Quick Overview

You're pointing `trustiva.io` to GitHub's servers so that when someone visits your domain, they get your site hosted on GitHub Pages.

| Step | Action | Time |
|------|--------|------|
| 1 | Add DNS records in GoDaddy | 5 min |
| 2 | Configure GitHub Pages settings | 2 min |
| 3 | Wait for DNS propagation | 15-30 min |
| 4 | Verify everything works | 5 min |

**Total setup time: ~45 minutes**

---

## Step 1: Add DNS Records in GoDaddy

### 1.1 Log in to GoDaddy

1. Go to: `https://www.godaddy.com/domains`
2. **Sign in** with your account
3. Find and **select `trustiva.io`**
4. Click **"Manage"** or **"DNS"** button

### 1.2 Locate DNS Settings

Once in domain management:
- Look for **"DNS"**, **"Nameservers"**, or **"Advanced DNS"** tab
- Click it to open the DNS management interface

### 1.3 Add A Records (for apex domain)

You need to add **4 A records** for the apex domain (`trustiva.io`):

**Record 1:**
- **Type:** A
- **Host:** @ (or leave blank)
- **Points to:** `185.199.108.153`
- **TTL:** 1 Hour (or default)
- ➕ **Add Record**

**Record 2:**
- **Type:** A
- **Host:** @ (or leave blank)
- **Points to:** `185.199.109.153`
- **TTL:** 1 Hour
- ➕ **Add Record**

**Record 3:**
- **Type:** A
- **Host:** @ (or leave blank)
- **Points to:** `185.199.110.153`
- **TTL:** 1 Hour
- ➕ **Add Record**

**Record 4:**
- **Type:** A
- **Host:** @ (or leave blank)
- **Points to:** `185.199.111.153`
- **TTL:** 1 Hour
- ➕ **Add Record**

**Result after adding all 4:**

```
Type  Host  Value                TTL
────────────────────────────────────────
A     @     185.199.108.153      1 Hour
A     @     185.199.109.153      1 Hour
A     @     185.199.110.153      1 Hour
A     @     185.199.111.153      1 Hour
```

### 1.4 Add CNAME Record (for www subdomain)

**For www.trustiva.io:**
- **Type:** CNAME
- **Host:** www
- **Points to:** `trustiva7777.github.io`
- **TTL:** 1 Hour
- ➕ **Add Record**

**Result:**

```
Type   Host  Value                      TTL
─────────────────────────────────────────────
CNAME  www   trustiva7777.github.io     1 Hour
```

### 1.5 Save All Changes

- Click **"Save"** or **"Apply Changes"**
- GoDaddy may show: *"Your DNS changes may take up to 48 hours to propagate."*
- Usually it's much faster (15-30 minutes)

---

## Step 2: Configure GitHub Pages

### 2.1 Open GitHub Pages Settings

1. Go to: `https://github.com/Trustiva7777/Trustiva-site/settings/pages`
2. Or: **Repository → Settings → Pages** (left sidebar)

### 2.2 Set Source to GitHub Actions

- **Source:** Select `GitHub Actions` (not "Deploy from a branch")
- This ensures your workflow handles the build and deployment

### 2.3 Add Custom Domain

1. **Custom domain** field: Enter `trustiva.io` (just the domain, no `https://`)
2. Click **"Save"**
3. GitHub will check if your DNS is configured correctly
4. You might see: *"DNS check successful"* (green checkmark) ✅

**If you see DNS errors:**
- Wait 5-10 minutes for DNS to propagate
- Refresh the page
- Verify your GoDaddy records match exactly

### 2.4 Enable HTTPS

Once DNS is verified, you'll see a checkbox:
- ✅ **"Enforce HTTPS"** – Check this box
- GitHub will auto-provision an SSL certificate (free, auto-renews)
- Takes up to 1 hour after enabling

---

## Step 3: Verify DNS Propagation

You can check if your DNS records are set up correctly:

### 3.1 Using Terminal Commands

```bash
# Check A records (should show GitHub's IPs)
dig +short trustiva.io A

# Expected output:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

# Check CNAME for www
dig +short www.trustiva.io CNAME

# Expected output:
trustiva7777.github.io.
```

### 3.2 Using Online Tools

- **DNS Checker:** `https://mxtoolbox.com/`
- **DNS Propagation:** `https://www.whatsmydns.net/`
- Search for `trustiva.io`

### 3.3 Quick Browser Test

```bash
# Test HTTP redirect
curl -I http://trustiva.io

# Expected: 301 Moved Permanently → https://trustiva.io

# Test HTTPS
curl -I https://trustiva.io

# Expected: 200 OK
```

---

## Step 4: Visit Your Live Site

### ✅ Success Indicators

1. **Open browser:**
   - `https://trustiva.io` → Should load your site ✅
   - `https://www.trustiva.io` → Should also work ✅

2. **Check GitHub Actions:**
   - Go to: `https://github.com/Trustiva7777/Trustiva-site/actions`
   - Latest workflow should show **green checkmark** ✅
   - Click on it to see build logs

3. **Verify HTTPS:**
   - URL bar should show **🔒 Secure**
   - Certificate should be valid for `trustiva.io`

---

## Troubleshooting

### ❌ "404 Page Not Found" on custom domain

**Cause:** Usually means DNS is correct but CNAME file wasn't deployed.

**Fix:**
1. Check: `https://github.com/Trustiva7777/Trustiva-site/settings/pages`
2. Verify custom domain shows `trustiva.io`
3. Check Actions tab for failed builds
4. The `CNAME` file should be in the `dist/` folder after build

### ❌ "DNS Lookup Failed" or domain not resolving

**Cause:** DNS records haven't propagated yet.

**Fix:**
1. Wait 15-30 minutes
2. Verify your GoDaddy records are exactly as shown above
3. Clear browser cache: `Ctrl+Shift+Delete` (Chrome/Firefox)
4. Try in incognito/private window
5. Use `dig` or MXToolbox to verify records exist

### ❌ "Mixed Content" warnings in browser console

**Cause:** Some assets are loading over HTTP instead of HTTPS.

**Fix:**
1. Check `vite.config.ts` – should have `base: "/"`
2. Ensure all external CDN links use `https://`
3. Rebuild: `npm run build`
4. Push changes: `git add . && git commit -m "fix: use HTTPS for assets" && git push`

### ❌ HTTPS certificate not issued

**Cause:** GitHub hasn't auto-provisioned the cert yet.

**Fix:**
1. This takes up to 1 hour
2. Check back later
3. If still stuck after 1 hour:
   - Go to GitHub Pages settings
   - Click **"Enforce HTTPS"** checkbox again
   - Wait another 10 minutes

### ❌ www vs apex domain redirect not working

**Cause:** Missing or incorrect CNAME record.

**Fix:**
1. Verify CNAME record in GoDaddy:
   - Host: `www`
   - Points to: `trustiva7777.github.io` (with dot at end)
2. Check GitHub Pages settings has `trustiva.io` as custom domain
3. Wait 15 minutes for propagation

---

## Final Verification Checklist

- [ ] All 4 A records added in GoDaddy (185.199.108-111.153)
- [ ] CNAME record added for `www` → `trustiva7777.github.io`
- [ ] GitHub Pages source set to `GitHub Actions`
- [ ] Custom domain set to `trustiva.io` in GitHub
- [ ] HTTPS enforcement enabled in GitHub
- [ ] DNS propagation verified with `dig` command
- [ ] Site loads at `https://trustiva.io` ✅
- [ ] Latest Actions workflow shows green checkmark ✅
- [ ] Browser shows 🔒 secure icon ✅

---

## DNS Records Summary Table

Copy-paste reference for your GoDaddy DNS settings:

### A Records (Apex Domain)
```
Type  Host  Value               TTL
A     @     185.199.108.153     1 Hour
A     @     185.199.109.153     1 Hour
A     @     185.199.110.153     1 Hour
A     @     185.199.111.153     1 Hour
```

### CNAME Record (WWW Subdomain)
```
Type   Host  Value                   TTL
CNAME  www   trustiva7777.github.io  1 Hour
```

---

## 🔗 Useful Links

- **GoDaddy Domains:** https://www.godaddy.com/domains
- **GitHub Pages Settings:** https://github.com/Trustiva7777/Trustiva-site/settings/pages
- **GitHub Actions:** https://github.com/Trustiva7777/Trustiva-site/actions
- **DNS Checker:** https://mxtoolbox.com/
- **DNS Propagation:** https://www.whatsmydns.net/

---

## Questions?

1. **Check the main README:** [README.md](README.md)
2. **Review DNS documentation:** [DNS-SETUP.md](DNS-SETUP.md)
3. **Check deployment docs:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Your site will be live at `https://trustiva.io` after DNS propagates! 🚀**
