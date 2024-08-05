import { Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
// import { useContext } from "react";


import Chat from "./Chat";

// import { ChatContextProvider } from "../context/chatContext";

function App() {

  return (
    // <ChatContextProvider user={user}>
      <Container >
        <Routes>
            <Chat/>

        </Routes>
      </Container>
    // </ChatContextProvider>
  )
}

export default App
