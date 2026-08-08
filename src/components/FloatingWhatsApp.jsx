import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918122922900?text=Hello%20Boom%20Boom%20Pyrotech,%20I%20am%20visiting%20your%20website%20and%20want%20to%20enquire%20about%20firecrackers."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba56] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-[#25D366]" />
      <span className="absolute right-14 sm:right-16 bg-gray-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-gray-800">
        Enquire on WhatsApp
      </span>
    </a>
  );
}
