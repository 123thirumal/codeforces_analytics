import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RatingProgressionChart from '../components/homepage_graph';  // Ensure this path is correct
import back_image from "../assets/images/welcome_back.jpg";

const ComparePage = () => {
    const [currentUserData, setCurrentUserData] = useState([]);
    const [searchedUserData, setSearchedUserData] = useState([]);
    const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);
    const [loadingSearchedUser, setLoadingSearchedUser] = useState(true);

    const location = useLocation();
    const { currentUser, searchedUser } = location.state || { currentUser: {}, searchedUser: {} };

    // Fetch data from Codeforces API
    useEffect(() => {
        async function fetchUserData(handle, setUserData, setLoading) {
            try {
                const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
                const data = await response.json();
                
                if (data.status === "OK") {
                    setUserData(data.result);
                } else {
                    console.warn("Failed to fetch data for user:", handle);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData(currentUser.handle, setCurrentUserData, setLoadingCurrentUser);
        fetchUserData(searchedUser.handle, setSearchedUserData, setLoadingSearchedUser);
    }, [currentUser.handle, searchedUser.handle]);

    return (
        <div className="compare">
            <p className="title">Comparison</p>

            <div className="compare-container">
                
                {/* Current User Section */}
                <div className="user-comparison">
                    <img 
                        src={currentUser.avatar} 
                        alt={`${currentUser.handle}'s avatar`} 
                        width="50" 
                        height="50" 
                        style={{ borderRadius: '50%', margin: '10px' }}
                    />
                    <p style={{ fontSize: '25px', fontWeight: 'bold', padding: '0', margin: '10px' }}>
                        {currentUser.handle}
                    </p>
                    <p style={{ fontSize: '20px', padding: '0', margin: '10px' }}>
                        <strong style={{ color: 'rgb(116, 208, 148)' }}>Rating:</strong> {currentUser.rating}
                    </p>
                    <p style={{ fontSize: '20px', padding: '0', margin: '10px' }}>
                        <strong style={{ color: 'rgb(116, 208, 148)' }}>Rank:</strong> {currentUser.rank}
                    </p>
                    
                    <div className="graph">
                        {loadingCurrentUser ? (
                            <p style={{ color: 'white' }}>Loading rating progression...</p>
                        ) : (
                            <RatingProgressionChart data={currentUserData} />
                        )}
                    </div>
                </div>

                {/* Searched User Section */}
                <div className="user-comparison">
                    <img 
                        src={searchedUser.avatar} 
                        alt={`${searchedUser.handle}'s avatar`} 
                        width="50" 
                        height="50" 
                        style={{ borderRadius: '50%', margin: '10px' }}
                    />
                    <p style={{ fontSize: '25px', fontWeight: 'bold', padding: '0', margin: '10px' }}>
                        {searchedUser.handle}
                    </p>
                    <p style={{ fontSize: '20px', padding: '0', margin: '10px' }}>
                        <strong style={{ color: 'rgb(116, 208, 148)' }}>Rating:</strong> {searchedUser.rating}
                    </p>
                    <p style={{ fontSize: '20px', padding: '0', margin: '10px' }}>
                        <strong style={{ color: 'rgb(116, 208, 148)' }}>Rank:</strong> {searchedUser.rank}
                    </p>
                    
                    <div className="graph">
                        {loadingSearchedUser ? (
                            <p style={{ color: 'white' }}>Loading rating progression...</p>
                        ) : (
                            <RatingProgressionChart data={searchedUserData} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparePage;
