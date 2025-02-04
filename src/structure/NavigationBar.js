import React, { useState, useEffect } from 'react';
import './NavigationBar.css';
import { useNavigate, Link } from 'react-router-dom';
import deliveryimage from '../../src/assets/delivery.png';
import qrimage from '../../src/assets/qr.png';
import axios from 'axios'; // Axios를 사용하여 API 호출

const NavigationBar = ({userName, setUserName}) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/user/login'); // 로그인 페이지로 이동
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACK_END_URL}/user/logout`, {}, { withCredentials: true });
            setUserName(''); // 사용자 이름 초기화
            navigate('/user/login'); // 로그인 페이지로 이동
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return (
        <nav className="navigation-bar">
            <div className="nav-logo" onClick={() => navigate('/main')}>
                <img src={qrimage} alt="QR Logo" />
                <img src={deliveryimage} alt="Delivery Logo" />
            </div>
            <div className='nav-user-info'>{userName ? (
                <><span>{userName}님</span><button onClick={handleLogout}>로그아웃</button> </> /* 로그아웃 버튼 */
                // 로그인 상태일 때 사용자 이름 표시
            ) : (
                <button onClick={handleLogin}>로그인</button> // 로그인 버튼 표시
            )}
            </div>
            <div className="nav-items">
                <Link to="/chat/chat">대화방</Link>
                <Link to="/delivery/delivery-status">배송현황</Link>
                <Link to="/shop/shoplist">쇼핑</Link>
                <Link to="/user/checkpassword">개인 정보 변경</Link>
            </div>
        </nav>
    );
};

export default NavigationBar;
