import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <div className="text-lg mb-4 sm:mb-0">
          <p className="text-base">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
        <ul className="flex flex-wrap justify-center sm:justify-start space-x-6 mb-4 sm:mb-0">
          <li>
            <a
              href="/privacy-and-policy"
              className="text-base hover:text-yellow-300 transition duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms-of-service"
              className="text-base hover:text-yellow-300 transition duration-300"
            >
              Terms of Service
            </a>
          </li>
        </ul>
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.facebook.com/DePaulUniversity/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base hover:text-yellow-300 transition duration-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com/DePaulU?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base hover:text-yellow-300 transition duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.linkedin.com/school/depaul-university/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base hover:text-yellow-300 transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/RichardLechko/depaul-northern-trust-hackathon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base hover:text-yellow-300 transition duration-300"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
