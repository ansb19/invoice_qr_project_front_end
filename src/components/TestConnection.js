import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestConnection() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get('http://localhost:3000/test');
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching message:', error);
                setMessage('Failed to fetch message from the server.');
            }
        };

        fetchMessage();
    }, []);

    return (
        <div>
            <h1>Test Connection</h1>
            <p>Server message: {message}</p>
        </div>
    );
}

export default TestConnection;
