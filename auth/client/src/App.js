import logo from './logo.svg';
import './App.css';
import { Route,Routes,BrowserRouter, useNavigate } from "react-router-dom";

import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
