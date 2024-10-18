import Currency from "./components/Currency.js";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import MainPage from "./components/MainPage.js";
import Footer from "./components/Footer.js";
import TravelCurrencyApp from "./components/Travel-Currency-Tool/TravelCurrencyApp.js";
import Simulator from "./components/FX-Simulator/Simulator.js";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/converter" element={<Currency />} />
            <Route path="/data" element={<TravelCurrencyApp />} />
            <Route path="/simulator" element={<Simulator />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
