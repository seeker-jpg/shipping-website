#!/bin/bash
# =============================================================================
# MEGA STORAGE - Quick Deployment Script
# Run from project directory: bash deploy/deploy.sh
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

APP_NAME="corely"
APP_DIR="/var/www/corely"

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          MEGA STORAGE - Deployment Script                   ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"

# =============================================================================
# Check if we're in the right directory
# =============================================================================
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Run this from the project root.${NC}"
    exit 1
fi

# =============================================================================
# Pull latest changes
# =============================================================================
echo -e "\n${YELLOW}📥 Step 1: Pulling latest changes from Git...${NC}"
if [ -d ".git" ]; then
    git fetch --all
    git reset --hard origin/main
    echo -e "${GREEN}✓ Latest code pulled${NC}"
else
    echo -e "${YELLOW}⚠ Not a git repository, skipping pull${NC}"
fi

# =============================================================================
# Install dependencies
# =============================================================================
echo -e "\n${YELLOW}📦 Step 2: Installing dependencies...${NC}"
npm ci --production=false
echo -e "${GREEN}✓ Dependencies installed${NC}"

# =============================================================================
# Build for production
# =============================================================================
echo -e "\n${YELLOW}🔨 Step 3: Building for production...${NC}"
npm run build
echo -e "${GREEN}✓ Production build complete${NC}"

# =============================================================================
# Restart PM2
# =============================================================================
echo -e "\n${YELLOW}🔄 Step 4: Restarting PM2 processes...${NC}"

# Check if PM2 process exists
if pm2 describe $APP_NAME > /dev/null 2>&1; then
    pm2 reload deploy/ecosystem.config.js --update-env
    echo -e "${GREEN}✓ PM2 process reloaded${NC}"
else
    pm2 start deploy/ecosystem.config.js
    pm2 save
    echo -e "${GREEN}✓ PM2 process started${NC}"
fi

# =============================================================================
# Health check
# =============================================================================
echo -e "\n${YELLOW}🏥 Step 5: Running health check...${NC}"
sleep 3  # Wait for process to start

# Check if the application is responding
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✓ Application is responding${NC}"
else
    echo -e "${YELLOW}⚠ Application may still be starting, check logs with: pm2 logs $APP_NAME${NC}"
fi

# =============================================================================
# Show PM2 status
# =============================================================================
echo -e "\n${BLUE}📊 PM2 Status:${NC}"
pm2 status $APP_NAME

# =============================================================================
# Summary
# =============================================================================
echo -e "\n${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   DEPLOYMENT COMPLETE!                       ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${BLUE}📋 Useful commands:${NC}"
echo -e "   pm2 logs $APP_NAME      - View application logs"
echo -e "   pm2 status              - Check process status"
echo -e "   pm2 restart $APP_NAME   - Restart application"
echo -e "   pm2 monit               - Real-time monitoring"

echo -e "\n${GREEN}🎉 Deployment successful!${NC}\n"
