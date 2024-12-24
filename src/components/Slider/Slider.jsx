import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css'; // Import the CSS file

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-fluid">
      <div className="slider-container">
        <Carousel activeIndex={index} onSelect={handleSelect} interval={2000} controls={false} indicators={false} touch={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/images/slider-1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className='bangla-text'><span>গীতিকবিসংঘ</span></h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/images/slider-2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h1 className='bangla-text'><span>গীতিকবিসংঘ</span></h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/images/slider-3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h1 className='bangla-text'><span>গীতিকবিসংঘ</span></h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Slider;
