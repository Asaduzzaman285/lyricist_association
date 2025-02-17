import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../components/Navbar/Navbar';
import emptyCartImage from '../../assets/images/emptycart.png'; // Adjust path as needed
import './Cart.css';

// EmptyCart Component
const EmptyCart = () => (
  <div className="empty-cart">
    <img src={emptyCartImage} alt="Empty Cart" />
    <h2 style={{color:"red"}}>Your Cart is Empty!</h2>
    <p>Looks like you haven't made order yet.</p>
    <Button 
      variant="primary" 
      href="/merchandise" 
      className="continue-shopping"
    >
      Continue to Shopping
    </Button>
  </div>
);

// CartItem Component
const CartItem = ({ book, onRemove, onQuantityChange, index }) => {
  const handleQuantityChange = (change) => {
    const newQuantity = (book.quantity || 1) + change;
    if (newQuantity > 0) {
      onQuantityChange(index, change);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-content">
        <div className="cart-item-image">
          {book.isOnSale && <div className="super-deal-badge text-light">Super Deal</div>}
          <img 
            src={`https://lyricistadminapi.wineds.com${book.file_path}`} 
            alt={book.name}
          />
        </div>
        
        <div className="cart-item-details">
          <h2 className="cart-item-title">{book.name}</h2>
          <h6 className="cart-item-author">
            By <span>{book.member?.name}</span>
          </h6>
          <p className="cart-item-price">{book.price} BDT Only</p>
        </div>

        <div className="cart-item-actions">
          <Button 
            variant="link" 
            className="delete-btn"
            onClick={() => onRemove(index)}
          >
            <i className="fas fa-trash"></i>
          </Button>
          
          <div className="quantity-controls">
            <button 
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="mx-3">{book.quantity || 1}</span>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// OrderSummary Component
const OrderSummary = ({ subtotal, deliveryCharge, total }) => (
  <div className="order-summary">
    <h2 className='text-dark'>Order Summary</h2>
    <div className="summary-item">
      <span>Subtotal</span>
      <span>{subtotal} TK.</span>
    </div>
    <div className="summary-item">
      <span>Delivery Charge</span>
      <span>{deliveryCharge} TK.</span>
    </div>
    <hr />
    <div className="summary-item total">
      <span>Total</span>
      <span>{total} TK.</span>
    </div>
  </div>
);

// ShippingForm Component
const ShippingForm = ({ userInfo, paymentMethods, onSubmit, onChange }) => (
  <Form onSubmit={onSubmit} className="shipping-form">
    <h3>Shipping Information</h3>
    <div className="form-row ">
      <Form.Group className="form-group">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={userInfo.name}
          onChange={onChange}
          required
          className="form-control"
        />
      </Form.Group>
      
      <Form.Group className="form-group">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={userInfo.phone}
          onChange={onChange}
          required
          className="form-control"
        />
      </Form.Group>
    </div>

    <Form.Group className="form-group">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={userInfo.email}
        onChange={onChange}
        required
        className="form-control"
      />
    </Form.Group>

    <Form.Group className="form-group">
      <Form.Label>Shipping Address</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="shippingAddress"
        value={userInfo.shippingAddress}
        onChange={onChange}
        required
        className="form-control"
      />
    </Form.Group>

    <Form.Group className="form-group">
      <Form.Label>Payment Method</Form.Label>
      <Form.Select
        name="paymentMethod"
        value={userInfo.paymentMethod}
        onChange={onChange}
        required
        className="form-select"
      >
        <option value="">Select Payment Method</option>
        {paymentMethods.map(method => (
          <option key={method.id} value={method.id} className="bg-dark text-light">
            {method.payment_method}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Button 
      variant="primary" 
      type="submit"
      className="submit-button"
      style={{ backgroundColor: "red" }}
    >
      Place Order
    </Button>
  </Form>
);

// Main Cart Component
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
    setUserInfo(prev => ({ ...prev, [name]: value }));
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
        setCart([]);
        setUserInfo({
          name: '',
          phone: '',
          email: '',
          shippingAddress: '',
          paymentMethod: ''
        });
        localStorage.removeItem('cart');
        navigate('/tracker?order=success&order_id=' + data.data.order_number);
      } else {
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
    item.quantity += change;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-page">
      <Navbar cart={cart} />
      
      <div className="cart-container">
        <h1 className="text-start my-4">
          <span className="typograph-text fs-2">Shopping Cart</span>
        </h1>
        
        <div className="cart-content">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div className="cart-main">
                <div className="cart-items">
                  <h4 style={{ color: "rgba(255, 149, 0, 1)" }}>Order Items</h4>
                  {cart.map((book, index) => (
                    <CartItem
                      key={index}
                      book={book}
                      index={index}
                      onRemove={handleRemove}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>

                <div className="order-summary-container">
                  <OrderSummary
                    subtotal={calculateSubtotal()}
                    deliveryCharge={calculateDeliveryCharge()}
                    total={calculateTotal()}
                  />
                </div>
              </div>

              <div className="shipping-form-container">
                <ShippingForm
                  userInfo={userInfo}
                  paymentMethods={paymentMethods}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;