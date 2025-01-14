import React from "react";
import './Card.css';

const OverlayCard = () => {
  return (
<div className="container-fluid"  >
  <div className="container" style={{ background: '#242424' , marginTop:'-23.8px',marginBottom:'40px'}}>
  <div className="custom-card">
      <img
        src="assets/images/sidecard.png"
        alt="Background"
        className="card-background"
      />
      <div className="card-content">
        <p className="card-text">Have a Lyricist Soul inside of you?</p>
        <button className="card-button">Become a Member</button>
      </div>
    </div>
  </div>
 
</div>


   
  );
};

export default OverlayCard;
