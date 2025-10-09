import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { FaEye } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../SocialLogin/socialLogin';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUser } = useAuth();
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();



    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })

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

                    {/* Name field */}
                    <label className="label">Upload Image</label>
                    <input
                        type="file"
                        // onChange={handleImageUpload}
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

                    {/* password field */}
                    <label className="label">Password</label>
                    <div className="relative w-full max-w-sm">
                        <input
                            type={showPassword ? 'true' : 'password'}
                            {...register('password', {
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" }
                            })}
                            className="input" // full width + right padding for the icon
                            placeholder="Password"
                        />
                        <FaEye
                            className="absolute right-20 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}

                        />
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <div>
                        <p>Already have an account?<Link to='/login' className='text-[#71717A] btn btn-link -ml-3'>Login</Link> </p>
                    </div>

                </fieldset>
                <button className="btn px-12 bg-[#CAEB66] mt-4">Register</button>


            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Registration;