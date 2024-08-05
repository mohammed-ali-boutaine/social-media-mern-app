import Chat from "../chatC/Chat";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

function ChatPage() {
  return (
    <>
      <Navigation />

      {/* chat component her  */}
      {/* <div>ChatPage</div> */}
      <Chat/>

      <Footer />
    </>
  );
}

export default ChatPage;
