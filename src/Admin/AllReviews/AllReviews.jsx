import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    // Fetch all reviews
    const { data: reviews = [], isLoading, error } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allReviews');
            return res.data;
        },
    });

    // Mutation to delete a review
    const { mutate: deleteReview } = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/reviews/${id}`);
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Review has been deleted.', 'success');
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
        onError: (err) => {
            Swal.fire('Error', err.message, 'error');
        }
    });

    // const handleViewMeals = (mealId) => {
    //     navigate(`/meals/${mealId}`);
    // };
    

    if (isLoading) return <p className="text-center p-6">Loading reviews...</p>;
    if (error) return <p className="text-center p-6 text-red-500">Failed to load reviews</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">All Reviews</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-sm">
                        <tr>
                            <th className="border p-2 text-left">Meal Title</th>
                            <th className="border p-2 text-center">Likes</th>
                            <th className="border p-2 text-center">Reviews Count</th>
                            <th className="border p-2 text-center">User Name</th>
                            <th className="border p-2 text-center">Comment</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id} className="hover:bg-blue-50 text-sm transition-all">
                                <td className="border p-2">{review.mealTitle}</td>
                                <td className="border p-2 text-center">{review.likes}</td>
                                <td className="border p-2 text-center">{review.reviews_count}</td>
                                <td className="border p-2 text-center">{review.userName}</td>
                                <td className="border p-2">{review.comment}</td>
                                <td className="border p-2 text-center">
                                    <div className="flex justify-center gap-2 flex-wrap">
                                        <button  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
                                            View
                                        </button>
                                        <button
                                            onClick={() => deleteReview(review._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No reviews found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;
