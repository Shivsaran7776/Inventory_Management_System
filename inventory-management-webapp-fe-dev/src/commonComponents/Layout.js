import React from "react"
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

import Sidebar from "./Sidebar"
import Header from "./Header"
import "../css/index.css"


const Layout = () => {
    return(
        <>
        <Header/>
        <div style={{'display':'flex'}}>
        <Sidebar/>
        <main className="container">
        <Outlet/>
        </main>
        </div>
        </>
    );
}

export default Layout;