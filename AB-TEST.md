# A/B Split Test - NLP-Optimized Copy Test

## Overview

Your site now runs an **automatic 50/50 A/B split test** comparing two different copywriting approaches.

## Test Configuration

### Variant A (Original - Emotional Appeal)
**Tagline:** "FOR WOMEN OVER 40 WHO ARE TIRED OF 'PUSHING HARDER'"

**Headline:** "How to Reset Your Energy, Skin, and Sanity by Doing *Less*... Not More."

**Subheadline:** "Stop fighting the 'Invisible Shift.' Discover the framework that works *with* your changing biology to heal burnout, not cause it."

**Strategy:** Problem-agitation-solution format with emotional language

### Variant B (NLP-Optimized - Neuro-Linguistic Programming)
**Tagline:** "FOR WOMEN OVER 40 READY FOR EFFORTLESS LUXURY AND CALM CONTROL"

**Headline:** "Order *The New Baseline* Today *and* Your Energy, Skin, and Metabolism Reset Automatically."

**Subheadline:** "Harmonize with the 'Invisible Shift.' Discover the framework that works *with* your changing biology to heal burnout and build resilience."

**Strategy:** NLP principles including:
- **Bridging assumptions** ("Order... and..." structure)
- **Product name stuffing** (repeated use of "The New Baseline")
- **Removing negatives** (no "stop" or "not")
- **Lifestyle focus** ("effortless luxury," "calm control")
- **Positive framing** throughout

## How It Works

### 1. Automatic Assignment
- **New visitors** are randomly assigned to either Variant A or B (50/50 split)
- **Returning visitors** see the same variant they saw before (stored in browser localStorage)

### 2. Tracking
All variant data is tracked in three places:

#### Google Analytics
- Event: `ab_test_assigned`
- Parameters: `variant: 'A' or 'B'`, `test_name: 'hero_headline_test'`

#### Lead Webhook
```json
{
  "name": "Customer Name",
  "email": "customer@email.com",
  "variant": "A",
  "timestamp": "2026-01-20T01:02:10.123Z"
}
```

#### Order Webhook
```json
{
  "name": "Customer Name",
  "email": "customer@email.com",
  "amount": 44,
  "hasBump": true,
  "product": "Workbook + Audio Tracks",
  "variant": "A",
  "timestamp": "2026-01-20T01:05:30.456Z",
  "paymentStatus": "completed"
}
```

## Analyzing Results

### In Google Analytics

1. Go to **Reports** → **Events**
2. Look for the `ab_test_assigned` event
3. View by `variant` to see the 50/50 split

For conversions:
1. Set up a **Conversion** for purchases
2. **Compare** conversion rates between variants

### In LeadConnector

Filter your leads/orders by the `variant` field to see:
- How many leads each variant generated
- How many sales each variant generated
- Conversion rate per variant

### Manual Calculation

**Conversion Rate = (Sales ÷ Leads) × 100%**

Example:
- Variant A: 50 leads, 5 sales = 10% conversion
- Variant B: 50 leads, 8 sales = 16% conversion
- **Winner: Variant B** (60% improvement)

## Testing Locally

### Force a Specific Variant

To test a specific variant:

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Type one of these commands:

```javascript
// Force Variant A
localStorage.setItem('hero_variant_test', 'A');
location.reload();

// Force Variant B
localStorage.setItem('hero_variant_test', 'B');
location.reload();

// Clear and get random variant
localStorage.removeItem('hero_variant_test');
location.reload();
```

### Check Current Variant

In the browser console:
```javascript
window.abTestVariant
// Returns: 'A' or 'B'
```

## Customizing Variants

### Change Test Text

Edit the files:
- **Variant A**: `components/Hero.tsx`
- **Variant B**: `components/HeroVariantB.tsx`

Change the `<h1>` and subtitle `<p>` text to test different headlines.

### Add More Variants

To add Variant C:

1. Create `components/HeroVariantC.tsx`
2. In `App.tsx`, change the logic:

```tsx
const randomVariant = Math.random() < 0.33 ? 'A' 
                     : Math.random() < 0.66 ? 'B' 
                     : 'C';
```

3. Add rendering logic for Variant C

### Test Different Elements

You can A/B test other components:
- CTA button text
- Images
- Pricing display
- Order bump offer

Just follow the same pattern: create a variant component and conditionally render it.

## Best Practices

### Sample Size
- **Minimum**: 100 visitors per variant before making decisions
- **Recommended**: 300-500 visitors per variant for statistical significance

### Test Duration
- Run for **at least 7 days** to account for weekly traffic patterns
- Don't stop too early even if one variant seems to be winning

### Statistical Significance
Use a calculator like: https://www.optimizely.com/sample-size-calculator/

Aim for **95% confidence** before declaring a winner.

### One Test at a Time
- Only run ONE A/B test at a time
- Multiple simultaneous tests can contaminate results

## Declaring a Winner

Once you have enough data:

1. **Calculate conversion rates** for both variants
2. **Check statistical significance**
3. **Pick the winner**
4. **Remove the losing variant**

### To Remove the Test

When you've picked a winner:

1. Open `App.tsx`
2. Remove the A/B test logic
3. Import only the winning Hero component
4. Render it directly (no conditional)

Example - if Variant B wins:
```tsx
import { HeroVariantB as Hero } from './components/HeroVariantB';

// In render:
<Hero onCtaClick={scrollToCheckout} />
```

## Troubleshooting

### "I keep seeing the same variant"
- This is expected! Returning visitors always see their original variant
- Clear localStorage to get reassigned: `localStorage.clear()`

### "Split is not 50/50"
- Over time it will even out to 50/50
- With small sample sizes, you might see 60/40 or similar

### "Variant not showing in webhooks"
- Check browser console for errors
- Verify `window.abTestVariant` is set
- Fallback is always 'A' if undefined

## Advanced: Multi-Step Funnel Analysis

Track the full funnel for each variant:

1. **Viewed page** → (from Google Analytics)
2. **Started checkout** (Step 1) → (from Lead webhook)
3. **Completed purchase** (Step 2) → (from Order webhook)

Calculate:
- **Lead capture rate**: Leads ÷ Page views
- **Purchase rate**: Purchases ÷ Leads
- **Overall conversion**: Purchases ÷ Page views

This shows you WHERE each variant wins or loses.

---

**Current Status**: Test is ACTIVE and running on both local and production.
