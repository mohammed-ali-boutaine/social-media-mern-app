import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

import FormContainer from "../components/FormContainer";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/dashboard');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <>
      <Navigation />
      <div >
        <div style={{height:"10vh"}}></div>
          <FormContainer className="m-1 ">
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
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

              <Button
                disabled={isLoading}
                type="submit"
                variant="primary"
                className="mt-3"
              >
                Log In
              </Button>
            </Form>

            {isLoading && <Loader />}
          </FormContainer>
      </div>

      <div className="position-absolute bottom-0 end-0 start-0">
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
