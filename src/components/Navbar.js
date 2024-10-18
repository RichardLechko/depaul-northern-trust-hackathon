import React, { useState, useEffect } from "react";
import {
  FaExchangeAlt,
  FaChartLine,
  FaCalculator,
  FaBars,
  FaTimes,
  FaHome,
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
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="hidden md:flex space-x-8 text-lg">
          <a
            className="flex items-center text-gray-700 hover:text-teal-600 transition duration-300"
            href="/"
          >
            <FaHome className="mr-2" />
            Home
          </a>
          <a
            className="flex items-center text-gray-700 hover:text-teal-600 transition duration-300"
            href="/converter"
          >
            <FaExchangeAlt className="mr-2" />
            Currency Converter
          </a>
          <a
            className="flex items-center text-gray-700 hover:text-teal-600 transition duration-300"
            href="/data"
          >
            <FaChartLine className="mr-2" />
            Historical & Predictive Data
          </a>
          <a
            className="flex items-center text-gray-700 hover:text-teal-600 transition duration-300"
            href="/simulator"
          >
            <FaCalculator className="mr-2" />
            FX Trade Simulator
          </a>
        </div>
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} className="text-teal-600">
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
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="flex flex-col h-full mt-10">
          <ul className="space-y-4 text-lg text-gray-700">
            <li>
              <a
                className="flex items-center hover:text-teal-600 transition duration-300"
                href="/converter"
                onClick={toggleMenu}
              >
                <FaExchangeAlt className="mr-2" />
                Currency Converter
              </a>
            </li>
            <li>
              <a
                className="flex items-center hover:text-teal-600 transition duration-300"
                href="/data"
                onClick={toggleMenu}
              >
                <FaChartLine className="mr-2" />
                Historical & Predictive Data
              </a>
            </li>
            <li>
              <a
                className="flex items-center hover:text-teal-600 transition duration-300"
                href="/simulator"
                onClick={toggleMenu}
              >
                <FaCalculator className="mr-2" />
                FX Trade Simulator
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
