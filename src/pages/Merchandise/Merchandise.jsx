// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Merchandise.css";
// import Navbar from '../../components/Navbar/Navbar';

// const Merchandise = () => {
//   const [books, setBooks] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('https://lyricistapi.wineds.com/api/v1/product/list-paginate')
//       .then(response => response.json())
//       .then(data => setBooks(data.data.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleAddToCart = (book) => {
//     // Save book information to localStorage or state management solution
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart.push(book);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     navigate('/cart');
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid bg-dark">
//         <div className="container">
//           <h1 className='text-light text-center'>Merchandise Page</h1>
//           <div className="book-list mt-5 text-start">
//             {books.map(book => (
//               <div key={book.id} className="book-card d-flex flex-row p-3" style={{backgroundColor: "rgba(165, 239, 255, 0.2)"}}>
//                 <img src={`https://lyricistadminapi.wineds.com${book.file_path}`} alt={book.name} className="img-fluid book-image" />
//                 <div className="card-body text-start text-light">
//                   <h2 className="card-title">{book.name}</h2>
//                   <h5>By {book.member.name}</h5>
//                   <p className="card-text text-start">{book.price} BDT Only</p>
//                   <button className="btn btn-light text-start text-dark w-25" onClick={() => handleAddToCart(book)}>Add to Cart</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Merchandise;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Merchandise.css";
import Navbar from '../../components/Navbar/Navbar';

const Merchandise = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://lyricistapi.wineds.com/api/v1/product/list-paginate')
      .then(response => response.json())
      .then(data => setBooks(data.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddToCart = (book) => {
    // Save book information to localStorage or state management solution
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    // Optionally, you can show a message or notification that the item was added to the cart
    alert(`${book.name} has been added to your cart.`);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark">
        <div className="container">
          <h1 className='text-light text-center'>Merchandise Page</h1>
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
