import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FaEye } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../SocialLogin/socialLogin';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser,updateUserProfile } = useAuth();

    const[profilePic,setProfilePic]=useState('');
   
   const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then(async(result) => {
                console.log(result.user);


                //Update user info in the Database

                const email = data.email;
                const userInfo={
                    email:email,
                    role:'user',
                    Badge:'Bronze',
                    created_at:new Date().toISOString(),
                    last_logged_in:new Date().toISOString()
                }

              const userResult = await axiosSecure.post('/users',userInfo);
              console.log(userResult);



                const updateProfile={
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(updateProfile)
                      .then(()=>{
                        console.log("ProfileInfo updated successfully")
                      })
                      .catch(error =>{
                        console.log(error.message);

                        Swal.fire({
                            title: "Error!",
                            text: error.message,
                            icon: "error",
                            confirmButtonColor: "#f44336"
                        });
                      })
           

                Swal.fire({
                    title: "Account created successfully!",
                    icon: "success",
                    confirmButtonColor: "#4CAF50"
                });
                navigate("/");
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#f44336"
                });
            });
    };


    const handleImageUpload=async(e)=>{
       const image  = e.target.files[0];
       console.log(image);

       const formData = new FormData();
       formData.append('image', image);


       const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_key}`,formData);

       setProfilePic(res.data.data.url);
       console.log('Uploaded image URL:', res.data.data.url);


    }
    return (
        <div>
            <h1 className="text-2xl font-bold">Create An Account Now!</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    {/* Name field */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="input"
                        placeholder="Name"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    {/* Image upload */}
                    <label className="label">Upload Image</label>
                    <input
                    onChange={handleImageUpload}
                        type="file"
                        className="input"
                        placeholder="Your Image"
                    />

                    {/* Email field */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    {/* Password field */}
                    <label className="label">Password</label>
                    <div className="relative w-full max-w-sm">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" }
                            })}
                            className="input"
                            placeholder="Password"
                        />
                        <FaEye
                            className="absolute right-20 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <div>
                        <p>Already have an account?
                            <Link to='/login' className='text-[#71717A] btn btn-link -ml-3'>Login</Link>
                        </p>
                    </div>
                </fieldset>
                <button className="btn px-12 bg-[#CAEB66] mt-4">Register</button>
            </form>

            <SocialLogin />
        </div>
    );
};

export default Registration;
