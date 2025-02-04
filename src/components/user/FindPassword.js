import React, { useState } from 'react';
import './FindPassword.css';

const FindPassword = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate API call to backend to handle password recovery
        // For example, send username and email to backend to verify and send a password reset link
        const mockApiResponse = 'A password reset link has been sent to your email.'; 
        setMessage(mockApiResponse);
    };

    return (
        <div className="findpassword-container">
            <h2>Find Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username (ID):</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Find Password</button>
            </form>

            {message && (
                <div className="result">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default FindPassword;
