import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed } from '../store/slices/feedSlice';
import Spinner from './Spinner';
import { API_URLS } from '../config/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const Feed = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.feed);
    const user = useSelector((state) => state.auth.user);
    const [userActions, setUserActions] = useState({}); // Track actions for each user

    useEffect(() => {
        if (user) dispatch(fetchFeed(user.token));
    }, [user]);

    const handleAction = async (status, to) => {
        try {
            const response = await fetch(API_URLS.SEND+`${status}/${to}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setUserActions((prev) => ({ ...prev, [to]: status }));
        } catch (err) {
            console.error("Error making API call:", err);
        }
    };

    if (error) return <div className="text-white">Error: {error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-50 backdrop-blur-2xl text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Feed</h1>
            {loading && <Spinner text={"Loading your feed..."} />}
            <ul key="user-list" className="list-none p-0 w-full max-w-2xl">
                {data.map((user) => (
                    <li key={user.id} className="border border-white/30 rounded-lg my-4 p-4 flex items-center bg-white/10 backdrop-blur-lg shadow-lg w-full">
                        <img 
                            src={user.photoUrl} 
                            alt="avatar" 
                            className="w-12 h-12 rounded-full mr-4 border-2 border-white/50 shadow-md" 
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white drop-shadow-lg">{user.firstName} {user.lastName}</h3>
                        </div>
                        {userActions[user._id] ? ( <span className="ml-4 text-sm font-medium text-gray-400">
                                {userActions[user._id] === "interested" ? "Request sent" : "User skipped"}
                            </span>
                        ) : (
                            <>
                                <button 
                                    onClick={() => handleAction("interested", user._id)}
                                    className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center"
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                                <button 
                                    onClick={() => handleAction("ignored", user._id)}
                                    className="ml-2 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-gray-700 transition-all flex items-center"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feed;
