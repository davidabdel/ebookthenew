import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

// Initialize Stripe with your LIVE Publishable Key
const stripePromise = loadStripe('pk_live_acsLINNdHkkoxKJr570dEPeC');

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      '::placeholder': {
        color: '#9ca3af',
      },
      fontFamily: 'inherit',
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

const CheckoutForm = ({ total, onComplete, initialName, initialEmail, hasBump }: { total: number, onComplete: () => void, initialName: string, initialEmail: string, hasBump: boolean }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardName, setCardName] = useState(initialName);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardNumber = elements.getElement(CardNumberElement);

    if (cardNumber) {
      try {
        // Create a PaymentMethod using the card element
        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardNumber,
          billing_details: {
            name: cardName,
          },
        });

        if (pmError) {
          setError(pmError.message || 'An error occurred with your card.');
          setProcessing(false);
          return;
        }

        // Send the paymentMethod.id to your backend to complete the payment
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: total,
          }),
        });

        const paymentResult = await response.json();

        if (paymentResult.success) {
          console.log('Payment Successful:', paymentResult);

          // Send order webhook to LeadConnector
          try {
            await fetch('https://services.leadconnectorhq.com/hooks/xWPtcA3vYI0sAeMo1AQJ/webhook-trigger/XUW67ODqmGOFVC00ZzDo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: cardName,
                email: initialEmail,
                amount: total,
                hasBump: hasBump,
                product: hasBump ? 'Workbook + Audio Tracks' : 'Workbook Only',
                variant: (window as any).abTestVariant || 'A',
                timestamp: new Date().toISOString(),
                paymentStatus: 'completed',
              }),
            });
            console.log('Order webhook sent successfully');
          } catch (webhookError) {
            console.error('Order webhook failed:', webhookError);
            // Continue anyway - payment succeeded even if webhook fails
          }

          onComplete();
        } else {
          setError(paymentResult.error || 'Payment failed. Please try again.');
        }
        setProcessing(false);

      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        console.error('Payment error:', err);
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <div className="p-4 border-b border-gray-200">
            <CardNumberElement options={ELEMENT_OPTIONS} />
          </div>
          <div className="flex">
            <div className="w-1/2 p-4 border-r border-gray-200">
              <CardExpiryElement options={ELEMENT_OPTIONS} />
            </div>
            <div className="w-1/2 p-4">
              <CardCvcElement options={ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
        <input
          type="text"
          placeholder="Full Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-primary bg-white shadow-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 justify-center">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" /></svg>
        <span>Payments are secure and encrypted.</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-primary text-white font-black py-5 rounded-lg hover-primary transition-all text-xl shadow-lg ring-offset-2 hover:ring-2 ring-primary/20 mt-4 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          `Complete Purchase - $${total}`
        )}
      </button>
    </form>
  );
};

export const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [hasBump, setHasBump] = useState(false);
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const total = hasBump ? 27 + 17 : 27;

  if (completed) {
    return (
      <section id="checkout-section" className="py-24 bg-[#f7f4f1] px-6 lg:px-24">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center border border-primary/20">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">Thank you for your purchase. You will receive an email shortly with your access details.</p>
          <button onClick={() => window.location.reload()} className="text-primary font-bold hover:underline">Return to Home</button>
        </div>
      </section>
    )
  }

  return (
    <section id="checkout-section" className="py-24 bg-[#f7f4f1] px-6 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-primary/20">

        {/* Left Side: Summary */}
        <div className="md:w-1/3 bg-accent/20 p-8 border-b md:border-b-0 md:border-r border-primary/10">
          <h3 className="font-bold text-xl mb-6">Order Summary</h3>
          <div className="space-y-4 text-sm text-[#555555]">
            <div className="flex justify-between">
              <span>The Invisible Shift Workbook</span>
              <span>$27</span>
            </div>
            {hasBump && (
              <div className="flex justify-between text-blue-800 font-semibold">
                <span>Nervous System Reset Tracks</span>
                <span>$17</span>
              </div>
            )}
            <div className="pt-4 border-t border-primary/20 flex justify-between text-xl font-bold text-black">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 opacity-50 text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
            <span>SSL Secured Checkout via Stripe</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <div className="flex gap-4 mb-8">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Step 1: Where should we send it?</h2>
              <p className="text-gray-500 text-sm">Enter your details to prepare your secure digital delivery.</p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    // Send webhook to LeadConnector with name and email
                    await fetch('https://services.leadconnectorhq.com/hooks/xWPtcA3vYI0sAeMo1AQJ/webhook-trigger/dcefe74e-8ed4-4e5a-8f70-19c1d76b9c0f', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        variant: (window as any).abTestVariant || 'A',
                        timestamp: new Date().toISOString(),
                      }),
                    });
                  } catch (error) {
                    console.error('Webhook error:', error);
                    // Continue anyway - don't block user if webhook fails
                  }
                  setStep(2);
                }}
                disabled={!formData.email || !formData.name}
                className="w-full bg-primary text-white font-bold py-4 rounded-lg hover-primary transition-colors disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Step 2: Finalize Order</h2>

              {/* ORDER BUMP */}
              <div
                className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer ${hasBump ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 border-gray-200'}`}
                onClick={() => setHasBump(!hasBump)}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={hasBump}
                    onChange={() => setHasBump(!hasBump)}
                    className="mt-1 w-5 h-5 accent-primary"
                  />
                  <div>
                    <p className="font-bold text-red-600 uppercase text-xs mb-1">One Time Offer: Add Only $17</p>
                    <p className="font-bold text-lg mb-1 underline">Add the 'Nervous System Reset' Audio Tracks</p>
                    <p className="text-sm text-gray-600">
                      Listen to the <span className="font-semibold">soothing relief</span> in these tracks. Let the <span className="font-semibold">calm voice</span> of <span className="font-semibold">The New Baseline</span> guide you to instant relaxation and give you your <span className="font-semibold">leisure time</span> back.
                    </p>
                  </div>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm
                  total={total}
                  initialName={formData.name}
                  initialEmail={formData.email}
                  hasBump={hasBump}
                  onComplete={() => setCompleted(true)}
                />
              </Elements>

              <button
                onClick={() => setStep(1)}
                className="w-full text-gray-400 text-sm font-medium hover:underline mt-4"
              >
                Go Back to Step 1
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
