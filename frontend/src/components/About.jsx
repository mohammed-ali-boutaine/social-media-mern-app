/* eslint-disable react/no-unescaped-entities */
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
const About = () => {
  return (
    <>
      <Container id="about" className="py-5">
        <h2 className="text-center mb-4">À Propos de Nous</h2>
        <Row className="mb-4">
          <Col>
            <p>
              Au cœur du Pacte National pour l’Émergence Industrielle,
              l’aéronautique contribue au développement économique du Maroc.
              Cette stratégie place le Maroc comme une destination prisée pour
              les opérateurs aéronautiques et de transport aérien, tout en
              répondant aux besoins du secteur en ressources humaines
              qualifiées.
            </p>
            <p>
              En tant que premier opérateur de formation professionnelle au
              Maroc, l&apos;OFPPT a été pionnier dans la mise en place d’une
              offre de formation de niveau "Technicien Spécialisé" et
              "Technicien" en aéronautique depuis 2003, avec pour objectif
              d’accompagner les entreprises du secteur dans leur développement.
            </p>
            <p>
              Dans cette optique, l’ISMALA (Institut Spécialisé dans les Métiers
              de l'Aéronautique et de la Logistique Aéroportuaire) a été
              inauguré par Sa Majesté le Roi Mohammed VI le 11 septembre 2013 à
              Nouaceur, et a impliqué un investissement total de 72,2 millions
              de dirhams.
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6} className="text-center">
            <Image src="./king.jpg" alt="Inauguration ISMALA par SM MVI" fluid />
          </Col>
          <Col md={6}>
            <p>
              Grâce à son accord de partenariat avec des opérateurs du secteur,
              l’ISMALA dispose actuellement d'une infrastructure pédagogique de
              haut niveau, afin d’assurer une formation répondant aux normes
              internationales et d’anticiper le besoin croissant de ressources
              humaines qualifiées dans ce secteur.
            </p>
            <p>
              Les établissements de l'OFPPT proposent 8 options couvrant les
              domaines de la Maintenance Aéronautique et de la Logistique
              Aéroportuaire, à savoir : Maintenance Aéronautique, Mécatronique,
              Usinage sur Machines-Outils à Commande Numérique, Traitement de
              Surface, Ajustage et Assemblage des Cellules d’Avion,
              Chaudronnerie Aéronautique, Matériaux Composites en Aéronautique
              et Logistique Aéroportuaire.
            </p>
            <p>
              L’ISMALA est situé à Nouaceur dans la zone aéroportuaire de
              l’aéroport Mohammed V, sur une superficie de 15 000 m² avec une
              capacité de 2 000 places pédagogiques. L’Institut dispose
              également d’un simulateur d'avion en 3D, de quatre grands et
              moyens moteurs de transporteur et d’un avion KING AIR 200.
            </p>
          </Col>
        </Row>
      </Container>
      <section className="showcase">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div
              className="col-lg-6 order-lg-2 text-white showcase-img"
              style={{ backgroundImage: `url('assets/img/fillieres.png')` }}
            ></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Diversité des Filières de Formation Professionnelle</h2>
              <p className="lead mb-0">
              L'Office de la Formation Professionnelle et de la Promotion du Travail (OFPPT) au Maroc se distingue par
              sa vaste offre de filières de formation professionnelle, reflétant la diversité des secteurs économiques
              du pays. Avec plusieurs centaines de filières disponibles, allant des métiers traditionnels aux spécialisations
              les plus pointues, l'OFPPT offre aux apprenants un éventail de choix pour acquérir des compétences adaptées aux
              exigences du marché du travail. Que ce soit dans l'industrie, les technologies de l'information, l'artisanat, 
              le tourisme, l'agriculture ou d'autres secteurs, les programmes de formation de l'OFPPT sont conçus pour répondre
              aux besoins en compétences des différents secteurs économiques, contribuant ainsi à la dynamisation de l'économie 
              nationale et à la promotion de l'employabilité des jeunes et des adultes.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 text-white showcase-img"
              style={{ backgroundImage: `url('assets/img/Diplomess.jpg')` }}
            ></div>
            <div className="col-lg-6 my-auto showcase-text">
              <h2>Accessibilité à Travers le Réseau d'Agences de l'OFPPT</h2>
              <p className="lead mb-0">
              Pour assurer une large accessibilité à ses programmes de formation, l'OFPPT déploie un réseau étendu d'agences
              à travers tout le territoire marocain. Ces agences, réparties stratégiquement dans les différentes régions du
              pays, offrent aux apprenants des infrastructures modernes, des équipements de pointe et des formateurs qualifiés,
              créant ainsi un environnement propice à l'apprentissage. Grâce à cette présence nationale, l'OFPPT facilite l'accès 
              à la formation professionnelle pour les jeunes et les adultes, quel que soit leur lieu de résidence, renforçant ainsi 
              l'inclusivité et l'égalité des chances en matière d'éducation et de développement des compétences.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div
              className="col-lg-6 order-lg-2 text-white showcase-img"
              style={{ backgroundImage: `url('assets/img/langues.jpg')` }}
            ></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2>Platforme OFPPT</h2>
              <p className="lead mb-0">
              Ofppt Maroc a une plateforme de langues qui offre une opportunité précieuse aux stagiaires pour développer leurs compétences 
              en arabe, français et anglais à travers des missions interactives et structurées. En suivant des modules spécifiques et en accomplissant 
              des missions variées, les apprenants peuvent progresser à travers différents niveaux de compétence. Cette approche moderne et technologique
               permet aux stagiaires d'améliorer leur employabilité en acquérant des compétences linguistiques essentielles adaptées aux besoins du marché de l'emploi au Maroc.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
