
import './App.css';
import Venture from './views/Venture';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import GuestForm from './components/GuestForm';
import LoginForm from './components/LoginForm';
import InviteForm from './components/InviteForm';
import logo from '../src/assets/youthCitiesLogo.png';
import { getStorage } from './utils/localStorage';
import Brainstorms from './views/Brainstorms';
import myVenturesIcon from '../src/assets/myVenturesIcon.png'
import coreIcon from '../src/assets/coreIcon.png'
function App() {
  const email = getStorage('EMAIL');
  function logout(){
    localStorage.clear();
  }
  return (
    <div className="App">
      <header className='main-header'>
        
        <div className='header-contents'>
          <div className='logo-wrapper'>
            <img src={logo} alt='logo' id='logo'/> 
            </div>
          
          <a href='/ ' className='main-header-links'>
          <img src={coreIcon} alt='coreIcon' id='coreIcon'/> 
            Core
            </a>
        
        {email.length===0? <a href='/login ' className='main-header-links'> Login</a>:
        <>
        <a href='/brainstorms '  className='main-header-links' >
        <img src={myVenturesIcon} alt='myVenturesIcon' id='myVenturesIcon'/> 
         myVentures </a>
        <a href='/ ' className='main-header-links' onClick={logout} >
          <div className='filler-header'></div> Logout </a>
        </>
        }
        </div>
        
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element = {<LoginForm />} />
          <Route path='/invite' element = {<InviteForm />} />
          <Route path='/chatroom/:id' element = {<Venture />} />
          <Route path='/guest/:id' element = {<GuestForm />} /> 
          {/* <Route path='/guest' element = {<GuestForm />} />  */}
          <Route path='/brainstorms' element={<Brainstorms />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
