import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Merchandise.css";
import Navbar from '../../components/Navbar/Navbar';

const Merchandise = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://lyricistapi.wineds.com/api/v1/product/list-paginate')
      .then(response => response.json())
      .then(data => setBooks(data.data.data))
      .catch(error => console.error('Error fetching data:', error));

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  const handleAddToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // alert(`${book.name} has been added to your cart.`);
  };

  return (
    <>
      <Navbar cart={cart} />
      <div className="container-fluid bg-dark" style={{ minHeight: "100vh"}}>
        <div className="container">
          <h1 className='text-light text-start'><span className="typograph-text">All Valuable Books</span></h1>
          <div className="book-list mt-5 text-start">
            {books.map(book => (
              <div key={book.id} className="book-card d-flex flex-row p-3" style={{backgroundColor: "rgba(165, 239, 255, 0.2)"}}>
                <img src={`https://lyricistadminapi.wineds.com${book.file_path}`} alt={book.name} className="img-fluid book-image" />
                <div className="card-body text-start text-light">
                  <h2 className="card-title">{book.name}</h2>
                  <h5>By {book.member.name}</h5>
                  <p className="card-text text-start">{book.price} BDT Only</p>
                  <button className="btn btn-light text-start text-dark w-25" onClick={() => handleAddToCart(book)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Merchandise;