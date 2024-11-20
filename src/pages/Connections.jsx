import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../assets/baseUrl';
import Loaders from '../assets/Loaders';

function Connections() {
    const [userConnections, setUserConnections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getConnections = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}user/connections`, { withCredentials: true });
                setUserConnections(response.data?.data || []);
            } catch (err) {
                setError(err?.response?.data.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        getConnections();
    }, []);

    return (
        <div>
            {loading && <Loaders />}
            {!loading && error && <div>{error}</div>}
            {!loading && !error && (
                <ul className='mt-20'>
                    {userConnections.map((connection, index) => (
                        <li key={index} className="flex items-center gap-4 mb-4">
                            <img 
                                src={connection.photoUrl} 
                                alt={`${connection.firstName} ${connection.lastName}`} 
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p>{connection.firstName} {connection.lastName}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Connections;
