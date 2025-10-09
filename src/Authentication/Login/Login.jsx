import React, { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaEye } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../SocialLogin/socialLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email,data.password)
        .then(result =>{
            console.log(result);
        })
        .catch(error =>{
            console.log(error);
        })

    }



    return (
        <div>
            <h1 className=" text-[#000000] text-3xl font-bold"> Welcome Back!</h1>
            <h1 className=" text-[#000000] text-xl ml-7"> Login Here</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: "Email is required" })}
                        className="input "
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <label className="label">Password</label>
                    <div className="relative w-full max-w-sm">
                        <input
                            type={showPassword ? 'text' : 'password'}
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
                        <a className="link link-hover">Forgot password?</a>
                    </div>
                    <div>
                        <p>Don't have an account?<Link to='/register' className='text-[#71717A] btn btn-link -ml-3'>register</Link> </p>
                    </div>
                </fieldset>
                <button className="btn bg-[#CAEB66] mt-4 px-40">Login</button>

            </form>
              <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;