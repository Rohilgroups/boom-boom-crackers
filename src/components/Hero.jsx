import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/page-hero-1.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          Light Up Your Celebrations with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-500">
            Boom Boom PyroTech
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-xl sm:text-2xl text-gray-200 mb-10 font-medium"
        >
          Premium Quality Firecrackers from Sivakasi. Safe, Spectacular, and Affordable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <a
            href="https://wa.me/918122922900?text=Hello%20Boom%20Boom%20PyroTech,%20I%20want%20to%20view%20your%20pricelist"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary-600 border border-transparent rounded-full shadow-xl hover:bg-primary-500 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
          >
            <FaWhatsapp className="mr-3 text-2xl group-hover:scale-110 transition-transform" />
            Get Price List via WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
