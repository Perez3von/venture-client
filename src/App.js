
import './App.css';
import Venture from './views/Venture';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Home from './views/Home';
import GuestForm from './components/GuestForm';
import LoginForm from './components/LoginForm';
import InviteForm from './components/InviteForm';
// import ProtectedRoutes from './components/PrivateRoutes/ProtectedRoutes';
import logo from '../src/assets/youthCitiesLogo.png'
function App() {
  return (
    <div className="App">
      <header className='main-header'>
        <img src={logo} alt='logo' id='logo' /> Venture Chat
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element = {<LoginForm />} />
          <Route path='/guest/:id' element = {<GuestForm />} /> 
          <Route path='/invite' element = {<InviteForm />} />
          <Route path='/chatroom/:id' element = {<Venture />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
