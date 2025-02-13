import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Navbar from "./components/Navbar/Navbar";
import Slider from "./components/Slider/Slider";
import OverlayCard from "./components/Overlay_Card/OverlayCard";
import Eventcard from "./components/Eventcard/Eventcard";
import LyricistSlider from "./components/LyricistSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Spinner = () => (
  <div className="spinner-container d-flex justify-content-center align-items-center bg-dark" style={{ height: '100vh', width: '100vw' }}>
    <i className="fa-solid fa-spinner fa-spin fa-4x text-primary"></i>
  </div>
);

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('order') === 'success') {
      Swal.fire({
        title: 'Order placed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        queryParams.delete('order');
        navigate({
          pathname: location.pathname,
          search: queryParams.toString()
        });
      });
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <Slider />
      <LyricistSlider />
      <OverlayCard />
      <Eventcard />
    </>
  );
};

const MembersPage = React.lazy(() => import("./pages/Members/MembersPage"));
const SuccessStoriesPage = React.lazy(() => import("./pages/SuccessStories/SuccessStories"));
const EventsPage = React.lazy(() => import("./pages/Events/Events"));
const MerchandisePage = React.lazy(() => import("./pages/Merchandise/Merchandise"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const Tracker = React.lazy(() => import("./pages/Tracker/Tracker"));
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
    }, 1000); // Simulates a 1-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Router>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/merchandise" element={<MerchandisePage />} />
              <Route path="/podcast" element={<PodcastPage />} />
              <Route path="/ec-committee" element={<ECCommitteePage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/tracker" element={<Tracker />} />

            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  );
};

export default App;