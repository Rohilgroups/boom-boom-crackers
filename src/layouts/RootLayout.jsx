import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import BackToTop from '../components/BackToTop';
import ScrollToTop from '../components/ScrollToTop';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-primary-500 selection:text-white">
      {/* Scroll Position Reset */}
      <ScrollToTop />

      {/* Main Header / Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Helpers */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
