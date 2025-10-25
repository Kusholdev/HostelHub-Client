import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = ({ email, plan, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const cleanAmount = parseFloat(price.replace(/[^0-9.]/g, ''));
    const amountInCents = Math.round(cleanAmount * 100);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }
        // step:1 validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {


            setError(error.message);
        }
        else {
            setError('');
            console.log('Payment method', paymentMethod);


            // step -2 create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents
            })

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });
            if (result.error) {
                setError(result.error.message);
            }
            else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log("PaymentSucceed");

                    const transactionId = result.paymentIntent.id;

                    await axiosSecure.post('/payments', {
                        email: user.email,
                        plan,
                        amount: cleanAmount,
                        transactionId,
                        date: new Date(),
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `
                            <p>Plan: <strong>${plan}</strong></p>
                            <p>Amount: <strong>$${cleanAmount}</strong></p>
                            <p>Transaction ID: <strong>${transactionId}</strong></p>
                        `,
                        confirmButtonText: 'OK',
                        timer: 8000,
                    });
                }
            }
        }


    }
    return (
        <div className="max-w-md mx-auto space-y-6">
            {/*  Package Details Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-3 text-center">Your Selected Plan</h2>
                <div className="space-y-2 text-center">
                    <p><span className="font-semibold">Email:</span> {email}</p>
                    <p><span className="font-semibold">Plan:</span> {plan}</p>
                    <p><span className="font-semibold">Price:</span> ${cleanAmount}</p>
                </div>
            </div>

            {/*  Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-4 space-x-3 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-5 border rounded">

                </CardElement>
                <button type='submit'

                    className="btn btn-primary text-white w-full"
                    disabled={!stripe}>
                    Pay ${cleanAmount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;