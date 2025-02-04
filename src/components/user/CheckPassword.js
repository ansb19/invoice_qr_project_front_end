import React, { useState } from 'react';
import './CheckPassword.css';

// main -> checkpassword -> updateprofile
const CheckPassword = () => {
    const [inputPassword, setInputPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [error, setError] = useState('');

    // 예시: 세션에서 비밀번호를 가져오는 함수 (실제 구현 필요)
    const sessionPassword = 'examplePassword'; 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputPassword === sessionPassword) {
            setIsPasswordCorrect(true);
            setError('');
        } else {
            setError('비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className="check-password-container">
            {!isPasswordCorrect ? (
                <form onSubmit={handleSubmit}>
                    <h2>비밀번호 확인</h2>
                    <input
                        type="password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">확인</button>
                </form>
            ) : (
                <div className="confirmation">
                    <p>비밀번호가 확인되었습니다. 개인정보 변경 화면으로 이동합니다.</p>
                    {/* 개인정보 변경 페이지로 리다이렉트 */}
                    {/* <Redirect to="/update-profile" /> 또는 navigate('/update-profile') */}
                </div>
            )}
        </div>
    );
};

export default CheckPassword;
