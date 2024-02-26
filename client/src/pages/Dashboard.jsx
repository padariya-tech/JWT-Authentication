import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    toast.error(`Error: ${error.message}`);
                });
        }

        // Cleanup function (if needed)
        return () => {
            // Any cleanup code if necessary
        };
    }, [user]);

    return (
        <div>
            <h1>Dashboard</h1>
            {loading && <p>Loading...</p>}
            {user && <p>Welcome, {user.name}</p>}
        </div>
    );
}

export default Dashboard;
