import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const RequestedMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: requests, isLoading, isError } = useQuery({
        queryKey: ["requestedMeals", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/mealRequests/${user.email}`);
            return res.data;
        },
    
    });

    // Cancel request mutation
    const cancelMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/mealRequests/${id}`);
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Cancelled",
                text: "Meal request cancelled successfully",
            });
            queryClient.invalidateQueries(["requestedMeals", user.email]);
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to cancel meal request",
            });
        },
    });

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this meal request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                cancelMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <span className="loading loading-dots loading-xl"></span>;
    if (isError) return <p>Error loading requested meals</p>;
    if (!requests || requests.length === 0) return <p>No requested meals found.</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Your Requested Meals</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Meal Title</th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Likes</th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Reviews</th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Status</th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {requests.map((meal) => (
                            <tr key={meal._id}>
                                <td className="px-4 py-2">{meal.mealTitle}</td>
                                <td className="px-4 py-2 text-center">{meal.likes || 0}</td>
                                <td className="px-4 py-2 text-center">{meal.reviews_count || 0}</td>
                                <td className={`px-4 py-2 text-center font-semibold ${meal.status === "pending" ? "text-yellow-500" :
                                        meal.status === "approved" ? "text-green-500" :
                                            "text-red-500"
                                    }`}>
                                    {meal.status}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleCancel(meal._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        disabled={meal.status !== "pending"} 
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;
