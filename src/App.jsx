import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';


let auth = getAuth(app);

function App() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [registered, setRegistered] = useState(false);
  let [validated, setValidated] = useState(false);
  let [name, setName] = useState('');
  let [error, setError] = useState('');

  //Blur input field functions
  let emailBlur = event => {
    setEmail(event.target.value);
  };
  let passBlur = event => {
    setPassword(event.target.value);
  };

  // Log in
  let logIn = event => {
    setError('');
    setRegistered(event.target.checked);
  };

  // Form submit functions
  let formSubmit = event => {

    // Form validation
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    };
    setValidated(true);


    // Log in user 
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          let user = result.user;
          console.log(user);
          setError('');
        })
        .catch(error => setError("The email doesn't exist."));
    }
    else {
      // Send to the firebase server
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          let user = result.user;
          setEmail('');
          setPassword('');
          emailVerification();
          setUserName();
          console.log(user);
        })
        .catch(error => {
          setError("The email already exist");
        });
    };

    // Case checking 
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password should contain at least one special character')
      return;
    };

    console.log('submitted', email, password);
    event.preventDefault();
  }

  let setUserName = () =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => console.log('Updating name'));
  }

  let nameBlur = event =>{
    setName(event.target.value);
  };

  let resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => console.log('Email has been sent'));
  };
  let emailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => console.log('Email verification sent'));
  };

  return (
    <div>
      <Form className='p-5 shadow-lg p-3 mb-5 bg-white rounded' noValidate validated={validated} onSubmit={formSubmit}>
        <h2 className='text-primary'>{registered ? 'Input Log in details' : 'Input your register details'}</h2>
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
        {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your name</Form.Label>
          <Form.Control onBlur={nameBlur} type="text" placeholder="Enter Your Name" required />
          <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
        </Form.Group>}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={passBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <p className='text-danger'>{error}</p>
        <Form.Group className="mb-3">
          <Form.Check onChange={logIn} label="Already registered?" />
        </Form.Group>
        <Button onClick={resetPassword} variant='link'>Reset password</Button>
        <br />
        <Button variant="primary" type="submit">
          {registered ? 'Log in' : 'Register'}
        </Button>
      </Form>
    </div>
  )
}


export default App;
