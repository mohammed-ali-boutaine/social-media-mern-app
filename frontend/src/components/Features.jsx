import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


const Features = () => {
    return (
      <Container id="features" className="py-5">
        <h2 className="text-center mb-4">Fonctionnalités de la Plateforme</h2>
        <Row>
          <Col md={4} className="mb-4 text-center">
            <FontAwesomeIcon icon={faComments} size="3x" className="mb-3" />
            <h3>Chat</h3>
            <p>
              Connectez-vous instantanément avec vos camarades. Notre fonction de
              chat en temps réel vous permet de toujours rester en contact et de
              collaborer sur des projets ou de réviser ensemble.
            </p>
          </Col>
          <Col md={4} className="mb-4 text-center">
            <FontAwesomeIcon icon={faPaperPlane} size="3x" className="mb-3" />
            <h3>Publication</h3>
            <p>
              Partagez vos pensées, idées et réalisations avec la communauté de
              l'OPFFT. Publiez des mises à jour, des photos et plus encore pour
              que tout le monde soit au courant.
            </p>
          </Col>
          <Col md={4} className="mb-4 text-center">
            <FontAwesomeIcon icon={faQuestionCircle} size="3x" className="mb-3" />
            <h3>Demander de l'Aide</h3>
            <p>
              Besoin d'aide pour un sujet ou un projet ? Utilisez notre plateforme
              pour poser des questions et obtenir de l'aide de la part des autres
              étudiants et des mentors compétents.
            </p>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Features;
