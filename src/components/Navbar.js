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
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex justify-between items-center px-6 py-4">
  <div className="hidden md:flex space-x-8 text-lg w-4/5 mx-auto justify-between max-[1024px]:space-x-4 max-[1024px]:w-full">
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
      Forex Future View
    </a>
    <a
      className="flex items-center text-gray-700 hover:text-teal-600 transition duration-300"
      href="/simulator"
    >
      <FaCalculator className="mr-2" />
      FX Trade Simulator
    </a>
  </div>
  <div className="md:hidden z-50 ml-auto">
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
  className={`fixed inset-y-0 left-0 w-3/5 max-w-full bg-white shadow-lg transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } z-50`}
>
  <div className="flex flex-col h-full py-6 px-4">
    <h2 className="text-xl font-semibold text-teal-600 mb-6">Menu</h2>
    <ul className="space-y-4 text-lg text-gray-800">
    <li>
        <a
          className="block py-2 px-4 hover:bg-teal-100 rounded-md transition duration-300"
          href="/"
          onClick={toggleMenu}
        >
          Home
        </a>
      </li>
      <li>
        <a
          className="block py-2 px-4 hover:bg-teal-100 rounded-md transition duration-300"
          href="/converter"
          onClick={toggleMenu}
        >
          Currency Converter
        </a>
      </li>
      <li>
        <a
          className="block py-2 px-4 hover:bg-teal-100 rounded-md transition duration-300"
          href="/data"
          onClick={toggleMenu}
        >
          Forex Future View
        </a>
      </li>
      <li>
        <a
          className="block py-2 px-4 hover:bg-teal-100 rounded-md transition duration-300"
          href="/simulator"
          onClick={toggleMenu}
        >
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
