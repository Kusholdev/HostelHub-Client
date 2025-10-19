import React from 'react';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = new QueryClient();

    // 1️⃣ Fetch all users
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });


    // 2️⃣ Mutation to update role
    const { mutate: updateRole } = useMutation({
        mutationFn: async ({ email, role }) => {
            const res = await axiosSecure.patch(`/users/role/${email}`, { role });
            return res.data;
        },
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    })
    const handleRoleChange = (email, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        //  directly change role
        users.forEach(u => {
            if (u.email === email) u.role = newRole;
        });

        // 2️⃣ Update backend
        updateRole({ email, role: newRole });
    };

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error loading meals.</p>;


    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage User Roles</h2>

            <div className="overflow-x-auto">
                <table className="table w-full table-auto border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Role</th>
                            <th className="border p-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.email}>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2 capitalize">{user.role || 'user'}</td>
                                <td className="border p-2 text-center">
                                    <button onClick={() => handleRoleChange(user.email, user.role || 'user')}
                                        className={`px-4 py-1 rounded text-white ${user.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'
                                            }`}


                                    >
                                        {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;
