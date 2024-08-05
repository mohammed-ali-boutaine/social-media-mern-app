import {
  Navbar,
  Nav,
  Button,
  Container,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
// import { FaSignInAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"; // Import the moon icon from Font Awesome
import { logout } from "../slices/authSlice";
// import { useEffect, useState } from "react";
import {  useState } from "react";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if(userInfo){
  //   userInfo.name = userInfo.name.split(" ")[0]
  // }
  const [logoutApiCall] = useLogoutMutation();


  // const [theme, setTheme] = useState("dark");

  // useEffect(() => {
  //   if (theme === "light") {
  //     document.body.classList.remove("dark");
  //     document.body.classList.add("light");
  //   } else {
  //     document.body.classList.remove("light");
  //     document.body.classList.add("dark");
  //   }
  // }, [theme]);


  const darkmode = () => {
    // localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark");
    // setTheme(localStorage.getItem("currentMode"));
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar
      className="px-2"
      bg="dark"
      variant="dark"
      expand="lg"
      collapseOnSelect
      style={{ backgroundColor: "transparent" }}
    >
      <Container>
        {userInfo ? (
          <LinkContainer to="/dashboard">
            <Navbar.Brand>OfpptChat</Navbar.Brand>
          </LinkContainer>
        ) : (
          <LinkContainer to="/">
            <Navbar.Brand>OfpptChat</Navbar.Brand>
          </LinkContainer>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo ? (
              <>
                {userInfo.role == "admin" && (
                  <LinkContainer to="/create-account" className="m-2">
                    <Nav.Link className="btn btn-outline-secondary">
                      Create Account
                    </Nav.Link>
                  </LinkContainer>
                )}

                <LinkContainer to="/Dashboard" className="m-2">
                  <Nav.Link className="btn btn-outline-secondary">
                    Dashboard
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/chat" className="m-2">
                  <Nav.Link className="btn btn-outline-secondary">
                    Chat
                  </Nav.Link>
                </LinkContainer>

                <NavDropdown
                  bg="dark"
                  variant="dark"
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={()=> {darkmode}}>
                    <FontAwesomeIcon icon={faMoon} className="me-2" />
                    <FontAwesomeIcon icon={faSun} className="mr-1" />
                  </NavDropdown.Item>

                  <LinkContainer to="/contact">
                    <NavDropdown.Item>Contact</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/about">
                    <NavDropdown.Item>About</NavDropdown.Item>
                  </LinkContainer>
                  <Dropdown.Divider />

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                  <NavDropdown.Item onClick={()=> {darkmode}}>
                    <FontAwesomeIcon icon={faMoon} className="me-2" />
                    <FontAwesomeIcon icon={faSun} className="mr-1" />
                  </NavDropdown.Item>

                <Nav.Link href="/#about">
                  <Button variant="dark">About</Button>
                </Nav.Link>

                <Nav.Link href="/#contact">
                  <Button variant="dark">Contact</Button>
                </Nav.Link>

                <LinkContainer to="/login">
                  <Nav.Link>
                    <Button variant="primary">Connection</Button>
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
