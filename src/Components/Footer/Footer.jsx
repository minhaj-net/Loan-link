import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-[#0b2347] to-[#0d335d] text-white pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand or Logo */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl flex justify-center items-center gap-2 font-bold mb-4"
          >
            <img className="w-16 rounded-full" src="https://i.ibb.co.com/4nXsYmwV/eeef7f3e34a5faa9fbe6abcd641eee95.jpg" alt="" />
            LoanLink
          </motion.h2>

          <p className="text-gray-300 leading-6">
            We provide small to medium loans to support communities, women empowerment, 
            small businesses, and income-generating activities.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2 }}
                href="#"
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
              >
                <Icon className="text-xl" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Loan Services</a></li>
            <li><a href="#" className="hover:text-white transition">Our Team</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Loan Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Loan Categories</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Micro Loans</li>
            <li>Women Empowerment Loans</li>
            <li>Business Startup Loans</li>
            <li>Education Loan</li>
            <li>Emergency Loan</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>

          <div className="flex items-start gap-3 text-gray-300 mb-3">
            <FaMapMarkerAlt className="text-lg mt-1" />
            <p>Bogura,Rajshahi, Bangladesh</p>
          </div>

          <div className="flex items-center gap-3 text-gray-300 mb-3">
            <FaPhoneAlt />
            <p>+880 1870567842</p>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <FaEnvelope />
            <p>support@loanlink.org</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-6"></div>

      {/* Copyright */}
      <p className="text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Loan Link. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;
