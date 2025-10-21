import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllMealsTable = () => {
    const axiosSecure = useAxiosSecure();
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('desc');

    const { data: meals = [], isLoading, error } = useQuery({
        queryKey: ['meals', sortBy, order],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allMeals?sortBy=${sortBy}&order=${order}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center p-6">Loading meals...</p>;
    if (error) return <p className="text-center text-red-500 p-6">Failed to load meals</p>;

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">All Meals</h2>

            {/* Sorting Controls */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 items-center">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base"
                >
                    <option value="">Sort By</option>
                    <option value="likes">Likes</option>
                    <option value="reviews_count">Reviews Count</option>
                </select>

                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base"
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden text-sm sm:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">Title</th>
                            <th className="border p-2 text-center">Likes</th>
                            <th className="border p-2 text-center">Reviews</th>
                            <th className="border p-2 text-center">Rating</th>
                            <th className="border p-2 text-center">Distributor</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr key={meal._id} className="hover:bg-blue-50 transition-all">
                                <td className="border p-2 break-words">{meal.title}</td>
                                <td className="border p-2 text-center">{meal.likes}</td>
                                <td className="border p-2 text-center">{meal.reviews_count}</td>
                                <td className="border p-2 text-center">{meal.rating}</td>
                                <td className="border p-2 text-center">{meal.distributor_name}</td>
                                <td className="border p-2 text-center">
                                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs sm:text-sm">View</button>
                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs sm:text-sm">Update</button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMealsTable;
