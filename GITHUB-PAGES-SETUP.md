# GitHub Pages Deployment Guide for Trustiva

Your project is now configured for GitHub Pages deployment. Follow these steps to deploy:

## Step 1: Push to GitHub

```bash
# Navigate to your project folder
cd /workspaces/spark-template

# Initialize git if needed (check if .git exists first)
git init

# Set main as your branch
git branch -M main

# Add the remote (replace with your actual repo URL)
git remote add origin https://github.com/Trustiva7777/Trustiva-site.git

# Add all files
git add .

# Commit
git commit -m "Initial deploy to GitHub Pages"

# Push to GitHub
git push -u origin main
```

## Step 2: Configure GitHub Pages

1. Go to: `https://github.com/Trustiva7777/Trustiva-site/settings/pages`
2. Under **Source**, select **GitHub Actions**
3. Under **Custom domain**, enter `trustiva.io` and click **Save**
4. Wait for DNS verification (may take a few minutes)
5. Once verified, check **Enforce HTTPS**

## Step 3: Verify Deployment

After pushing, GitHub Actions will automatically:
- Install dependencies
- Build your Vite project
- Deploy to GitHub Pages
- Make it available at https://trustiva.io

Check deployment status:
- Go to the **Actions** tab in your repository
- Look for "Deploy to GitHub Pages" workflow
- It should show a green checkmark when complete

## Troubleshooting

### Domain already in use
If GitHub says `trustiva.io` is already in use:
1. Go to `https://github.com/Trustiva7777/trustiva7777.github.io/settings/pages`
2. Remove the custom domain from that repo
3. Return to Trustiva-site and set the domain again

### Build fails
Check the Actions tab for error details. Common issues:
- Missing dependencies (should be resolved by `npm ci`)
- Build errors in your code
- Node version mismatch

### DNS not resolving
Verify your DNS settings:
```bash
nslookup trustiva.io
nslookup www.trustiva.io
```

Expected results:
- `trustiva.io` → A records to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `www.trustiva.io` → CNAME to trustiva7777.github.io

## Files Added

- `.github/workflows/deploy.yml` - GitHub Actions workflow for automated deployment
- `CNAME` - Custom domain configuration file
- This guide

## Notes

- The workflow runs automatically on every push to `main`
- You can also trigger it manually from the Actions tab
- The CNAME file ensures your custom domain is preserved after each deployment
- Build output goes to the `dist` folder (standard for Vite)
