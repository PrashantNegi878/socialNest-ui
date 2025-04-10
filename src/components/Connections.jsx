import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { API_URLS } from '../config/urls';
import { useSelector } from 'react-redux';

const Connections = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchConnections = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const response = await fetch(API_URLS.CONNECTIONS, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch connections');
                }
                const result = await response.json();
                setData(result.connections);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, [user]);

    if (error) return <div className="text-white">Error: {error}</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black bg-opacity-50 backdrop-blur-2xl text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Connections</h1>
            {loading && <Spinner text={"Loading your connections..."} />}
            <ul key="connections-list" className="list-none p-0 w-full max-w-2xl">
                {data.map((connection) => (
                    <li key={connection.id} className="border border-white/30 rounded-lg my-4 p-4 flex items-center bg-white/10 backdrop-blur-lg shadow-lg w-full">
                        <img 
                            src={connection.photoUrl} 
                            alt="avatar" 
                            className="w-12 h-12 rounded-full mr-4 border-2 border-white/50 shadow-md" 
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white drop-shadow-lg">{connection.firstName} {connection.lastName}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Connections;
