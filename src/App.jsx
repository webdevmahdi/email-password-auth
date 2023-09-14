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
  const [validated, setValidated] = useState(false);
  let [error, setError] = useState('')
  //Blur input field functions
  let emailBlur = event => {
    setEmail(event.target.value)
  }
  let passBlur = event => {
    setPassword(event.target.value)
  }
  // Form submit functions
  let formSubmit = event => {

    // Form validation
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setValidated(true);

    // Case checking 
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password should contain at least one special character')
      return;
    }

    // Send to the firebase server
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        let user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
    console.log('submitted', email, password)
    event.preventDefault();
  }

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={formSubmit}>
        <h2 className='text-primary'>Input your information</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={emailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={passBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <p>{error}</p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}


export default App;
