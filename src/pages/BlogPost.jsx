import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import blogs from '../data/blogs.json';

export default function BlogPost() {
  const { id } = useParams();

  // Find current post
  const currentPost = blogs.find(post => post.id === id);

  if (!currentPost) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-black text-gray-800 uppercase">Article Not Found</h2>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-primary-600 font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  // Get related posts (excluding the current one)
  const relatedPosts = blogs.filter(post => post.id !== id).slice(0, 2);

  return (
    <div className="pt-20 bg-gray-50/50">
      
      {/* Article Navigation Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary-600 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Main Container */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header content */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-6 sm:p-10 mb-10">
          
          <div className="flex flex-wrap gap-2.5 items-center mb-6">
            <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-primary-50 text-primary-600 uppercase tracking-widest">
              {currentPost.category}
            </span>
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentPost.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight uppercase mb-6">
            {currentPost.title}
          </h1>

          {/* Author Meta */}
          <div className="flex flex-wrap gap-6 items-center text-xs text-gray-500 font-semibold border-y border-gray-100 py-4">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary-500" />
              By {currentPost.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-secondary-500" />
              Published: {currentPost.date}
            </span>
          </div>

          {/* Feature Image */}
          <div className="mt-8 rounded-2xl overflow-hidden h-[300px] sm:h-[400px]">
            <img 
              src={currentPost.image} 
              alt={currentPost.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Main Text */}
          <div className="mt-10 text-gray-700 text-sm sm:text-base leading-relaxed space-y-6 max-w-none">
            <p className="font-semibold text-gray-900 text-lg leading-relaxed">
              {currentPost.description}
            </p>
            
            <p>{currentPost.content}</p>
            
            <p>
              When utilizing firecrackers, safety remains paramount. Ensure children are standing back, always keep bucket setups of sand and water nearby, and do not attempt to re-ignite misfired items. Buy legally compliant green fireworks from licensed Sivakasi distributors like Sivakasi Boom Boom Pyrotech to ensure an emission-compliant, standard, and beautiful celebration.
            </p>
          </div>

          {/* Safety Warning Widget inside article */}
          <div className="mt-10 bg-amber-50 border border-amber-100 p-5 rounded-2xl flex gap-3">
            <ShieldCheck className="text-amber-600 w-6 h-6 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 leading-relaxed font-semibold">
              <p className="uppercase tracking-wider">A Note on Sivakasi Green Standards</p>
              <p className="mt-1 font-normal text-gray-600">
                CSIR-NEERI formulas reduce dust and chemical discharge by 30%. Sivakasi Boom Boom Pyrotech ensures 100% of our supply line adheres strictly to this formulation without sacrificing sound levels or colors.
              </p>
            </div>
          </div>

        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-200/80 pt-10">
            <h3 className="text-lg font-black text-gray-900 uppercase mb-6 tracking-wide">Related Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
                >
                  <img src={post.image} alt={post.title} className="w-full h-40 object-cover shrink-0" />
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <h4 className="font-extrabold text-gray-900 text-sm mt-3 leading-tight uppercase group-hover:text-primary-600 transition-colors line-clamp-2">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase">
                      <span>{post.date}</span>
                      <span className="text-primary-600 group-hover:underline">Read &rarr;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>

    </div>
  );
}
