import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/profile' element = {<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
