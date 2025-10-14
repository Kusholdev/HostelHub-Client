import React from "react";
import { Link } from "react-router";

const MealCard = ({ meal }) => {
  // ✅ Hooks must be used here (inside component body)
  
  
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      {meal.image && (
        <img
          src={meal.image}
          alt={meal.title}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h3 className="font-bold text-lg">{meal.title}</h3>
      <p className="text-sm text-gray-500">{meal.category}</p>
      <p className="mt-1">৳{meal.price}</p>
      <Link to={`/meals/${meal._id}`} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        Details
      </Link>
    </div>
  );
};

export default MealCard;
