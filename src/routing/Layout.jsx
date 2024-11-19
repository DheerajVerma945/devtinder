import React from 'react'
import {  Footer } from '../components'
import { Outlet } from "react-router-dom"


const layout = () => {
    return (
        <div>
            {/* <Header /> */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default layout
