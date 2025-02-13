import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Card.css";

const API_BASE_URL = "https://lyricistapi.wineds.com";
const FILE_UPLOAD_URL = "https://lyricistadminapi.wineds.com/api/v1/file/file-upload";

const OverlayCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    videoUrl: "",
    image: null,
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const fileName = file.name.split('.')[0];
    const filePath = `uploads/modules/members/`;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        FILE_UPLOAD_URL,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          params: {
            file_name: fileName,
            file_path: filePath,
          },
        }
      );

      const result = response.data;
      if (result.status === "success") {
        const correctedFilePath = `${filePath}${result.data.file_path.split('/').pop()}`;
        setFormData({ ...formData, image: correctedFilePath });
      }
       else {
        console.error("File upload failed:", result.message);
      }
    } 
    catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to apply for membership.");
      return;
    }

    const correctedFilePath = formData.image ? `/${formData.image.replace(/\\/g, '')}` : null;

    const memberData = {
      name: formData.name,
      bio: formData.bio,
      youtube_url: formData.videoUrl,
      file_path: correctedFilePath,
      member_status_id: "1", 
      position: "Member",
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/members/create`, memberData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "success") {
        alert("Membership request submitted successfully!");
        setShowModal(false);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="container" style={{ background: "#242424", marginTop: "-23.8px", marginBottom: "40px" }}>
        <div className="custom-card">
          <img src="assets/images/sidecard.png" alt="Background" className="card-background" />
          <div className="card-content">
            <p className="card-text">Have a Lyricist Soul inside of you?</p>
            <button className="card-button mt-md-3 mt-sm-2 fs-sm-4" onClick={() => setShowModal(true)}>
              Become a Member
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Membership Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Become a Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} name="bio" value={formData.bio} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video URL</Form.Label>
              <Form.Control type="text" name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button type="submit" variant="primary" className="ms-2">
                Submit Membership Request
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OverlayCard;