import React, { useState, useEffect } from "react";
import "./Eventcard.css";
import Footer from "../Footer/Footer";

const Eventcard = () => {
  const [closestEvent, setClosestEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://lyricistapi.wineds.com/api/v1/events/list-paginate");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();

        // Parse and sort events by date
        const today = new Date();
        const sortedEvents = data.data.data
          .filter((event) => new Date(event.date) >= today) // Filter future events
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by closest date

        if (sortedEvents.length > 0) {
          setClosestEvent(sortedEvents[0]); // Set the closest event
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ background: "#242424", marginTop: "-40px" }}
    >
      <div className="container">
        <div className="event-container">
          <h2 className="event-title text-start mt-5">Events</h2>
          {closestEvent ? (
            <div className="event-card">
              <div className="card-image w-50">
                <img
                  src={`https://lyricistadminapi.wineds.com${closestEvent.file_path}`}
                  alt={closestEvent.title}
                />
              </div>
              <div className="card-contents w-50 text-light">
                <h2 className="artist-name">
                  <span className="typograph-text">{closestEvent.artist}</span>{" "}
                  Rhythm Odyssey
                </h2>
                <p className="details">{closestEvent.description}</p>
                <div className="event-info">
                  <p>
                    <strong>Time:</strong> {closestEvent.date}
                  </p>
                  <p>
                    <strong>Location:</strong> {closestEvent.location}
                  </p>
                </div>
                <button className="ticket-button">Get your Tickets now</button>
              </div>
            </div>
          ) : (
            <p className="text-light">No upcoming events found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Eventcard;