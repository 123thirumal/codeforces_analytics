import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import back_image from "../assets/images/login_back.jpg";
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const backgroundStyles = {
        backgroundImage: `url(${back_image})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'start',
        backgroundRepeat: 'no-repeat',
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8000/api/login/', {
            username,
            password
          });
           // Check if the response status code indicates success (2xx)
        if (response.status >= 200 && response.status < 300) {
            const data = response.data;  // Get the response data
            
            // Login is successful
            console.log("User logged in:", data);
            navigate('/homepage', { state: { username } });
        } else {
            // If response status is not 2xx, handle it as a failure
            console.error("Login failed with status:", response.status);
            console.error("Response data:", response.data);
        }
        } catch (error) {
            console.error("Error logging in:", error);
        }
      };

    return (
        <div className="login" style={backgroundStyles}>
            <p className="title">CodeForces <span style={{ color: 'rgb(136, 223, 166)' }}>Analytics</span></p>
            <div className="content">
                <div className="input-container">
                    <p className="c1">Login</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        className="username-input"
                        placeholder="Enter Codeforces Handle"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="password-input"
                        placeholder="Enter Password"
                    />
                    <button onClick={handleLogin} className="button">
                        Login
                    </button>
                </div>
                <p>Don't have an account</p>
                <Link to="/signup" className="button"> 
                    SignUp
                </Link>
            </div>
        </div>
    );
}

export default Login;
