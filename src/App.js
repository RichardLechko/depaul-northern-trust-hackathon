import Currency from "./components/Currency.js";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar.js";
import MainPage from "./components/MainPage.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/converter" element={<Currency />} />
          <Route path="/data" element={<Navigate to="/" replace />} />
          <Route path="/simulator" element={<Navigate to="/" replace />} />
        
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
