import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Slider from "./components/Slider/Slider";
import LyricistCard from "./components/Card/LyricistCard";
import OverlayCard from "./components/Overlay_Card/OverlayCard";
import Eventcard from "./components/Eventcard/Eventcard";
import LyricistSlider from "./components/LyricistSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Spinner = () => (
  <div className="spinner-container d-flex justify-content-center align-items-center bg-dark" style={{ height: '100vh', width: '100vw' }}>
    <i className="fa-solid fa-spinner fa-spin fa-4x text-primary"></i>
  </div>
);

const HomePage = () => (
  <>
    <Navbar />
    <Slider />
    <LyricistSlider />
    <OverlayCard />
    <Eventcard />
  </>
);

const MembersPage = () => {
  const [lyricists, setLyricists] = useState([
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
  ]);
  const [showViewMore, setShowViewMore] = useState(true);

  const handleViewMore = async () => {
    const response = await fetch("/lyricist.json"); // Ensure the file is in the public directory
    const newLyricists = await response.json();
    setLyricists((prevLyricists) => [...prevLyricists, ...newLyricists]);
    setShowViewMore(false); // Hide "View More" button after loading
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark" style={{ marginTop: "-24px" }}>
        <div className="container">
          <h1 className="text-light text-center my-4">Members Page</h1>
          <div className="container-fluid" style={{ background: "#242424" }}>
            <div className="container my-4">
              <h1 className="text-light fs-3">Lyricists of Bangladesh</h1>
              <div className="row g-4">
                {lyricists.map((lyricist, index) => (
                  <div className="col-md-4" key={index}>
                    <LyricistCard
                      image={lyricist.image}
                      name={lyricist.name}
                      bio={lyricist.bio}
                      additionalImage={lyricist.additionalImage}
                      videoUrl={lyricist.videoUrl}
                    />
                  </div>
                ))}
              </div>
              {showViewMore && (
                <div className="text-center my-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleViewMore}
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SuccessStoriesPage = React.lazy(() =>
  import("./pages/SuccessStories/SuccessStories")
);

const EventsPage = React.lazy(() =>
  import("./pages/Events/Events")
);

const MerchandisePage = () => (
  <>
    <Navbar />
    <div className="container">
      <h1>Merchandise Page</h1>
    </div>
  </>
);

const PodcastPage = () => (
  <>
    <Navbar />
    <div className="container">
      <h1>Podcast Page</h1>
    </div>
  </>
);

const ECCommitteePage = () => (
  <>
    <Navbar />
    <div className="container">
      <h1>EC Committee Page</h1>
    </div>
  </>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulates a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route
              path="/success-stories"
              element={
                <Suspense fallback={<Spinner />}>
                  <SuccessStoriesPage />
                </Suspense>
              }
            />
            <Route
              path="/events"
              element={
                <Suspense fallback={<Spinner />}>
                  <EventsPage />
                </Suspense>
              }
            />
            <Route path="/merchandise" element={<MerchandisePage />} />
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="/ec-committee" element={<ECCommitteePage />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
