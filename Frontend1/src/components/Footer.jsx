import React from 'react';
import { Phone, Mail, GitHub, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 shadow-lg mt-8">
      <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-start md:px-0 md:max-w-6xl">
        {/* section1 */}
        <div className="w-full md:w-1/3 min-w-[250px] text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Contact Us</h3>
          <p className="text-base text-gray-400 leading-normal mb-3 flex items-center justify-center md:justify-start">
            <Phone fontSize="small" className="mr-2" />Phone : +91 7013418146
          </p>
          <p className="text-base text-gray-400 leading-normal mb-3 flex items-center justify-center md:justify-start">
            <Mail fontSize="small" className="mr-2" />Email : pdk7893@gmail.com
          </p>
        </div>
        {/* section2*/}
        <div className="w-full md:w-1/3 min-w-[250px] flex flex-col items-center gap-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Follow me</h3>
          <div className="flex gap-4">
            <a href="" target="_blank" rel="noopener noreferrer">
              <GitHub className="text-gray-300 text-3xl transition-transform duration-300 hover:text-blue-500 hover:scale-110" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <LinkedIn className="text-gray-300 text-3xl transition-transform duration-300 hover:text-blue-500 hover:scale-110" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-gray-300 text-3xl transition-transform duration-300 hover:text-blue-500 hover:scale-110" />
            </a>
          </div>
        </div>
        {/* section3 */}
        <div className="w-full md:w-1/3 min-w-[250px] text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">About</h3>
          <p className="text-base text-gray-400 leading-normal">Providing the products to help you early as possible</p>
        </div>
      </div>
      <div className="text-center mt-8 text-base text-gray-400 pt-6 border-t border-gray-700">
        <p className="m-0 font-normal">&copy; 2025 . All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer;