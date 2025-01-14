import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import "./Events.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    payment: ""
  });

  const eventsPerPage = 4;

  // Fetch data from the API
  useEffect(() => {
    const fetchEvents = () => {
      fetch("http://127.0.0.1:8000/api/events")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEvents(
            data.map((event) => ({
              id: event.id,
              image: event.image,
              title: event.eventName,
              artist: event.artistName,
              description: event.description,
              date: event.eventDate,
              location: event.location,
            }))
          );
        })
        .catch((error) => console.error("Error fetching data:", error));
    };
  
    fetchEvents(); // Initial fetch
    const interval = setInterval(fetchEvents, 5000); // Fetch every 5 seconds
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Modal
  const handleShowModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setFormData({ name: "", phone: "", email: "", payment: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    handleCloseModal();
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark" style={{ marginTop: "-24px" }}>
        <div className="container mt-4">
          <h1 className="text-light">Upcoming Events</h1>
          <div className="row">
            {currentEvents.map((event) => (
              <div className="col-md-6 mb-4" key={event.id}>
                <div className="card">
                  <div className="card-body">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="card-img-top"
                    />
                    <h5 className="card-title">{event.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      By {event.artist}
                    </h6>
                    <p className="card-text text-start">{event.description}</p>
                    <p className="card-text text-start text-muted">
                      Date: {event.date} | Location: {event.location}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShowModal(event)}
                    >
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Get Tickets for {selectedEvent?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPayment">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter payment method"
                    name="payment"
                    value={formData.payment}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
