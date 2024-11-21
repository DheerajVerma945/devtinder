import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutThunk } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import Loaders from '../assets/Loaders';

function ProfileMenu({ userDoc }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await dispatch(logoutThunk()).unwrap();
            console.log(response);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    if (!isMenuOpen) return null;

    return (<>
        {loading && <Loaders />}

        {showLogoutAlert &&
            <div className="absolute inset-0 bg-gray-800 bg-opacity-60 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 md:w-1/3">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                        Are you sure you want to logout?
                    </h2>
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium shadow-sm transition duration-200"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => setShowLogoutAlert(false)}
                            className="px-6 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium shadow-sm transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        }



        <div
            ref={menuRef}
            className="absolute top-0 h-screen left-0 w-1/3 md:w-1/4 bg-black shadow-lg rounded-md border border-gray-300 z-30"
        >
            <div className='absolute  text-white  cursor-pointer right-2 top-2 text-xl' onClick={handleMenuItemClick}>
                <FaTimes />
            </div>
            <div className="flex flex-col items-center py-6 border-b border-gray-200">
                <img
                    src={userDoc.photoUrl}
                    alt={userDoc.firstName}
                    className="w-20 md:w-24 h-20 md:h-24 rounded-full object-cover mb-4"
                />
                <p className="text-lg md:text-xl font-semibold text-white">{userDoc.firstName} {userDoc.lastName}</p>
            </div>

            <div className="flex flex-col p-4">
                <Link
                    to="user/connections"
                    className="py-2 md:px-4 text-md md:text-lg hover:bg-blue-800 rounded-md text-white mb-2"
                    onClick={handleMenuItemClick}
                >
                    Connections
                </Link>
                <Link
                    to="/update-profile"
                    className="py-2 md:px-4 text-md md:text-lg hover:bg-blue-800 rounded-md text-white mb-2"
                    onClick={handleMenuItemClick}
                >
                    Update Profile
                </Link>
                <Link
                    to="/change-password"
                    className="py-2 md:px-4 text-md md:text-lg hover:bg-blue-800 rounded-md text-white mb-2"
                    onClick={handleMenuItemClick}
                >
                    Change Password
                </Link>
                <Link
                    to="/help"
                    className="py-2 md:px-4 text-md md:text-lg hover:bg-blue-800 rounded-md text-white mb-2"
                    onClick={handleMenuItemClick}
                >
                    Help
                </Link>
                <button
                    onClick={() => setShowLogoutAlert(true)}
                    className="py-2 px-4 text-md md:text-lg hover:bg-red-700 rounded-md  mt-20 bg-red-500 text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    </>
    );
}

export default ProfileMenu;
