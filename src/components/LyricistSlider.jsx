import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import LyricistCard from "./Card/LyricistCard";
import AdSpace from "./AdSpace/AdSpace";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LyricistSlider = () => {
  const [ads, setAds] = useState([]);
  const [members, setMembers] = useState([]);
  const baseUrl = "https://lyricistadminapi.wineds.com";

  useEffect(() => {
    fetch('https://lyricistapi.wineds.com/api/v1/home/data')
      .then(response => response.json())
      .then(data => {
        setAds(data.data.home_ads);
        setMembers(data.data.members);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "#242424", color: "white", paddingBottom: "45px", marginTop: "-24px" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 mt-5 ">
            {ads.length > 0 && <AdSpace imageUrl={`${baseUrl}/${ads[0].file_path}`} />}
          </div>
          <div className="col-md-6">
            <h2 className="text-light fs-3 text-start my-4 p-5 mb-5">Lyricists of Bangladesh</h2>
          </div>
        </div>
        <div className="container" style={{ marginTop: "-20px" }}>
          <Slider {...settings}>
            {members.map((member, index) => (
              <div key={index}>
                <LyricistCard
                  image={`${baseUrl}${member.file_path}`}
                  name={member.name}
                  bio={member.bio}
                  additionalImage="assets/images/singnature-style.png"
                  videoUrl={member.youtube_url}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default LyricistSlider;