import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import About from "../components/About";
import ContactForm from "../components/ContactForm";

function LandigPage() {
  return (

    <>
        <Navigation />
      <Hero />
      <Container className="my-5">
        <Features />
      </Container>
      <About/>
      <ContactForm/>

      <Footer />

    </>


    )
}

export default LandigPage