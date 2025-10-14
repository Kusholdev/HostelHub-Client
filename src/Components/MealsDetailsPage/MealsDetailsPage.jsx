import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MealsDetailsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: meal, isLoading, isError } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`)
            return res.data;
        }

    });
    if (isLoading) {
        return <span className="loading loading-dots loading-xl"></span>

    }
    if (isError) {
        return <p> Face Error to showing the meal</p>
    }
    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* Meal Image */}
            {meal.image && (
                <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
            )}

            {/* Meal Title */}
            <h1 className="text-3xl font-bold mb-2">{meal.title}</h1>

            {/* Distributor Name */}
            <p className="text-gray-600 mb-2">
                <strong>Distributor:</strong> {meal.distributorName}
            </p>

            {/* Description */}
            <p className="mb-4">{meal.description}</p>

            {/* Ingredients */}
            <div className="mb-4">
                <strong>Ingredients:</strong>
                <ul className="list-disc list-inside">
                    {meal.ingredients?.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            {/* Post Time */}
            <p className="text-gray-500 mb-2">
                <strong>Posted on:</strong> {new Date(meal.postTime).toLocaleString()}
            </p>

            {/* Rating */}
            <p className="mb-2">
                <strong>Rating:</strong> {meal.rating} / 5
            </p>

            {/* Like Button */}
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2">
                ❤️ Like
            </button>

            {/* Meal Request Button */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Request Meal
            </button>

            {/* Reviews */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                {meal.reviews?.length > 0 ? (
                    <ul className="space-y-2">
                        {meal.reviews.map((review, idx) => (
                            <li key={idx} className="border p-2 rounded">
                                <p><strong>{review.user}</strong>: {review.comment}</p>
                                <p>Rating: {review.rating} / 5</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default MealsDetailsPage;