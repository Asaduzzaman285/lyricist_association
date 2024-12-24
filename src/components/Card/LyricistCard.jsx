import React from 'react';
import { Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const getEmbedUrl = (url) => {
  const videoId = url.split('v=')[1]?.split('&')[0]; 
  return `https://www.youtube.com/embed/${videoId}`;
};

const LyricistCard = ({ image, name, bio, additionalImage, videoUrl }) => {
  return (
    <Container fluid style={{ background: '#242424', color: 'white' }}>
      <Card className="w-100 my-3" >
        <Card.Img
          variant="top"
          src={image}
          alt="Lyricist Image"
          style={{ objectFit: 'cover', height: '300px' }} 
        />
        <Card.Body style={{ background: '#D9D9D9', textAlign: 'center' }}>
          <Card.Title style={{textAlign: 'start' }}>{name}</Card.Title>
          <Card.Text style={{textAlign: 'start' }}>{bio}</Card.Text>
          {/* Additional Image Container */}
          <div >
            <Card.Img
              src={additionalImage}
              alt="Additional Image"
              style={{ objectFit: 'cover', width: '189px', height: '47px' }} 
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
