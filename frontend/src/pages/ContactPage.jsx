// import React from 'react'
import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"

function ContactPage() {
  return (
    <>
    <Navigation/>
    <div style={{minHeight:"90vh",paddingTop:"80px"}}>
    <ContactForm/>

    </div>
    <Footer/>
    </>
  )
}

export default ContactPage