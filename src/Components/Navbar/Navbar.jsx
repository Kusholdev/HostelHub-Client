import React, { useState } from 'react';
import { NavLink, Link } from 'react-router';
import HostelHubLogo from '../HostelHubLogo/HostelHubLogo';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const { user, logOut } = useAuth() || {};
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("User successfully logged out");
                navigate("/login");
            })
            .catch(err => console.log(err));
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/">Meals</NavLink></li>
            <li><NavLink to="/">Upcoming Meals</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* Left side */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <HostelHubLogo />
            </div>

            {/* Middle */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Right side */}
            <div className="navbar-end relative">
                {user ? (
                    <div className="relative">
                        <img
                            src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/default-avatar.png'}
                            alt="User"
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-[1000]">
                                <div className="px-4 py-2 text-gray-700 border-b">
                                    <p className="font-semibold">{user.displayName || 'User'}</p>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to='/register' className="btn btn-primary text-white">
                        Join Us
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
