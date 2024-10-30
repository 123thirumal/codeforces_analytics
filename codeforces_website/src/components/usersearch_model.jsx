import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSearchModal = ({ isOpen, onClose, results, currentUser }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleUserClick = (user) => {
        // Navigate to the compare page with currentUser and selected user
        navigate('/compare', {
            state: {
                currentUser: currentUser,
                searchedUser: user,
            },
        });
        onClose(); // Close the modal after navigating
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className='heading'>Search Results</p>
                <button className="close-button" onClick={onClose}>×</button>
                <ol className='elements' style={{ color: '#ffffffa2', padding: 0, listStyleType: 'none' }}>
                    {results.map((user, index) => (
                        <li 
                            key={user.handle} 
                            style={{ 
                                display: 'flex',           // Use flexbox to align items
                                alignItems: 'center',      // Center items vertically
                                marginBottom: '10px',       // Space between list items
                                cursor:'pointer',
                            }}
                            onClick={() => handleUserClick(user)} // Add click handler
                        >
                            <span style={{ marginRight: '10px' }}>{index + 1}.</span> {/* Display index + 1 for numbering */}
                            <img 
                                src={user.avatar} 
                                alt={`${user.handle}'s avatar`} 
                                width="30" 
                                height="30" 
                                style={{ marginRight: '10px' }} // Add space between image and text
                            />
                            <span style={{ fontSize: '22px' }}>{user.handle}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default UserSearchModal;
