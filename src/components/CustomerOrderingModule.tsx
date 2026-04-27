import React, { useState } from 'react';
import { 
  ShoppingBag, Minus, Plus, X, CreditCard, CheckCircle2, 
  Scissors, ArrowRight, Calendar, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { CustomClothingReservation } from './CustomClothingReservation';

// ============================================
// MOCK PRODUCTS - No API needed
// ============================================
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Custom Italian Silk Suit',
    price: 1200.00,
    category: 'Full Set',
    image: 'https://images.unsplash.com/photo-1594932224491-76077558f62c?auto=format&fit=crop&q=80&w=800',
    description: 'Bespoke tailoring with premium Italian silk. Includes jacket and trousers.'
  },
  {
    id: '2',
    name: 'Woolen Business Blazer',
    price: 650.00,
    category: 'Jacket',
    image: 'https://images.unsplash.com/photo-1598808503744-44d88e632865?auto=format&fit=crop&q=80&w=800',
    description: 'Classic fit wool blazer perfect for professional settings.'
  },
  {
    id: '3',
    name: 'Egyptian Cotton Shirt',
    price: 120.00,
    category: 'Shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    description: 'High-thread count cotton shirt with custom collar options.'
  },
  {
    id: '4',
    name: 'Linen Summer Trousers',
    price: 250.00,
    category: 'Trousers',
    image: 'https://images.unsplash.com/photo-1624371414361-e6e0ed2bf52c?auto=format&fit=crop&q=80&w=800',
    description: 'Breathable linen trousers for tropical climates.'
  },
  {
    id: '5',
    name: 'Custom Tuxedo',
    price: 1800.00,
    category: 'Tuxedo',
    image: 'https://images.unsplash.com/photo-1594932224491-76077558f62c?auto=format&fit=crop&q=80&w=800',
    description: 'Bespoke tuxedo for formal events.'
  }
];

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export const CustomerOrderingModule: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'browsing' | 'payment' | 'success'>('browsing');
  const [showReservation, setShowReservation] = useState(false);
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [isProcessing, setIsProcessing] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Mock checkout - no API call
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setCheckoutStep('success');
      setCart([]);
      setIsCartOpen(false);
      toast.success('Order placed successfully!');
      setIsProcessing(false);
    }, 1500);
  };

  if (showReservation) {
    return <CustomClothingReservation onBack={() => setShowReservation(false)} />;
  }

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md w-full border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
          <p className="text-slate-500 mb-8">Thank you for choosing Ren-Ren Works. Our tailors will contact you shortly for measurements.</p>
          <button 
            onClick={() => {
              setCart([]);
              setCheckoutStep('browsing');
            }}
            className="w-full py-4 bg-amber-500 text-slate-900 font-bold rounded-2xl hover:bg-amber-600 transition-colors"
          >
            Back to Shop
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg shadow-lg shadow-amber-200">
              <Scissors className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-900">Ren-Ren Works</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tailoring Excellence</p>
            </div>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Bespoke Collection</h2>
          <p className="text-slate-500 max-w-2xl">Select from our curated designs or request a consultation for a completely custom creation.</p>
        </div>

        {/* Custom Reservation CTA */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mb-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-amber-200 relative overflow-hidden cursor-pointer"
          onClick={() => setShowReservation(true)}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 text-slate-900" />
                <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Custom Tailoring</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Create Something Unique</h3>
              <p className="text-slate-800 text-lg max-w-xl">
                Book a personalized consultation with our master tailors. Bring your vision to life with completely custom-designed clothing tailored to perfection.
              </p>
            </div>
            <button className="px-8 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 whitespace-nowrap">
              <Calendar className="w-5 h-5" />
              Book Reservation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 mb-1">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-amber-600">₱{product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-3 bg-slate-50 text-slate-900 rounded-xl hover:bg-amber-500 transition-colors group/btn"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Your Order</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingBag className="w-16 h-16 mb-4" />
                    <p className="font-medium text-slate-900">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <p className="text-amber-600 font-bold text-sm mb-3">₱{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-slate-50 rounded-xl px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-amber-500 transition-colors">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-amber-500 transition-colors">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold text-rose-500 hover:text-rose-600 ml-auto">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="text-2xl font-bold text-slate-900">₱{total.toFixed(2)}</span>
                  </div>
                  
                  {checkoutStep === 'payment' ? (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-slate-900 rounded-lg">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-slate-900">Payment Details</span>
                        </div>
                        <div className="space-y-3">
                          <input type="text" placeholder="Card Number" className="w-full p-3 rounded-xl border border-slate-200 text-sm" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM/YY" className="w-full p-3 rounded-xl border border-slate-200 text-sm" />
                            <input type="text" placeholder="CVC" className="w-full p-3 rounded-xl border border-slate-200 text-sm" />
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full py-4 bg-amber-500 text-slate-900 font-bold rounded-2xl shadow-xl shadow-amber-200 hover:bg-amber-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Purchase'}
                        {!isProcessing && <CheckCircle2 className="w-5 h-5" />}
                      </button>
                      <button onClick={() => setCheckoutStep('browsing')} className="w-full text-sm text-slate-500 font-medium py-2">
                        Back to Cart
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      Checkout Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};