import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Target, Award, ShieldAlert, Zap, Factory } from 'lucide-react';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';
import img5 from '../assets/images/img5.jpg';
import AboutHero from '../assets/Hero-img/About-Hero.png';  

export default function About() {
  const gallery = [
    {
      url: img1,
      caption: 'Artisanal Assembly'
    },
    {
      url: img2,
      caption: 'Sparkler Testing Range'
    },
    {
      url: img3,
      caption: 'Precision Mixing'
    },
    {
      url: img4,
      caption: 'Aerial Shell Shelling'
    },
    {
      url: img5,
      caption: 'Color Contrast Trials'
    },
    {
      url: img1,
      caption: 'Final Packaging'
    }
  ];

  return (
    <div className="pt-20">
      
      {/* Page Header & Breadcrumbs */}
      <section className="py-24 sm:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${AboutHero})` }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 drop-shadow-lg">
          <nav className="text-sm text-gray-400 mb-3 flex justify-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary-400">About Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">About Sivakasi Boom Boom Pyrotech</h1>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Our Identity
            </span>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Pioneering Safe Celebrations</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Established with a core objective of safety and splendor, Sivakasi Boom Boom Pyrotech has grown into a leading fireworks manufacturer in Sivakasi, Tamil Nadu. We pride ourselves on creating standard, certified products that transform all national and personal celebrations into a festival of safety and colors.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our factory operates under licenses issued by the Petroleum and Explosives Safety Organisation (PESO) and adheres to CSIR-NEERI standards. We formulate green crackers that suppress smoke particles while preserving the classic crackling sounds and visual shimmers families love.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={img4} 
              alt="Sivakasi Boom Boom Pyrotech Factory" 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex gap-6 items-start">
            <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To be the global benchmark in safety-first pyrotechnics, developing chemical formulations that drastically minimize ecological impact while delivering unmatched brilliance to festive lighting.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex gap-6 items-start">
            <div className="p-4 bg-secondary-50 text-secondary-600 rounded-2xl shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To manufacture and distribute certified, low-smoke green crackers directly from our Sivakasi operations, bypassing middlemen to pass maximum quality and direct savings onto Indian households.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Manufacturing Excellence & Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Factory Guidelines
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">
              MANUFACTURING EXCELLENCE & QA
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col h-full">
              <Factory className="w-8 h-8 text-primary-600 mb-6" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Advanced Facilities</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our Sivakasi campus features isolated chemical storage units, humidity-locking assembly structures, and automated packaging systems, avoiding friction or ignition hazards.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col h-full">
              <Award className="w-8 h-8 text-secondary-500 mb-6" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Green Formulations</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                By replacing barium nitrate with non-hazardous additives certified by CSIR-NEERI, our green crackers reduce toxic particulate emission levels by nearly 30%.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col h-full">
              <ShieldAlert className="w-8 h-8 text-red-500 mb-6" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Rigorous QA Testing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Before packaging, random sample units from every line are fired at our private range. Decibels, sparks, and fuse timings are tracked via telemetry equipment to secure zero misfires.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Safety Standards Section */}
      <section className="py-20 bg-gray-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest text-secondary-400 uppercase bg-secondary-950 border border-secondary-500/20 px-3.5 py-1.5 rounded-full">
              Strict Directives
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-white">
              UNCOMPROMISING FACTORY SAFETY STANDARDS
            </h2>
            <p className="mt-6 text-gray-400 leading-relaxed text-sm">
              We employ a certified Safety Officer who inspects the plant daily. Our production rooms are restricted to four artisans max to prevent overcrowding, and chemical mixtures are blended under natural sunlight to maintain optimal humidity levels.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Non-sparking brass tools only for chemical loading.',
                '100% static-shielded copper earthing plates in every workhouse.',
                'Mandatory safety gear including flame-resistant cotton workwear.',
                'Continuous CSIR-NEERI audit tracking for compliance validation.'
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-300">
                  <Zap className="w-5 h-5 text-primary-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gray-800">
            <img 
              src={img5} 
              alt="Safe Assembly lines" 
              className="w-full h-[400px] object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full">
              Snapshots
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 uppercase">
              Inside Our Manufacturing Unit
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Visual glimpses of our daily assembly, safety range, and quality tests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden shadow-md group h-64">
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6" />
                <span className="absolute bottom-6 left-6 text-white font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-lg">
                  {img.caption}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
