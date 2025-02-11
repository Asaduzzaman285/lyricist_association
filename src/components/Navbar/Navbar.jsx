import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/lyricist-logo.png';

const Navbar = ({ cart }) => {
  const location = useLocation();
  

  const cartItemCount = useMemo(() => {
    return cart ? cart.length : 0;
  }, [cart]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/members' ? 'active' : ''}>
          <Link to="/members">Members</Link>
        </li>
        <li className={location.pathname === '/success-stories' ? 'active' : ''}>
          <Link to="/success-stories">Success Stories</Link>
        </li>
        <li className={location.pathname === '/events' ? 'active' : ''}>
          <Link to="/events">Events</Link>
        </li>
        <li className={location.pathname === '/merchandise' ? 'active' : ''}>
          <Link to="/merchandise">Merchandise</Link>
        </li>
        <li className={location.pathname === '/cart' ? 'active' : ''}>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span
  style={{ fontSize: "12px", marginRight: "90px", marginTop: "16px" }}
  className="badge bg-danger"
>
  {cartItemCount > 0 ? cartItemCount : ""}
</span>
          </Link>
        </li>
        <li className={location.pathname === '/tracker' ? 'active' : ''}>
          <Link to="/tracker"><i class="fas fa-shipping-fast"></i></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
