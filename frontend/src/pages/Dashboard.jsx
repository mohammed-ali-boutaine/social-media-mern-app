import CategoriesList from "../components/CategoriesList";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import App from "../components/post/App";
// import Posts from "../components/post/Posts";
// import CreatePost from "../components/Post/CreatePost";
// import Posts from "./PostPage";

function Dashboard() {
  return <>

  <Navigation/>

  <main>
    <CategoriesList/>
    {/* <Posts/> */}
    <App/>
    <div style={{height:"100vh"}}></div>

    {/* <CreatePost/> */}
    
  </main>


  <Footer/>

  
  </>;
}

export default Dashboard;
