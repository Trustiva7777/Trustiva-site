# 🚀 GoDaddy Setup - Quick Start

## What You Need to Do in GoDaddy

Log in to GoDaddy and follow these exact steps:

### 1. Open DNS Management (2 minutes)

1. Go to [GoDaddy My Products](https://account.godaddy.com/products)
2. Find **trustiva.io** in your domains list
3. Click the **DNS** button (or three dots → Manage DNS)

### 2. Add DNS Records (3 minutes)

You need to add **5 total records**. Here's exactly what to enter:

#### Add 4 A Records (for trustiva.io)

Click **"Add"** button, then **"A"**, and enter each one:

**Record 1:**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 1 hour
```

**Record 2:**
```
Type: A
Name: @
Value: 185.199.109.153
TTL: 1 hour
```

**Record 3:**
```
Type: A
Name: @
Value: 185.199.110.153
TTL: 1 hour
```

**Record 4:**
```
Type: A
Name: @
Value: 185.199.111.153
TTL: 1 hour
```

#### Add 1 CNAME Record (for www.trustiva.io)

Click **"Add"** button, then **"CNAME"**, and enter:

```
Type: CNAME
Name: www
Value: kevanbtc.github.io
TTL: 1 hour
```

### 3. Remove Conflicting Records (1 minute)

**⚠️ Important:** Delete these if they exist:
- Any other **A** records where Name = **@** (that aren't the 4 GitHub IPs above)
- Any **CNAME** records where Name = **@**
- Any **A** records where Name = **www**

**✅ Keep these:**
- All **MX** records (needed for email)
- Any **TXT** records
- Any other subdomain records you're using

### 4. Save Changes

Click the **"Save"** button at the bottom of the page.

---

## ✅ You're Done in GoDaddy!

Now you wait 5-60 minutes for DNS to propagate, then continue with GitHub setup.

---

## Check If It's Working

After 10-15 minutes, open Terminal and run:

```bash
dig trustiva.io +short
```

**You should see these 4 IPs:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

And check www:
```bash
dig www.trustiva.io CNAME +short
```

**You should see:**
```
kevanbtc.github.io.
```

---

## What's Next?

Once DNS is working (the `dig` commands above show the right values):

1. **Go to GitHub:** https://github.com/kevanbtc/spark-template/settings/pages
2. **Source:** Select "GitHub Actions"
3. **Custom domain:** Enter `trustiva.io` and click Save
4. **Wait for DNS check** (green checkmark appears)
5. **Enable "Enforce HTTPS"** checkbox

Then visit **https://trustiva.io** in your browser! 🎉

---

## Visual Checklist

- [ ] Logged into GoDaddy
- [ ] Found trustiva.io domain
- [ ] Clicked "DNS" or "Manage DNS"
- [ ] Added 4 A records (all with @ as name)
- [ ] Added 1 CNAME record (www as name)
- [ ] Deleted conflicting records (if any)
- [ ] Clicked "Save"
- [ ] Waited 10-15 minutes
- [ ] Ran `dig trustiva.io +short` - saw 4 GitHub IPs
- [ ] Ran `dig www.trustiva.io CNAME +short` - saw kevanbtc.github.io
- [ ] Went to GitHub Pages settings
- [ ] Set source to "GitHub Actions"
- [ ] Added custom domain: trustiva.io
- [ ] Enabled "Enforce HTTPS"
- [ ] Visited https://trustiva.io - IT WORKS! 🚀

---

## Need More Help?

- **Full deployment guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **DNS quick reference:** See [DNS-SETUP.md](DNS-SETUP.md)
- **Troubleshooting:** See [DEPLOY-SUMMARY.md](DEPLOY-SUMMARY.md)

## Common GoDaddy Interface Notes

- The "Name" field is sometimes called "Host"
- The "Value" field is sometimes called "Points to" or "Data"
- You don't need to add a trailing dot (.) to values in GoDaddy
- TTL dropdown might say "Custom" - just type "1 hour" or select it
- After clicking "Add", the record appears in a list but **isn't saved until you click the Save button at the bottom**
