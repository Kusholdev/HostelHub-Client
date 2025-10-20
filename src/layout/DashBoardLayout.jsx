import React from 'react';
import { NavLink, Outlet } from 'react-router';
import HostelHubLogo from '../Components/HostelHubLogo/HostelHubLogo';
import useUserRole from '../Admin/useUserRole/useUserRole';
import { FaHome, FaUser, FaUtensils, FaUserShield, FaSignOutAlt, FaStar } from "react-icons/fa";

const DashBoardLayout = () => {
    const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar for small screen */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden font-semibold">Dashboard</div>
                </div>

                {/* Page content */}
                <Outlet />
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">

                    {/* Logo */}
                    <HostelHubLogo />

                    {/* Home link */}
                    <li>
                        <NavLink to="/" className="flex items-center gap-3">
                            <FaHome className="text-blue-500" />
                            Home
                        </NavLink>
                    </li>

                    {/* User routes */}
                    {!roleLoading && role === 'user' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/myProfile" className="flex items-center gap-3">
                                    <FaUser className="text-purple-500" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reviewMeals" className="flex items-center gap-3">
                                    <FaUtensils className="text-green-500" />
                                    Review Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myReviews" className="flex items-center gap-3">
                                    <FaStar className="text-yellow-500" />
                                    My Reviews
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Admin routes */}
                    {!roleLoading && role === 'admin' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/myProfile" className="flex items-center gap-3">
                                    <FaUser className="text-purple-500" />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin" className="flex items-center gap-3">
                                    <FaUserShield className="text-amber-500" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Logout  */}
                    <li className="mt-5 border-t border-base-300 pt-3">
                        <button className="flex items-center gap-3 text-red-500 hover:text-red-600">
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;
