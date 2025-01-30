import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/lyricist-logo.png';

const Navbar = ({ cart }) => {
  const cartItemCount = cart ? cart.length : 0;
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        {/* Optional: Add a text label for the logo */}
        {/* <span>গীতিকবিসংঘ</span> */}
      </div>
      <ul className="navbar-links ">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/members">Members</Link></li>
        <li><Link to="/success-stories">Success Stories</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/merchandise">Merchandise</Link></li>
        {/* <li><Link to="/podcast">Podcast</Link></li>
        <li><Link to="/ec-committee">EC Committee</Link></li> */}
        <li><Link to="/cart"><i class="fa-solid fa-cart-shopping"></i><span class="badge bg-danger">{cartItemCount}</span>
        </Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
