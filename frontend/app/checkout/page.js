"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useMedusa } from "@medusa-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { cart } = useMedusa();

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: cart?.items.map(item => ({ price: item.variant.price_id, quantity: item.quantity })),
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
    if (error) alert(error.message);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Checkout</h1>
      <p>Total: ${cart?.subtotal || 0}</p>
      <button onClick={handleCheckout} className="bg-blue-500 text-white px-6 py-3 rounded">Pay Now</button>
    </div>
  );
}
