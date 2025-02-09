import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Merchandise.css";
import Navbar from "../../components/Navbar/Navbar";

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
  
      // ✅ SweetAlert2 with Custom Position (Right Side of h1)
      Swal.fire({
        text: `${book.name} has been added to your cart!`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000, // ✅ Auto close after 1s
        position: "top-end", // ✅ Right side
        toast: true, // ✅ Compact style
        customClass: {
          popup: "custom-swal",
        },
      });
    }
  };

  return (
    <>
      <Navbar cart={cart} />
      <div className="container-fluid bg-dark" style={{ minHeight: "100vh" }}>
        <div className="container">
          <h1 className="text-light text-start">
            <span className="typograph-text">All Valuable Books</span>
          </h1>

          <div className="book-list mt-5 text-start">
            {books.map((book) => (
              <div
                key={book.id}
                className="book-card d-flex flex-row p-3"
                style={{ backgroundColor: "rgba(165, 239, 255, 0.2)" }}
              >
                <img
                  src={`https://lyricistadminapi.wineds.com${book.file_path}`}
                  alt={book.name}
                  className="img-fluid book-image"
                />
                <div className="card-body text-start text-light">
                  <h2 className="card-title">{book.name}</h2>
                  <h5>By {book.member.name}</h5>
                  <p>{book.description}</p>
                  <p className="card-text text-start">{book.price} BDT Only</p>

                  {/* ✅ Button with Single Color */}
                  <button
                    className="btn text-light d-flex align-items-center justify-content-center"
                    onClick={() => handleAddToCart(book)}
                    disabled={cart.some((item) => item.id === book.id)}
                    style={{
                      width: "176px",
                      height: "39px",
                      padding: "10px",
                      backgroundColor: "#c30505", // ✅ Single Color
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: "600",
                      cursor: cart.some((item) => item.id === book.id) ? "not-allowed" : "pointer",
                    }}
                  >
                    {cart.some((item) => item.id === book.id) ? "In Cart" : "Add to Cart"}
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
