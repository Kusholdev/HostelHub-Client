import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth';

const AddMeal = () => {
    const { register, handleSubmit, reset } = useForm();
    const [MealPic, setMealPic] = useState('');
    const axiosSecure = useAxiosSecure();
    const {user} =useAuth();

    const onSubmit = async (data) => {
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
    
            const res = await axiosSecure.post('/meals', mealData);
    
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

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Meal</h2>

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
    );
};

export default AddMeal;
