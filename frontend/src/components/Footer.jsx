import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 OPFFT Connect. Tous droits réservés.</p>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              <li className="mx-2"><a href="#contact" className="text-white">Nous Contacter</a></li>
              <li className="mx-2"><a href="#privacy" className="text-white">Politique de Confidentialité</a></li>
              <li className="mx-2"><a href="#terms" className="text-white">Conditions d'Utilisation</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
