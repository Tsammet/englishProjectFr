import React, { useState, useEffect } from "react";
import './navbar.css';


function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();

        const intervalId = setInterval(checkLoginStatus, 100);

        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">Tsammet' School</div>
            <ul className="navbar-links">
                   {!isLoggedIn && <li><a href="/register">Register</a></li>}
                {!isLoggedIn && <li><a href="/login">Login</a></li>}
                {isLoggedIn && (
                    <li>
                        <a href="/profile" >Profile</a>
                        <a href="/wordGame" >Game</a>
                        <a href="/logout" onClick={handleLogout}>LogOut</a>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;