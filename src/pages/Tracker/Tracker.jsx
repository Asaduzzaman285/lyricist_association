import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Form, Button, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import './Tracker.css';

const Tracker = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderNo = params.get('order_id');
    if (orderNo) {
      setOrderNumber(orderNo);
      fetchOrderDetails(orderNo);
    }
  }, [location]);

  const fetchOrderDetails = async (orderNo) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.lyricistsassociationbd.com/api/v1/order-tracking/order-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order_number: orderNo })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setTimeout(() => {
          setOrderDetails(data.data.order_details);
          setLoading(false);
        }, 500);
      } else {
        console.error('Error fetching order details:', data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/tracker?order_id=${orderNumber}`);
    fetchOrderDetails(orderNumber);
  };

  const getOrderStatusInfo = (statusCode) => {
    const statusMap = {
      1: { label: 'Processing', completed: true, date: 'Today', time: '11:29 AM', description: 'Your order is being processed' },
      2: { label: 'On the way', completed: true, date: 'Tomorrow', time: '12:00 PM', description: 'Your order is on the way' },
      3: { label: 'Cancelled', completed: false, date: '', time: '', description: 'Your order has been cancelled' },
      4: { label: 'Delivered', completed: true, date: 'Yesterday', time: '15:20 PM', description: 'Your order has been delivered' },
    };

    // Determine which steps are active based on status code
    const timelineItems = [
      { 
        label: 'Processing', 
        isActive: statusCode >= 1, 
        isCompleted: statusCode > 1, 
        isCancelled: statusCode === 3,
        date: 'Today',
        time: '11:29 AM',
        description: 'Your order is being processed'
      },
      { 
        label: 'On the way', 
        isActive: statusCode >= 2, 
        isCompleted: statusCode > 2, 
        isCancelled: statusCode === 3,
        date: 'Tomorrow',
        time: '12:00 PM',
        description: 'Your order is on the way' 
      },
      { 
        label: statusCode === 3 ? 'Cancelled' : 'Delivered', 
        isActive: statusCode >= 3, 
        isCompleted: statusCode > 3, 
        isCancelled: statusCode === 3,
        date: 'Expected',
        time: '15:20 PM',
        description: statusCode === 3 ? 'Your order has been cancelled' : 'Your order will be delivered soon' 
      }
    ];

    return timelineItems;
  };

  const renderTimelineProgressBar = (statusCode) => {
    const timelineItems = getOrderStatusInfo(statusCode);
    
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title m-0">Order Status</h5>
        </div>
        <div className="card-body pt-1">
          <ul className="timeline pb-0 mb-0">
            {timelineItems.map((item, index) => (
              <li 
                key={index} 
                className={`timeline-item ${
                  item.isActive ? 'timeline-item-transparent border-primary' : 
                  item.isCancelled ? 'timeline-item-transparent border-danger' : 
                  'timeline-item-transparent border-secondary'
                } ${
                  index === timelineItems.length - 1 ? 'border-transparent pb-0' : 
                  !item.isActive && index !== timelineItems.length - 1 ? 'border-dashed' : ''
                }`}
              >
                <span className={`timeline-point ${
                  item.isActive ? 'timeline-point-primary' : 
                  item.isCancelled ? 'timeline-point-danger' : 
                  'timeline-point-secondary'
                }`}></span>
                <div className={`timeline-event ${index === timelineItems.length - 1 ? 'pb-0' : ''}`}>
                  <div className="timeline-header">
                    <h6 className="mb-0">{item.label}</h6>
                    {item.isActive && <small className="text-body-secondary">{item.date} {item.time}</small>}
                  </div>
                  <p className={`mt-${index === timelineItems.length - 1 ? '1' : '3'} mb-${index === timelineItems.length - 1 ? '0' : '3'}`}>
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Order Tracker</h1>
        <Form onSubmit={handleSearch} className="mb-4">
          <div className="d-flex align-items-center">
            <Form.Group controlId="orderNumber" className="flex-grow-1 me-2">
              <Form.Control
                type="text"
                style={{color: '#000'}}
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </div>
        </Form>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {orderDetails && !loading && (
          <div>
            {/* Timeline Progress Bar */}
            <div className="mb-4">
              {renderTimelineProgressBar(orderDetails.order_status.id)}
            </div>

            {/* Order Details Tables */}
            <div className="order-details">
              <Table bordered hover className="table-sm table-hover">
                <thead>
                  <tr>
                    <th>Customer Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>Name: {orderDetails.name}</div>
                      <div>Email: {orderDetails.email}</div>
                      <div>Phone: {orderDetails.phone}</div>
                      <div>Address: {orderDetails.shipping_address}</div>
                      <div>Payment Method: <strong>{orderDetails.payment_method.payment_method}</strong></div>
                      <div>Payment Status: <strong>{orderDetails.payment_status?.status || 'Pending'}</strong></div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table bordered hover className="table-sm table-hover mt-4">
                <thead>
                  <tr>
                    <th>Order Items</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Table bordered hover className="table-sm table-hover">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails.order_detail.map(detail => (
                            <tr key={detail.id}>
                              <td>{detail.product.name}</td>
                              <td>{detail.price} TK</td>
                              <td>{detail.qty}</td>
                              <td>{detail.price * detail.qty} TK</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Subtotal</strong></td>
                            <td>{orderDetails.sub_total} TK</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Delivery Charge</strong></td>
                            <td>{orderDetails.delivery_charge} TK</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Total</strong></td>
                            <td>{orderDetails.total} TK</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Paid Amount</strong></td>
                            <td>{orderDetails.paid_amount} TK</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Due</strong></td>
                            <td>{orderDetails.due} TK</td>
                          </tr>
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;