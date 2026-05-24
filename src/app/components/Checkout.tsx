'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store';

export default function CheckoutButton() {
    const cartStore = useCartStore();

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                items: cartStore.cart,
                payment_itent_id: cartStore.paymentIntent,
        }),
    }).then((res) => res.json())
    .then((data) => {
        console.log(data.paymentIntent);
    })
    .catch((err) => {
        console.error('Error creating payment intent:', err);
    });
    }, [cartStore.cart, cartStore.paymentIntent]);        
        
    return (
        <div>
            <h1>Checkout</h1>
        </div>
    );
}