import React, { useState } from 'react';
import axios from '../../api/axios';
import requests from '../../api/request';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        zipcode: '',
        grade: '0'  // 기본 등급: 일반 사용자
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [idCheckMessage, setIdCheckMessage] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password' || name === 'confirmPassword') {
            setIsPasswordMatch(formData.password === value || formData.confirmPassword === value);
        }
    };

    const checkIdDuplicate = async () => {
        try {
            console.log(formData.id);
            const response = await axios.post(requests.user_check_id , { id: formData.id } );
            console.log(response.data);
            if (response.data.isDuplicate) { //true 아이디 없음
                setIdCheckMessage('사용 가능한 ID입니다.');
            } else {
                setIdCheckMessage('이미 사용 중인 ID입니다.');
            }
        } catch (error) {
            console.error('ID 중복 확인 중 오류 발생:', error);
            alert('ID 중복 확인 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isPasswordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            await axios.post(requests.user_sign_up, formData);
            navigate(`/user/email-cert?email=${encodeURIComponent(formData.email)}`);
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const sendOtp = async () => {
        try {
            await axios.post(requests.user_send_otp, { phone: formData.phone });
            setOtpSent(true);
            alert('인증번호가 전송되었습니다.');
        } catch (error) {
            console.error('OTP 전송 중 오류 발생:', error);
            alert('OTP 전송 중 오류가 발생했습니다.');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(requests.user_verify_otp, { otp: otp });
            if (response.data.code == 0) {
                alert('휴대폰 인증이 완료되었습니다.');
            }
            else if (response.data.code == 1) {
                alert('인증번호가 틀렸습니다.');
            }
            else if (response.data.code == 2) {
                alert('인증 시간이 만료되었습니다 다시 인증번호를 전송해주세요.');
            }

        } catch (error) {
            console.error('OTP 인증 중 오류 발생:', error);
            alert('OTP 인증 중 오류가 발생했습니다.');
        }
    };

    const handleAddressSearch = async () => {
        try {
            const response = await axios.post(requests.user_get_address);
            // 팝업 열기
            console.log(response);
            // 새 팝업 창을 열고, HTML을 그 창에 표시하기
            const popupWindow = window.open('', 'pop', 'width=570,height=420,scrollbars=yes,resizable=yes');
            if (popupWindow) {
                popupWindow.document.write(response.data); // 받은 HTML을 팝업에 작성
                popupWindow.document.close(); // 문서 닫기
            }
        } catch (error) {
            console.error('주소 검색 요청 중 오류 발생:', error);
            alert('주소 검색 요청 중 오류가 발생했습니다.');
        }
    };


    return (
        <div className="sign-up-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
                    <button type="button" onClick={checkIdDuplicate}>중복확인</button>
                    <p className="id-check-message">{idCheckMessage}</p>
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={formData.confirmPassword} onChange={handleChange} required />
                    {!isPasswordMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div className="form-group">
                    <input type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="text" name="phone" placeholder="휴대폰 번호" value={formData.phone} onChange={handleChange} required />
                    <button type="button" onClick={sendOtp}>인증번호 전송</button>
                    {otpSent && (
                        <>
                            <input type="text" placeholder="인증번호 입력" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            <button type="button" onClick={verifyOtp}>인증 완료</button>
                        </>
                    )}
                </div>
                <div className="form-group">
                    <input type="text" name="address" placeholder="주소" value={formData.address} onChange={handleChange} required />
                    <input type="text" name="zipcode" placeholder="우편번호" value={formData.zipcode} onChange={handleChange} required />
                    <button type="button" onClick={handleAddressSearch}>주소찾기</button>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;
