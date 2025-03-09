import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Select from "react-select";
import { Pagination } from "react-bootstrap";
import "./Members.css";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeMemberId, setActiveMemberId] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [activeLetter, setActiveLetter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Initialize to 0
  const [totalItems, setTotalItems] = useState(0);

  const API_BASE_URL = "https://api.lyricistsassociationbd.com";
  const IMAGE_BASE_URL = "https://adminapi.lyricistsassociationbd.com";
  const DEFAULT_IMAGE = "assets/images/default-image.png";

  // Fetch name list options for the dropdown on component mount
  useEffect(() => {
    fetchNameOptions();
  }, []);

  // Fetch members data when page, active filters change
  useEffect(() => {
    fetchMembers();
  }, [currentPage, activeMemberId, activeLetter]);

  // Fetch the name options for the dropdown
  const fetchNameOptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/members/filter-data`);
      const result = response.data;

      if (result.status === "success" && Array.isArray(result.data.name_list)) {
        setNameOptions(result.data.name_list);
      } else {
        console.error("Invalid data format for name options:", result);
        setNameOptions([]);
      }
    } catch (error) {
      console.error("Error fetching name options:", error);
      setNameOptions([]);
    }
  };

  // Fetch members with pagination and filters
  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      let url = `${API_BASE_URL}/api/v1/members/list-paginate?page=${currentPage}`;
      // Add member_id filter if a member is active
      if (activeMemberId) {
        url += `&member_id=${activeMemberId}`;
      }

      // Add letter filter if a letter is active
      if (activeLetter) {
        url += `&search_first_letter=${activeLetter.toLowerCase()}`;
      }

      const response = await axios.get(url);
      const result = response.data;

      if (result.status === "success") {
        setMembers(result.data.data);
        setTotalPages(result.data.paginator.pagination_last_page); // Use pagination_last_page
        setTotalItems(result.data.paginator.total_count); // Use total_count
      } else {
        console.error("Invalid data format:", result);
        setMembers([]);
        setTotalPages(0);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
      setTotalPages(0);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle member selection from dropdown (just stores the selection)
  const handleMemberChange = (selected) => {
    setSelectedMember(selected);
  };

  // Apply the member filter when filter button is clicked
  const handleFilterByName = () => {
    if (selectedMember) {
      setActiveMemberId(selectedMember.value);
    } else {
      setActiveMemberId(null);
    }
    setCurrentPage(1); // Reset to first page when applying filter
  };

  // Handle filtering by first letter
  const handleFilterByLetter = (letter) => {
    if (selectedLetter === letter) {
      // Deselect the letter if it's already selected
      setSelectedLetter(null);
      setActiveLetter(null);
    } else {
      setSelectedLetter(letter);
      setActiveLetter(letter);
    }
    setCurrentPage(1); // Reset to first page when changing letter filter
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedMember(null);
    setActiveMemberId(null);
    setSelectedLetter(null);
    setActiveLetter(null);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Create pagination items
  const renderPaginationItems = () => {
    const items = [];

    // Create pagination array
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      // Always show first page
      items.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );

      // Calculate start and end of shown pages
      let startPage, endPage;
      if (currentPage <= 4) {
        startPage = 2;
        endPage = 5;
        items.push(
          ...Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNumber = startPage + i;
            return (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })
        );
        items.push(<Pagination.Ellipsis key="ellipsis-1" />);
      } else if (currentPage >= totalPages - 3) {
        items.push(<Pagination.Ellipsis key="ellipsis-1" />);
        startPage = totalPages - 4;
        endPage = totalPages - 1;
        items.push(
          ...Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNumber = startPage + i;
            return (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })
        );
      } else {
        items.push(<Pagination.Ellipsis key="ellipsis-1" />);
        startPage = currentPage - 1;
        endPage = currentPage + 1;
        items.push(
          ...Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNumber = startPage + i;
            return (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })
        );
        items.push(<Pagination.Ellipsis key="ellipsis-2" />);
      }

      // Always show last page
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-dark" style={{ marginTop: "-27px", minHeight: "100vh" }}>
        <div className="container">
          <div className="container mt-4">
            <h1 className="text-light fs-4">
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
                  options={nameOptions}
                  isClearable
                  placeholder="Search Lyricist..."
                  onChange={handleMemberChange}
                  value={selectedMember}
                />
              </div>
              <button className="btn btn-warning ms-2" onClick={handleFilterByName}>
                Filter
              </button>
              <button className="btn btn-secondary ms-2" onClick={handleClearFilters}>
                Clear
              </button>
            </div>

            {/* Display Members */}
            {isLoading ? (
              <p className="text-light">Loading members...</p>
            ) : members.length > 0 ? (
              <div className="row g-4 mt-2">
                {members.map((member) => (
                  <div className="col-12" key={member.id}>
                    <div className="event-card">
                      <div className="event-image-wrapper">
                        <img
                          src={member.file_path ? `${IMAGE_BASE_URL}${member.file_path}` : DEFAULT_IMAGE}
                          alt={member.name}
                          className="event-image"
                          onError={(e) => {
                            e.target.src = DEFAULT_IMAGE;
                          }}
                        />
                      </div>
                      <div className="card-body text-start text-light mt-sm-3">
                        <h2 className="card-title">{member.name}</h2>
                        <h5 className="card-subtitle" style={{ color: "rgba(255, 149, 0, 1)" }}>
                          Position: {member.position}
                        </h5>
                        <p className="card-texts">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-light">No members found.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center my-4">
                <Pagination>
                  <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                  <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                  {renderPaginationItems()}

                  <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                  <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
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