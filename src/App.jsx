import React, { useEffect, useState } from 'react';
import Layout from './routing/Layout';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Welcome, Login, Signup, Home } from './pages';
import Requests from './pages/Requests';
import Connections from './pages/Connections';
import { useDispatch } from 'react-redux';
import { profileThunk, requestsThunk } from './store/userSlice';
import { setIsLoggedIn } from './store/authSlice';
import Loaders from './assets/Loaders';
import HelpPage from './pages/Help';
import User from './pages/User';
import UpdateProfile from './pages/UpdateProfile';

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthandReq = async () => {
      try {
        const response = await dispatch(profileThunk());
        await dispatch(requestsThunk());
        if (!response.error) {
          dispatch(setIsLoggedIn(true));
        } else {
          dispatch(setIsLoggedIn(false));
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthandReq();
  }, [dispatch]);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />
    },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },

    {

      path: "/",
      element: <Layout />,
      children: [
        { path: "/help", element: <HelpPage /> },
        { path: "/update-profile", element: <UpdateProfile /> },
        { path: "/user/:userId", element: <User /> },
        { path: "/home", element: <Home /> },
        { path: "/requests", element: <Requests /> },
        { path: "user/connections", element: <Connections /> },
      ],
    },

  ]);
  if (loading) {
    return <Loaders />
  }
  return (
    <RouterProvider router={router} />
  )
}

export default App
