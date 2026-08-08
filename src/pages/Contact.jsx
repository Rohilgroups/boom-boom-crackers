import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate submit
    setFormSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-20">
      
      {/* Page Header */}
      <section className="py-24 sm:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/page-hero-1.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 drop-shadow-lg">
          <nav className="text-sm text-gray-400 mb-3 flex justify-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary-400">Contact</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">Contact Sivakasi Boom Boom Pyrotech</h1>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Contact info & Hours */}
          <div>
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Get In Touch
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
              WE ARE HERE TO HELP YOU CELEBRATE
            </h2>
            
            <div className="space-y-6 mb-10">
              
              <div className="flex gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="p-3 bg-primary-50 text-primary-600 rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase">Factory Address</h4>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Nearby Vadamalapuram Check post, Keelathiruthangal, Sivakasi - 626 130, Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="p-3 bg-secondary-50 text-secondary-600 rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase">Phone Calls</h4>
                  <p className="text-gray-500 text-sm mt-1">
                    <a href="tel:+918122922900" className="hover:underline font-semibold text-gray-800">+91 81229 22900</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase">WhatsApp Enquiries</h4>
                  <p className="text-gray-500 text-sm mt-1">
                    <a href="https://wa.me/918122922900" target="_blank" rel="noreferrer" className="hover:underline font-semibold text-gray-800">+91 81229 22900</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase">Email Support</h4>
                  <p className="text-gray-500 text-sm mt-1">
                    <a href="mailto:boomboompyrotech@gmail.com" className="hover:underline font-semibold text-gray-800">boomboompyrotech@gmail.com</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Business Hours */}
            <div className="p-6 rounded-2xl bg-gray-950 text-white flex gap-4">
              <Clock className="w-6 h-6 text-secondary-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold uppercase tracking-wider text-sm text-gray-200">Factory Office Hours</h4>
                <div className="mt-2 text-xs text-gray-400 space-y-1">
                  <p>Monday - Saturday: 09:00 AM - 07:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact form */}
          <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase">Send An Enquiry Message</h3>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center">
                <h4 className="text-green-800 font-bold">Thank you!</h4>
                <p className="text-green-700 text-xs mt-1.5 leading-relaxed">
                  Your enquiry form has been submitted successfully. Our wholesale manager will coordinate back on call or email shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Name</label>
                  <input 
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                    <input 
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="10-digit number"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Message</label>
                  <textarea 
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe your requirements or event date"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Google Map Section */}
      <section className="h-96 w-full bg-gray-100 border-t border-gray-200">
        <iframe 
          title="Sivakasi Boom Boom Pyrotech Factory Map"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3935.0796898127173!2d77.82761397502472!3d9.501798490579624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMzAnMDYuNSJOIDc3wrA0OSc0OC43IkU!5e0!3m2!1sen!2sin!4v1784029578708!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </section>

    </div>
  );
}
