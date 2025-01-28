import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ReactPlayer from 'react-player';
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
      <div className="container-fluid bg-dark" style={{ marginTop: "-24px" }}>
        <div className="container">
          <h1 className="text-light text-center my-4">Members Page</h1>
          <div className="container-fluid" style={{ background: "#242424" }}>
            <div className="container my-4">
              <h1 className="text-light fs-3">Lyricists of Bangladesh</h1>
              <div className="row g-4">
                {lyricists.map((lyricist) => (
                  <div className="col-md-4" key={lyricist.id} >
                    <div className="card text-start lyricist-card" style={{backgroundColor: "rgba(165, 239, 255, 0.2)"}}>
                      <img
                        src={lyricist.file_path ? `${IMAGE_BASE_URL}${lyricist.file_path}` : DEFAULT_IMAGE}
                        alt={lyricist.name}
                        className="card-img-top"
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                      <div className="card-body text-start">
                        <h5 className="card-title" style={{ fontSize: '1.25rem' }}>{lyricist.name}</h5>
                        <p className="card-text" style={{ fontSize: '0.875rem' }}>{lyricist.bio}</p>
                        {lyricist.youtube_url && (
                          <ReactPlayer
                            url={lyricist.youtube_url}
                            width="100%"
                            height="150px"
                            controls
                          />
                        )}
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