import axios from 'axios';
import { Link } from 'react-router-dom';
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
                console.log(response);
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
            {loading &&
                <div className='h-screen'><Loaders />
                </div>
            }
            {!loading && error && <div className="text-center text-red-500">{error}</div>}
            {!loading && !error && (
                <ul className="mt-10 flex flex-wrap items-start h-screen justify-center gap-6">
                    {userConnections.map((connection, index) => (
                        <li
                            key={index}
                            className="flex flex-row items-center bg-gray-100 p-6 rounded-lg shadow-md w-full  gap-4 hover:shadow-lg transition-all"
                        >
                            <img
                                src={connection.photoUrl}
                                alt={`${connection.firstName} ${connection.lastName}`}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="text-center md:text-left">
                                <Link
                                    to={`/user/${connection._id}`}
                                    className="text-lg font-semibold text-blue-600 hover:underline"
                                >
                                    {connection.firstName} {connection.lastName || ''}
                                </Link>
                            </div>
                        </li>
                    ))}
                    {userConnections.length === 0 && (
                        <div className="text-center text-gray-500">
                            No connections available
                        </div>
                    )}
                </ul>
            )}
        </div>


    );
}

export default Connections;
