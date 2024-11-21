import React, { useEffect, useState } from 'react';
import Layout from './routing/Layout';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Welcome, Login, Signup, Home } from './pages';
import Requests from './pages/Requests';
import Connections from './pages/Connections';
import { useDispatch } from 'react-redux';
import { profileThunk } from './store/userSlice';
import { setIsLoggedIn } from './store/authSlice';
import Loaders from './assets/Loaders';
import HelpPage from './pages/help';

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await dispatch(profileThunk());
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
    checkAuth();
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
        {path:"/help",element:<HelpPage/>},
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
