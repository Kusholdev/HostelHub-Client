import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from "sweetalert2";

const MealsTable = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: upComing = [], isLoading, error } = useQuery({
        queryKey: ["upComing"],
        queryFn: async () => {
            const res = await axiosSecure.get(`upcomingMeals`);
            return res.data;
        }

    })
    const handlePublish = async (meal) => {
        const confirm = await Swal.fire({
            title: "Publish this meal?",
            text: `Do you want to publish "${meal.title}" to all meals?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Publish it!",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosSecure.post('/meals', meal);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Published!",
                    text: `${meal.title} has been published successfully.`,
                    icon: "success",
                    timer: 2000,
                });
                await axiosSecure.delete(`/upcomingMeals/${meal._id}`)
                queryClient.invalidateQueries(["upComing"])
            }
        }
        catch (err) {
            console.error("Error publishing meal:", err);
            Swal.fire({
                title: "Error!",
                text: err.response?.data?.message || "Failed to publish meal.",
                icon: "error",
            });
        }
    }
    if (isLoading) return <p>Loading meals...</p>;
    if (error) return <p>Error loading meals: {error.message}</p>;
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-3">Upcoming Meals</h2>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Likes</th>
                        <th className="p-2 border">Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {upComing.map((meal, index) => (
                        <tr key={meal._id} className="text-center">
                            <td className="p-2 border">{index + 1}</td>
                            <td className="p-2 border">{meal.title}</td>
                            <td className="p-2 border">{meal.likes}</td>
                            <td className="p-2 border">{meal.reviews_count}</td>
                            <button
                                onClick={() => handlePublish(meal)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                            >
                                Publish
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default MealsTable;