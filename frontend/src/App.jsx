
import './App.css'
import Signup from './components/Signup'
import PortalPage from './components/PortalPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';



function App() {
  

  return (
    <>
     <Router>
            <Routes>
                <Route path="/*" element={<Signup />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/PortalPage" element={<PortalPage />} />
            </Routes>
        </Router>
     
    </>
  )
}

export default App
