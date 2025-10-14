import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MealCard from "../MealCard/MealCard";

const categories = ["All", "Breakfast", "Lunch", "Dinner"];

const MealsByCategory = () => {
    const axiosSecure = useAxiosSecure();
    const [activeCategory, setActiveCategory] = useState("All");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const res = await axiosSecure.get("/meals", {
                    params: { limit: 100 }, 
                });
                setMeals(res.data.meals || res.data); 
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchMeals();
    }, []);

    const filteredMeals =
        activeCategory === "All"
            ? meals
            : meals.filter((meal) => meal.category === activeCategory);

    if (loading) return <p className="text-center mt-6">Loading meals...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Meals by Category</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded font-semibold ${activeCategory === cat ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Meal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeals.slice(0, 3).map((meal) => (
                    <MealCard key={meal._id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

export default MealsByCategory;
