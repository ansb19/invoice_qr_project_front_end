import React from 'react';
import './ShopCart.css';

const cartItems = [
    // 예시 데이터, 실제 데이터 소스로 교체 필요
    { id: 1, name: 'Product 1', price: 10000, quantity: 2 },
    { id: 2, name: 'Product 2', price: 20000, quantity: 1 },
    // 더 많은 장바구니 항목 추가 가능
];

const ShopCart = () => {
    const handleBuyNow = () => {
        // 구매하기 로직 구현
        alert('구매가 완료되었습니다.');
    };

    return (
        <div className="shopcart-container">
            <h2>장바구니</h2>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="item-details">
                            <div><strong>제품명:</strong> {item.name}</div>
                            <div><strong>가격:</strong> {item.price.toLocaleString()} 원</div>
                            <div><strong>수량:</strong> {item.quantity}</div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="buy-now-button" onClick={handleBuyNow}>
                구매하기
            </button>
        </div>
    );
};

export default ShopCart;
