import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Flame, Award, ShieldCheck, Factory, ChevronRight, 
  ArrowRight, Users, Sparkles, AlertCircle, ShoppingBag 
} from 'lucide-react';

import products from '../data/products.json';
import categories from '../data/categories.json';
import testimonials from '../data/testimonials.json';
import faqs from '../data/faq.json';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

const brandImages = Object.values(import.meta.glob('../assets/Brands/*.{jpg,png,jpeg,webp}', { eager: true, import: 'default' }));
const repeatedBrands = [...brandImages, ...brandImages, ...brandImages];

// Animated Counter component
function Counter({ value, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Home() {
  // Get featured products & best sellers
  const featuredProducts = products.filter(p => p.tags.includes('Featured')).slice(0, 3);
  const bestSellers = products.filter(p => p.tags.includes('Best Seller')).slice(0, 3);

  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gray-950 min-h-[90vh] sm:min-h-screen flex items-start justify-center pt-36 sm:pt-48 pb-16 overflow-hidden">
        {/* Particle and image backdrop */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/Hero.png')] bg-cover bg-center bg-no-repeat opacity-100" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Faint Background Text Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[12rem] sm:text-[20rem] font-black text-white/5 tracking-tighter uppercase whitespace-nowrap">
              BOOM
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Main Title Stack */}
            <div className="flex flex-col items-center mb-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.0 }}
                className="text-xl sm:text-3xl font-bold text-white tracking-[0.4em] uppercase mb-1 sm:mb-2 relative z-20 drop-shadow-xl"
              >
                Sivakasi
              </motion.h3>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-7xl md:text-8xl text-white font-normal mb-1 sm:mb-2 relative z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Boom Boom
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-6xl md:text-[5.5rem] font-black text-secondary-400 tracking-tight uppercase leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              >
                PYROTECH
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-xl text-white font-medium max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-md px-4"
            >
              Express your joy through premium fireworks that evolve with your mood and energy. Every celebration holds a different story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
            >
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-bold bg-secondary-400 hover:bg-secondary-500 text-gray-900 rounded-full transition-all shadow-lg hover:shadow-secondary-500/30 transform hover:-translate-y-0.5 tracking-wide"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Order Crackers
              </Link>
              
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm sm:text-base text-white/90 font-medium drop-shadow-md"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +91 81229 22900
              </span>
              <span className="hidden sm:inline opacity-50">|</span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                boomboompyrotech@gmail.com
              </span>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="bg-red-50 border-y border-red-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4">
          <AlertCircle className="text-red-600 w-8 h-8 shrink-0 animate-pulse" />
          <p className="text-sm text-red-800 leading-relaxed font-semibold text-center md:text-left">
            <strong>STATUTORY COMPLIANCE:</strong> As directed by the Hon'ble Supreme Court of India, online e-commerce transactions for firecrackers are prohibited. Our products are displayed here strictly for catalogue/informational convenience. We do not accept online payments. Please use the "Enquire Now" WhatsApp options to coordinate your order estimates.
          </p>
        </div>
      </section>

      {/* 2. Brands Marquee */}
      <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-800 uppercase tracking-wide">Our Trusted Brands</h2>
          <div className="w-16 h-1 bg-secondary-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="flex overflow-hidden group">
          <div className="flex shrink-0 animate-marquee pause-on-hover items-center gap-16 sm:gap-32 pr-16 sm:pr-32">
            {repeatedBrands.map((img, i) => (
              <img key={`marquee1-${i}`} src={img} alt="Brand" className="h-16 sm:h-24 max-w-none shrink-0 object-contain transition-all duration-300 hover:scale-105" />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee pause-on-hover items-center gap-16 sm:gap-32 pr-16 sm:pr-32">
            {repeatedBrands.map((img, i) => (
              <img key={`marquee2-${i}`} src={img} alt="Brand" className="h-16 sm:h-24 max-w-none shrink-0 object-contain transition-all duration-300 hover:scale-105" />
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] bg-secondary-100 rounded-3xl z-0" />
            <img 
              src={img3} 
              alt="Sivakasi Boom Boom Pyrotech Factory Yard" 
              className="relative z-10 w-full h-[450px] object-cover rounded-3xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Pioneering Quality
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-gray-900 mb-6 tracking-tight">
              A LEGACY OF SAFETY & SPLENDOR
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              For decades, Sivakasi Boom Boom Pyrotech has stood as a premier licensed fireworks manufacturer in Sivakasi. We specialize in producing next-generation "Green Crackers" that dramatically lower chemical emissions while amplifying visual grandeur and noise compliance.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Every sparkler, ground chakkar, and sky shot shell is handcrafted using premium-grade minerals and strict safe-assembly principles, ensuring your family can celebrate with peace of mind.
            </p>
            
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-bold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-wider text-sm"
              >
                Read Our Story
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Why Choose Us & Statistics Counter */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-black tracking-widest uppercase mb-4 shadow-sm">
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-6">
              SIVAKASI'S MOST <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">TRUSTED</span> OUTLET
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
              We deliver premium, safe, and certified fireworks directly from our manufacturing units to your celebrations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: ShieldCheck,
                title: 'Family Safe',
                desc: 'Tested thoroughly under CSIR-NEERI guidelines to deliver lower fumes.',
                color: 'from-blue-500 to-cyan-400',
                shadow: 'shadow-blue-500/20'
              },
              {
                icon: Award,
                title: 'High-Density',
                desc: 'Formulated with dense glitter chemistry to produce vibrant cascades.',
                color: 'from-primary-500 to-yellow-400',
                shadow: 'shadow-primary-500/20'
              },
              {
                icon: Factory,
                title: 'Direct Wholesale',
                desc: 'Skip distributor markup. Buy directly from our operations and save.',
                color: 'from-emerald-500 to-green-400',
                shadow: 'shadow-emerald-500/20'
              },
              {
                icon: Users,
                title: 'Brand Integrity',
                desc: 'Providing transparent legal billing and registered transport.',
                color: 'from-secondary-500 to-purple-500',
                shadow: 'shadow-secondary-500/20'
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${card.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-8 text-white shadow-lg ${card.shadow} transform group-hover:rotate-6 transition-transform`}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Statistics Counter Row */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gray-950"></div>
            <div className="absolute inset-0 bg-[url('/skyshots.png')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 to-gray-900/90"></div>
            
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 p-10 sm:p-16 text-center divide-x divide-white/10">
              <div>
                <p className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2">
                  <Counter value="25" suffix="+" />
                </p>
                <p className="text-xs text-primary-400 font-bold uppercase tracking-widest">Years Legacy</p>
              </div>
              <div>
                <p className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2">
                  <Counter value="120" suffix="+" />
                </p>
                <p className="text-xs text-primary-400 font-bold uppercase tracking-widest">Artisans</p>
              </div>
              <div>
                <p className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2">
                  <Counter value="50" suffix="K+" />
                </p>
                <p className="text-xs text-primary-400 font-bold uppercase tracking-widest">Families</p>
              </div>
              <div className="border-t lg:border-t-0 border-white/10 pt-8 lg:pt-0">
                <p className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2">
                  <Counter value="100" suffix="%" />
                </p>
                <p className="text-xs text-primary-400 font-bold uppercase tracking-widest">Certified</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
                Product Categories
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
                CELEBRATE WITH OUR VARIETY
              </h2>
            </div>
            <div>
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full font-bold shadow-sm border border-gray-200 transition-colors uppercase tracking-wider text-xs"
              >
                View Full Catalog
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((cat) => (
              <Link 
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-xl font-bold text-white tracking-tight">
                    {cat.name}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Varieties <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>



      {/* 7. Manufacturing Process Road Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Factory Roadmap
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black text-gray-900 uppercase">
              How We Manufacture Safely
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Our state-of-the-art Sivakasi factories maintain strict chemical compliance and safety guidelines.
            </p>
          </div>

          <div className="relative">
            {/* Center Line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  step: '01',
                  title: 'Raw Material Testing',
                  desc: 'We procure CSIR-NEERI approved oxidizers and test chemical density under strict lab environments to prevent hazards.'
                },
                {
                  step: '02',
                  title: 'Chemical Blending',
                  desc: 'Conducted in humidity-controlled safety rooms by trained chemical engineers wearing specialized static-shielding equipment.'
                },
                {
                  step: '03',
                  title: 'Shell Filling & Fusing',
                  desc: 'Skilled artisans craft paper tubes, place standard fuse cords, and compress lift charges accurately for consistent delay triggers.'
                },
                {
                  step: '04',
                  title: 'Batch Safety Trials',
                  desc: 'Random samples of every batch are lit in our secure testing range to ensure correct decibels, color cascades, and zero misfires.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row items-center gap-8 relative">
                  
                  {/* Left Side */}
                  <div className="w-full lg:w-1/2 lg:text-right lg:pr-8 flex flex-col lg:items-end">
                    {idx % 2 === 0 ? (
                      <>
                        <span className="text-3xl font-black text-primary-500 bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                          {item.step}
                        </span>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-md lg:ml-0">{item.desc}</p>
                      </>
                    ) : null}
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:flex absolute left-1/2 w-4 h-4 rounded-full bg-primary-600 border-4 border-white transform -translate-x-1/2 z-10" />

                  {/* Right Side */}
                  <div className="w-full lg:w-1/2 lg:pl-8 flex flex-col items-start">
                    {idx % 2 !== 0 ? (
                      <>
                        <span className="text-3xl font-black text-secondary-500 bg-secondary-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                          {item.step}
                        </span>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-md">{item.desc}</p>
                      </>
                    ) : null}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Reviews
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black text-gray-900">
              TRUSTED BY THOUSANDS OF FAMILIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 border border-gray-100 rounded-3xl p-8 relative shadow-sm">
                <span className="text-primary-100 text-6xl absolute top-6 right-8 font-serif leading-none">“</span>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4 text-secondary-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10">
                  "{t.quote}"
                </p>

                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-xs text-gray-400 font-semibold">{t.role} &bull; {t.location}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ Accordion */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Faq
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none font-bold text-gray-800 text-base sm:text-lg"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-xl font-bold text-primary-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. Contact Call-to-Action */}
      <section className="bg-gradient-to-r from-primary-850 to-primary-950 py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover opacity-10 mix-blend-overlay" style={{ backgroundImage: `url(${img3})` }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">READY TO BRIGHTEN YOUR EVENTS?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get direct wholesale prices and premium quality fireworks delivered safely to your location. Download our custom price estimation spreadsheet today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full font-bold shadow-md uppercase tracking-wider text-sm transition-transform hover:-translate-y-0.5"
            >
              Get In Touch
            </Link>
            <a
              href="https://wa.me/918122922900?text=I%20want%20to%20download%20the%20price%20list"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full font-bold shadow-md uppercase tracking-wider text-sm transition-transform hover:-translate-y-0.5"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
