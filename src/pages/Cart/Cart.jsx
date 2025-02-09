import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    shippingAddress: '',
    paymentMethod: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    fetchPaymentMethods();
    if (cartItems.length > 0) {
      fetchProductsData(cartItems.map(item => item.id));
    }
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    try {
      const response = await fetch('https://lyricistapi.wineds.com/api/v1/cart/payment-methods');
      const data = await response.json();
      if (data.status === 'success') {
        setPaymentMethods(data.data);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  }, []);

  const fetchProductsData = useCallback(async (productIds) => {
    try {
      const queryString = productIds
        .map((id, index) => `product_ids[${index}]=${id}`)
        .join('&');
      const response = await fetch(`https://lyricistapi.wineds.com/api/v1/cart/products-data?${queryString}`);
      const data = await response.json();
      if (data.status === 'success') {
        setProductsData(data.data);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.price) * (item.quantity || 1)), 0);
  };

  const calculateDeliveryCharge = () => {
    return 80; 
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryCharge();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      shipping_address: userInfo.shippingAddress,
      payment_method_id: parseInt(userInfo.paymentMethod),
      order_detail: cart.map(item => ({
        product_id: item.id,
        price: parseFloat(item.price),
        qty: item.quantity || 1,
        total: item.price * (item.quantity || 1)
      })),
      sub_total: calculateSubtotal(),
      delivery_charge: calculateDeliveryCharge(),
      total: calculateTotal()
    };
  
    try {
      const response = await fetch('https://lyricistapi.wineds.com/api/v1/cart/order-placement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Order placed successfully:', data);
        setCart([]);
        setUserInfo({
          name: '',
          phone: '',
          email: '',
          shippingAddress: '',
          paymentMethod: ''
        });
        localStorage.removeItem('cart');
        navigate('/?order=success');
      } else {
        console.error('Error placing order:', data);
        Swal.fire({
          title: 'Error placing order',
          text: 'Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire({
        title: 'Error placing order',
        text: 'Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    if (!item.quantity) item.quantity = 1;
    
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <div>
      <Navbar cart={cart} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8" style={{ minHeight: "100vh" }}>
            <h1 className="text-start my-4 text-light"><span className="typograph-text fs-2">Shopping Cart</span></h1>
            {cart.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <button 
                  className="btn  px-4 py-3"
                  style={{
                    background: 'transparent',
                    color: 'rgb(255, 149, 0)', 
                    border: '2px dashed transparent', 
                    borderImage: 'repeating-linear-gradient(90deg, rgb(255, 149, 0) 0, rgb(255, 149, 0) 15px, transparent 15px, transparent 30px) 10', 
                    borderRadius: '8px',
                    fontSize: '1.2rem',
                    cursor: 'default',
                    textAlign: 'right', 
      
                    paddingRight: '10px', 
                  }}
                >
                  No products have been added to the cart yet.
                </button>
              </div>
            ) : (
              <div className="cart-list">
                {cart.map((book, index) => (
                  <div key={index} className="cart-item d-flex">
                    <div className="image-section position-relative">
                      {book.isOnSale && <div className="super-deal-badge text-light">Super Deal</div>}
                      <img 
                        src={`https://lyricistadminapi.wineds.com${book.file_path}`} 
                        alt={book.name} 
                        className="cart-image"
                        style={{ width: '100px' }}
                      />
                    </div>
                    <div className="details-section text-start text-light fs-3">
                      <h2 className="card-title ">{book.name}</h2>
                      <h5>By {book.member?.name}</h5>
                      <p className="card-text mt-3 text-start text-danger">{book.price} BDT Only</p>
                    </div>
                    <div className="actions-section d-flex flex-column justify-content-between">
                      <Button 
                        variant="link" 
                        className="text-danger delete-btn"
                        onClick={() => handleRemove(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                      <div className="counter-section d-flex align-items-center text-light">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(index, -1)}
                        >
                          -
                        </button>
                        <span className="mx-3">{book.quantity || 1}</span>
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <Form onSubmit={handleSubmit} className="user-info-form mt-4 p-4">
                <h3 className="mb-4">Shipping Information</h3>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                      type="tel"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="shippingAddress"
                  value={userInfo.shippingAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={userInfo.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id} className='bg-dark text-light'>
                      {method.payment_method}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button 
                variant="primary" 
                className="w-100 mt-4"
                type="submit"
                disabled={cart.length === 0}
              >
                Place Order
              </Button>
            </Form>
          )}
        </div>
        {cart.length > 0 && (
          <div className="col-md-4">
            <div className="checkout-summary mt-4">
              <h2>Order Summary</h2>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>{calculateSubtotal()} TK.</span>
              </div>
              <div className="summary-item">
                <span>Delivery Charge</span>
                <span>{calculateDeliveryCharge()} TK.</span>
              </div>
              <hr />
              <div className="summary-item">
                <span>Total</span>
                <span>{calculateTotal()} TK.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Cart;