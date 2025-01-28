import React from 'react';
import './AdSpace.css';

const AdSpace = ({ imageUrl }) => {
  return (
    <div className="ad-space" style={{width:'100%'}}>
      <img className='col-md-12' src={imageUrl} alt="Ad" />
    </div>
  );
};

export default AdSpace;