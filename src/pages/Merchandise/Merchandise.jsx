import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import "./Merchandise.css"; 
const Merchandise = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://lyricistapi.wineds.com/api/v1/product/list-paginate")
      .then((response) => response.json())
      .then((data) => setBooks(data.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (book) => {
    const isBookInCart = cart.some((item) => item.id === book.id);

    if (!isBookInCart) {
      const updatedCart = [...cart, book];
      setCart(updatedCart);

      Swal.fire({
        text: `${book.name} has been added to your cart!`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        toast: true,
        customClass: {
          popup: "custom-swal",
        },
      });
    }
  };

  return (
    <>
      <Navbar cart={cart} />
      <div className="container-fluid bg-dark min-h-screen" style={{minHeight:"100vh"}}>
        <div className="container py-4">
          <h1 className="text-light text-start mb-5">
            <span className="typograph-text">All Valuable Books</span>
          </h1>

          <div className="book-list">
            {books.map((book) => (
              <div
                key={book.id}
                className="book-card"
                style={{ backgroundColor: "rgba(165, 239, 255, 0.2)" }}
              >
                <div className="book-image-container">
                  <img
                    src={`https://lyricistadminapi.wineds.com${book.file_path}`}
                    alt={book.name}
                    className="book-image mt-lg-3"
                  />
                </div>
                <div className="book-content">
                  <h2 className="book-title">{book.name}</h2>
                  <h5 className="book-author">
                    By <span className="author-name">{book.member.name}</span>
                  </h5>
                  <p className="book-description">{book.description}</p>
                  <p className="book-price">{book.price} BDT Only</p>

                  <button
                    className="cart-button"
                    onClick={() => handleAddToCart(book)}
                    disabled={cart.some((item) => item.id === book.id)}
                  >
                    {cart.some((item) => item.id === book.id) 
                      ? "In Cart" 
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Merchandise;