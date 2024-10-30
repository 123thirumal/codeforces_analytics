import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import back_image from "../assets/images/login_back.jpg";

function SignUp() {
    const [username, setUsername] = useState('');
    const [userpassword, setPassword] = useState('');
    const navigate = useNavigate();

    const backgroundStyles = {
        backgroundImage: `url(${back_image})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'start',
        backgroundRepeat: 'no-repeat',
    };

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password: userpassword }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User signed up:", data);
                navigate('/homepage', { state: { username } });
            } else {
                const errorData = await response.json();
                console.error("Sign-up failed:", errorData);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="login" style={backgroundStyles}>
            <p className="title">CodeForces <span style={{ color: 'rgb(136, 223, 166)' }}>Analytics</span></p>
            <div className="content">
                <div className="input-container">
                    <p className="c1">SignUp</p>
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
                        value={userpassword}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="password-input"
                        placeholder="Enter Password"
                    />
                    <button onClick={handleSignup} className="button">
                        SignUp
                    </button>
                </div>
                <p>Already have an account</p>
                <Link to="/login" className="button"> 
                    Login
                </Link>
            </div>
        </div>
    );
}

export default SignUp;
