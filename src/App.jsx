import React from 'react'
import Layout from './routing/Layout'
import { createBrowserRouter,Route,RouterProvider } from 'react-router-dom'
import { Home, Login, Signup,Feed } from './pages'


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout />,
      children:[
        {path:"/signup", element:<Signup />},
        {path:"/welcome", element:<Home />},
        {path:"/login", element:<Login />},
        {path:"/feed", element:<Feed />},
      ]

    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
