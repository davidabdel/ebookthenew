# Sales Funnel with Stripe Payment Integration

This is a complete sales funnel application with integrated Stripe payments. Users can purchase directly within the app using credit card inputs powered by Stripe Elements.

**✨ Optimized for Vercel deployment** - One-click deploy with serverless API routes!

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js installed on your machine
- A Stripe account (with both Publishable and Secret keys)
- Vercel CLI installed: `npm i -g vercel`

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Your Stripe Secret Key**
   
   Create a `.env` file (if it doesn't exist) and add your **LIVE Secret Key** from Stripe:
   
   ```env
   STRIPE_SECRET_KEY=sk_[live]_YOUR_ACTUAL_SECRET_KEY_HERE
   ```
   
   ⚠️ **IMPORTANT**: 
   - Get your key from: https://dashboard.stripe.com/apikeys
   - Never commit your `.env` file to version control (it's in .gitignore)
   - The Publishable Key (`pk_live_acsLINNdHkkoxKJr570dEPeC`) is already configured

3. **Run Locally with Vercel Dev**
   
   ```bash
   vercel dev
   ```
   
   This starts both the frontend AND the serverless API routes on `http://localhost:3000`.
   
   ✅ **That's it!** No need to run separate backend/frontend servers.

4. **Test the Application**
   
   - Open `http://localhost:3000` in your browser
   - Fill in the checkout form
   - Use a real credit card (since you're using LIVE keys) or switch to test mode

## 🌐 Deploy to Vercel (Production)

### First-Time Deployment

1. **Initialize Vercel** (if not already done)
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **N** (for new project)
   - Project name? (accept default or customize)
   - Which directory? `.` (current directory)

2. **Set Environment Variable on Vercel**
   ```bash
   vercel env add STRIPE_SECRET_KEY
   ```
   
   When prompted:
   - Select: **Production**, **Preview**, and **Development**
   - Paste your secret key: `sk_[live]_...`

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

Your site is now LIVE! 🎉

### Updating After Changes

Simply run:
```bash
vercel --prod
```

Vercel will build and deploy your latest changes automatically.

## 🔑 Stripe Keys Configuration

### Current Configuration
- **Publishable Key** (Frontend): `pk_live_acsLINNdHkkoxKJr570dEPeC` ✅ Already configured
- **Secret Key** (Backend): Add to `.env` locally and Vercel environment variables ⚠️

### Test vs Live Mode

**Currently configured for LIVE mode** - Real charges will occur!

To switch to TEST mode for development:

1. In `components/Checkout.tsx` line 6, change:
   ```tsx
   const stripePromise = loadStripe('pk_test_YOUR_TEST_KEY');
   ```

2. In `.env`, change:
   ```env
   STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
   ```

### Test Card Numbers (when in test mode)
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires 3D Secure: `4000 0025 0000 3155`
- Use any future expiry date and any 3-digit CVC

## 📁 Project Structure

```
.
├── api/
│   └── create-payment-intent.ts  # Vercel serverless API route
├── components/
│   ├── Checkout.tsx              # Payment form with Stripe Elements
│   ├── Hero.tsx                  # Landing page hero section
│   └── ...
├── .env                          # Local environment variables
├── vercel.json                   # Vercel configuration
├── package.json                  # Dependencies and scripts
└── index.html                    # Main HTML entry point
```

## 🛡️ Security Notes

1. **Never expose your Secret Key** - It should only exist in `.env` and Vercel environment variables
2. **HTTPS Automatic** - Vercel provides HTTPS automatically
3. **Validate on Backend** - All payment amounts are validated server-side (in the API route)
4. **CORS Protected** - API routes only accept requests from your domain

## 🐛 Troubleshooting

### Local Development Issues

**"Cannot find module '@vercel/node'"**
- Run: `npm install --save-dev @vercel/node`

**Payment fails with "404 Not Found"**
- Make sure you're running `vercel dev`, not `npm run dev`
- The API route requires Vercel's dev server to work locally

**"Invalid API Key" error**
- Check your `.env` file has the correct `STRIPE_SECRET_KEY`
- Ensure no spaces or quotes around the key
- Restart `vercel dev` after changing `.env`

### Production Issues

**Payments fail in production but work locally**
- Verify you added the `STRIPE_SECRET_KEY` to Vercel:
  ```bash
  vercel env ls
  ```
- If missing, add it:
  ```bash
  vercel env add STRIPE_SECRET_KEY
  ```

**TypeScript errors in Checkout.tsx**
- These are cosmetic type warnings and don't affect functionality
- The payment processing works correctly despite the warnings
- Can be safely ignored

## 🎯 Alternative: Using npm run dev

If you prefer to use Vite's dev server instead of Vercel's:

1. The API route won't work locally (it's serverless)
2. You'll need to deploy to Vercel to test payments
3. OR temporarily use the old Express server (`npm run server` + `npm run dev`)

**Recommended:** Use `vercel dev` for local development to match production behavior.

## 📦 Platform Support

This setup is optimized for **Vercel**, but can be adapted for:

- **Netlify**: Convert `api/` folder to Netlify Functions format
- **Railway/Render**: Use the original `server.ts` Express backend
- **AWS Lambda**: Convert API route to Lambda function format

## 💡 Next Steps

- [ ] Add email sending after successful payment (use SendGrid/Resend)
- [ ] Implement Stripe webhooks for order fulfillment
- [ ] Add order history/receipt generation
- [ ] Set up a database (Supabase/PlanetScale) to store customer info
- [ ] Add analytics tracking (Google Analytics, Plausible)

## 🔗 Useful Links

- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Test your API route](http://localhost:3000/api/create-payment-intent) (when running `vercel dev`)

---

**Need Help?** 
- Stripe: https://support.stripe.com
- Vercel: https://vercel.com/support

