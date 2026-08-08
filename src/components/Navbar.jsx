import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // If not home page, it is always solid/scrolled style
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    } else {
      // Re-evaluate current scroll when returning to home page
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-primary-950 border-b border-primary-900 ${
        isScrolled ? 'shadow-lg py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2.5 sm:gap-4 group">
            <img 
              src="/logo.png" 
              alt="Sivakasi Boom Boom Pyrotech Logo" 
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-full shadow-md transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-xs font-bold text-secondary-500 tracking-widest leading-none uppercase">
                Sivakasi
              </span>
              <span className="text-lg sm:text-3xl font-black tracking-tighter leading-none text-white transition-colors mt-0.5 whitespace-nowrap">
                BOOM BOOM
              </span>
              <span className="text-[9px] sm:text-xs font-bold text-secondary-500 tracking-widest mt-0.5 leading-none uppercase">
                Pyrotech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-bold tracking-wider uppercase relative transition-colors py-1 ${
                    isActive 
                      ? 'text-secondary-400' 
                      : 'text-gray-200 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span 
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-400" 
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://wa.me/918122922900"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg bg-secondary-500 text-gray-900 hover:bg-secondary-400"
            >
              <MessageSquare className="w-4 h-4" />
              Enquire Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl focus:outline-none transition-colors text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="https://wa.me/918122922900"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold tracking-wide uppercase shadow-md hover:bg-primary-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Enquire Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
