# 🚀 VenomWare - Quick Start

## First Time Setup (5 minutes)

### 1. Open Terminal in VS Code
Press `` Ctrl + ` `` (backtick) or go to View > Terminal

### 2. Install Dependencies
```powershell
npm install
```
⏱️ This takes about 3-5 minutes. You'll see a progress bar.

### 3. Create Environment File
```powershell
cp .env.local.example .env.local
```

### 4. Edit `.env.local` file
Replace the placeholder keys with your actual Stripe keys from https://stripe.com/developers

### 5. Start Development Server
```powershell
npm run dev
```

### 6. Open Browser
Navigate to: **http://localhost:3000**

🎉 **You should see your VenomWare site!**

---

## Adding Product Images

### Windows PowerShell:
```powershell
# Create images directory (if needed)
mkdir public\images

# Copy your images there
# Example: Copy from Desktop
Copy-Item "C:\Users\Tyler\Desktop\liberty-front.jpg" "public\images\"
```

### Or use File Explorer:
1. Navigate to `work/public/images/`
2. Drag and drop your product photos

---

## Common Commands

```powershell
# Start development server
npm run dev

# Stop server (in terminal)
Ctrl + C

# Build for production (test before deploying)
npm run build

# Check for errors
npm run lint

# Install a new package
npm install package-name

# Update all packages
npm update
```

---

## Editing Products

Open `lib/data.ts` in VS Code and modify the products array.

**To mark something sold out:**
```typescript
{
  id: 'e1',
  status: 'sold_out',  // Change from 'available'
  // ... rest of product
}
```

**To add a new product:**
```typescript
{
  id: 'e8',  // Use next number
  name: 'New Product',
  variant: 'Black/Gold',
  price: 95.00,
  category: 'exotic',
  status: 'available',
  description: 'Your description here',
  images: ['/images/new-front.jpg', '/images/new-back.jpg']
}
```

Save the file, and the site will automatically reload!

---

## Deploying to Vercel

### First Time:
```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial VenomWare deployment"

# Create GitHub repo and push
# (Follow GitHub's instructions after creating repo)
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Future Updates:
```powershell
# Make your changes, then:
git add .
git commit -m "Updated products"
git push
```

Vercel will automatically deploy when you push!

---

## Troubleshooting

### "Module not found" error
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Port 3000 already in use
```powershell
# Kill the process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or use a different port
$env:PORT=3001; npm run dev
```

### Images not showing
1. Check file names match exactly (case-sensitive!)
2. Hard refresh: `Ctrl + Shift + R`
3. Check browser console: `F12` > Console tab

### Changes not showing
- Make sure dev server is running (`npm run dev`)
- Check terminal for errors
- Try refreshing the browser

---

## File Structure Quick Reference

```
work/
├── app/                  # Pages and routing
│   ├── page.tsx         # Homepage
│   ├── shop/[category]/ # Shop categories
│   ├── product/[id]/    # Product details
│   └── custom/          # Custom order form
├── components/          # Reusable components
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── CartDrawer.tsx
├── lib/
│   ├── data.ts         # ⭐ EDIT THIS for products
│   ├── store.ts        # Shopping cart logic
│   └── utils.ts        # Helper functions
└── public/
    └── images/         # ⭐ PUT IMAGES HERE
```

---

## Git Commands (Version Control)

```powershell
# Check what changed
git status

# See your changes
git diff

# Commit specific file
git add lib/data.ts
git commit -m "Updated Liberty price"

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all changes (be careful!)
git reset --hard HEAD

# Create a new branch
git checkout -b feature/new-products
```

---

## VS Code Tips

### Useful Shortcuts:
- `Ctrl + P` - Quick file open
- `Ctrl + Shift + F` - Search across all files
- `Ctrl + /` - Comment/uncomment line
- `Alt + Up/Down` - Move line up/down
- `Ctrl + D` - Select next occurrence
- `F2` - Rename symbol

### Extensions to Install:
1. **Prettier** - Code formatter
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind
3. **ES7+ React/Redux/React-Native snippets** - Code shortcuts

---

## Testing Checklist

Before showing to client:
- [ ] Homepage loads
- [ ] All category pages work
- [ ] Product cards show images
- [ ] Hover effect works (grayscale → color, front → back)
- [ ] Click product opens detail page
- [ ] Add to cart works
- [ ] Cart drawer opens and shows items
- [ ] Custom form validates and submits
- [ ] Mobile view works (resize browser)

---

## Need Help?

### Check These First:
1. **Terminal Output** - Error messages show here
2. **Browser Console** - Press `F12` > Console tab
3. **README.md** - Full documentation
4. **SETUP_GUIDE.md** - Detailed setup steps

### Common Error Messages:

**"ENOENT: no such file or directory"**
→ File path is wrong or file doesn't exist

**"Module not found: Can't resolve..."**
→ Run `npm install` again

**"Port 3000 is already in use"**
→ Another app is using that port. Close it or use different port

**"Invalid environment variable"**
→ Check your `.env.local` file

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Stop server | `Ctrl + C` |
| Install packages | `npm install` |
| Build for production | `npm run build` |
| Check for errors | `npm run lint` |
| Commit changes | `git add . && git commit -m "message"` |
| Deploy | `git push` |

---

**Your site is now ready to develop! 🎉**

For detailed information, see:
- README.md - Full documentation
- SETUP_GUIDE.md - Step-by-step setup
- DEPLOYMENT.md - Going live checklist
