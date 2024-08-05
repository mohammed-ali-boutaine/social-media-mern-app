import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    // BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  // Routes,
  RouterProvider,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import "./style.css"

// import PrivateRoute from './components/PrivateRoute.jsx';

import LandingPage from './pages/LandigPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ChatPage from './pages/ChatPage.jsx';

// const isAuthenticated = false; // Change this to true to simulate an authenticated user


const router = createBrowserRouter(
  createRoutesFromElements(

    <>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />

    <Route element={<PrivateRoute  />}>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={< ChatPage/>} />
      </Route>

 </>



  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);















// // Render application
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <BrowserRouter>
//         <Routes>
//         <Route index path='/' element={<LandingPage />} />

//       <Route path='/login' element={<LoginPage />} />
//       <Route path='/create-user' element={<CreateAcount />} />
//       <Route path='/contact' element={<ContactPage />} />
//       <Route path='/about' element={<AboutPage />} />
//       <Route path='/dashboar' element={<Dashboad />} />

//         </Routes>
//         </BrowserRouter>
//     </React.StrictMode>
// );
