import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Initialize Stripe with your Secret Key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { paymentMethodId, amount } = req.body;

        // Validate inputs
        if (!paymentMethodId || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: paymentMethodId and amount'
            });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true, // Automatically confirm the payment
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });

        // Send the success response
        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            status: paymentIntent.status,
        });
    } catch (error: any) {
        console.error('Error processing payment:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'Payment processing failed',
        });
    }
}
