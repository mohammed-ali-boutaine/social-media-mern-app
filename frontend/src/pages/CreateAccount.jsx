import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Loader from '../components/Loader';



import { useRegisterMutation } from '../slices/usersApiSlice';

import { toast } from 'react-toastify';
// import { toast } from 'toast';


const roles = ["proff", "admin","student"];

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(null);
  const [role, setRole] = useState("student");



  const [register, { isLoading }] = useRegisterMutation();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      if (picture) {
        formData.append('picture', picture);
      }

      await register(formData).unwrap();
      toast.success('Registration successful');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Navigation />
      <div className=" " style={{minHeight:"90vh"}}>

        <FormContainer >
          <h1>Register</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="picture">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPicture(e.target.files[0])}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-3"
            >
              Register
            </Button>
            {isLoading && <Loader />}

          </Form>
        </FormContainer>
      </div>
      {/* <div style={{height:"vh"}}></div> */}



        <Footer />
    </>
  );
};

export default CreateAccount;
