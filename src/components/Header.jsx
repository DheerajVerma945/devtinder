import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileThunk } from "../store/userSlice";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

function Header() {
    const dispatch = useDispatch();
    const { requestDoc } = useSelector((state) => state.user);
    const { userDoc, error } = useSelector((state) => state.user);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [pendingRequests, setPendingRequests] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (requestDoc && requestDoc.data.length > 0) {
            setPendingRequests(requestDoc.data.length);
        }
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
    if (error) {
        return null;
    }

    return (
        <div className=" p-6 md:p-10 bg-gradient-to-br text-white from-gray-800 via-gray-900 to-black">
            <div className="flex items-center justify-between gap-6">
                <div className="relative flex items-center cursor-pointer" onClick={toggleDropdown}>
                    <img
                        src={userDoc.data.photoUrl}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <p className="text-md ml-2 md:ml-4 md:text-lg">Profile</p>
                </div>

                {dropdownOpen && <ProfileMenu userDoc={userDoc.data} />}

                <div className="flex items-center justify-between gap-6 text-center">
                    <p className="text-md md:text-2xl font-semibold">
                        Welcome, <span className="text-blue-600">{userDoc?.data.firstName || "User"}</span>
                    </p>
                    <Link
                        to="/requests"
                        className="relative bg-blue-500 text-white px-2 py-2  rounded-md shadow-md transition-all duration-300 flex items-center justify-center"
                    >
                        <IoMdPersonAdd className="text-xl md:text-2xl" />
                        {pendingRequests > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {pendingRequests}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Header;
