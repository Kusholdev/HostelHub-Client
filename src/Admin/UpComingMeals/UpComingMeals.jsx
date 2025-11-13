import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineUpcoming } from "react-icons/md";
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import MealsTable from '../UpComingMealsTable/MealsTable';
import { useQueryClient } from "@tanstack/react-query"; 

const UpComingMeals = () => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [MealPic, setMealPic] = useState('');
    const axiosSecure = useAxiosSecure();

    const queryClient = useQueryClient();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // handle image upload logic (if needed)
    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_key}`,
            formData
        );

        setMealPic(res.data.data.url);
    };

    const onSubmit = async (data) => {
        data.MealPic = MealPic
        try {
            const ingredientsArray = data.ingredients.split(',').map(item => item.trim());

            const mealData = {
                ...data,
                ingredients: ingredientsArray,
                image: MealPic,
                rating: 0,
                likes: 0,
                reviews_count: 0
            };

            console.log(mealData);

            const res = await axiosSecure.post('/upComingMeals', mealData);

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Meal Added Successfully!",
                    icon: "success",
                    html: `
                    <div class="text-left text-base space-y-2">
                      <p><strong>Title:</strong> ${mealData.title}</p>
                      <p><strong>Category:</strong> ${mealData.category}</p>
                      <p><strong>Price:</strong> ৳${mealData.price}</p>
                      <p><strong>Ingredients:</strong> ${mealData.ingredients.join(', ')}</p>
                      <p><strong>Description:</strong> ${mealData.description}</p>
                      <p><strong>Post Time:</strong> ${mealData.postTime || "N/A"}</p>
                      <hr class="my-2"/>
                      ${mealData.image ? `<img src="${mealData.image}" class="rounded-lg mt-2" width="100%" />` : ""}
                    </div>
                    `,
                    showCloseButton: true,
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    width: 500
                });

                reset();
                setMealPic('');
                closeModal();
                
                //it will auto refresh
                queryClient.invalidateQueries(["UpComingMeals"]);
            }

        } catch (error) {
            console.error("Error adding meal:", error);

            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to add meal. Please try again.",
                icon: "error",
                showCloseButton: true,
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="p-6">
            <MealsTable></MealsTable>
            {/* Add Button */}
            <button
                onClick={openModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
                <MdOutlineUpcoming className='ml-1' />
                Add Upcoming Meal
            </button>

            
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-lg relative my-10 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">Add Upcoming Meal</h2>

                        {/* Close (X) button */}
                        {/* Close (X) button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ✕
                        </button>


                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <label className="font-medium">Title</label>
                            <input
                                {...register('title', { required: true })}
                                placeholder="Title"
                                className="input input-bordered w-full"
                            />

                            <label className="font-medium">Category</label>
                            <input
                                {...register('category', { required: true })}
                                placeholder="Category"
                                className="input input-bordered w-full"
                            />

                            <label className="font-medium">Meal Image</label>
                            <input
                                onChange={handleImageUpload}
                                type="file"
                                className="input w-full"
                                placeholder="Your Image"
                                accept="image/*"
                            />

                            <label className="font-medium">Price</label>
                            <input
                                {...register('price', { required: true })}
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full"
                            />

                            <label className="font-medium">Ingredients</label>
                            <textarea
                                {...register('ingredients', { required: true })}
                                placeholder="Ingredients (comma separated)"
                                className="textarea textarea-bordered w-full"
                            ></textarea>

                            <label className="font-medium">Description</label>
                            <textarea
                                {...register('description', { required: true })}
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                            ></textarea>

                            <label className="font-medium">Post Time</label>
                            <input
                                {...register('postTime')}
                                type="datetime-local"
                                className="input input-bordered w-full"
                            />

                            <label className="font-medium">User Email</label>
                            <input
                                {...register('UserEmail')}
                                type="email"
                                className="input input-bordered w-full"
                                defaultValue={user?.email}
                                readOnly
                            />

                            <label className="font-medium">User Name</label>
                            <input
                                {...register('UserName')}
                                type="text"
                                className="input input-bordered w-full"
                                defaultValue={user?.displayName}
                                readOnly
                            />

                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                            >
                                Add Meal
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UpComingMeals;
