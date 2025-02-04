import React, { useState } from 'react';
import './FindID.css';

const FindID = () => {
    const [email, setEmail] = useState('');
    const [foundUsername, setFoundUsername] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate API call to backend that returns the username associated with the provided email
        // For this example, we'll assume a successful response
        const mockApiResponse = 'exampleUsername'; // This would come from your backend in a real app
        setFoundUsername(mockApiResponse);
    };

    return (
        <div className="findid-container">
            <h2>Find Your ID</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Enter your registered email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Find ID</button>
            </form>

            {foundUsername && (
                <div className="result">
                    <p>Your ID is: <strong>{foundUsername}</strong></p>
                </div>
            )}
        </div>
    );
};

export default FindID;
