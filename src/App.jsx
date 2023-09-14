import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';


let auth = getAuth(app);

function App() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let emailBlur = event => {
    setEmail(event.target.value)
  }
  let passBlur = event => {
    setPassword(event.target.value)
  }
  let formSubmit = event => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      let user = result.user;
      console.log(user);
    })
    .catch(error =>{
      console.log(error);
    });
    console.log('submitted', email, password)
    event.preventDefault();
  }

  return (
    <div>
      <Form onSubmit={formSubmit}>
        <h2 className='text-primary'>Input your information</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={emailBlur} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={passBlur} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default App
