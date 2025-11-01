#!/bin/bash

echo "============================================"
echo "  TRUSTIVA.IO DNS Verification Script"
echo "============================================"
echo ""

DOMAIN="trustiva.io"
WWW_DOMAIN="www.trustiva.io"
GITHUB_USER="kevanbtc"
EXPECTED_IPS=("185.199.108.153" "185.199.109.153" "185.199.110.153" "185.199.111.153")

PASS=0
FAIL=0

echo "📡 Checking DNS Records..."
echo ""

echo "1️⃣  Apex Domain A Records (${DOMAIN})"
echo "   Expected: All 4 GitHub Pages IPs"
echo ""

APEX_IPS=$(dig +short ${DOMAIN} A | sort)

if [ -z "$APEX_IPS" ]; then
  echo "   ❌ FAIL: No A records found"
  FAIL=$((FAIL + 1))
else
  for ip in "${EXPECTED_IPS[@]}"; do
    if echo "$APEX_IPS" | grep -q "$ip"; then
      echo "   ✅ $ip"
      PASS=$((PASS + 1))
    else
      echo "   ❌ $ip (missing)"
      FAIL=$((FAIL + 1))
    fi
  done
fi

echo ""
echo "2️⃣  WWW Subdomain CNAME (${WWW_DOMAIN})"
echo "   Expected: ${GITHUB_USER}.github.io."
echo ""

WWW_CNAME=$(dig +short ${WWW_DOMAIN} CNAME)

if [ -z "$WWW_CNAME" ]; then
  echo "   ❌ FAIL: No CNAME record found"
  FAIL=$((FAIL + 1))
elif [ "$WWW_CNAME" = "${GITHUB_USER}.github.io." ]; then
  echo "   ✅ ${WWW_CNAME}"
  PASS=$((PASS + 1))
else
  echo "   ❌ FAIL: Points to ${WWW_CNAME}"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "3️⃣  HTTPS Connectivity"
echo ""

if command -v curl &> /dev/null; then
  echo "   Testing https://${DOMAIN}..."
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L https://${DOMAIN} 2>/dev/null)
  
  if [ "$STATUS" = "200" ]; then
    echo "   ✅ https://${DOMAIN} (HTTP ${STATUS})"
    PASS=$((PASS + 1))
  else
    echo "   ❌ https://${DOMAIN} (HTTP ${STATUS})"
    FAIL=$((FAIL + 1))
  fi
  
  echo "   Testing https://${WWW_DOMAIN}..."
  WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L https://${WWW_DOMAIN} 2>/dev/null)
  
  if [ "$WWW_STATUS" = "200" ]; then
    echo "   ✅ https://${WWW_DOMAIN} (HTTP ${WWW_STATUS})"
    PASS=$((PASS + 1))
  else
    echo "   ⚠️  https://${WWW_DOMAIN} (HTTP ${WWW_STATUS})"
  fi
else
  echo "   ⚠️  curl not found, skipping HTTPS check"
fi

echo ""
echo "============================================"
echo "  Results"
echo "============================================"
echo ""

if [ $FAIL -eq 0 ]; then
  echo "✅ All checks passed! ($PASS/$((PASS + FAIL)))"
  echo ""
  echo "Your domain is correctly configured."
  echo "Visit: https://${DOMAIN}"
  exit 0
else
  echo "❌ Some checks failed ($FAIL failures, $PASS passed)"
  echo ""
  echo "Next steps:"
  echo "  1. If DNS records are missing, add them in GoDaddy"
  echo "  2. Wait 5-60 minutes for DNS propagation"
  echo "  3. Run this script again"
  echo ""
  echo "See DEPLOYMENT.md for detailed instructions"
  exit 1
fi
