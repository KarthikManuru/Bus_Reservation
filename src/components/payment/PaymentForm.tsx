import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '../ui/Button';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  isProcessing: boolean;
}

export function PaymentForm({ amount, onSuccess, isProcessing }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    // In a real app, you would create a payment intent on your server
    // For demo purposes, we'll simulate a successful payment
    setTimeout(() => {
      setLoading(false);
      onSuccess({ id: 'pi_demo_payment', status: 'succeeded' });
    }, 2000);

    /* Real Stripe implementation would look like this:
    
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret, // This comes from your server
      {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: 'Customer Name',
            email: 'customer@example.com',
          },
        },
      }
    );

    if (error) {
      setError(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
    */
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-lg p-3 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading || isProcessing}
        className="w-full"
        size="lg"
      >
        {loading || isProcessing ? 'Processing...' : `Pay $${amount}`}
      </Button>

      <div className="text-xs text-gray-500 text-center">
        <p>This is a demo payment form. No actual charges will be made.</p>
        <p>Use test card: 4242 4242 4242 4242, any future date, any 3-digit CVC</p>
      </div>
    </form>
  );
}