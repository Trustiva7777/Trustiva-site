# GoDaddy DNS Quick Reference for trustiva.io

## Copy-Paste DNS Records

Add these exact records in GoDaddy DNS Manager:

### A Records (for @ / apex domain)
```
Type: A    Host: @    Value: 185.199.108.153    TTL: 1 hour
Type: A    Host: @    Value: 185.199.109.153    TTL: 1 hour
Type: A    Host: @    Value: 185.199.110.153    TTL: 1 hour
Type: A    Host: @    Value: 185.199.111.153    TTL: 1 hour
```

### CNAME Record (for www subdomain)
```
Type: CNAME    Host: www    Value: kevanbtc.github.io    TTL: 1 hour
```

## Verification Commands

After DNS changes (wait 5-60 minutes), run these:

```bash
# Should return all 4 GitHub IPs
dig trustiva.io +short

# Should return: kevanbtc.github.io.
dig www.trustiva.io CNAME +short

# Should show HTTP/2 200
curl -I https://trustiva.io
```

## Do NOT Do This

❌ Add an A record for www
❌ Add a CNAME for @ (apex)
❌ Delete your MX records (email)
❌ Use different GitHub Pages IPs

## GitHub Pages Settings

1. Go to: Settings → Pages
2. Source: **GitHub Actions**
3. Custom domain: **trustiva.io**
4. Wait for DNS check to pass (green checkmark)
5. Enable: **Enforce HTTPS** ✅

## Timeline

- DNS propagation: 5-60 minutes
- GitHub DNS verification: 1-5 minutes after propagation
- HTTPS certificate: 5-10 minutes after verification
- Total: Usually 15-90 minutes from DNS change to full HTTPS

## Support

If stuck after 2 hours:
1. Check workflow run status in Actions tab
2. Verify DNS with `dig trustiva.io` and `dig www.trustiva.io`
3. Remove and re-add custom domain in GitHub Pages settings
4. Check DEPLOYMENT.md troubleshooting section
