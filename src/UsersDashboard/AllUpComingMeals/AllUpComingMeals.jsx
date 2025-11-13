import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from 'react-router';

const AllUpComingMeals = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: upComing = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["upComingMeals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allUpcomingMeals");
            return res.data;
        },
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-40 text-lg font-medium">
                Loading meals...
            </div>
        );

    if (error)
        return (
            <div className="text-center text-red-600 font-medium">
                Error loading meals: {error.message}
            </div>
        );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
                Upcoming Meals ({upComing.length})
            </h1>

            {upComing.length === 0 ? (
                <p className="text-center text-gray-500">No upcoming meals available.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {upComing.map((meal) => (
                        <div
                            key={meal._id}
                            className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
                        >
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4 space-y-2">
                                <h2 className="text-lg font-semibold">{meal.title}</h2>
                                <p className="text-sm text-gray-500">
                                    Category: <span className="font-medium">{meal.category}</span>
                                </p>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {meal.description || "No description provided."}
                                </p>

                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-blue-600 font-semibold">
                                        ৳{meal.price}
                                    </span>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <span className=" text-blue-600 font-bold">Likes : {meal.likes}</span>
                                    </div>
                                </div>

                                <Link  to={`/allUpComing/${meal._id}`} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-1 rounded-lg mt-3 transition">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllUpComingMeals;
