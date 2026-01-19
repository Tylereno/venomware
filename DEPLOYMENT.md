# VenomWare - Deployment Checklist

## Pre-Deployment Checklist

### 1. Images ✓
- [ ] All product photos added to `public/images/`
- [ ] Images optimized (under 500KB each)
- [ ] Front and back views for each product
- [ ] File names match exactly as in `lib/data.ts`

### 2. Environment Variables ✓
- [ ] `.env.local` created with Stripe keys
- [ ] Stripe test keys working locally
- [ ] Production keys ready for live deployment

### 3. Content Review ✓
- [ ] Product descriptions accurate
- [ ] Prices correct
- [ ] Contact information updated
- [ ] Custom order form tested

### 4. Testing ✓
- [ ] All pages load correctly
- [ ] Cart functionality works
- [ ] Product hover effects working
- [ ] Mobile responsive design tested
- [ ] Forms validate properly
- [ ] No console errors

## Deployment Steps

### Option 1: Vercel (Recommended - Free Tier Available)

1. **Prepare Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial VenomWare deployment"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: (leave default)
   
3. **Add Environment Variables**
   Go to Settings > Environment Variables and add:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_KEY
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live!

### Option 2: Netlify

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to https://netlify.com
   - Drag and drop your `.next` folder
   - Or connect GitHub repository

### Option 3: Custom VPS (Advanced)

If you have your own server:
```bash
npm run build
npm start
```

Use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "venomware" -- start
```

## Post-Deployment

### 1. Custom Domain Setup

**With Namecheap:**
1. Buy domain (~$12/year)
2. In Vercel: Settings > Domains > Add Domain
3. Copy nameservers from Vercel
4. In Namecheap: Domain > Manage > Custom DNS
5. Paste Vercel's nameservers
6. Wait 24-48 hours

**Recommended Domains:**
- venomware.com
- venomware.shop
- shopvenomware.com

### 2. SSL Certificate
- Vercel provides free SSL automatically
- Your site will be https:// by default

### 3. Set Up Stripe Webhooks

1. In Stripe Dashboard: Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. Copy webhook secret
5. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
   ```

### 4. Configure Email for Custom Orders

**Option A: Resend (Recommended)**
```bash
npm install resend
```

1. Sign up at https://resend.com
2. Get API key
3. Add to environment: `RESEND_API_KEY=re_YOUR_KEY`
4. Update `app/custom/page.tsx` to send emails

**Option B: SendGrid**
1. Sign up at https://sendgrid.com
2. Create API key
3. Install: `npm install @sendgrid/mail`

### 5. Analytics Setup

**Vercel Analytics (Easiest):**
```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// Add to body:
<Analytics />
```

**Google Analytics:**
1. Create GA4 property
2. Add tracking ID to environment
3. Install `npm install react-ga4`

### 6. Set Up Error Monitoring

**Sentry (Recommended):**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Production Environment Variables

Copy these to Vercel/Netlify:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=https://venomware.com

# Email (Resend)
RESEND_API_KEY=re_...

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-...

# Sentry (Optional)
SENTRY_DSN=https://...
```

## Performance Optimization

### Before Going Live:

1. **Optimize Images**
   ```bash
   npm install -g sharp-cli
   sharp -i public/images/*.jpg -o public/images/optimized/ --quality 85
   ```

2. **Test Build Locally**
   ```bash
   npm run build
   npm start
   ```
   Check for errors and warnings.

3. **Lighthouse Audit**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit
   - Aim for 90+ scores

## Monitoring & Maintenance

### Daily Tasks:
- [ ] Check for new custom order submissions
- [ ] Monitor Stripe dashboard for payments
- [ ] Respond to customer inquiries

### Weekly Tasks:
- [ ] Review analytics
- [ ] Update sold out items in `lib/data.ts`
- [ ] Check error logs

### Monthly Tasks:
- [ ] Update product inventory
- [ ] Review and optimize images
- [ ] Check for Next.js updates: `npm outdated`

## Troubleshooting

### Site Not Loading
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Check DNS propagation: https://dnschecker.org

### Images Not Showing
1. Verify images are in `public/images/`
2. Check file names match exactly
3. Clear CDN cache in Vercel

### Payment Errors
1. Check Stripe dashboard for errors
2. Verify webhook is receiving events
3. Check environment variables

## Backup Strategy

### Automated Backups:
- Code: GitHub (automatic)
- Images: Commit to repository or use cloud storage
- Data: Export from Stripe regularly

### Manual Backups:
```bash
# Backup images
zip -r images-backup.zip public/images/

# Backup code
git archive --format=zip --output=venomware-backup.zip main
```

## Success Metrics

Track these KPIs:
- [ ] Site uptime (aim for 99.9%)
- [ ] Page load time (under 3 seconds)
- [ ] Conversion rate (visitors → purchases)
- [ ] Custom order submissions
- [ ] Cart abandonment rate

## Support Contacts

- **Vercel Support**: https://vercel.com/support
- **Stripe Support**: https://support.stripe.com
- **Next.js Issues**: https://github.com/vercel/next.js/issues

---

## Quick Deploy Command

```bash
# One-line deployment
git add . && git commit -m "Deploy VenomWare" && git push origin main
```

Vercel will automatically deploy when you push to GitHub!

---

**Deployment Status: 🚀 READY**

Estimated time to go live: **30 minutes** (assuming images are ready)
