import React from 'react';
import { useParams } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const Payment = () => {
    const { email, plan, price } = useParams();
    // console.log('Email', email, 'Plan', plan, "price:", price);
    const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm email={email} plan={plan} price={price} />
        </Elements>
    );
};

export default Payment;