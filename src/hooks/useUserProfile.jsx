import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userProfile = {}, isLoading, error } = useQuery({
        queryKey:['userProfile', user?.email],
        enabled:!! user?.email,
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    return {userProfile,isLoading,error};
};

export default useUserProfile;