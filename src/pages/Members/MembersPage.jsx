import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import './Members.css'; // Import custom CSS for styling

const MembersPage = () => {
  const [lyricists, setLyricists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginator, setPaginator] = useState({});
  const API_BASE_URL = "https://lyricistapi.wineds.com";
  const IMAGE_BASE_URL = "https://lyricistadminapi.wineds.com";
  const DEFAULT_IMAGE = "assets/images/default-image.png";

  useEffect(() => {
    fetchLyricists(currentPage);
  }, [currentPage]);

  const fetchLyricists = async (page) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/members/list-paginate?page=${page}`);
      const result = response.data;
      if (result.status === "success") {
        setLyricists(result.data.data);
        setPaginator(result.data.paginator);
      } else {
        console.error("Failed to fetch lyricists:", result.message);
      }
    } catch (error) {
      console.error("Error fetching lyricists:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid" style={{ marginTop: "-24px", minHeight: "100vh" }}>
        <div className="container">
          <div className="container-fluid">
            <div className="container my-4">
              <h1 className="text-light fs-3"><span className="typograph-text">Lyricists of Bangladesh</span></h1>
              <div className="row g-4 mt-2">
                {lyricists.map((lyricist) => (
                  <div className="col-12 mb-4" key={lyricist.id}>
                    <div className="cards lyricist-card d-flex flex-row p-3">
                      <div className="col-md-4 d-flex align-items-center">
                        <img
                          src={lyricist.file_path ? `${IMAGE_BASE_URL}${lyricist.file_path}` : DEFAULT_IMAGE}
                          alt={lyricist.name}
                          className="img-fluid lyricist-image"
                        />
                      </div>
                      <div className="col-md-8 card-body text-start text-light">
                        <h2 className="card-title">{lyricist.name}</h2>
                        <h5 className="card-subtitle" style={{ color: "rgba(255, 149, 0, 1)" }}>Position: {lyricist.position}</h5>
                        <h2 className="card-text text-start fw-bold">{lyricist.bio}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {paginator.total_pages > 1 && (
                <div className="text-center my-4">
                  <Pagination>
                    {[...Array(paginator.total_pages).keys()].map(number => (
                      <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersPage;