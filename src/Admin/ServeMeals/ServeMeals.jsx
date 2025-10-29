import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ServeMeals = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['mealRequests', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allMealRequest?search=${search}`);
            return res.data;
        },
    });

    const { mutate: serveMeal } = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.patch(`/serveMeal/${id}`);
        },
        onSuccess: () => {
            Swal.fire('Success', 'Meal marked as delivered!', 'success');
            queryClient.invalidateQueries(['mealRequests']);
        },
        onError: (err) => {
            Swal.fire('Error', err.message, 'error');
        },
    });

    if (isLoading) return <p className="text-center p-6">Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Serve Meals</h2>

            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded w-1/2"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-sm">
                        <tr>
                            <th className="border p-2 text-left">Meal Title</th>
                            <th className="border p-2 text-center">User Email</th>
                            <th className="border p-2 text-center">User Name</th>
                            <th className="border p-2 text-center">Status</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="hover:bg-blue-50 text-sm transition-all">
                                <td className="border p-2">{req.mealTitle}</td>
                                <td className="border p-2 text-center">{req.userEmail}</td>
                                <td className="border p-2 text-center">{req.userName}</td>
                                <td className="border p-2 text-center">{req.status}</td>
                                <td className="border p-2 text-center">
                                    {req.status === "Delivered" ? (
                                        <button className="bg-gray-400 text-white px-2 py-1 rounded" disabled>
                                            Delivered
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => serveMeal(req._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                                        >
                                            Serve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No meal requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;
