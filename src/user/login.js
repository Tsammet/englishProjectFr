import React, { useState } from "react";
import { useNavigate} from "react-router-dom"
import './access.css'

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8000/user/login", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({username, password})
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Error to get the response")
            }
            return response.json();
        })
        .then(data => {
            if(data.token){
                localStorage.setItem('username', data.username)
                localStorage.setItem('token', data.token)
                localStorage.setItem('role', data.role)

                console.log('Token saved' , data.token)

                navigate('/home')
            }else{
                alert("Login failed: " + JSON.stringify(data))
            }
        }).catch((error) => {
            alert("Error con sus credenciales")
        });
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">User:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <button type="submit">Log in</button >
                </form>
            </div>
            <div className="image-container">
                <img src="/images/registerImage.jpg" alt="Imagen de ejemplo" />

            </div>
        </div>
    )

}

export default Login;