import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Podcast = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid max-vh-100 d-flex justify-content-center align-items-center bg-dark">
  <img 
    src="assets/images/podcast.jpg" 
    alt="Podcast Image" 
    className="img-fluid" 
    style={{ maxHeight: '80%', maxWidth: '100%' }}
  />
 
</div>

    </>
  );
};

export default Podcast;
