import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="container-fluid footer-bg">
      <div className="container footer-container">
        <div className="ticket_button d-flex flex-column align-items-center justify-content-center w-50">
          <div className="copyright mt-3 text-center">
            Made with <span style={{ color: 'red' }}>❤️</span> by{' '}
            <a href="https://wintelbd.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007BFF' }}>
              Wintel Limited
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;