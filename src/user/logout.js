import React from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    React.useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return null;

}

export default LogOut;