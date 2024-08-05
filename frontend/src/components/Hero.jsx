// import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <Container fluid className="bg-light py-5">
      <Container style={{fontSize:"1.11rem"}}>
        <Row className="align-items-center py-5">
          <Col md={6} className="text-center my-2">
            <h1 className="mb-4">Bienvenue sur OPFFT Connect</h1>
            <p>
              Votre plateforme sociale exclusive où les étudiants de l&apos;OPFFT se
              connectent, discutent et collaborent. Partagez vos expériences,
              demandez de l&apos;aide et engagez-vous avec vos camarades dans une
              communauté en ligne dynamique.
            </p>
            <p className="mb-4">
              Rejoignez-nous pour une expérience collaborative unique qui vous
              permettra de vous épanouir académiquement et socialement.
            </p>
            <Button as={Link} to="/login" variant="primary" className="mx-4 px-4">
              Connexion
            </Button>
            <Button href="#features" variant="secondary">En savoir plus</Button>
          </Col>
          <Col md={6} className="text-center">
          <img src="./ofppt.jpg" alt="OPFFT Connect" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
