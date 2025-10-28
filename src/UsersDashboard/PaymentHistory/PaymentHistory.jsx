import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
            return res.data;
        },
        retry: false, // don't retry on 404
    });

    // Loading state
    if (isLoading) {
        return <p className="text-center mt-6">Loading payment history...</p>;
    }

    // Error state
    if (isError) {
        return (
            <p className="text-center text-red-500 mt-6">
                {error?.response?.data?.message || 'Failed to load payment history.'}
            </p>
        );
    }

    // Empty data
    if (payments.length === 0) {
        return <p className="text-center text-gray-500 mt-6">No payment history found.</p>;
    }

    // Display data
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Your Payment History
            </h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
                <table className="table w-full text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Plan</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Transaction ID</th>
                            <th className="p-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => (
                            <tr
                                key={payment._id}
                                className="hover:bg-gray-50 border-b border-gray-100"
                            >
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3 font-medium">{payment.plan}</td>
                                <td className="p-3 text-green-600">${payment.amount}</td>
                                <td className="p-3 break-all">{payment.transactionId}</td>
                                <td className="p-3">
                                    {new Date(payment.date).toLocaleString([], {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default PaymentHistory;
