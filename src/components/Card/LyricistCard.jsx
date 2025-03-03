import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css';

const getEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/(?:.*[?&]v=|embed\/)|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  const truncated = text.substr(0, text.lastIndexOf(' ', length));
  return `${truncated}...`;
};

const LyricistCard = ({ image, name, bio, additionalImage, videoUrl, position, status }) => {
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [videoUrl]);

  const shortBio = truncateText(bio, 50);
  const showEllipsis = bio.length > 50;

  return (
    <Container fluid style={{ background: '#242424', color: 'white', marginBottom: '45px' }}>
      <Card className="w-100 my-3 card">
        <Card.Img variant="top" src={image} alt="Lyricist Image" loading="lazy" />
        <Card.Body style={{ background: '#D9D9D9', textAlign: 'center', width: '100%' }}>
          <Card.Title style={{ textAlign: 'start' }}>{name}</Card.Title>
          <Card.Text
            className='text-dark'
            style={{
              textAlign: 'start',
              maxWidth: '100%',
              fontSize: 'small',
              display: 'inline-block'
            }}
          >
            {shortBio}
            {showEllipsis && (
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-link p-0 text-danger fw-bold"
                style={{ fontSize: 'small' }}
              >
                See More
              </button>
            )}
          </Card.Text>

          <div>
            <Card.Img
              src={additionalImage}
              alt="Additional Image"
              loading="lazy"
              style={{ objectFit: 'cover', width: '189px', height: '47px', margin: 'auto' }}
            />
          </div>
          <div className="ratio ratio-16x9 mt-2">
            <iframe
              key={key}
              src={getEmbedUrl(videoUrl)}
              allowFullScreen
              title={name}
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <img src={image} alt="Lyricist" style={{ width: '100%', borderRadius: '5px' }} />
          <p><strong>Position:</strong> {position}</p>
          <p><strong>Status:</strong> {status}</p>
          <p>{bio}</p>
          <div className="ratio ratio-16x9 mt-2">
            <iframe
              key={key}
              src={getEmbedUrl(videoUrl)}
              allowFullScreen
              title={name}
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LyricistCard;