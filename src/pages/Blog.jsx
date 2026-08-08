import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import blogs from '../data/blogs.json';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredPost = blogs[0];
  const remainingPosts = blogs.slice(1);

  const categories = ['All', 'Safety Guidelines', 'Technology', 'Manufacturing'];

  // Filtering
  const filteredPosts = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      
      {/* Page Header */}
      <section className="py-24 sm:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/page-hero-4.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 drop-shadow-lg">
          <nav className="text-sm text-gray-400 mb-3 flex justify-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary-400">Blog</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">Safety & Celebrations Blog</h1>
        </div>
      </section>

      {/* Featured Article Banner */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xs font-bold tracking-widest text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full inline-block mb-8">
              Featured Article
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-80 lg:h-[400px] object-cover"
              />
              <div className="p-8 lg:p-12">
                <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                
                <h3 className="mt-4 text-2xl sm:text-3xl font-black text-gray-900 leading-tight uppercase hover:text-primary-600 transition-colors">
                  <Link to={`/blog/${featuredPost.id}`}>
                    {featuredPost.title}
                  </Link>
                </h3>
                
                <p className="mt-4 text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {featuredPost.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-400 items-center font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <div className="mt-8">
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Options */}
      <section className="py-8 bg-gray-50 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-250 bg-white text-xs placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-primary-600 text-white shadow-sm' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Listing Grid */}
      <section className="py-16 bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute bottom-4 left-5 text-[10px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight uppercase group-hover:text-primary-600 transition-colors line-clamp-2">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mt-3 line-clamp-3">
                        {post.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-md mx-auto border border-gray-100 rounded-3xl">
              <p className="text-gray-400 font-bold">No articles match your query.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
