import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/lyricist-logo.png';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="Logo" className="logo" />
        {/* <span>গীতিকবিসংঘ</span> */}
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/members">Members</Link></li>
        <li><Link to="/success-stories">Success Stories</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/merchandise">Merchandise</Link></li>
        <li><Link to="/podcast">Podcast</Link></li>
        <li><Link to="/ec-committee">EC Committee</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
