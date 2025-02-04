import React, { useEffect, useState } from 'react';
import './DeliveryStatus.css';

const DeliveryStatus = () => {
    const [deliveryItems, setDeliveryItems] = useState([]);

    useEffect(() => {
        // 배송중인 상품 리스트를 가져오는 로직 (API 호출 등)
        const fetchDeliveryItems = async () => {
            // 예시 데이터를 사용하여 상품 리스트를 설정
            const items = [
                { id: 1, name: 'Item 1', status: 'On the way', location: 'Seoul' },
                { id: 2, name: 'Item 2', status: 'Delivered', location: 'Busan' },
                { id: 3, name: 'Item 3', status: 'In transit', location: 'Daegu' },
            ];
            setDeliveryItems(items);
        };

        fetchDeliveryItems();
    }, []);

    return (
        <div className="delivery-status-container">
            {/* 가운데 지도 표시 부분 */}
            <div className="map-container">
                <iframe
                    title="delivery-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.8311523285545!2d126.9782916!3d37.5665355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca29961766d59%3A0x35d4324d132eac5d!2sSeoul%20City%20Hall!5e0!3m2!1sen!2skr!4v1631195001552!5m2!1sen!2skr"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            {/* 배송중인 상품 리스트 */}
            <div className="delivery-items-list">
                <h2>Delivery Items</h2>
                <ul>
                    {deliveryItems.map((item) => (
                        <li key={item.id} className="delivery-item">
                            <div>
                                <strong>Item Name:</strong> {item.name}
                            </div>
                            <div>
                                <strong>Status:</strong> {item.status}
                            </div>
                            <div>
                                <strong>Current Location:</strong> {item.location}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DeliveryStatus;
