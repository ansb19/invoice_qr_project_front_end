import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';


const Main = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <h1>메인 메뉴</h1>
            <div className="menu">
                <button onClick={() => navigate('/chat/chat')} className="menu-button">채팅</button>
                <button onClick={() => navigate('/delivery/delivery-status')} className="menu-button">배송현황</button>
                <button onClick={() => navigate('/shop/shoplist')} className="menu-button">상품 구매</button>
                <button onClick={() => navigate('/user/checkpassword')} className="menu-button">개인 정보 변경</button>
            </div>
        </div>
    );
};

export default Main;
