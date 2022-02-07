import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from ".";

const MainLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default MainLayout;