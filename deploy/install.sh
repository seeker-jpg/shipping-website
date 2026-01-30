#!/bin/bash
# =============================================================================
# MEGA STORAGE - Debian VPS Installation Script
# Run as root: sudo bash install.sh
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_USER="deploy"
APP_DIR="/var/www/corely"
DOMAIN="your-domain.com"  # Change this!

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     MEGA STORAGE - Debian VPS Installation Script           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"

# =============================================================================
# Check if running as root
# =============================================================================
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}❌ This script must be run as root (use sudo)${NC}"
   exit 1
fi

echo -e "\n${YELLOW}📦 Step 1: Updating system packages...${NC}"
apt update && apt upgrade -y

# =============================================================================
# Install essential packages
# =============================================================================
echo -e "\n${YELLOW}📦 Step 2: Installing essential packages...${NC}"
apt install -y \
    curl \
    wget \
    git \
    build-essential \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw \
    fail2ban

# =============================================================================
# Install Node.js 20 LTS
# =============================================================================
echo -e "\n${YELLOW}📦 Step 3: Installing Node.js 20 LTS...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
else
    echo -e "${GREEN}✓ Node.js already installed: $(node -v)${NC}"
fi

# Verify Node.js version
echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"
echo -e "${GREEN}✓ npm version: $(npm -v)${NC}"

# =============================================================================
# Install PM2 globally
# =============================================================================
echo -e "\n${YELLOW}📦 Step 4: Installing PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    pm2 startup systemd -u root --hp /root
else
    echo -e "${GREEN}✓ PM2 already installed${NC}"
fi

# =============================================================================
# Install Nginx
# =============================================================================
echo -e "\n${YELLOW}📦 Step 5: Installing Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl enable nginx
    systemctl start nginx
else
    echo -e "${GREEN}✓ Nginx already installed${NC}"
fi

# =============================================================================
# Install Certbot (Let's Encrypt)
# =============================================================================
echo -e "\n${YELLOW}📦 Step 6: Installing Certbot...${NC}"
if ! command -v certbot &> /dev/null; then
    apt install -y certbot python3-certbot-nginx
else
    echo -e "${GREEN}✓ Certbot already installed${NC}"
fi

# =============================================================================
# Create deploy user
# =============================================================================
echo -e "\n${YELLOW}👤 Step 7: Creating deploy user...${NC}"
if ! id "$APP_USER" &>/dev/null; then
    adduser --disabled-password --gecos "" $APP_USER
    usermod -aG sudo $APP_USER
    echo -e "${GREEN}✓ User '$APP_USER' created${NC}"
else
    echo -e "${GREEN}✓ User '$APP_USER' already exists${NC}"
fi

# =============================================================================
# Create application directory
# =============================================================================
echo -e "\n${YELLOW}📁 Step 8: Creating application directory...${NC}"
mkdir -p $APP_DIR
mkdir -p /var/log/pm2
chown -R $APP_USER:$APP_USER $APP_DIR
chown -R $APP_USER:$APP_USER /var/log/pm2
echo -e "${GREEN}✓ Directory $APP_DIR created${NC}"

# =============================================================================
# Configure UFW Firewall
# =============================================================================
echo -e "\n${YELLOW}🔥 Step 9: Configuring UFW Firewall...${NC}"
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable
echo -e "${GREEN}✓ UFW Firewall configured (SSH, HTTP, HTTPS allowed)${NC}"

# =============================================================================
# Configure Fail2Ban
# =============================================================================
echo -e "\n${YELLOW}🛡️ Step 10: Configuring Fail2Ban...${NC}"
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
backend = auto

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

systemctl enable fail2ban
systemctl restart fail2ban
echo -e "${GREEN}✓ Fail2Ban configured${NC}"

# =============================================================================
# Copy and configure Nginx
# =============================================================================
echo -e "\n${YELLOW}⚙️ Step 11: Configuring Nginx...${NC}"
echo -e "${YELLOW}   Note: Update deploy/nginx.conf with your domain before copying${NC}"
echo -e "${YELLOW}   Then run: sudo cp deploy/nginx.conf /etc/nginx/sites-available/corely${NC}"
echo -e "${YELLOW}   And: sudo ln -s /etc/nginx/sites-available/corely /etc/nginx/sites-enabled/${NC}"

# Create directory for Let's Encrypt challenges
mkdir -p /var/www/certbot

# =============================================================================
# SSL Certificate instructions
# =============================================================================
echo -e "\n${YELLOW}🔒 Step 12: SSL Certificate Setup${NC}"
echo -e "${YELLOW}   After deploying the app and configuring Nginx, run:${NC}"
echo -e "${BLUE}   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN${NC}"

# =============================================================================
# Final Summary
# =============================================================================
echo -e "\n${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    INSTALLATION COMPLETE!                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${BLUE}📋 Summary of installed components:${NC}"
echo -e "   ✅ Node.js $(node -v)"
echo -e "   ✅ npm $(npm -v)"
echo -e "   ✅ PM2 $(pm2 -v)"
echo -e "   ✅ Nginx $(nginx -v 2>&1 | cut -d'/' -f2)"
echo -e "   ✅ Certbot"
echo -e "   ✅ UFW Firewall (enabled)"
echo -e "   ✅ Fail2Ban (enabled)"

echo -e "\n${BLUE}📋 Next steps:${NC}"
echo -e "   1. Clone your repository to $APP_DIR"
echo -e "   2. Create .env file with your secrets"
echo -e "   3. Run: npm ci && npm run build"
echo -e "   4. Update nginx.conf with your domain"
echo -e "   5. Copy nginx config: sudo cp deploy/nginx.conf /etc/nginx/sites-available/corely"
echo -e "   6. Enable site: sudo ln -sf /etc/nginx/sites-available/corely /etc/nginx/sites-enabled/"
echo -e "   7. Remove default: sudo rm /etc/nginx/sites-enabled/default"
echo -e "   8. Test nginx: sudo nginx -t"
echo -e "   9. Reload nginx: sudo systemctl reload nginx"
echo -e "   10. Get SSL: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo -e "   11. Start app: pm2 start deploy/ecosystem.config.js"
echo -e "   12. Save PM2: pm2 save"

echo -e "\n${GREEN}🎉 Your VPS is ready for deployment!${NC}\n"
