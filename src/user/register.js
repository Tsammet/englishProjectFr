import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './access.css'

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("age", age);

        fetch("http://127.0.0.1:8000/user/register", {
            method: 'POST',
            body: formData
        })
        
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error to get the response")
                }
                return response.json();
            })
            .then(data => {
                alert("User created successfully!")
                navigate("/register")
            })
            .catch(error => {
                alert(error.message)
            });
    };

    return (
        <div className="container">

            <div className="content-wrapper">

                <div className="imageAccess">
                    <img alt="backgrond" src="/images/fondoAccess.png"></img>
                </div>

                <div className="login-box">
                    
                    <h1>Register</h1>

                    <form id="registerForm" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />

                            <input
                                type="text"
                                placeholder="First Name"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required />
                        
                            <input
                                type="text"
                                placeholder="Last Name"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required />

                            <input
                                type="number"
                                placeholder="Age"
                                id="age"
                                name="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required />

                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />

                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />

                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
            
        </div>
    )

}

export default Register