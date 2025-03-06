import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Select from "react-select";
import { Pagination } from "react-bootstrap";
import "./Members.css";

const MembersPage = () => {
  const [lyricists, setLyricists] = useState([]);
  const [filteredLyricists, setFilteredLyricists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginator, setPaginator] = useState({});
  const [searchMember, setSearchMember] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const API_BASE_URL = "https://api.lyricistsassociationbd.com";
  const IMAGE_BASE_URL = "https://adminapi.lyricistsassociationbd.com";
  const DEFAULT_IMAGE = "assets/images/default-image.png";

  useEffect(() => {
    fetchLyricists(currentPage);
  }, [currentPage]);

  const fetchLyricists = async (page) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/members/list-paginate?page=${page}`
      );
      const result = response.data;
      if (result.status === "success") {
        setLyricists(result.data.data);
        setFilteredLyricists(result.data.data);
        setPaginator(result.data.paginator);
      } else {
        console.error("Failed to fetch lyricists:", result.message);
      }
    } catch (error) {
      console.error("Error fetching lyricists:", error);
    }
  };

  // Filter members by selected name
  const handleFilterByName = () => {
    if (searchMember) {
      const filtered = lyricists.filter((lyricist) => lyricist.id === searchMember.value);
      setFilteredLyricists(filtered);
    } else {
      setFilteredLyricists(lyricists);
    }
  };

  // Filter members by first letter
  const handleFilterByLetter = (letter) => {
    setSelectedLetter(letter);
    const filtered = lyricists.filter((lyricist) => lyricist.name.startsWith(letter));
    setFilteredLyricists(filtered);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchMember(null);
    setSelectedLetter(null);
    setFilteredLyricists(lyricists);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark" style={{ marginTop: "-27px", minHeight: "100vh" }}>
        <div className="container">
          <div className="container mt-4">
            <h1 className="text-light fs-3">
              <span className="typograph-text">Lyricists of Bangladesh</span>
            </h1>
            
            {/* Alphabet Filter */}
            <div className="alphabet-filter mb-3">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                <button
                  key={letter}
                  className={`btn btn-sm ${selectedLetter === letter ? "btn-primary" : "btn-outline-light"}`}
                  onClick={() => handleFilterByLetter(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Filter Options */}
            <div className="filter-options d-flex justify-content-start align-items-center mb-3">
              <div style={{ width: "300px" }}>
                <Select
                  options={lyricists.map((lyricist) => ({
                    value: lyricist.id,
                    label: lyricist.name,
                  }))}
                  isClearable
                  placeholder="Search Lyricist..."
                  onChange={setSearchMember}
                  value={searchMember}
                />
              </div>
              <button className="btn btn-warning ms-2" onClick={handleFilterByName}>
                Filter
              </button>
              <button className="btn btn-secondary ms-2" onClick={handleClearFilters}>
                Clear
              </button>
            </div>

            <div className="row g-4 mt-2">
              {filteredLyricists.map((lyricist) => (
                <div className="col-12 " key={lyricist.id}>
                  <div className="event-card">
                    <div className="event-image-wrapper">
                      <img
                        src={lyricist.file_path ? `${IMAGE_BASE_URL}${lyricist.file_path}` : DEFAULT_IMAGE}
                        alt={lyricist.name}
                        className="event-image"
                      />
                    </div>
                    <div className="card-body text-start text-light mt-sm-3">
                      <h2 className="card-title">{lyricist.name}</h2>
                      <h5 className="card-subtitle" style={{ color: "rgba(255, 149, 0, 1)" }}>
                        Position: {lyricist.position}
                      </h5>
                      <p className="card-texts">{lyricist.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {paginator.total_pages > 1 && (
              <div className="text-center my-4">
                <Pagination>
                  {[...Array(paginator.total_pages).keys()].map((number) => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => setCurrentPage(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersPage;