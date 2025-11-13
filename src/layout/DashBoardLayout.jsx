import React from 'react';
import { NavLink, Outlet } from 'react-router';
import HostelHubLogo from '../Components/HostelHubLogo/HostelHubLogo';
import useUserRole from '../Admin/useUserRole/useUserRole';
import { FaHome, FaUserShield, FaSignOutAlt, FaStar, FaPlusCircle, FaUtensils, FaUser, FaCreditCard } from "react-icons/fa";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2'
import { IoServerOutline } from "react-icons/io5";
import { MdOutlineUpcoming } from "react-icons/md";

const DashBoardLayout = () => {
    const { logOut } = useAuth() || {};
    const navigate = useNavigate();
    const { role, roleLoading } = useUserRole();

    const handleLogOut = () => {
        logOut()
            .then(() => {

                Swal.fire({
                    title: "LogOut successfully!",
                    icon: "success",
                    draggable: true
                });

                navigate('/login');
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#f44336"
                });
            })
    }

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

                    {/* User routes */}
                    {!roleLoading && role === 'user' && (
                        <>

                            <li>
                                <NavLink to="/dashboard/RequestedMeals" className="flex items-center gap-3">
                                    <FaUtensils className="text-green-500" />
                                    Requested Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myReviews" className="flex items-center gap-3">
                                    <FaStar className="text-yellow-500" />
                                    My Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-3">
                                    <FaCreditCard className="text-blue-500 text-lg" />
                                    Payment History
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Admin routes */}
                    {!roleLoading && role === 'admin' && (
                        <>

                            <li>
                                <NavLink to="/dashboard/makeAdmin" className="flex items-center gap-3">
                                    <FaUserShield className="text-amber-500" />
                                    Make Admin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/addMeal"
                                    className="flex items-center gap-2 hover:text-blue-600 transition"
                                >
                                    <FaPlusCircle className="text-blue-500" />
                                    Add Meal
                                </NavLink>
                            </li>
                            <NavLink
                                to="/dashboard/allMeal"
                                className="flex items-center gap-2 m-2"
                            >
                                <FaUtensils className="text-blue-500" />
                                All Meal
                            </NavLink>
                            <NavLink
                                to="/dashboard/allReviews"
                                className="flex items-center gap-3">
                                <FaStar className="ml-2" />
                                All Reviews
                            </NavLink>
                            <NavLink
                                to="/dashboard/serveMeals"
                                className="flex items-center gap-3">
                                <IoServerOutline className='ml-2' />
                                Server Meals
                            </NavLink>
                            <NavLink
                                to="/dashboard/upComingMeals"
                                className="flex items-center gap-3">
                                <MdOutlineUpcoming className='ml-2' />
                                UpComing Meals
                            </NavLink>


                        </>
                    )}

                    {/* Logout  */}
                    <li className="mt-5 border-t border-base-300 pt-3">
                        <button onClick={handleLogOut} className="flex items-center gap-3 text-red-500 hover:text-red-600">
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
