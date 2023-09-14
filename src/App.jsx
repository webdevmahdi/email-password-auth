import './App.css';
import app from './firebase.init';
import { getAuth } from 'firebase/auth';

let auth = getAuth(app);

function App() {

  return (
      <div>
        <form action="">
          <input type="text" name="" id="" />
          <input type="password" name="" id="" />
        </form>
      </div>
  )
}

export default App
