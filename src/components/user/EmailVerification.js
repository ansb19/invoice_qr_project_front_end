import React, { useState } from 'react';
import axios from '../../api/axios';
import requests from '../../api/request';
import { useNavigate } from 'react-router-dom';
import './EmailVerification.css';  // CSS 파일 임포트

// signup -> emailverification -> login
// checkpassword -> emailverification -> main(?)
function EmailVerification() {
    
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [email, setEmail] = useState(''); // 이메일 상태 추가

    // 서버에서 이메일을 가져오는 함수
    const fetchEmail = async () => {
        try {
            const response = await axios.get(requests.user_get_email);
            console.log(response)
            setEmail(response.data.email); // 서버로부터 이메일 주소를 받음
        } catch (error) {
            console.error('Error fetching email', error);
        }
    };

    React.useEffect(() => {
        fetchEmail(); // 컴포넌트가 마운트될 때 이메일을 가져옴
    }, []);

    const handleChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(requests.user_email_cert, { email_cert_number: verificationCode });
            alert('Email verification successful.');
            navigate('/user/login');  // 인증 후 로그인 페이지로 이동
        } catch (error) {
            console.error('Error during email verification', error);
            alert('Error during email verification. Please try again.');
        }
    };

    return (
        <div className="email-verification-container">
            <h2>Email Verification</h2>
            <p>Please verify your email address: <strong>{email}</strong></p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Verify Email</button>
            </form>
        </div>
    );
}

export default EmailVerification;
