import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaSearch, FaWhatsapp, FaTimes } from 'react-icons/fa';
import priceData from '../price_list_2025.json';
import externalProductsData from '../assets/products.json';
import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const imageImports = import.meta.glob('../assets/products/*.{jpg,png,jpeg,webp}', { eager: true, import: 'default' });
const externalProducts = externalProductsData.flatMap(c => c.products || []);

const getImageForProduct = (productName) => {
  const cleanStr = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normName = cleanStr(productName);
  
  // 0. Manual Overrides for tricky spellings or aliases
  const manualOverrides = {
    'chakkar dekuxe': 'groundchackerdeluxe',
    'adiyal 1/4 kg': 'rowdy250gm',
    'adiyal 1/2 kg': 'rowdy500gm',
    '28 chorsa': '28cher',
    '2"single pcs': '2inchfancy1pcs'
  };

  const overrideTarget = manualOverrides[productName.toLowerCase()];
  if (overrideTarget) {
     for (const path in imageImports) {
        if (cleanStr(path).includes(cleanStr(overrideTarget))) return imageImports[path];
     }
  }

  // 1. Exact match in local assets
  for (const path in imageImports) {
    const filename = cleanStr(path.split('/').pop().split('.')[0]);
    if (filename === normName) return imageImports[path];
  }
  
  // 2. Contains match in local assets
  for (const path in imageImports) {
    const filename = cleanStr(path.split('/').pop().split('.')[0]);
    if (filename.length > 3 && (normName.includes(filename) || filename.includes(normName))) return imageImports[path];
  }

  // 3. Token-based fuzzy match for local assets
  const productTokens = productName.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 2);
  for (const path in imageImports) {
    const fileBase = path.split('/').pop().split('.')[0].replace(/([0-9]+)/g, ' $1 ').toLowerCase();
    const fileTokens = fileBase.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 2);
    let matchCount = 0;
    for (const ft of fileTokens) {
        if (productTokens.some(pt => pt.includes(ft) || ft.includes(pt))) {
            matchCount++;
        }
    }
    if (fileTokens.length > 0 && matchCount >= fileTokens.length) {
        return imageImports[path];
    }
  }
  
  // 4. Match from external products.json (for legacy fallbacks)
  for (const extProd of externalProducts) {
    const extNormName = cleanStr(extProd.name);
    if (extNormName === normName || (extNormName.length > 3 && (normName.includes(extNormName) || extNormName.includes(normName)))) {
       if (extProd.image) {
           return extProd.image;
       }
    }
  }

  // 5. Default Fallback
  // Filter out the newly added images to prevent shifting the array and messing up the hash mapping
  const newImages = [
    'candy pop laptop.jpeg', 'cartoon 3pcs fountain.jpeg', 'collie mega crackling (3pcs).jpeg',
    'elite magic mix (5pcs).jpeg', 'ipl mix(2pcs)fountain.jpeg', 'jolly train (3in1) fountain.jpeg',
    'love dose-150.jpeg', 'mega fruit fountain.jpeg', 'vel hand fountain.jpeg',
    '3 1 2 lakshmi.webp', '4 dlx lakshmi.jpg', 'twister laptop.jpeg'
  ];
  
  const keys = Object.keys(imageImports).filter(key => {
    const filename = key.split('/').pop().toLowerCase();
    return !newImages.includes(filename) && !filename.startsWith('vel-fountain'); // Also exclude the old name just in case
  }).sort();

  if (keys.length > 0) {
    const hash = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return imageImports[keys[hash % keys.length]];
  }
  return `https://placehold.co/100x100/ffffff/999999?text=${encodeURIComponent(productName.charAt(0))}`;
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All Products';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [quantities, setQuantities] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '', phone: '', alternatePhone: '', address: '', district: '', state: '', pincode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = priceData.categories;
  const categoryNames = ['All Products', ...categories.map(c => c.category)];

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    if (catName === 'All Products') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  const handleQuantityChange = (id, value) => {
    const val = parseInt(value) || 0;
    setQuantities(prev => ({
      ...prev,
      [id]: val >= 0 ? val : 0
    }));
  };

  const filteredCategories = useMemo(() => {
    return categories.map(cat => {
      // Filter products within the category based on search term
      const filteredProducts = cat.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return {
        ...cat,
        products: filteredProducts
      };
    }).filter(cat => {
      // Filter categories based on selected category and if they have any products matching search
      const matchesCategory = selectedCategory === 'All Products' || cat.category === selectedCategory;
      const hasProducts = cat.products.length > 0;
      return matchesCategory && hasProducts;
    });
  }, [searchTerm, selectedCategory, categories]);

  // Calculate total
  const calculateTotal = () => {
    let total = 0;
    categories.forEach(cat => {
      cat.products.forEach(prod => {
        const qty = quantities[prod.id] || 0;
        total += qty * prod.discount_price;
      });
    });
    return total;
  };

  const totalAmount = calculateTotal();

  const handleCheckoutClick = () => {
     if (totalAmount < 3000) {
       alert("Minimum order amount is Rs. 3000 to enquire on WhatsApp.");
       return;
     }

     let hasItems = false;
     categories.forEach(cat => {
       cat.products.forEach(prod => {
         const qty = quantities[prod.id] || 0;
         if (qty > 0) hasItems = true;
       });
     });
     
     if (!hasItems) {
       alert("Please add some products to your estimate before checking out.");
       return;
     }
     
     setIsModalOpen(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Gather order items
      const orderItems = [];
      categories.forEach(cat => {
         cat.products.forEach(prod => {
           const qty = quantities[prod.id] || 0;
           if (qty > 0) {
             orderItems.push({
               name: prod.name,
               quantity: qty,
               price: prod.discount_price,
               amount: qty * prod.discount_price
             });
           }
         });
      });

      const orderData = {
        customer: customerDetails,
        items: orderItems,
        totalAmount: totalAmount,
        createdAt: serverTimestamp(),
        status: 'pending' // pending, processing, completed
      };

      // Save to Firestore
      await addDoc(collection(db, "orders"), orderData);

      alert("Thank you! Your order has been successfully placed. We will contact you shortly.");
      
      setIsModalOpen(false);
      setQuantities({}); // Clear cart
      
    } catch (err) {
      console.error("Error placing order:", err);
      alert(`There was an issue submitting your order: ${err.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen pb-24">
      
      {/* Page Header */}
      <section className="py-24 sm:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/page-hero-3.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 drop-shadow-lg">
          <nav className="text-sm text-gray-400 mb-3 flex justify-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary-400">Products & Estimate</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">Our Price List 2026</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Build your estimate and order via WhatsApp instantly!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
     
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 mb-8 border border-gray-200">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search crackers..."
              className="block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/3 flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3">
             <span className="text-sm text-gray-500 font-medium whitespace-nowrap hidden lg:block">Category</span>
             <select
               className="block w-full py-3 bg-transparent border-none focus:ring-0 text-gray-700 font-medium"
               value={selectedCategory}
               onChange={(e) => handleCategoryChange(e.target.value)}
             >
               {categoryNames.map(name => (
                 <option key={name} value={name}>{name}</option>
               ))}
             </select>
          </div>
        </div>


        <div className="bg-white border border-gray-200 rounded-xl shadow-md mb-24 overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed">
            <colgroup>
              {!isMobile && <col style={{ width: '60px' }} />}
              <col style={{ width: isMobile ? '15%' : '90px' }} />
              <col style={{ width: isMobile ? '45%' : 'auto' }} />
              <col style={{ width: isMobile ? '16%' : '110px' }} />
              <col style={{ width: isMobile ? '12%' : '90px' }} />
              <col style={{ width: isMobile ? '12%' : '100px' }} />
            </colgroup>
            <thead>
              <tr className="bg-secondary-400 text-gray-900 border-b border-gray-300 text-[10px] sm:text-sm uppercase tracking-wider font-bold">
                {!isMobile && <th className="py-2.5 px-2 text-center border-r border-gray-300">S.No</th>}
                <th className="py-2 px-0.5 sm:px-1 text-center border-r border-gray-300 whitespace-nowrap">Image</th>
                <th className="py-2 px-1 sm:px-2 border-r border-gray-300 text-left">Products</th>
                <th className="py-2 px-0.5 sm:px-1 text-center border-r border-gray-300 whitespace-nowrap">Price</th>
                <th className="py-2 px-0.5 sm:px-1 text-center border-r border-gray-300 whitespace-nowrap">Qty</th>
                <th className="py-2 px-0.5 sm:px-1 text-center whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, catIndex) => (
                  <React.Fragment key={cat.category}>
                    {/* Category Header */}
                    <tr>
                      <td colSpan={isMobile ? 5 : 6} className="bg-primary-600 text-white font-bold py-2.5 px-3 text-center border-b border-gray-300 uppercase text-xs sm:text-base tracking-wide">
                        {cat.category} (80% DIS)
                      </td>
                    </tr>
                    
                    {/* Product Rows */}
                    {cat.products.map((product) => {
                      const qty = quantities[product.id] || '';
                      const amount = (qty ? parseInt(qty) : 0) * product.discount_price;
                      
                      return (
                        <tr key={product.id} className="hover:bg-amber-50/40 transition-colors border-b border-gray-200">
                          {/* S.No */}
                          {!isMobile && (
                            <td className="py-2 px-2 text-center font-medium text-gray-500 border-r border-gray-200 text-sm">
                              {product.s_no}
                            </td>
                          )}
                          
                          {/* Image Placeholder */}
                          <td className="py-2 px-0.5 sm:px-1 border-r border-gray-200 align-middle">
                            <div className="flex justify-center">
                              <div className="w-[50px] h-[50px] sm:w-16 sm:h-16 bg-white flex items-center justify-center p-0.5 rounded border border-gray-100 shadow-xs">
                                 <img 
                                   src={getImageForProduct(product.name)} 
                                   alt={product.name} 
                                   className="max-w-full max-h-full object-contain cursor-pointer hover:scale-110 transition-transform duration-200" 
                                   onClick={() => setSelectedImage(getImageForProduct(product.name))}
                                 />
                              </div>
                            </div>
                          </td>

                          {/* Product Info */}
                          <td className="py-2 px-1 sm:px-2 border-r border-gray-200 text-gray-800 align-middle">
                             <div className="font-semibold text-[11px] sm:text-base text-gray-900 leading-tight mb-0.5 whitespace-normal break-words">{product.name}</div>
                             <div className="inline-block bg-pink-50 text-pink-700 text-[9px] sm:text-xs font-semibold px-1 py-0.5 rounded border border-pink-100 mt-0.5">{product.per}</div>
                          </td>

                          {/* Price */}
                          <td className="py-2 px-0.5 sm:px-1 text-center border-r border-gray-200 align-middle whitespace-nowrap">
                             <div className="flex flex-col items-center justify-center leading-tight">
                               <span className="text-red-500 line-through text-[10px] sm:text-xs">₹{product.rate}</span>
                               <span className="text-green-600 font-bold text-[11px] sm:text-base mt-0.5">₹{product.discount_price}</span>
                             </div>
                          </td>

                          {/* Quantity */}
                          <td className="py-2 px-0.5 sm:px-1 text-center border-r border-gray-200 align-middle">
                             <div className="flex justify-center items-center">
                               <input
                                 type="number"
                                 min="0"
                                 className="w-[48px] sm:w-16 text-center border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:outline-none p-1 text-[11px] sm:text-base bg-white text-gray-800 font-medium m-0"
                                 value={qty}
                                 onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                 placeholder="0"
                               />
                             </div>
                          </td>

                          {/* Amount */}
                          <td className="py-2 px-0.5 sm:px-1 text-center text-gray-900 font-semibold text-[11px] sm:text-base align-middle whitespace-nowrap">
                             ₹{amount}
                          </td>
                        </tr>
                      )
                    })}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={isMobile ? 5 : 6} className="py-12 text-center text-gray-500 text-lg">
                     No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] w-full flex justify-center">
            <button 
              className="absolute -top-12 right-0 sm:-right-12 text-white hover:text-gray-300 text-3xl transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <img 
              src={selectedImage} 
              alt="Product enlarged" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      </div>

      {/* Floating Bottom Bar for Total & Checkout */}
      {totalAmount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50 transform transition-transform translate-y-0 pb-safe">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center gap-4">
             <div className="text-base sm:text-2xl font-bold text-gray-800">
               Total Estimate: <span className="text-primary-600">Rs. {totalAmount}</span>
             </div>
             <button
                onClick={handleCheckoutClick}
                disabled={totalAmount < 3000}
                className={`flex items-center justify-center gap-2 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-8 rounded-full shadow-lg transition-transform text-xs sm:text-base ${
                  totalAmount >= 3000 
                    ? 'bg-green-500 hover:bg-green-600 hover:-translate-y-0.5' 
                    : 'bg-gray-400 cursor-not-allowed opacity-80'
                }`}
             >
                <FaWhatsapp className="text-lg sm:text-2xl" /> 
                {totalAmount >= 3000 ? 'Send Order on WhatsApp' : 'Min Rs. 3000'}
             </button>
          </div>
        </div>
      )}
      {/* Customer Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitOrder} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" name="name" required value={customerDetails.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Your full name" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" name="phone" required value={customerDetails.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="10-digit number" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                  <input type="tel" name="alternatePhone" value={customerDetails.alternatePhone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Optional" />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <textarea name="address" required value={customerDetails.address} onChange={handleInputChange} rows="2" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Street address, building, etc."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                  <input type="text" name="district" required value={customerDetails.district} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input type="text" name="state" required value={customerDetails.state} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                  <input type="text" name="pincode" required value={customerDetails.pincode} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="w-full sm:w-1/3 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-2/3 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg shadow hover:bg-primary-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                  {isSubmitting ? 'Placing Order...' : 'Submit Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
