import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { userDoc } = useSelector((state) => state.user);

  if (!userDoc) return null;
    return (
      <div className="flex bg-gray-800 text-white items-center justify-center h-screen">
        Home Screen
      </div>
    );
}

export default Home;
