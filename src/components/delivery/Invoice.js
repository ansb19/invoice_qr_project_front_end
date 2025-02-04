import React from 'react';
import './Invoice.css';

const Invoice = ({ invoiceData = {} }) => {
    const {
      trackingNumber = '',
      receiverName = '',
      receiverPhone = '',
      receiverAddress = '',
      receiverPostalCode = '',
      receiverRequest = '',
      senderName = '',
      senderPhone = '',
      senderAddress = '',
      senderPostalCode = '',
      senderRequest = '',
      deliveryManName = '',
      deliveryManPhone = '',
      deliveryItem = '',
      shippingCost = 0,
      isCashOnDelivery = false,
      createdTime = ''
    } = invoiceData;

  // 프린트 버튼 핸들러
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-container">
      <h2>Delivery Invoice</h2>

      <div className="invoice-section">
        <h3>Tracking Info</h3>
        <p><strong>Tracking Number:</strong> {trackingNumber}</p>
        <p><strong>Created Time:</strong> {new Date(createdTime).toLocaleString()}</p>
      </div>

      <div className="invoice-section">
        <h3>Receiver Info</h3>
        <p><strong>Name:</strong> {receiverName}</p>
        <p><strong>Phone:</strong> {receiverPhone}</p>
        <p><strong>Address:</strong> {receiverAddress}</p>
        <p><strong>Postal Code:</strong> {receiverPostalCode}</p>
        <p><strong>Request:</strong> {receiverRequest}</p>
      </div>

      <div className="invoice-section">
        <h3>Sender Info</h3>
        <p><strong>Name:</strong> {senderName}</p>
        <p><strong>Phone:</strong> {senderPhone}</p>
        <p><strong>Address:</strong> {senderAddress}</p>
        <p><strong>Postal Code:</strong> {senderPostalCode}</p>
        <p><strong>Request:</strong> {senderRequest}</p>
      </div>

      <div className="invoice-section">
        <h3>Delivery Info</h3>
        <p><strong>Delivery Man:</strong> {deliveryManName}</p>
        <p><strong>Phone:</strong> {deliveryManPhone}</p>
        <p><strong>Item:</strong> {deliveryItem}</p>
        <p><strong>Shipping Cost:</strong> {shippingCost}</p>
        <p><strong>Cash on Delivery:</strong> {isCashOnDelivery ? "Yes" : "No"}</p>
      </div>

      <button className="print-button" onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default Invoice;
