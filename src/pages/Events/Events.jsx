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
  const imageUrl=  "https://lyricistadminapi.wineds.com";
  const apiUrl = `${baseUrl}/api/v1/events/list-paginate`;

  // Fetch data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}?page=${currentPage}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const { paginator, data: eventsData } = data.data;
        setEvents(
          eventsData.map((event) => ({
            id: event.id,
            image: `${imageUrl}${event.file_path}`,
            title: event.title,
            artist: event.artist,
            description: event.description,
            date: event.date,
            location: event.location,
          }))
        );
        setTotalPages(paginator.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvents();
  }, [currentPage]);

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
      <div className="container-fluid bg-dark" style={{ marginTop: "-24px", minHeight: "100vh" }}>
        <div className="container mt-4">
          <h1 className="text-light"><span className="typograph-text">Upcoming Events</span></h1>
          <div className="row mt-5 mt-sm-1">
            {events.map((event) => (
              <div className="col-12 mb-4" key={event.id}>
                <div className="cards event-card d-flex flex-lg-row flex-column p-3" style={{backgroundColor: "rgba(165, 239, 255, 0.2)"}}>
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="img-fluid event-image col-lg-4 col-12"
                    />
                  )}
                  <div className="card-body col-lg-8 col-12 text-start text-light">
                    <h2 className="card-title">{event.title}</h2>
                    <h5> Date: {event.date} </h5>
                    <h5> Location: {event.location}</h5>
                    <h6 className="card-subtitle mb-2 text-highlight">
                      By <span style={{ color: "rgba(255, 149, 0, 1)" }}>{event.artist}</span>
                    </h6>
                    <p className="card-text text-start fw-normal">{event.description}</p>
                    {/* <button  
                     type="button" 
                      className="btn d-flex align-items-center justify-content-center ticket-button text-light text-start w-25"
                       onClick={() => handleShowModal(event)
                        
                       }>Get Tickets</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Modal */}
          <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal-width">
            <Modal.Header closeButton>
              <Modal.Title>
                Get Tickets for {selectedEvent?.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedEvent?.image && (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="img-fluid"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              )}
              <h5 className="mt-3">{selectedEvent?.artist}</h5>
              <h6 className="text-muted">Date: {selectedEvent?.date} | Location: {selectedEvent?.location}</h6>
              <p className="mt-3">{selectedEvent?.description}</p>
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

export default Events;