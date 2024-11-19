import React from 'react'
import Layout from './routing/layout'
import { createBrowserRouter,Route,RouterProvider } from 'react-router-dom'
import { Home, Login, Signup } from './pages'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout />,
      children:[
        {path:"/signup", element:<Signup />},
        {path:"/", element:<Home />},
        {path:"/login", element:<Login />},
      ]

    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
