import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Cluster_Dashboard from "./components/ClusterAdmin/Cluster_Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route
            path="/Dashboard/clusterAdmin"
            element={<Cluster_Dashboard />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
