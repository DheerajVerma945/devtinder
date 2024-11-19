import React from 'react'
import Layout from './routing/Layout'
import { createBrowserRouter,Route,RouterProvider } from 'react-router-dom'
import { Welcome, Login, Signup,Home } from './pages'
import Requests from './pages/Requests'


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout />,
      children:[
        {path:"/signup", element:<Signup />},
        {path:"/welcome", element:<Welcome />},
        {path:"/login", element:<Login />},
        {path:"/home", element:<Home />},
        {path:"/requests", element:<Requests />},
      ]

    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
