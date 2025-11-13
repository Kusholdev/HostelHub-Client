import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpComingDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    //fetch single meal data
    const { data: meal, isLoading, error, refetch } = useQuery({
        queryKey: ['upcomingMeal', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUpcomingMeals/${id}`);
            return res.data;
        },
    });
    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !!user?.email,

        queryFn: async () => {
            if (!user?.email) return null;
            const res = await axiosSecure.get(`/users/${user.email}/Badge`);
            console.log(res);
            return res.data;
        },
    });
    // const handleLike = async () => {
    //     try {
    //         const badge = userData?.Badge; // use userData from backend

    //         if (!['Silver', 'Gold', 'Platinum'].includes(badge)) {
    //             Swal.fire({
    //                 icon: 'warning',
    //                 title: 'Upgrade Required',
    //                 text: 'Only premium members (Silver, Gold, Platinum) can like meals.',
    //             });
    //             return;
    //         }
    //         await axiosSecure.patch(`/allUpcomingMeals/${id}/like`);
    //         refetch();
    //     } catch (err) {
    //         // error handling
    //         console.log(err);
    //     }
    // };

    const handleLike = async () => {
        try {
            // Get the latest badge from backend
            const res = await axiosSecure.get(`/users/${user.email}/Badge`);
            const badge = res.data?.Badge;

            if (!['Silver', 'Gold', 'Platinum'].includes(badge)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Upgrade Required',
                    text: 'Only premium members can like meals.',
                });
                return;
            }

            // User is premium → update likes
            await axiosSecure.patch(`/allUpcomingMeals/${id}/like`, { email: user.email });

            Swal.fire({
                icon: 'success',
                title: 'Liked!',
                text: 'Your like has been recorded.',
            });

            refetch(); // Refresh meal data
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong.',
            });
        }
    };



    if (isLoading) return <p className="text-center">Loading meal...</p>;
    if (error) return <p className="text-center text-red-500">Error loading meal: {error.message}</p>;
    if (!meal) return <p className="text-center">No meal found.</p>;

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
            <h1>{userData?.Badge || 'kushol'}</h1>
            {/* Distributor Name */}
            <p className="text-gray-600 mb-2">
                <strong>Distributor:</strong> {meal.UserName || 'Unknown'}
            </p>

            {/* Description */}
            <p className="mb-4">{meal.description || 'No description available.'}</p>

            {/* Ingredients */}
            {meal.ingredients && meal.ingredients.length > 0 && (
                <div className="mb-4">
                    <strong>Ingredients:</strong>
                    <ul className="list-disc list-inside">
                        {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Post Time */}
            {meal.postTime && (
                <p className="text-gray-500 mb-2">
                    <strong>Posted on:</strong> {new Date(meal.postTime).toLocaleString()}
                </p>
            )}

            {/* Action Buttons */}
            <div className="mt-4 space-x-2">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleLike}
                >
                    ❤️ Like = {meal.likes || 0}
                </button>




            </div>
        </div>
    );
};

export default UpComingDetails;
