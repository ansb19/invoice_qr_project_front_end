import React, { useState } from 'react';
import './UpdateProfile.css';

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        tier: ''
    });
    const [emailVerification, setEmailVerification] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmailChange = (e) => {
        handleChange(e);
        setEmailVerification(false); // 이메일 변경 시 이메일 인증 필요
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailVerification) {
            // 사용자 데이터 저장 로직 (API 호출 등)
            console.log('Form Data:', formData);
        } else {
            alert('이메일 인증이 필요합니다.');
        }
    };

    const handleEmailVerification = () => {
        // 이메일 인증 로직 (API 호출 등)
        setEmailVerification(true);
        alert('이메일 인증이 완료되었습니다.');
    };

    return (
        <div className="update-profile-container">
            <h2>개인정보 변경</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    이름
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    이메일
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                    />
                    <button type="button" onClick={handleEmailVerification}>
                        이메일 인증
                    </button>
                </label>
                <label>
                    휴대전화
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    주소
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    우편번호
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    등급
                    <input
                        type="text"
                        name="tier"
                        value={formData.tier}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">변경 완료</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
