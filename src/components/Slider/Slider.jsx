import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css'; // Import the CSS file

function Slider() {
  const [index, setIndex] = useState(0);
  const [sliders, setSliders] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('https://lyricistapi.wineds.com/api/v1/home/data')
      .then(response => response.json())
      .then(data => {
        setSliders(data.data.home_main_slider);
        setAds(data.data.home_ads);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-fluid">
      <div className="slider-container">
        <Carousel activeIndex={index} onSelect={handleSelect} interval={2000} controls={false} indicators={false} touch={false}>
          {sliders.map(slider => (
            <Carousel.Item key={slider.id}>
              <img
                className="d-block w-100"
                src={slider.file_path}
                alt={slider.file_name}
              />
              <Carousel.Caption>
                <h1 className='bangla-text'><span>গীতিকবিসংঘ</span></h1>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Slider;