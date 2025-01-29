import React from 'react';
import './Footer.css';
// import sanjebBg from './assets/images/sanjeb-bg.png';
const Footer = () => {
  return (
    <div className="container-fluid" style={{ background: '#242424'}}>
    <div className="container">
  <div className="footer-container">
      <div className="footer-bg">
        <div className="footerText d-flex flex-column align-items-center">
        <h1><span className='typograph-text '>Sanjeeb</span></h1>
        <h1 className='fs-3' style={{ marginTop:'-20px'}}>Rhythm Odyssey</h1>
        </div>
       
        {/* <h1 className="footer-title"> Rhythm Odyssey</h1> */}
        
        <div className="musician-section" style={{padding:'0'}}>
          <div className="musician-card">
            <img style={{width:'220px',height:'220px'}} src="assets/images/sharif.png" alt="Mohon Sharif" />
            <p className="musician-name">Mohon Sharif</p>
            <p className="musician-role">Solo Musician</p>
          </div>
          <div className="musician-card">
            <img style={{width:'220px',height:'220px'}}  src="assets/images/sami.png" alt="Ahmed Hasan Sami" />
            <p className="musician-name">Ahmed Hasan Sami</p>
            <p className="musician-role">Solo Musician</p>
          </div>
          <div className="musician-card">
            <img style={{width:'220px',height:'220px'}} src="assets/images/labik.png" alt="Labik Kamal Gourob" />
            <p className="musician-name">Labik Kamal Gourob</p>
            <p className="musician-role">Solo Musician</p>
          </div>
          <div className="musician-card" style={{marginLeft:"80px"}} >
            <img className='bg-image' src="assets/images/sanjeb-bg.png" alt="Sanjeeb" />
            <img className='overlay-img' src="assets/images/Sanjeb.png" alt="" />
          
          </div>
        </div>
        <div className="footer-info d-flex justify-content-around">
          <div className="footer-text text-start">
          <p>Find us at</p>
          <h3>BASHUNDHARA ICCB HALL</h3>
          <p>Gate Open: 3 PM</p>
          <p>Give us a holler at +880-1234567890</p>
          </div>
          <div className="ticket_button d-flex flex-column align-items-center justify-content-center w-50">
  {/* <button className="ticket-button">Get your Tickets now</button> */}
  <div className="copyright mt-3 text-center">
    Made with <span style={{ color: 'red' }}>❤️</span> by{' '}
    <a href="https://wintelbd.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007BFF' }}>
      Wintel Limited
    </a>
  </div>
</div>
         
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Footer;
