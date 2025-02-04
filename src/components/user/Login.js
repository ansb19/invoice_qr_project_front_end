import React, { useState } from 'react';
import axios from '../../api/axios';
import requests from '../../api/request';

import { replace, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(requests.user_login, { id, password });
            console.log(response);
            if (response.data.result) {
                window.location.href = '/main';//navigate(`/main`,);
            }
            else{
                alert('아이디나 비밀번호를 확인해주세요');
            }
        }
        catch (err) {
            console.error(`error sign-in ing:  ${err}`);
        }

        //onsole.log('ID:', id);
        //sconsole.log('Password:', password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="navigation-buttons">
                <button onClick={() => navigate('/user/sign-up')} className="nav-button">Sign Up</button>
                <button onClick={() => navigate('/user/find-id')} className="nav-button">Find ID</button>
                <button onClick={() => navigate('/user/find-password')} className="nav-button">Find Password</button>
            </div>
        </div>
    );
};

export default Login;
