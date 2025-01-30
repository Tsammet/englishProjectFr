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
                localStorage.setItem('first_name', data.first_name);
                localStorage.setItem('last_name', data.last_name);
                localStorage.setItem('age', data.age);
                localStorage.setItem('user_id', data.user_id);
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

            <div className="content-wrapper">

                <div className="imageAccess">
                    <img alt="backgrond" src="/images/fondoAccess.png"></img>
                </div>

                <div className="login-box">

                    <h1>Login</h1>

                    <form id="loginForm" onSubmit={handleSubmit}>
                        
                        <input
                            type="text"
                            placeholder="Username"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                            
                            <button type="submit" className="btn btn-primary">Log in</button >
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;