import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutThunk } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import Loaders from '../assets/Loaders';

function ProfileMenu({ userDoc }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    if (!isMenuOpen) return null;

    return (<>
        {loading && <Loaders />}



        <div
            ref={menuRef}
            className="absolute top-0 h-screen left-0 w-1/4 bg-white shadow-lg rounded-md border border-gray-300 z-30"
        >
            <div className="flex flex-col items-center py-6 border-b border-gray-200">
                <img
                    src={userDoc.photoUrl}
                    alt={userDoc.firstName}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <p className="text-xl font-semibold text-gray-800">{userDoc.firstName} {userDoc.lastName}</p>
            </div>

            <div className="flex flex-col p-4">
                <Link
                    to="/connections"
                    className="py-2 px-4 text-lg hover:bg-gray-100 rounded-md text-gray-800 mb-2"
                    onClick={handleMenuItemClick}
                >
                    Connections
                </Link>
                <Link
                    to="/update-profile"
                    className="py-2 px-4 text-lg hover:bg-gray-100 rounded-md text-gray-800 mb-2"
                    onClick={handleMenuItemClick}
                >
                    Update Profile
                </Link>
                <Link
                    to="/change-password"
                    className="py-2 px-4 text-lg hover:bg-gray-100 rounded-md text-gray-800 mb-2"
                    onClick={handleMenuItemClick}
                >
                    Change Password
                </Link>
                <Link
                    to="/help"
                    className="py-2 px-4 text-lg hover:bg-gray-100 rounded-md text-gray-800 mb-2"
                    onClick={handleMenuItemClick}
                >
                    Help
                </Link>
                <button
                    onClick={handleLogout}
                    className="py-2 px-4 text-lg hover:bg-gray-100 rounded-md text-gray-800 mt-4"
                >
                    Logout
                </button>
            </div>
        </div>
    </>
    );
}

export default ProfileMenu;
