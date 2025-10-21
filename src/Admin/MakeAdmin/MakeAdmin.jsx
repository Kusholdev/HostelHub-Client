import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    // Fetch users with optional search
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users', search], // depend on search input
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
    });

    // Mutation to update role
    const { mutate: updateRole } = useMutation({
        mutationFn: async ({ email, role }) => {
            const res = await axiosSecure.patch(`/users/role/${email}`, { role });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleRoleChange = (email, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        updateRole({ email, role: newRole });
    };

    if (isLoading) return <p className="text-center p-6">Loading users...</p>;
    if (error) return <p className="text-center p-6 text-red-500">Error loading users.</p>;

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Manage User Roles</h2>

            {/* 🔍 Search Input */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-xs sm:text-sm md:text-base">
                        <tr>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Role</th>
                            <th className="border p-2 text-center">Badge</th>
                            <th className="border p-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-blue-50 transition-all text-xs sm:text-sm md:text-base"
                                >
                                    <td className="border p-2 break-words">{user.email}</td>

                                    {/* Role Badge */}
                                    <td className="border p-2 text-center">
                                        <span
                                            className={`px-2 sm:px-3 py-1 rounded-full text-white font-semibold text-xs sm:text-sm md:text-base ${user.role === 'admin' ? 'bg-green-500' : 'bg-gray-400'
                                                }`}
                                        >
                                            {user.role || 'user'}
                                        </span>
                                    </td>

                                    {/* Badge */}
                                    <td className="border p-2 text-center">
                                        <span
                                            className={`px-2 sm:px-3 py-1 rounded-full text-white font-semibold text-xs sm:text-sm md:text-base ${user.Badge === 'Gold'
                                                    ? 'bg-yellow-500'
                                                    : user.Badge === 'Silver'
                                                        ? 'bg-gray-400'
                                                        : user.Badge === 'Bronze'
                                                            ? 'bg-amber-700'
                                                            : 'bg-blue-400'
                                                }`}
                                        >
                                            {user.Badge || 'No Badge'}
                                        </span>
                                    </td>

                                    {/* Action Button */}
                                    <td className="border p-2 text-center">
                                        <button
                                            onClick={() => handleRoleChange(user.email, user.role || 'user')}
                                            className={`px-2 sm:px-4 py-1 rounded text-white text-xs sm:text-sm md:text-base ${user.role === 'admin'
                                                    ? 'bg-red-500 hover:bg-red-600'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                                } transition`}
                                        >
                                            {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;
