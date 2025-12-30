# Deployment Guide 🚀

This guide provides step-by-step instructions for deploying the Smart Construction Assistant to various hosting platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Vercel Deployment](#vercel-deployment-recommended)
- [Netlify Deployment](#netlify-deployment)
- [Render Deployment](#render-deployment)
- [Custom Server Deployment](#custom-server-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

## Prerequisites

Before deploying, ensure you have:
- A GitHub account with the repository forked/cloned
- Node.js 18.18.0 or higher installed locally
- Successfully built the project locally (`npm run build`)

## Vercel Deployment (Recommended)

Vercel offers the easiest deployment experience with automatic HTTPS, CDN, and continuous deployment.

### Option 1: One-Click Deploy

1. Click the deploy button:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/al7566/SmartAssistant2)

2. Sign in to Vercel with GitHub
3. Select your repository
4. Configure project settings (keep defaults)
5. Click "Deploy"
6. Wait for deployment to complete (~2 minutes)
7. Visit your live site!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd SmartAssistant2

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### Option 3: Git Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel auto-detects settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
5. Add environment variables (optional)
6. Click "Deploy"

### Vercel Configuration

The `vercel.json` file is pre-configured with:
- Static build optimization
- SPA routing (all routes → index.html)
- Environment variables
- Cache headers

## Netlify Deployment

Netlify provides excellent static site hosting with form handling and serverless functions.

### Option 1: One-Click Deploy

1. Click the deploy button:
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/al7566/SmartAssistant2)

2. Connect to GitHub
3. Authorize Netlify
4. Click "Save & Deploy"
5. Wait for deployment (~3 minutes)

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize project
netlify init

# Build the project
npm run build

# Deploy to production
netlify deploy --prod --dir=build
```

### Option 3: Git Integration

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. Add environment variables (optional)
6. Click "Deploy site"

### Netlify Configuration

The `netlify.toml` file includes:
- Build command and publish directory
- SPA redirect rules
- Security headers
- Cache optimization

## Render Deployment

Render is great for projects that might need backend services in the future.

### Deploy via Dashboard

1. Go to [render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New" → "Static Site"
4. Connect your repository
5. Render auto-detects `render.yaml`:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `./build`
6. Click "Create Static Site"
7. Wait for deployment (~5 minutes)

### Deploy via render.yaml

The `render.yaml` file is pre-configured and will be automatically detected by Render. It includes:
- Build and install commands
- Static publish path
- Environment variables
- Security headers
- SPA routing

### Manual Configuration

If not using `render.yaml`:

1. **Build Command**: `npm install && npm run build`
2. **Publish Directory**: `build`
3. **Node Version**: 18.18.0

## Custom Server Deployment

For deploying to your own VPS or server:

### Using PM2 (Production)

```bash
# Install PM2 globally on server
npm install -g pm2

# Install serve for static hosting
npm install -g serve

# Build the project
npm run build

# Serve with PM2
pm2 serve build 3000 --name "construction-assistant" --spa

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Using Nginx

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy build files to server:
   ```bash
   scp -r build/* user@your-server:/var/www/construction-assistant/
   ```

3. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/construction-assistant;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location /static/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Security headers
       add_header X-Frame-Options "DENY";
       add_header X-Content-Type-Options "nosniff";
       add_header X-XSS-Protection "1; mode=block";
   }
   ```

4. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

### Using Apache

1. Build the project:
   ```bash
   npm run build
   ```

2. Create `.htaccess` in build folder:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
   </IfModule>
   ```

3. Copy to server and configure virtual host

## Environment Variables

### Setting Environment Variables

**Vercel:**
```bash
# Via CLI
vercel env add REACT_APP_CLAUDE_API_KEY

# Via Dashboard
Settings → Environment Variables → Add
```

**Netlify:**
```bash
# Via CLI
netlify env:set REACT_APP_CLAUDE_API_KEY "your_key"

# Via Dashboard
Site settings → Environment variables → Add
```

**Render:**
```bash
# Via Dashboard
Environment → Add Environment Variable
```

### Required Variables (Future)

```env
# Claude API Integration (when implemented)
REACT_APP_CLAUDE_API_KEY=your_api_key_here

# App Configuration
REACT_APP_NAME="Construction Assistant"
REACT_APP_VERSION=1.0.0
```

## Post-Deployment

### Verify Deployment

1. **Check Homepage**: Ensure the app loads correctly
2. **Test Navigation**: Click through all tabs
3. **Test Calculators**: Enter values and verify calculations
4. **Test Chat**: Send a test message
5. **Mobile Responsiveness**: Test on mobile devices
6. **Performance**: Run Lighthouse audit

### Custom Domain Setup

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (~24 hours)

**Netlify:**
1. Go to Site Settings → Domain management
2. Add custom domain
3. Follow DNS configuration steps
4. Enable HTTPS (automatic)

**Render:**
1. Go to Settings → Custom Domain
2. Add domain
3. Configure DNS records
4. SSL is auto-provisioned

### Enable Analytics (Optional)

Add Google Analytics or other analytics:

1. Create analytics account
2. Get tracking ID
3. Add to `.env`:
   ```env
   REACT_APP_GA_TRACKING_ID=your_tracking_id
   ```
4. Redeploy

### Performance Optimization

The build is already optimized with:
- ✅ Code splitting
- ✅ Minification
- ✅ Tree shaking
- ✅ Asset optimization
- ✅ Caching headers

### Monitoring

Set up monitoring for:
- **Uptime**: Use UptimeRobot or StatusCake
- **Performance**: Vercel Analytics / Netlify Analytics
- **Errors**: Sentry or LogRocket (add later)

## Continuous Deployment

All platforms support automatic deployments:

1. **Push to GitHub** → Automatic deployment
2. **Pull Request** → Preview deployment
3. **Merge to Main** → Production deployment

### Rollback

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
- Dashboard → Deploys → Click previous deploy → Publish

**Render:**
- Dashboard → Deploys → Redeploy previous version

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild locally
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Not Working (404)

Ensure SPA routing is configured:
- **Vercel**: Check `vercel.json` routes
- **Netlify**: Check `netlify.toml` redirects
- **Render**: Check `render.yaml` routes

### Blank Page After Deploy

1. Check browser console for errors
2. Verify build completed successfully
3. Check PUBLIC_URL if using subdirectory
4. Verify all assets are served correctly

### Environment Variables Not Working

1. Ensure variables start with `REACT_APP_`
2. Rebuild after adding variables
3. Check deployment logs
4. Verify variables in platform dashboard

## Support

If you encounter issues:

1. Check deployment logs
2. Review [GitHub Issues](https://github.com/al7566/SmartAssistant2/issues)
3. Consult platform documentation:
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com)
   - [Render Docs](https://render.com/docs)

---

**Need help?** Open an issue on GitHub or check the main [README.md](README.md) for more information.
