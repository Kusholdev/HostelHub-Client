import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'

const MealsDetailsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { user } = useAuth();
    const navigate = useNavigate();

    const [reviewText, setReviewText] = useState('');
    //  useMutation for Like Update 
    const likeMutation = useMutation({
        mutationFn: async () => {
            return await axiosSecure.patch(`/meals/${id}/like`);
        },
        onSuccess: () => {
            // Refetch the meal data after liking
            queryClient.invalidateQueries(['meal', id]);
        },
    });


    // Review section mutation 
    const reviewMutation = useMutation({
        mutationFn: async (newReview) => {
            return await axiosSecure.post(`/reviews`, newReview);
        },
        onSuccess: () => {
            setReviewText("");
            // re-fetch meal to update review count
            queryClient.invalidateQueries(['meal', id])
        }

    })

    // Meal Request Mutation
    const requestMealMutation = useMutation({
        mutationFn: async (mealRequest) => {
            return await axiosSecure.post("/mealRequests", mealRequest);
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Request Sent!',
                text: 'Meal requested successfully! Pending approval.',
                confirmButtonText: 'OK'
            });
            navigate('/meals');
        },
        onError: (error) => {

            Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text: 'Failed to request meal. Please try again.',
                confirmButtonText: 'OK'
            });
            console.error(error);
        },
    });



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

    const handleLike = () => {
        if (!user) {
        
            navigate('/login', { state: { from: `/meals/${id}` } });
            return;
        }
        likeMutation.mutate();
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        console.log(reviewText);


        const newReview = {
            mealId: id,
            mealTitle: meal.title,
            userName: user.displayName || "Anonymous",
            userEmail: user.email,
            comment: reviewText,
            createdAt: new Date(),
        };

        reviewMutation.mutate(newReview);
    }
    const handleMealRequest = async () => {
        if (!user) {
            // If user not logged in → redirect to login page
            navigate("/login", { state: { from: `/meals/${id}` } });
            return;
        }

        try {

            const res = await axiosSecure.get(`/userPlan/${user.email}`);
            const userPlan = res.data.plan;


            if (userPlan === "Bronze") {
                Swal.fire({
                    icon: "warning",
                    title: "Upgrade Required",
                    text: "You need to upgrade your plan (Silver, Gold, or Platinum) to request a meal.",
                    confirmButtonText: "Go to Plans"
                }).then(() => {
                    navigate("/");
                });
                return;
            }

            //  Prepare meal request info
            const mealRequest = {
                mealId: id,
                mealTitle: meal.title,
                userEmail: user.email,
                userName: user.displayName || "Anonymous",
                plan: userPlan,
                status: "pending",
                requestedAt: new Date(),
            };

        //   send the request from here that trigger the query above
            requestMealMutation.mutate(mealRequest);

        } catch (error) {

    
            Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: 'Failed to verify your plan. Try again later.',
                confirmButtonText: 'OK'
            });
        }
    };

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
                <strong>Distributor:</strong> {meal.UserName}
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
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"

                onClick={handleLike}

            >
                ❤️ Like = {meal.likes}
            </button>
            {/* Reviews collection Button */}
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2">
                Reviews count = {meal.reviews_count || 0}
            </button>
            {/* Meal Request Button */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleMealRequest}
            >
                Request Meal
            </button>

            {/* Review Input Box */}
            <form onSubmit={handleReviewSubmit} className="mt-4">
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full border rounded p-2 mb-2"
                    rows="3"
                ></textarea>



                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 btn"
                    disabled={reviewMutation.isLoading}

                >
                    {reviewMutation.isLoading ? "Submitting..." : "Submit Review"}
                </button>
            </form>

        </div >
    );
};

export default MealsDetailsPage;