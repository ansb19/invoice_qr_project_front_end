import React from 'react';
import { useParams } from 'react-router-dom';
import './ShopProduct.css';

// 실제 데이터 소스로 교체할 필요가 있음
const products = [
    { id: 1, name: 'Product 1', quantity: 10, price: 10000, type: 'Type A', manufacturer: 'Company A' },
    { id: 2, name: 'Product 2', quantity: 5, price: 20000, type: 'Type B', manufacturer: 'Company B' },
    // 더 많은 제품 추가 가능
];

const ShopProduct = () => {
    const { id } = useParams();
    const productId = parseInt(id); // URL 파라미터를 숫자로 변환
    const product = products.find(p => p.id === productId);

    if (!product) {
        return <div>제품을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="shopproduct-container">
            <h2>제품 상세 정보</h2>
            <div className="product-details">
                <div><strong>제품 번호:</strong> {product.id}</div>
                <div><strong>제품명:</strong> {product.name}</div>
                <div><strong>남은 수량:</strong> {product.quantity}</div>
                <div><strong>가격:</strong> {product.price.toLocaleString()} 원</div>
                <div><strong>물품 종류:</strong> {product.type}</div>
                <div><strong>제조사:</strong> {product.manufacturer}</div>
            </div>
        </div>
    );
};

export default ShopProduct;
