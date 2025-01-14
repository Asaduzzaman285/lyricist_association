import React from "react";
import Slider from "react-slick";
import LyricistCard from "./Card/LyricistCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LyricistSlider = () => {
  const lyricists = [
    {
      image: "assets/images/image.png",
      name: "Alauddin Ali",
      bio: "A legendary composer and lyricist.",
      additionalImage: "assets/images/singnature-style.png",
      videoUrl: "https://www.youtube.com/watch?v=_4GCyU-tBvk",
    },
    {
      image: "assets/images/image-1.png",
      name: "Anusheh Anadil",
      bio: "A renowned singer and lyricist.",
      additionalImage: "assets/images/singnature-style.png",
      videoUrl: "https://www.youtube.com/watch?v=rD2s1o0H3Bc&list=RDReYvobnsHPE&index=17",
    },
    {
      image: "assets/images/image-2.png",
      name: "Baul Shah Abdul Karim",
      bio: "A revered Baul saint and lyricist.",
      additionalImage: "assets/images/singnature-style.png",
      videoUrl: "https://www.youtube.com/watch?v=4_lGdLdmRAc",
    },
    {
      image: "assets/images/image.png",
      name: "Duplicate Alauddin Ali",
      bio: "Duplicate entry for slider demo.",
      additionalImage: "assets/images/singnature-style.png",
      videoUrl: "https://www.youtube.com/watch?v=_4GCyU-tBvk",
    },
    {
      image: "assets/images/image-1.png",
      name: "Duplicate Anusheh Anadil",
      bio: "Duplicate entry for slider demo.",
      additionalImage: "assets/images/singnature-style.png",
      videoUrl: "https://www.youtube.com/watch?v=rD2s1o0H3Bc&list=RDReYvobnsHPE&index=17",
    },
  ];

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
      style={{ background: "#242424", color: "white", paddingBottom: "45px",marginTop: "-24px" }}
    >
      <h2 className="text-light fs-3 text-start my-4 p-5">Lyricists of Bangladesh</h2>
      <div className="container " style={{ marginTop: "-20px" }}>
        <Slider {...settings}>
          {lyricists.map((lyricist, index) => (
            <div key={index} >
              <LyricistCard
                image={lyricist.image}
                name={lyricist.name}
                bio={lyricist.bio}
                additionalImage={lyricist.additionalImage}
                videoUrl={lyricist.videoUrl}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LyricistSlider;
