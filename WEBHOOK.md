# Webhook Integration - LeadConnector

## Overview

The checkout process sends **two webhooks** to LeadConnector at different stages:

1. **Lead Capture Webhook** - When user completes Step 1 (enters name/email)
2. **Order Completion Webhook** - When payment is successfully processed in Step 2

---

## 1. Lead Capture Webhook (Step 1)

**Endpoint:**
```
https://services.leadconnectorhq.com/hooks/xWPtcA3vYI0sAeMo1AQJ/webhook-trigger/dcefe74e-8ed4-4e5a-8f70-19c1d76b9c0f
```

**Trigger:** When user clicks "Continue to Payment" after entering name and email

**Method:** POST

**Payload Format:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "timestamp": "2026-01-20T01:02:10.123Z"
}
```

---

## 2. Order Completion Webhook (Step 2)

**Endpoint:**
```
https://services.leadconnectorhq.com/hooks/xWPtcA3vYI0sAeMo1AQJ/webhook-trigger/XUW67ODqmGOFVC00ZzDo
```

**Trigger:** When payment is successfully processed via Stripe

**Method:** POST

**Payload Format:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 44,
  "hasBump": true,
  "product": "Workbook + Audio Tracks",
  "timestamp": "2026-01-20T01:05:30.456Z",
  "paymentStatus": "completed"
}
```

### Payload Fields Explained:
- `name`: Customer's full name
- `email`: Customer's email address
- `amount`: Total purchase amount in dollars (27 or 44)
- `hasBump`: Boolean - whether customer added the $17 audio tracks
- `product`: Human-readable product description
- `timestamp`: ISO 8601 timestamp of the purchase
- `paymentStatus`: Always "completed" (only sent on successful payment)

## Implementation

The webhook is implemented in `components/Checkout.tsx` in the Step 1 "Continue to Payment" button:

```tsx
onClick={async () => {
  try {
    await fetch('https://services.leadconnectorhq.com/...', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Webhook error:', error);
    // Continue anyway - don't block user if webhook fails
  }
  setStep(2);
}}
```

## Error Handling

- **Non-blocking**: If the webhook fails, the user still advances to Step 2
- **Logging**: Errors are logged to the browser console for debugging
- **No retry**: Single attempt per submission (to avoid duplicate leads)

## Testing the Webhook

### Local Testing

1. Start the dev server:
   ```bash
   vercel dev
   ```

2. Open `http://localhost:3000`

3. Fill in the name and email fields

4. Click "Continue to Payment"

5. Check the browser console for any errors

6. Verify the lead appears in your LeadConnector dashboard

### Production Testing

After deploying to Vercel, test with a real submission and verify:
- Lead appears in LeadConnector
- User advances to payment step
- No errors in browser console

## Data Privacy

**What is sent:**
- ✅ Name
- ✅ Email
- ✅ Timestamp

**What is NOT sent:**
- ❌ Credit card information
- ❌ Payment method details
- ❌ Purchase amount
- ❌ Order bump selection

Credit card and payment data is only sent to Stripe via the secure API route.

## Customizing the Webhook

### Adding More Fields

To include additional data (e.g., phone number, order bump status):

1. Add the field to `formData` state in `Checkout.tsx`
2. Add an input in Step 1
3. Include it in the webhook payload:

```tsx
body: JSON.stringify({
  name: formData.name,
  email: formData.email,
  phone: formData.phone, // New field
  timestamp: new Date().toISOString(),
}),
```

### Changing the Webhook URL

Replace the URL in the `fetch()` call on line ~235 of `components/Checkout.tsx`

### Adding Retry Logic

For more robust delivery:

```tsx
const sendWebhook = async (data: any, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch('YOUR_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) return;
    } catch (error) {
      if (i === retries - 1) console.error('Webhook failed after retries:', error);
    }
  }
};
```

## When Webhook is Called

**Timeline of Events:**

1. User enters name and email
2. User clicks "Continue to Payment"
3. **→ Webhook is sent** to LeadConnector
4. User sees Step 2 (Payment form)
5. User enters credit card details
6. User clicks "Complete Purchase"
7. Payment is processed via Stripe
8. *(Optional)* You could add another webhook here for successful payment

## Monitoring Webhook Failures

Check for failed webhooks by:

1. **Browser Console**: Open DevTools → Console tab during testing
2. **LeadConnector Dashboard**: Check for missing leads
3. **Analytics**: Add custom tracking (see below)

### Adding Analytics Tracking

```tsx
try {
  await fetch('...webhook-url...', { ... });
  // Track success
  if (typeof gtag !== 'undefined') {
    gtag('event', 'lead_submitted', { method: 'webhook' });
  }
} catch (error) {
  console.error('Webhook error:', error);
  // Track failure
  if (typeof gtag !== 'undefined') {
    gtag('event', 'webhook_failed', { error: error.message });
  }
}
```

## Security Considerations

- **Public URL**: This webhook URL is visible in the frontend code
- **Rate Limiting**: Consider adding rate limiting in LeadConnector if needed
- **Validation**: LeadConnector should validate the data format
- **No Secrets**: Never send API keys or sensitive tokens to webhooks

## Troubleshooting

### Webhook not firing

**Check:**
- Browser console for errors
- Network tab in DevTools to see if request was made
- Name AND email fields are both filled (button is disabled otherwise)

### Leads not appearing in LeadConnector

**Verify:**
- Webhook URL is correct
- LeadConnector workflow is active
- Field mapping is configured in LeadConnector
- Check LeadConnector's webhook logs

### CORS errors

LeadConnector should accept cross-origin requests. If you see CORS errors:
- This is a LeadConnector configuration issue
- Contact LeadConnector support
- As a workaround, you could proxy the webhook through your Vercel API route

## Future Enhancements

Potential improvements:

- [ ] Add webhook for successful payments
- [ ] Send UTM parameters and referrer data
- [ ] Include cart total in the payload
- [ ] Add A/B test variant identifier
- [ ] Track time spent on page before submission
- [ ] Include geolocation data (if available)

---

**Questions?** Check your LeadConnector webhook documentation or contact their support.
