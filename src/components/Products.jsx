import React, { useState, useMemo, useEffect } from 'react';
import priceData from '../price_list_2025.json';
import { FaSearch, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
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

  const categories = priceData.categories;
  const categoryNames = ['All Products', ...categories.map(c => c.category)];

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
    <section id="products" className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Price List 2026</h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Build your estimate and order via WhatsApp instantly!
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search crackers..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/3">
            <select
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
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
                      <td colSpan={isMobile ? 5 : 6} className="bg-[#d32f2f] text-white font-bold py-2.5 px-3 text-center border-b border-gray-300 uppercase text-xs sm:text-base tracking-wide">
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
                            <td className="py-2 px-2 text-center font-medium text-gray-600 border-r border-gray-300 text-sm">
                              {product.s_no}
                            </td>
                          )}
                          
                          {/* Image Placeholder */}
                          <td className="py-2 px-0.5 sm:px-1 border-r border-gray-200 align-middle">
                            <div className="flex justify-center">
                              <div className="w-[50px] h-[50px] sm:w-16 sm:h-16 bg-white flex items-center justify-center p-0.5 rounded border border-gray-100 shadow-xs">
                                 <img src={`https://placehold.co/100x100/ffffff/999999?text=${encodeURIComponent(product.name.charAt(0))}`} alt={product.name} className="max-w-full max-h-full object-contain" />
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
            
            <form onSubmit={handleSubmitOrder} className="p-6 space-y-4 text-left">
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
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-2/3 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                  {isSubmitting ? 'Placing Order...' : 'Submit Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
