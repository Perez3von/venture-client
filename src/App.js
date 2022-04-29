
import './App.css';
import Venture from './views/Venture';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import GuestForm from './components/GuestForm';
import LoginForm from './components/LoginForm';
import InviteForm from './components/InviteForm';
import logo from '../src/assets/youthCitiesLogo.png';
import { getStorage } from './utils/localStorage';
function App() {
  const email = getStorage('EMAIL');
  function logout(){
    localStorage.clear();
  }
  return (
    <div className="App">
      <header className='main-header'>
        <img src={logo} alt='logo' id='logo'/> 
        <a href='/ ' style={{textDecoration:'none',  color:'black'}}>Home</a>
        {email.length===0? <></>:<a href='/ 'onClick={logout} style={{textDecoration:'none',  color:'black'}}>Logout</a>}
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element = {<LoginForm />} />
          <Route path='/invite' element = {<InviteForm />} />
          <Route path='/chatroom/:id' element = {<Venture />} />
          <Route path='/guest/:id' element = {<GuestForm />} /> 
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
