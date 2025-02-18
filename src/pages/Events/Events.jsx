import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import "./Events.css";
const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    payment: "",
  });

  const baseUrl = "https://lyricistapi.wineds.com";
  const imageUrl = "https://lyricistadminapi.wineds.com";
  const apiUrl = `${baseUrl}/api/v1/events/list-paginate`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}?page=${currentPage}`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        const { paginator, data: eventsData } = data.data;
        
        setEvents(eventsData.map((event) => ({
          id: event.id,
          image: `${imageUrl}${event.file_path}`,
          title: event.title,
          artist: event.artist,
          description: event.description,
          date: event.date,
          location: event.location,
        })));
        setTotalPages(paginator.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const handleShowModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setFormData({ name: "", phone: "", email: "", payment: "" });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark" style={{minHeight:"100vh"}}>
      <div className="container events-container">
        <div className="events-content">
          <h1 className="events-title">
            <span className="typograph-text text-light">Upcoming Events</span>
          </h1>
          
          <div className="events-list">
            {events.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-image-container">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                  />
                </div>
                
                <div className="event-content text-start text-light ">
                  <h2 className="event-title text-start ">{event.title}</h2>
                  <div className="event-details">
                    <h5 className="event-date">Date: {event.date}</h5>
                    <h5 className="event-location">Location: {event.location}</h5>
                    <h6 className="event-artist">
                      By <span className="artist-name">{event.artist}</span>
                    </h6>
                  </div>
                  <p className="event-description">{event.description}</p>
                  {/* <button 
                    className="ticket-button"
                    onClick={() => handleShowModal(event)}
                  >
                    Get Tickets
                  </button> */}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="pagination-container">
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <Modal 
            show={showModal} 
            onHide={handleCloseModal} 
            dialogClassName="custom-modal-width"
          >
            {/* Modal content remains the same */}
          </Modal>
        </div>
      </div>
      </div>
     
    </>
  );
};

export default Events;