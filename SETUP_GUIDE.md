# VenomWare Setup Guide

## Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (~5 minutes on first run).

## Step 2: Prepare Your Images

You need front and back photos of each product. Place them in the `public/images/` folder.

### Required Images:

**Exotic Dancewear:**
- liberty-front.jpg & liberty-back.jpg
- jasmyn-front.jpg & jasmyn-back.jpg  
- malibu-front.jpg & malibu-back.jpg
- genesis-front.jpg & genesis-back.jpg
- jasmyn2-front.jpg & jasmyn2-back.jpg
- esmee-front.jpg & esmee-back.jpg
- heaven-front.jpg & heaven-back.jpg

**Rave Wear:**
- dynamite-front.jpg & dynamite-back.jpg
- love-dynamite-front.jpg & love-dynamite-back.jpg

**Accessories:**
- moneybag-pink.jpg
- moneybag-rainbow.jpg
- moneybag-snake.jpg

### Image Tips:
- Use consistent backgrounds (black or white recommended)
- Minimum resolution: 1000x1333px (3:4 ratio)
- Keep file sizes under 500KB each
- JPG format works best

## Step 3: Set Up Stripe (Payment Processing)

1. Go to https://stripe.com and create a free account
2. Navigate to **Developers** > **API Keys**
3. Copy your **Publishable Key** (starts with `pk_test_`)
4. Copy your **Secret Key** (starts with `sk_test_`)
5. Create a file called `.env.local` in the root folder
6. Add these lines (paste your actual keys):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 4: Run the Development Server

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

You should see your VenomWare site!

## Step 5: Test the Site

✅ **Check These Features:**
- Navigate to Exotic, Rave, and Accessories categories
- Hover over a product card (should see color + back view)
- Click a product to view details
- Add items to cart
- Open cart drawer (shopping cart icon)
- Visit the Custom Order page
- Submit a test custom order form

## Step 6: Update Product Inventory

Edit `lib/data.ts` to:
- Change prices
- Update descriptions
- Mark items as sold out
- Add new products

Example:
```typescript
{
  id: 'e8',
  name: 'New Product',
  variant: 'Black/Gold',
  price: 95.00,
  category: 'exotic',
  status: 'available',
  description: 'Your description here',
  images: ['/images/new-front.jpg', '/images/new-back.jpg']
}
```

## Step 7: Deploy to Vercel (Make It Live!)

### First Time Setup:
1. Create a GitHub account (if you don't have one)
2. Install GitHub Desktop or use Git command line
3. Commit your project files
4. Push to a new GitHub repository

### Deploy:
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"New Project"**
4. Select your VenomWare repository
5. Click **"Deploy"**
6. In Settings, add the same environment variables from Step 3

Your site will be live at: `your-project-name.vercel.app`

## Step 8: Connect Custom Domain (Optional)

1. Buy domain from **Namecheap** (~$12/year)
   - Suggested: venomware.com or venomware.shop
2. In Vercel dashboard: **Settings** > **Domains**
3. Add your domain
4. Copy the nameservers Vercel provides
5. In Namecheap: **Domain List** > **Manage** > **Nameservers**
6. Select "Custom DNS" and paste Vercel's nameservers
7. Wait 24-48 hours for DNS to propagate

## Common Issues

### "Module not found" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Images not showing
- Check file names match exactly (case-sensitive)
- Ensure images are in `public/images/` folder
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Cart not working
- Make sure you ran `npm install` completely
- Check browser console for errors (F12)

### Forms not submitting
- This is expected - you need to add email integration
- For now, it just logs to the console

## Next Steps After Launch

1. **Add Email Service for Custom Orders**
   - Recommended: Resend.com (free tier available)
   - Will send you an email when someone submits a custom order

2. **Set Up Stripe Checkout**
   - Follow Stripe's "Checkout" documentation
   - Connects the "Checkout" button to real payments

3. **Analytics**
   - Vercel Analytics (free, built-in)
   - Or Google Analytics for detailed tracking

4. **Admin Panel** (Future Enhancement)
   - Build a simple admin page to update inventory
   - Won't need to edit code for every sold item

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production (test before deploying)
npm run build

# Run production build locally
npm start

# Check for errors
npm run lint
```

## Project Status: ✅ READY TO LAUNCH

All core features are built:
- ✅ Homepage with hero section
- ✅ Product catalog with categories
- ✅ Shopping cart
- ✅ Product detail pages
- ✅ Custom order form
- ✅ Responsive design
- ✅ Image hover effects

**What's Missing:**
- Payment processing (Stripe integration needed)
- Email notifications (for custom orders)
- Image uploads (need your actual product photos)

**Time to Launch:** ~2-3 hours (after images are ready)
