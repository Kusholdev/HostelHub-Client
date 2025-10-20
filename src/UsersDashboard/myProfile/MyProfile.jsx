import React from 'react';
import useAuth from '../../hooks/useAuth';
import useUserProfile from '../../hooks/useUserProfile';

const MyProfile = () => {
  const { user } = useAuth();
  const { userProfile, isLoading, error } = useUserProfile();

  if (isLoading) return <p className="text-center text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Facing Error</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-3xl p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100">
        <div className="relative">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 shadow-md object-cover"
          />
          <div className="absolute top-2 right-4">
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full font-semibold text-white ${
                userProfile?.Badge === "Gold"
                  ? "bg-yellow-500 shadow-yellow-300 shadow-sm"
                  : "bg-amber-700 shadow-amber-400 shadow-sm"
              }`}
            >
              {userProfile?.Badge || "No Badge"}
            </span>
          </div>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-800">{user?.displayName || "No Name"}</h2>
        <p className="text-gray-600">{user?.email}</p>

        <div className="mt-5 flex flex-col gap-2 items-center">
          <div className="bg-gray-100 px-5 py-2 rounded-full text-sm text-gray-700 font-medium">
            Role: <span className="text-blue-600">{userProfile?.role || "User"}</span>
          </div>
          <div className="text-xs text-gray-500">
            Joined: {new Date(userProfile?.created_at).toLocaleDateString() || "N/A"}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default MyProfile;
