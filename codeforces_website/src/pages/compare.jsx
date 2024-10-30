import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RatingProgressionChart from '../components/homepage_graph';  // Ensure this path is correct
import TopicComparisonChart from '../components/barchart';

const ComparePage = () => {
    const [currentUserData, setCurrentUserData] = useState([]);
    const [searchedUserData, setSearchedUserData] = useState([]);
    const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);
    const [loadingSearchedUser, setLoadingSearchedUser] = useState(true);
    const [currentTopicCounts, setCurrentTopicCounts] = useState({});
    const [searchedTopicCounts, setSearchedTopicCounts] = useState({});

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
                    console.warn("Failed to fetch rating data for user:", handle);
                }
            } catch (error) {
                console.error("Error fetching rating data:", error);
            } finally {
                setLoading(false);
            }
        }
    
        async function fetchTopicCounts(handle, setTopicCounts) {
            try {
                const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
                const data = await response.json();
                if (data.status === "OK") {
                    const solvedProblems = data.result.filter(item => item.verdict === "OK");
                    const topicCount = {};
                    solvedProblems.forEach(problem => {
                        problem.problem.tags.forEach(tag => {
                            topicCount[tag] = (topicCount[tag] || 0) + 1;
                        });
                    });
                    setTopicCounts(topicCount);
                } else {
                    console.warn("Failed to fetch topic data for user:", handle);
                }
            } catch (error) {
                console.error("Error fetching topic data:", error);
            }
        }
    
        if (currentUser?.handle) {
            fetchUserData(currentUser.handle, setCurrentUserData, setLoadingCurrentUser);
            fetchTopicCounts(currentUser.handle, setCurrentTopicCounts);
        }
    
        if (searchedUser?.handle) {
            fetchUserData(searchedUser.handle, setSearchedUserData, setLoadingSearchedUser);
            fetchTopicCounts(searchedUser.handle, setSearchedTopicCounts);
        }
    }, [currentUser?.handle, searchedUser?.handle]);

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
                            <RatingProgressionChart data={currentUserData} blue={true} username={currentUser.handle}/>
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
                            <RatingProgressionChart data={searchedUserData} blue={false} username={searchedUser.handle}/>
                        )}
                    </div>
                </div>
            </div>

            {/* Topic Comparison Horizontal Bar Chart */}
            <div className="topic-comparison">
                    <TopicComparisonChart 
                        currentUser={currentUser} 
                        searchedUser={searchedUser} 
                        currentTopicCounts={currentTopicCounts} 
                        searchedTopicCounts={searchedTopicCounts} 
                    />
            </div>

        </div>
    );
};

export default ComparePage;
