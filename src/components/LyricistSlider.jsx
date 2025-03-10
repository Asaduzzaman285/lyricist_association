import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import LyricistCard from "./Card/LyricistCard";
import AdSpace from "./AdSpace/AdSpace";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LyricistSlider.css";

const LyricistSlider = () => {
  const [ads, setAds] = useState([]);
  const [members, setMembers] = useState([]);
  const baseUrl = "https://adminapi.lyricistsassociationbd.com";

  useEffect(() => {
    fetch("https://api.lyricistsassociationbd.com/api/v1/home/data")
      .then((response) => response.json())
      .then((data) => {
        setAds(data.data.home_ads);
        setMembers(data.data.members);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Limit to 6-7 members manually
  const limitedMembers = members.slice(0, 7);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: "#242424",
        color: "white",
        paddingBottom: "45px",
        marginTop: "-24px",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 mt-3 ">
            {ads.length > 0 && <AdSpace imageUrl={`${baseUrl}/${ads[0].file_path}`} />}
          </div>
          <div className="col-12 col-md-12 col-sm-12">
            <h2
              className="text-light fs-3 text-start my-4 p-2"
              style={{ fontFamily: "Exo, sans-serif" }}
            >
              <span className="typograph-text-responsive d-block d-md-inline">
                Featured Lyricists
              </span>
            </h2>
          </div>
        </div>
        <div className="container" style={{ marginTop: "-20px" }}>
          <Slider {...settings}>
            {limitedMembers.map((member, index) => (
              <div key={index}>
                <LyricistCard
                  image={`${baseUrl}${member.file_path}`}
                  name={member.name}
                  bio={member.bio}
                  position={member.position}
                  status={member.status}
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