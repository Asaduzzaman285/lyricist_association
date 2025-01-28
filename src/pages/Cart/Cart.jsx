import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Modal, Button, Form } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    address: '',
    paymentMethod: ''
  });

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  const handleProceed = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('User Info:', userInfo);
    console.log('Cart Items:', cart);
    // Clear cart and user info after submission
    localStorage.removeItem('cart');
    setCart([]);
    setUserInfo({
      name: '',
      phone: '',
      email: '',
      location: '',
      address: '',
      paymentMethod: ''
    });
    setShowModal(false);
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center my-4">Cart Page</h1>
        <div className="cart-list">
          {cart.map((book, index) => (
            <div key={index} className="cart-item d-flex flex-row p-3" style={{ backgroundColor: "rgba(165, 239, 255, 0.2)" }}>
              <img src={`https://lyricistadminapi.wineds.com${book.file_path}`} alt={book.name} className="img-fluid cart-image" />
              <div className="card-body text-start text-light">
                <h2 className="card-title">{book.name}</h2>
                <h5>By {book.member.name}</h5>
                <p className="card-text text-start">{book.price} BDT Only</p>
              </div>
              <Button variant="danger" onClick={() => handleRemove(index)}>Remove</Button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="text-center my-4">
            <Button variant="primary" onClick={handleProceed}>Proceed</Button>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={userInfo.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={userInfo.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={userInfo.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={userInfo.location} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={userInfo.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control type="text" name="paymentMethod" value={userInfo.paymentMethod} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;