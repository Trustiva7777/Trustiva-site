# 🚀 Deploy Trustiva - Quick Guide

## Prerequisites Complete ✅

- ✅ CNAME file in `public/CNAME` 
- ✅ GitHub Actions workflow configured
- ✅ Vite build configured to copy public assets
- ✅ DNS records ready (A records + CNAME for www)

## 3-Step Deployment

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Deploy Trustiva"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Visit: https://github.com/trustiva7777/trustiva7777.github.io/settings/pages
2. Set **Source** to: `GitHub Actions`
3. Set **Custom domain** to: `trustiva.io`
4. Wait for DNS check ✅
5. Enable **Enforce HTTPS** ✅

### Step 3: Visit Your Site

🎉 https://trustiva.io

---

## Verify Everything Works

```bash
# Quick DNS check
dig +short trustiva.io A
# Should show 4 GitHub IPs: 185.199.108-111.153

# Optional: Run local verification
chmod +x verify-deployment.sh
./verify-deployment.sh
```

---

## Gotcha Fixes Applied

1. **CNAME location**: ✅ File is in `public/CNAME` and will be copied to `dist/CNAME` during build
2. **DNS records**: ✅ Apex has 4 A records, www has CNAME to trustiva7777.github.io

---

## Troubleshooting

**"Domain doesn't verify"**
- Wait 5 minutes and click "Check again"
- Verify DNS with `dig trustiva.io A`

**"404 on custom domain"**
- Re-run GitHub Action
- Check Actions tab for errors
- Verify `dist/CNAME` was created

**"Works on .github.io but not trustiva.io"**
- Clear browser cache
- Try incognito mode
- Wait for DNS propagation (up to 10 mins)

---

## Files Modified

- `vite.config.ts` - Added explicit `publicDir: 'public'` 
- `public/CNAME` - Cleaned up formatting (no trailing newline)

---

**See `FINAL-DEPLOYMENT-CHECKLIST.md` for comprehensive details.**
