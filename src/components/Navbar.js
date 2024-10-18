import React, { useState } from 'react';
import { FaExchangeAlt, FaChartLine, FaCalculator, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 mb-8 shadow-lg relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-grow text-center">
          <ul className={`hidden md:flex justify-center space-x-12 text-3xl text-white`}>
            <li>
              <a
                className="flex items-center hover:text-yellow-300 transition duration-300"
                href="/converter"
              >
                <FaExchangeAlt className="mr-2 text-2xl" />
                Currency Converter
              </a>
            </li>
            <li>
              <a
                className="flex items-center hover:text-yellow-300 transition duration-300"
                href="/data"
              >
                <FaChartLine className="mr-2 text-2xl" />
                Historical & Predictive Data
              </a>
            </li>
            <li>
              <a
                className="flex items-center hover:text-yellow-300 transition duration-300"
                href="/simulator"
              >
                <FaCalculator className="mr-2 text-2xl" />
                FX Trade Simulator
              </a>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-yellow-300">
            <FaBars size={28} />
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300"
          ></div>
          <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul className="flex flex-col space-y-4 text-xl">
              <li>
                <a
                  className="flex items-center hover:text-yellow-300 transition duration-300"
                  href="/converter"
                  onClick={toggleMenu}
                >
                  <FaExchangeAlt className="mr-2 text-2xl" />
                  Currency Converter
                </a>
              </li>
              <li>
                <a
                  className="flex items-center hover:text-yellow-300 transition duration-300"
                  href="/data"
                  onClick={toggleMenu}
                >
                  <FaChartLine className="mr-2 text-2xl" />
                  Historical & Predictive Data
                </a>
              </li>
              <li>
                <a
                  className="flex items-center hover:text-yellow-300 transition duration-300"
                  href="/simulator"
                  onClick={toggleMenu}
                >
                  <FaCalculator className="mr-2 text-2xl" />
                  FX Trade Simulator
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
