import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Form, Button, Table, ProgressBar } from 'react-bootstrap';
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
      const response = await fetch('https://lyricistapi.wineds.com/api/v1/order-tracking/order-details', {
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

  const getProgressBarVariant = (statusCode) => {
    switch (statusCode) {
      case 1: return 'info'; // Processing
      case 2: return 'warning'; // On the way
      case 3: return 'danger'; // Cancelled
      case 4: return 'success'; // Delivered
      default: return 'light';
    }
  };

  const renderProgressBar = (statusCode) => {
    const progressValues = [33, 33, 34];
    const labels = ['Processing', 'On the way', 'Delivered'];
    const variants = ['info', 'warning', 'success'];

    if (statusCode === 3) {
      labels[2] = 'Cancelled';
      variants[2] = 'danger';
    }

    return (
      <ProgressBar style={{ height: '2rem' }}>
        {progressValues.map((value, index) => (
          <ProgressBar
            key={index}
            now={statusCode > index ? value : 0}
            variant={statusCode > index ? variants[index] : 'light'}
            label={statusCode > index ? labels[index] : ''}
          />
        ))}
      </ProgressBar>
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
            {/* Status Timeline */}
            <div className="mb-4">
              {renderProgressBar(orderDetails.order_status.id)}
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