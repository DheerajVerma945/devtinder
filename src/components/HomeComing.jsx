import React from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

function HomeComing() {
  const location = useLocation();

  const shouldShowHomeButton =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/home";

  return (
    <div>
      {shouldShowHomeButton && (
        <div className="fixed bottom-5 left-5 z-50">
          <Link
            to="/home"
            className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-md hover:bg-blue-700"
            aria-label="Go to Home"
          >
            <AiOutlineHome className="w-6 h-6 text-white" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomeComing;
