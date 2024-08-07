import React from "react";
import './Initial.css'
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

export function Initial(){
    return(
        <div className="grid-container">
            <Navbar />
            <Sidebar />
            <Outlet />
        </div>
    )
}