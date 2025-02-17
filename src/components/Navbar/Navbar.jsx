import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/lyricist-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ cart }) => {
  const location = useLocation();

  const cartItemCount = useMemo(() => {
    return cart ? cart.length : 0;
  }, [cart]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/members' ? 'active' : ''}`}>
              <Link className="nav-link" to="/members">Members</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/success-stories' ? 'active' : ''}`}>
              <Link className="nav-link" to="/success-stories">Success Stories</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/events' ? 'active' : ''}`}>
              <Link className="nav-link" to="/events">Events</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/merchandise' ? 'active' : ''}`}>
              <Link className="nav-link" to="/merchandise">Merchandise</Link>
            </li>
            <li
  className={`nav-item ${location.pathname === '/cart' ? 'active' : ''}`}
  data-bs-toggle="popover"
  data-bs-trigger="hover"
  data-bs-html="true"
  title="View your Cart"
>
  <Link className="nav-link" to="/cart">
    <i className="fa-solid fa-cart-shopping"></i>
    <span className="badge bg-danger">
      {cartItemCount > 0 ? cartItemCount : ""}
    </span>
  </Link>
</li> 
            <li
                  className={`nav-item ${location.pathname === '/tracker' ? 'active' : ''}`}
                  data-bs-toggle="popover"
                  data-bs-trigger="hover"
                  data-bs-html="true"
                  
                  title="Track your Order"
                        >
         <Link className="nav-link" to="/tracker">
    <i className="fas fa-shipping-fast"></i>
                   </Link>
            </li>

            {/* <li className={`nav-item ${location.pathname === '/tracker' ? 'active' : ''}`}>
              <Link className="nav-link" to="/tracker"><i className="fas fa-shipping-fast"></i></Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;