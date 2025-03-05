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
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });

  const baseUrl = "https://api.lyricistsassociationbd.com";
  const imageUrl = "https://adminapi.lyricistsassociationbd.com";
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
          ticketPrice: event.ticket_price || "BDT 500.00", // Default ticket price
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
    setFormData({ name: "", email: "", phone: "", address: "", paymentMethod: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement ticket booking logic
    console.log("Ticket booking data:", { event: selectedEvent, formData });
    // You would typically send this data to a backend API
    handleCloseModal();
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
                  
                  <div className="event-content text-start text-light">
                    <h2 className="event-title text-start">{event.title}</h2>
                    <div className="event-details">
                      <h5 className="event-date">Date: {event.date}</h5>
                      <h5 className="event-location">Location: {event.location}</h5>
                      <h6 className="event-artist">
                        By <span className="artist-name">{event.artist}</span>
                      </h6>
                      <h5 className="event-ticket-price">Ticket Price: {event.ticketPrice}</h5>
                    </div>
                  

                  </div>
                  <button 
                      className="ticket-button"
                      onClick={() => handleShowModal(event)}
                    >
                      GET YOUR TICKETS
                    </button>
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
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Book Tickets for {selectedEvent?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control
                      as="select"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Payment Method</option>
                      <option value="bkash">bKash</option>
                      <option value="nagad">Nagad</option>
                      <option value="rocket">Rocket</option>
                    </Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Book Tickets
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;