import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { API_URLS } from '../config/urls';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const Requests = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewedRequests, setReviewedRequests] = useState({}); // Track reviewed requests
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const response = await fetch(API_URLS.REQUESTS, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch requests');
                }
                const result = await response.json();
                setData(result.requests);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [user]);

    const handleReview = async (status, id) => {
        try {
            const response = await fetch(`${API_URLS.REVIEW}/${status}/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to ${status} request`);
            }
            setReviewedRequests((prev) => ({ ...prev, [id]: status })); // Update local state
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div className="text-white">Error: {error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-50 backdrop-blur-2xl text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Requests</h1>
            {loading && <Spinner text={"Loading your requests..."} />}
            <ul key="requests-list" className="list-none p-0 w-full max-w-2xl">
                {data.map((request) => {
                    const status = reviewedRequests[request.from.id]; // Get status from local state
                    return (
                        <li key={request.from.id} className="border border-white/30 rounded-lg my-4 p-4 flex items-center bg-white/10 backdrop-blur-lg shadow-lg w-full">
                            <img 
                                src={request.from.photoUrl} 
                                alt="avatar" 
                                className="w-12 h-12 rounded-full mr-4 border-2 border-white/50 shadow-md" 
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white drop-shadow-lg">{request.from.firstName} {request.from.lastName}</h3>
                            </div>
                            <div className="flex space-x-2">
                                {status === 'accepted' ? (
                                    <span className="text-green-500 font-semibold">Accepted</span>
                                ) : status === 'rejected' ? (
                                    <span className="text-red-500 font-semibold">Rejected</span>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => handleReview('accepted', request._id)} 
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        <button 
                                            onClick={() => handleReview('rejected', request._id)} 
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 flex items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Requests;
