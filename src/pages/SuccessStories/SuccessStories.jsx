import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Pagination, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import "./SuccessStories.css";

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginator, setPaginator] = useState({});
  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const storiesPerPage = 4;
  const API_BASE_URL = "https://api.lyricistsassociationbd.com";
  const IMAGE_BASE_URL = "https://adminapi.lyricistsassociationbd.com";

  useEffect(() => {
    fetchStories(currentPage);
  }, [currentPage]);

  const fetchStories = async (page) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/success-stories/list-paginate?page=${page}`);
      const result = response.data;
      if (result.status === "success") {
        const storiesWithMembers = await Promise.all(result.data.data.map(async (story) => {
          const memberResponse = await axios.get(`${API_BASE_URL}/api/v1/members/single-data/${story.member_id}`);
          const member = memberResponse.data.data;
          return { ...story, member_name: member.name };
        }));
        setStories(storiesWithMembers);
        setPaginator(result.data.paginator);
      } else {
        console.error("Failed to fetch stories:", result.message);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark" style={{ minHeight: "100vh" }}>
        <div className="container" style={{ padding: '20px', borderRadius: '8px' }}>
          <h1 className="text-start text-light mb-4"><span className="typograph-text">Success Stories </span></h1>
          <div className="row">
            {stories.map((story) => (
              <div className="col-12 mb-4" key={story.id}>
                <div className="cards story-card d-flex flex-lg-row flex-column p-3" style={{backgroundColor: "rgba(165, 239, 255, 0.2)"}}>
                  {story.file_path && (
                    <img
                      src={`${IMAGE_BASE_URL}${story.file_path}`}
                      alt={story.headline}
                      className="img-fluid story-image col-lg-4 col-12"
                    />
                  )}
                  <div className="card-body col-lg-8 col-12 text-start text-light">
                    <h2 className="card-title">{story.headline}</h2>
                    <h5> Posted on: {story.posting_time}</h5>
                    <h6 className="card-subtitle mb-2 text-highlight" >
                      By  <span style={{ color: "rgba(255, 149, 0, 1)" }}>{story.member_name}</span> 
                    </h6>
                    <p className="card-text text-start h-auto fw-normal">{story.details}</p>
                    <button 
                      type="button"
                      className="btn text-white"
                      onClick={() => handleShowModal(story)}
                      style={{
                        width: "176px",
                        height: "35px",
                        padding: "10px",
                        backgroundColor: "#c30505",
                        border: "none",
                        fontSize: "18px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 0.3s ease"
                      }}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {paginator.total_pages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                {[...Array(paginator.total_pages).keys()].map(number => (
                  <li
                    key={number + 1}
                    className={`page-item ${currentPage === number + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => handlePageChange(number + 1)}>
                      {number + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedStory && (
       <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="custom-modal-width">
       <Modal.Header closeButton>
         <Modal.Title>{selectedStory.headline}</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         {selectedStory.file_path && (
           <img
             src={`${IMAGE_BASE_URL}${selectedStory.file_path}`}
             alt={selectedStory.headline}
             className="img-fluid"
             style={{ width: '100%', borderRadius: '8px' }}
           />
         )}
         <h5 className="mt-3">{selectedStory.subheading}</h5>
         <h6 className="text-muted">By {selectedStory.member_name} | Posted on: {selectedStory.posting_time}</h6>
         <p className="mt-3">{selectedStory.details}</p>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleCloseModal}>
           Close
         </Button>
       </Modal.Footer>
     </Modal>
      )}
    </>
  );
};

export default SuccessStoriesPage;