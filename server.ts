
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = 4242;

// Initialize Stripe with your Secret Key
// In a real app, use process.env.STRIPE_SECRET_KEY
// For now, we are using the test key directly to make it work out of the box for testing
// YOU MUST CHANGE THIS TO process.env.STRIPE_SECRET_KEY BEFORE GOING LIVE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_4eC39HqLyjWDarjtT1zdp7dc', {
    apiVersion: '2023-10-16', // Use the latest API version you are comfortable with
});

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { paymentMethodId, amount } = req.body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true, // Automatically confirm the payment
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });

        // Send the client secret and status to the client
        res.send({
            success: true,
            clientSecret: paymentIntent.client_secret,
            status: paymentIntent.status,
        });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
