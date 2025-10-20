import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEdit, FaTrash, FaEye, FaThumbsUp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [editingReview, setEditingReview] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    const { data: reviews = [], isLoading, error } = useQuery({
        queryKey: ["reviews", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user.email}`);
            return res.data;
        },
    });

    if (isLoading)
        return <p className="text-center text-lg font-medium">Loading...</p>;
    if (error)
        return <p className="text-center text-red-500 font-semibold">Facing Error</p>;

    const handleEditClick = (review) => {
        setEditingReview(review);
        setEditedComment(review.comment);
    };

    const handleSaveEdit = async () => {
        try {
            await axiosSecure.put(`/reviews/${editingReview._id}`, { comment: editedComment });
            Swal.fire({
                title: "Review updated successfully!!",
                icon: "success",
            });
            setEditingReview(null);
            queryClient.invalidateQueries(["reviews", user.email]);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Failed to update!",
                text: "Something went wrong!",
            });
        }
    };

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you won't be able to recover this review!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/reviews/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your review has been deleted.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                        queryClient.invalidateQueries(["reviews", user.email]);
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete review. Try again later.",
                        icon: "error",
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your review is safe",
                    icon: "info",
                    timer: 1200,
                    showConfirmButton: false
                });
            }
        })
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-b from-blue-50 to-white shadow-xl rounded-3xl mt-6 sm:mt-10 border border-gray-100">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-1 sm:mb-2">My Reviews</h1>
                <p className="text-gray-500 text-sm sm:text-base">All your meal feedbacks in one place 🍽️</p>
            </div>

            {/* If no reviews */}
            {reviews.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-medium">
                    You haven’t added any reviews yet.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base">
                                <th className="py-3 px-3 sm:px-4 text-left">#</th>
                                <th className="py-3 px-3 sm:px-4 text-left">Meal Title</th>
                                <th className="py-3 px-3 sm:px-4 text-center">Likes</th>
                                <th className="py-3 px-3 sm:px-4 text-left">Review</th>
                                <th className="py-3 px-3 sm:px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr
                                    key={review._id}
                                    className={`transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                                        } hover:bg-blue-100`}
                                >
                                    <td className="py-3 px-3 sm:px-4 font-semibold text-gray-700 text-sm sm:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-3 sm:px-4 font-semibold text-gray-800 text-sm sm:text-base">
                                        {review.mealTitle}
                                    </td>
                                    <td className="py-3 px-3 sm:px-4 text-center text-blue-600 font-semibold text-sm sm:text-base">
                                        <div className="flex justify-center items-center gap-2">
                                            <FaThumbsUp className="text-blue-600" /> {review.likes || 0}
                                        </div>
                                    </td>
                                    <td className="py-3 px-3 sm:px-4 text-gray-700 text-sm sm:text-base">
                                        {review.comment.length > 50
                                            ? review.comment.slice(0, 50) + "..."
                                            : review.comment}
                                    </td>
                                    <td className="py-3 px-3 sm:px-4 flex flex-wrap justify-center gap-2">
                                        <button
                                            onClick={() => handleEditClick(review)}
                                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm sm:text-base transition"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm sm:text-base transition"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                        <Link to='/meals' className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm sm:text-base transition">
                                            <FaEye /> View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {editingReview && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-2xl w-full max-w-md">
                        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-700">
                            Edit Review for <span className="text-indigo-600">{editingReview.mealTitle}</span>
                        </h2>

                        <textarea
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            rows="4"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                        ></textarea>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setEditingReview(null)}
                                className="bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition text-sm sm:text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
