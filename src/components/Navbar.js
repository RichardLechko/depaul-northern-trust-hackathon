import React, { useState, useEffect } from "react";
import {
  FaExchangeAlt,
  FaChartLine,
  FaCalculator,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false); // Close the sidebar when resizing above 768px
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 mb-8 shadow-lg relative max-[1024px]:px-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-grow text-center">
          <ul className="hidden md:flex justify-center space-x-12 text-3xl text-white max-[1440px]:text-2xl max-[1024px]:text-xl max-[1024px]:space-x-6">
            <li>
              <a
                className="flex items-center hover:text-yellow-300 transition duration-300"
                href="/converter"
              >
                <FaExchangeAlt className="mr-2 text-2xl max-[1440px]:text-xl max-[1024px]:text-lg" />
                Currency Converter
              </a>
            </li>
            <li>
              <a
                className="flex items-center hover:text-yellow-300 transition duration-300"
                href="/data"
              >
                <FaChartLine className="mr-2 text-2xl max-[1440px]:text-xl max-[1024px]:text-lg" />
                Historical & Predictive Data
              </a>
            </li>
            <li>
              <a
                className="flex items-center hover:text-yellow-300 transition duration-300"
                href="/simulator"
              >
                <FaCalculator className="mr-2 text-2xl max-[1440px]:text-xl max-[1024px]:text-lg" />
                FX Trade Simulator
              </a>
            </li>
          </ul>
        </div>
        <div className="md:hidden z-50 relative">
          {" "}
          {/* Added relative positioning */}
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Sidebar Background Overlay */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 bg-black opacity-60 z-40 transition-opacity duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="flex flex-col h-1/4 mt-10 justify-between text-xl max-[640px]:text-lg max-[425px]:text-sm max-[768px]:text-center">
          <li>
            <a
              className="flex items-center hover:text-yellow-300 transition duration-300"
              href="/converter"
              onClick={toggleMenu}
            >
              Currency Converter
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-yellow-300 transition duration-300"
              href="/data"
              onClick={toggleMenu}
            >
              Historical & Predictive Data
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-yellow-300 transition duration-300"
              href="/simulator"
              onClick={toggleMenu}
            >
              FX Trade Simulator
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
