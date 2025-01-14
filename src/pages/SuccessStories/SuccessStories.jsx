import React, { useState, useEffect } from "react";

import "./SuccessStories.css";
import Navbar from "../../components/Navbar/Navbar";

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 2;

  // Fetch data from the JSON file
  useEffect(() => {
    fetch("/successStories.json")
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Calculate pagination
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
     <Navbar/>
      <div className="container mt-4">
        <h1>Success Stories</h1>
        <div className="row">
  {currentStories.map((story) => (
    <div className="col-md-6 mb-4" key={story.id}>
      <div className="card text-start story-card">
        <div className="card-body text-start">
          <h5 className="card-title">{story.title}</h5>
          <h6 className="card-subtitle mb-2 text-highlight">
            By {story.writerName} | Status: {story.membershipStatus}
          </h6>
          <p className="card-text text-start">{story.blogBody}</p>
          <p className="card-event">Event: {story.event}</p>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(stories.length / storiesPerPage) }, (_, i) => (
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
      </div>
    </>
  );
};

export default SuccessStoriesPage;
