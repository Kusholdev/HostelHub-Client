import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Meals = () => {
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    // Temporary input states for min/max price
    const [minPriceInput, setMinPriceInput] = useState("");
    const [maxPriceInput, setMaxPriceInput] = useState("");

    // Actual filter values used in query
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Apply Filters button handler
    const applyFilters = () => {
        setMinPrice(minPriceInput);
        setMaxPrice(maxPriceInput);
    };

    // Infinite query for meals
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        error,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["meals", search, category, minPrice, maxPrice],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosSecure.get("/meals", {
                params: {
                    search,
                    category,
                    minPrice,
                    maxPrice,
                    page: pageParam,
                    limit: 10, // number of meals per page
                },
            });
            // backend should return: { meals: [...], nextPage: number | null }
            return res.data;
        },
        getNextPageParam: (lastPage) => lastPage.nextPage, // tell React Query the next page
    });

    // Flatten all pages
    const allMeals = data ? data.pages.flatMap((page) => page.meals) : [];

    // Refetch when filters change
    useEffect(() => {
        refetch();
    }, [search, category, minPrice, maxPrice]);

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;
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
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="input input-bordered"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="input input-bordered"
                />

                <button className="btn btn-primary" onClick={applyFilters}>
                    Apply Filters
                </button>
            </div>

            {/* Infinite Scroll Meals list */}
            <InfiniteScroll
                dataLength={allMeals.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<h4>Loading more meals...</h4>}
                endMessage={<p className="text-center mt-4">No more meals!</p>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMeals.map((meal) => (
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
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Meals;
