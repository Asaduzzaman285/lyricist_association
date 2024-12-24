import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './components/Slider/Slider';
import LyricistCard from './components/Card/LyricistCard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Slider />
      <div className="container-fluid" style={{ background: '#242424' }}>
        <div className="container my-4">
          <div className="row g-4">
            <h1 className='text-light fs-3'>Lyricists of Bangladesh</h1>
            <div className="col-md-4">
              <LyricistCard
                image="assets/images/image.png"
                name="Alauddin Ali"
                bio="A legendary composer and lyricist."
                additionalImage="assets/images/singnature-style.png"
                videoUrl="https://www.youtube.com/watch?v=_4GCyU-tBvk"
              />
            </div>
            <div className="col-md-4">
              <LyricistCard
                image="assets/images/image-1.png"
                name="Anusheh Anadil"
                bio="A renowned singer and lyricist."
                additionalImage="assets/images/singnature-style.png"
                videoUrl="https://www.youtube.com/watch?v=rD2s1o0H3Bc&list=RDReYvobnsHPE&index=17"
              />
            </div>
            <div className="col-md-4">
              <LyricistCard
                image="assets/images/image-2.png"
                name="Baul Shah Abdul Karim"
                bio="A revered Baul saint and lyricist."
                additionalImage="assets/images/singnature-style.png"
                videoUrl="https://www.youtube.com/watch?v=4_lGdLdmRAc"
              />
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/members" element={<div>Members Page</div>} />
        <Route path="/success-stories" element={<div>Success Stories Page</div>} />
        <Route path="/events" element={<div>Events Page</div>} />
        <Route path="/merchandise" element={<div>Merchandise Page</div>} />
        <Route path="/podcast" element={<div>Podcast Page</div>} />
        <Route path="/ec-committee" element={<div>EC Committee Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
