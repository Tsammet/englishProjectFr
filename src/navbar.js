import React from "react";
import './navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Tsammet' School</div>
            <ul className="navbar-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    )
}

export default Navbar