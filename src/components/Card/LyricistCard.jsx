import React from 'react';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'; // Import the CSS file

const getEmbedUrl = (url) => {
  const videoId = url.split('v=')[1]?.split('&')[0]; 
  return `https://www.youtube.com/embed/${videoId}`;
};

const LyricistCard = ({ image, name, bio, additionalImage, videoUrl }) => {
  return (
    <Container fluid style={{ background: '#242424', color: 'white', marginBottom: '45px' }}> 
      <Card className="w-100 my-3 card">
        <Card.Img
          variant="top"
          src={image}
          alt="Lyricist Image"
        />
        <Card.Body style={{ background: '#D9D9D9', textAlign: 'center' }}>
          <Card.Title style={{ textAlign: 'start' }}>{name}</Card.Title>
          <Card.Text className='text-dark' style={{ textAlign: 'start', maxWidth: '100%', fontSize: 'small' }}>{bio}</Card.Text>
          {/* Additional Image Container */}
          <div>
            <Card.Img
              src={additionalImage}
              alt="Additional Image"
              style={{ objectFit: 'cover', width: '189px', height: '47px', margin: 'auto' }} 
            />
          </div>
          <div className="ratio ratio-16x9 mt-2">
            <iframe
              src={getEmbedUrl(videoUrl)} 
              allowFullScreen
              title={name}
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LyricistCard;