import React, { useState } from 'react';
import { CustomerOrderingModule } from './components/CustomerOrderingModule';
import { DashboardOverview } from './components/DashboardOverview';
import { SalesModule } from './components/SalesModule';
import { InventoryModule } from './components/InventoryModule';
import { OrdersManagement } from './components/OrdersManagement';
import { FinanceMonitoringAnalytics } from './components/FinanceMonitoringAnalytics';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './components/LoginPage';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, ArrowRight, Star, ShieldCheck, Clock, Monitor, Users, Settings, Bell, LogOut } from 'lucide-react';
import { Toaster } from 'sonner';

const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50" />

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2.5 rounded-xl shadow-lg shadow-amber-200">
            <Scissors className="w-6 h-6 text-slate-900" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">Ren-Ren Works</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors uppercase tracking-widest">Collection</a>
          <a href="#" className="text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors uppercase tracking-widest">Story</a>
          <a href="#" className="text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors uppercase tracking-widest">Reviews</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="w-4 h-4" />
            Voted #1 Custom Tailor 2026
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
            Precision Tailoring <br />
            <span className="text-amber-500">For Your Style.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
            Experience the perfect fit with Ren-Ren Works. Our master tailors combine centuries-old craftsmanship with modern technology to create suits that define you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onGetStarted}
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-bold text-lg hover:border-amber-500 transition-all">
              View Collection
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { label: 'Crafted Years', val: '12+', icon: Clock },
              { label: 'Secure Payment', val: '100%', icon: ShieldCheck },
              { label: 'Global Shipping', val: '45', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-amber-500">
                  <stat.icon className="w-4 h-4" />
                  <span className="text-xl font-bold text-slate-900">{stat.val}</span>
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1591944489410-16ec1074a18e?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Tailoring" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating Card */}
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20 max-w-[240px] animate-bounce-slow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 font-bold text-xl">
                R
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Custom Fit</p>
                <p className="text-xs text-slate-500">Guaranteed Precision</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[92%]" />
            </div>
          </div>
        </motion.div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

const App: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'customer' | null>(null);
  const [username, setUsername] = useState('');

  // View states - admin view can toggle between 'admin' and 'monitoring'
  const [viewMode, setViewMode] = useState<'admin' | 'monitoring'>('admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogin = (type: 'admin' | 'customer', user: string) => {
    setIsAuthenticated(true);
    setUserType(type);
    setUsername(user);

    // Set initial view based on user type
    if (type === 'customer') {
      // Customers only see customer view, no toggle options
      setViewMode('admin'); // This won't be used for customers
    } else {
      setViewMode('admin');
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUsername('');
    setViewMode('admin');
    setActiveTab('dashboard');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Customer users can only access customer view
    if (userType === 'customer') {
      return <CustomerOrderingModule />;
    }

    // Admin users can access admin and monitoring views
    if (viewMode === 'monitoring') {
      return <FinanceMonitoringAnalytics />;
    }

    // Admin view - operations only
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview onNavigate={setActiveTab} />;
      case 'sales':
        return <SalesModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'orders':
        return <OrdersManagement />;
      default:
        return <DashboardOverview onNavigate={setActiveTab} />;
    }
  };

  // If user is customer, show only customer view without any admin toggles
  if (userType === 'customer') {
    return (
      <div className="min-h-screen bg-slate-50">
        <Toaster position="top-right" richColors />
        <motion.div
          key="customer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <CustomerOrderingModule />
          {/* Customer logout button */}
          <div className="fixed top-6 right-6 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 flex items-center gap-2">
              <div className="px-4 py-2 text-sm font-medium text-slate-600">
                Welcome, {username}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin view - can toggle between admin and monitoring
  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" richColors />
      
      <AnimatePresence mode="wait">
        {viewMode === 'monitoring' ? (
          // Monitoring view without sidebar - just header and content
          <motion.div 
            key="monitoring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header with Toggle */}
            <header className="bg-white border-b border-slate-100 px-8 py-4 sticky top-0 z-40">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 p-2 rounded-lg">
                      <Scissors className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-slate-900">Ren-Ren Works</h1>
                      <p className="text-xs text-slate-500">Finance and Product Monitoring</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* View Mode Toggle - Admin only */}
                  <div className="bg-slate-50 rounded-2xl p-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setViewMode('admin');
                        setActiveTab('dashboard');
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 text-slate-500 hover:text-slate-900"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin Dashboard
                    </button>
                    <button
                      onClick={() => setViewMode('monitoring')}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 bg-white text-slate-900 shadow-sm"
                    >
                      <Monitor className="w-4 h-4" />
                      Finance & Monitoring
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-600">
                    {username}
                  </div>

                  {/* Notifications & Settings */}
                  <button className="p-2 hover:bg-slate-50 rounded-lg relative">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </button>
                  <button className="p-2 hover:bg-slate-50 rounded-lg">
                    <Settings className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="p-8 max-w-[1600px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key="monitoring-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.div>
        ) : (
          // Admin view with sidebar
          <motion.div 
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              viewMode="admin"
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setIsSidebarCollapsed}
            />
            
            <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
              {/* Header with Toggle */}
              <header className="bg-white border-b border-slate-100 px-8 py-4 sticky top-0 z-40">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-lg font-bold text-slate-900">Admin Dashboard - Operations</h1>
                    <p className="text-xs text-slate-500">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* View Mode Toggle - Admin only (No Customer option) */}
                    <div className="bg-slate-50 rounded-2xl p-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setViewMode('admin');
                          setActiveTab('dashboard');
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 bg-white text-slate-900 shadow-sm"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Dashboard
                      </button>
                      <button
                        onClick={() => setViewMode('monitoring')}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 text-slate-500 hover:text-slate-900"
                      >
                        <Monitor className="w-4 h-4" />
                        Finance & Monitoring
                      </button>
                    </div>

                    {/* User Info */}
                    <div className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-600">
                      {username}
                    </div>

                    {/* Notifications & Settings */}
                    <button className="p-2 hover:bg-slate-50 rounded-lg relative">
                      <Bell className="w-5 h-5 text-slate-600" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <button className="p-2 hover:bg-slate-50 rounded-lg">
                      <Settings className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;