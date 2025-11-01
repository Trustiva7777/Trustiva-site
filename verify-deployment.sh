#!/bin/bash

echo "🔍 Verifying deployment configuration..."
echo ""

# Check if CNAME exists in public
if [ -f "public/CNAME" ]; then
    echo "✅ public/CNAME exists"
    echo "   Contents: $(cat public/CNAME)"
else
    echo "❌ public/CNAME not found"
    exit 1
fi

# Check if deploy workflow exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ .github/workflows/deploy.yml exists"
else
    echo "❌ Deploy workflow not found"
    exit 1
fi

# Check vite config
if grep -q "publicDir" vite.config.ts; then
    echo "✅ vite.config.ts has publicDir configured"
else
    echo "⚠️  vite.config.ts publicDir not explicitly set (will use default 'public')"
fi

echo ""
echo "🏗️  Running build to verify CNAME gets copied..."
npm run build

echo ""
if [ -f "dist/CNAME" ]; then
    echo "✅ dist/CNAME created successfully!"
    echo "   Contents: $(cat dist/CNAME)"
else
    echo "❌ dist/CNAME not found after build"
    echo "   This will cause custom domain issues!"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Ready to deploy."
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Deploy Trustiva'"
echo "3. git push origin main"
echo "4. Configure GitHub Pages at: https://github.com/trustiva7777/trustiva7777.github.io/settings/pages"
