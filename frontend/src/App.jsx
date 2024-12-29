import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; 
import Home from "./Home";


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
      <Home/>
    </Router>
  );
};

export default App;