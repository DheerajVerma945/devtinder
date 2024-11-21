import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../store/userSlice";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

function Header() {
    const dispatch = useDispatch();
    const { userDoc, error } = useSelector((state) => state.user);
    const { isLoggedIn } = useSelector((state) => state.auth);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (isLoggedIn && !userDoc) {
            dispatch(profileThunk());
        }
    }, [dispatch, isLoggedIn]);



    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center h-screen text-lg">
                <p>You need to login first</p>
            </div>
        );
    }
    if(error){
        return null;
    }

    
    return (
        <div className="flex  justify-between items-center p-6 md:p-10 bg-gray-100">
            <div className="relative flex items-center space-x-4 cursor-pointer" onClick={toggleDropdown}>
                {userDoc?.data.photoUrl ? (
                    <img
                        src={userDoc.data.photoUrl}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white">
                        <p className="text-xl">P</p>
                    </div>
                )}
                <p className="text-lg text-gray-700">Profile</p>
            </div>

            {dropdownOpen && <ProfileMenu userDoc={userDoc.data} />}

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center mt-4 md:mt-0">
                <p className="text-xl md:text-2xl font-semibold">
                    Welcome, <span className="text-blue-600">{userDoc?.data.firstName || "User"}</span>
                </p>
                <Link
                    to="/requests"
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
                >
                    <IoMdNotifications className="text-2xl" />
                    Requests
                </Link>
            </div>
        </div>
    );
}

export default Header;
