import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Meals = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Fetch meals using React Query
    const { data: meals, isLoading, error } = useQuery({
        queryKey: ["meals", search, category, minPrice, maxPrice],
        queryFn: async () => {
            const params = { search, category, minPrice, maxPrice };
            const res = await axios.get("http://localhost:5000/meals", { params });
            return res.data;
        },
        keepPreviousData: true,
    });

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>
        ;
    if (error) return <p>Error loading meals.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Meals</h2>

            {/* Search and filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search meals..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input input-bordered"
                >
                    <option value="">All Categories</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="input input-bordered"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="input input-bordered"
                />
            </div>

            {/* Meals list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals && meals.length > 0 ? (
                    meals.map((meal) => (
                        <div key={meal._id} className="border p-4 rounded-lg shadow">
                            {meal.image && (
                                <img
                                    src={meal.image}
                                    alt={meal.title}
                                    className="w-full h-40 object-cover rounded-lg mb-2"
                                />
                            )}
                            <h3 className="font-bold text-lg">{meal.title}</h3>
                            <p className="text-sm text-gray-500">{meal.category}</p>
                            <p className="mt-1">৳{meal.price}</p>
                            <p className="text-sm mt-1">{meal.description}</p>
                            <p className="text-sm mt-1">
                                Ingredients: {meal.ingredients.join(", ")}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No meals found.</p>
                )}
            </div>
        </div>
    );
};

export default Meals;
