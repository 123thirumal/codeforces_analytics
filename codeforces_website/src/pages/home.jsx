import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import '@fortawesome/fontawesome-free/css/all.min.css';
import back_image from "../assets/images/welcome_back.jpg";
import RatingProgressionChart from '../components/homepage_graph';
import UserSearchModal from '../components/usersearch_model'; // Import the modal component

function Homepage() {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate for redirection
    const username = location.state?.username || ""; // Get the username from location state

    const [userInfo, setUserInfo] = useState(null);
    const [userRatings, setUserRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [searchResults, setSearchResults] = useState([]); // State for search results
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    useEffect(() => {
        console.log("Username received in Homepage:", username);
        if (username) {
            fetchUserInfo(username);
            fetchUserRatings(username);
        }
    }, [username]);

    const fetchUserInfo = async (username) => {
        console.log(`https://codeforces.com/api/user.info?handles=${username}`);
        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
            const data = await response.json();
            if (data.status === "OK") {
                setUserInfo(data.result[0]);
            }
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    const fetchUserRatings = async (username) => {
        setLoading(true);  // Start loading
        try {
            const response = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
            const data = await response.json();
            
            if (data.status === "OK") {
                // Extract only the required fields
                const simplifiedRatings = data.result.map(item => ({
                    contestId: item.contestId,
                    newRating: item.newRating,
                    ratingUpdateTimeSeconds: item.ratingUpdateTimeSeconds
                }));
                setUserRatings(simplifiedRatings);
            }
        } catch (error) {
            console.error("Failed to fetch user ratings:", error);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    const fetchUserHandles = async () => {
        if (!searchQuery) return;

        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${searchQuery}&checkHistoricHandles=false`);
            const data = await response.json();
            if (data.status === "OK") {
                setSearchResults(data.result); // Update search results
            } else {
                setSearchResults([]); // Reset search results if no users found
            }
        } catch (error) {
            console.error("Failed to fetch user handles:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        fetchUserHandles(); // Fetch user handles based on search query
        setIsModalOpen(true); // Open the modal after search
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value); // Update search query state
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSearchResults([]); // Reset search results
    };

    const handleLogout = () => {
        // Clear any user data here (localStorage, session, state)
        localStorage.removeItem("username"); // Clear user data
    
        // Redirect to login page and replace the history entry
        navigate("/login", { replace: true }); // Use replace to prevent going back to homepage
    };

    const backgroundStyles = {
        backgroundImage: `url(${back_image})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'start',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="homepage" style={backgroundStyles}>
            <div className="sidebar">
                <p className="title">CodeForces <span style={{ color: 'rgb(136, 223, 166)' }}>Analytics</span></p>
                {userInfo && (
                    <div className="profile-container"> {/* Added a container for better layout */}
                        <img 
                            src={userInfo.avatar} // Use userInfo.avatar for the image source
                            alt={`${userInfo.handle}'s avatar`} 
                            width="70" 
                            height="70" 
                            style={{ 
                                borderRadius: '50%', 
                                marginRight: '10px',
                                alignSelf: 'center' 
                            }} // Rounded avatar with margin
                        />
                        <div>
                            <p className="profile">
                                <span style={{ color: 'rgb(136, 223, 166)' }}>Username:</span> {userInfo.handle}
                            </p>
                            <p className="profile">
                                <span style={{ color: 'rgb(136, 223, 166)' }}>Country:</span> {userInfo.country || "N/A"}
                            </p>
                            <p className="profile">
                                <span style={{ color: 'rgb(136, 223, 166)' }}>Rating:</span> {userInfo.rating}
                            </p>
                            <p className="profile">
                                <span style={{ color: 'rgb(136, 223, 166)' }}>Max Rating:</span> {userInfo.maxRating}
                            </p>
                        </div>
                    </div>
                )}
                <button className="logout" onClick={handleLogout}> {/* Add onClick event */}
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>

            <div className="content">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        className="search-bar" 
                        placeholder="Search user handle" 
                        value={searchQuery}
                        onChange={handleInputChange} // Update search query on input change
                    />
                    <button type="submit" className="submit">Search</button>
                </form>
                <p className="heading">Dashboard</p>
                <div className="tile-container">
                    <div className="tile">
                        <span className="material-symbols-outlined trending-icon-1">trending_up</span>
                        <div className="element">
                            <p className="head">Rating:</p>
                            <p className="cont">{userInfo?.rating || "N/A"}</p>
                        </div>
                    </div>
                    <div className="tile">
                        <span className="material-symbols-outlined trending-icon-2">trending_up</span>
                        <div className="element">
                            <p className="head">Max-Rating:</p>
                            <p className="cont">{userInfo?.maxRating || "N/A"}</p>
                        </div>
                    </div>
                    <div className="tile">
                        <span className="material-symbols-outlined leaderboard-icon-1">leaderboard</span>
                        <div className="element">
                            <p className="head">Ranking:</p>
                            <p className="cont">{userInfo?.rank || "N/A"}</p>
                        </div>
                    </div>
                    <div className="tile">
                        <span className="material-symbols-outlined leaderboard-icon-2">leaderboard</span>
                        <div className="element">
                            <p className="head">Max-Ranking:</p>
                            <p className="cont">{userInfo?.maxRank || "N/A"}</p>
                        </div>
                    </div>
                </div>
                <div className="graph">
                    {loading ? (
                        <p style={{ color: 'white' }}>Loading rating progression...</p>
                    ) : (
                        userInfo &&<RatingProgressionChart data={userRatings} blue={true} username={userInfo.handle}/>
                    )}
                </div>
            </div>
            {/* Include the User Search Modal */}
            <UserSearchModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                results={searchResults} 
                currentUser={userInfo} 
            />
        </div>
    );
}

export default Homepage;
