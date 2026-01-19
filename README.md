# VenomWare - Handmade Exotic & Rave Wear E-Commerce

A premium Next.js 14 e-commerce website for VenomWare, featuring handcrafted exotic dancewear and rave outfits.

## 🎨 Design Features

- **High-Contrast Monochrome Aesthetic**: Black background (#050505) with white text
- **Interactive Product Cards**: Grayscale images that reveal color on hover + swap to back view
- **Glassmorphism Navigation**: Sticky navbar with backdrop blur effect
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Shopping Cart**: Zustand-powered cart with drawer interface
- **Custom Orders**: Dedicated form for commission requests

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Animation**: Framer Motion

## 📦 Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment Variables**
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Then add your Stripe keys (get them from https://stripe.com/developers):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

3. **Add Product Images**
Place your product images in `public/images/` with these names:
- `liberty-front.jpg` & `liberty-back.jpg`
- `jasmyn-front.jpg` & `jasmyn-back.jpg`
- `malibu-front.jpg` & `malibu-back.jpg`
- `genesis-front.jpg` & `genesis-back.jpg`
- `jasmyn2-front.jpg` & `jasmyn2-back.jpg`
- `esmee-front.jpg` & `esmee-back.jpg`
- `heaven-front.jpg` & `heaven-back.jpg`
- `dynamite-front.jpg` & `dynamite-back.jpg`
- `love-dynamite-front.jpg` & `love-dynamite-back.jpg`
- `moneybag-pink.jpg`
- `moneybag-rainbow.jpg`
- `moneybag-snake.jpg`

4. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
venomware/
├── app/
│   ├── layout.tsx           # Root layout with fonts & navbar
│   ├── page.tsx             # Homepage with hero & featured products
│   ├── globals.css          # Global styles
│   ├── shop/
│   │   └── [category]/
│   │       └── page.tsx     # Dynamic category pages
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx     # Individual product pages
│   └── custom/
│       └── page.tsx         # Custom order form
├── components/
│   ├── Navbar.tsx           # Glassmorphism navigation
│   ├── ProductCard.tsx      # Interactive product card with hover
│   ├── CartDrawer.tsx       # Shopping cart sidebar
│   └── AddToCartButton.tsx  # Reusable add-to-cart button
├── lib/
│   ├── data.ts              # Product inventory data
│   ├── store.ts             # Zustand cart store
│   └── utils.ts             # Utility functions
└── public/
    └── images/              # Product images
```

## 🛍️ Product Management

Edit `lib/data.ts` to:
- Add new products
- Update prices
- Change availability status
- Modify product descriptions

Each product requires:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  variant: 'Color/Style Description',
  price: 85.00,
  category: 'exotic' | 'rave' | 'accessories',
  status: 'available' | 'sold_out' | 'limited',
  description: 'Detailed description',
  images: ['/images/front.jpg', '/images/back.jpg']
}
```

## 🎯 Key Features

### Image Hover Effect
- Products display grayscale by default
- On hover: Image becomes full color AND swaps to back view
- Implemented with Tailwind `group` and `group-hover` classes

### Shopping Cart
- Persistent state with Zustand
- Add/remove items
- Update quantities
- Real-time total calculation
- Slide-out drawer interface

### Custom Orders
- React Hook Form validation
- Large text area for detailed requests
- Email & phone collection
- Success notification

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
6. Click "Deploy"

Your site will be live at `your-project.vercel.app`

### Custom Domain

1. Buy domain from Namecheap (~$10-12/year)
2. In Vercel dashboard, go to Settings > Domains
3. Add your custom domain
4. Update nameservers in Namecheap to Vercel's nameservers
5. Wait 24-48 hours for DNS propagation

## 💳 Payment Integration

The checkout button is ready for Stripe integration. To complete:

1. Install Stripe SDK: `npm install @stripe/stripe-js stripe`
2. Create API route: `app/api/checkout/route.ts`
3. Implement Stripe Checkout session
4. Add webhook handler for order confirmation

See [Stripe Documentation](https://stripe.com/docs/checkout/quickstart) for details.

## 📝 TODO

- [ ] Integrate Stripe Checkout
- [ ] Add email service for custom orders (e.g., Resend, SendGrid)
- [ ] Implement product search functionality
- [ ] Add image zoom on product pages
- [ ] Create admin panel for inventory management
- [ ] Set up analytics (Google Analytics / Vercel Analytics)
- [ ] Add loading states and error boundaries
- [ ] Implement SEO optimizations (Open Graph, JSON-LD)

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  background: "#050505",  // Nearly black
  foreground: "#ffffff",  // White
}
```

### Fonts
Edit `app/layout.tsx` to change typography:
- Headings: Montserrat (Black/Bold)
- Body: Inter

## 📧 Support

For questions or issues, contact the developer or refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 📄 License

Private project for VenomWare. All rights reserved.
