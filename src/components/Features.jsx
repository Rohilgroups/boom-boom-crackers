import React from 'react';
import { FaShieldAlt, FaTruck, FaTags, FaThumbsUp } from 'react-icons/fa';

const features = [
  {
    title: '100% Safe & Secure',
    description: 'All our fireworks are manufactured with the highest safety standards in Sivakasi.',
    icon: FaShieldAlt,
  },
  {
    title: 'Wholesale Pricing',
    description: 'Get the best prices in the market directly from the manufacturers.',
    icon: FaTags,
  },
  {
    title: 'Fast Delivery',
    description: 'We ensure safe and timely delivery across Tamil Nadu through authorized transport.',
    icon: FaTruck,
  },
  {
    title: 'Premium Quality',
    description: 'Guaranteed satisfaction with our wide range of colorful and sound fireworks.',
    icon: FaThumbsUp,
  },
];

export default function Features() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Better Way to Celebrate
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Boom Boom PyroTech brings the authentic Sivakasi fireworks experience right to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-bold text-gray-900 tracking-tight">{feature.title}</h3>
                  <p className="mt-5 text-base text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
