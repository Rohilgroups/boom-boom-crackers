import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldAlert, Award, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* Logo & About Column */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="/logo.png" 
                alt="Sivakasi Boom Boom Pyrotech Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md"
              />
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-secondary-400 tracking-widest leading-none uppercase">
                  Sivakasi
                </span>
                <span className="text-xl sm:text-3xl font-black text-white tracking-tighter leading-none mt-0.5">
                  BOOM BOOM
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-secondary-400 tracking-widest mt-0.5 leading-none uppercase">
                  Pyrotech
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Sivakasi's premium fireworks manufacturer, crafting brilliant, family-safe, and low-smoke green crackers. Brighten your celebrations with our direct factory-wholesale pricing.
            </p>
            
            <div className="flex items-center gap-3 bg-gray-900/60 border border-gray-800 p-3.5 rounded-2xl">
              <ShieldAlert className="text-secondary-400 w-5 h-5 shrink-0" />
              <div className="text-[11px] leading-tight text-gray-400">
                <p className="font-bold text-gray-200 uppercase">CSIR-NEERI Certified</p>
                <p className="mt-0.5">100% legal green crackers with reduced smoke emission.</p>
              </div>
            </div>
          </div>



          {/* Contact Details Column */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-primary-500">
              Head Office
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-500 w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Nearby Vadamalapuram Check post,<br />
                  Keelathiruthangal, Sivakasi - 626 130,<br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-500 w-4 h-4 shrink-0" />
                <a href="tel:+918122922900" className="hover:text-white transition-colors">+91 81229 22900</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-500 w-4 h-4 shrink-0" />
                <a href="mailto:boomboompyrotech@gmail.com" className="hover:text-white transition-colors">boomboompyrotech@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sivakasi Boom Boom Pyrotech. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 transition-colors">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-gray-400 transition-colors">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-gray-400 transition-colors">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
