import React from "react";
import { Link } from "react-router-dom"; 
import myImage from "../assets/images/code.png";
import back_image from "../assets/images/welcome_back.jpg";

function Welcome(){

    const backgroundStyles = {
        backgroundImage: `url(${back_image})`,
        height: '100vh',  // Set the height to span 3 viewports
        backgroundSize: 'cover',  // Ensures the image covers the entire background
        backgroundPosition: 'start',  // start the image
        backgroundRepeat: 'no-repeat',  // Prevent image from repeating
    };
    return(
        <div className="welcome" style={backgroundStyles}>
            <p className="title">CodeForces <span style={{ color: 'rgb(136, 223, 166)' }}>Analytics</span></p>
            <div className="content">
                <p className="c1">An analytic platform for CodeForces</p>
                <p className="c2">Compare. Analyse. Compete.</p>
                <Link to="/login" className="button"> 
                    Login
                </Link>
                <img src={myImage} alt="Description of image" style={{ width: '70%', height: '80%', margin: '0' }} />
            </div>
        </div>

    );
}

export default Welcome;