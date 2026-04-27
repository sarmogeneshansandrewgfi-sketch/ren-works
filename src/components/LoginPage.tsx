import React, { useState } from 'react';
import { Scissors, Lock, User, Shield, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginPageProps {
  onLogin: (userType: 'admin' | 'customer', username: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loginType, setLoginType] = useState<'admin' | 'customer'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mock credentials
  const credentials = {
    admin: { username: 'admin', password: 'admin123' },
    customer: { username: 'customer', password: 'customer123' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validCredentials = credentials[loginType];

    if (username === validCredentials.username && password === validCredentials.password) {
      onLogin(loginType, username);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-50 flex items-center justify-center p-6">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Branding */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-20" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-500 p-3 rounded-xl shadow-lg">
                  <Scissors className="w-8 h-8 text-slate-900" />
                </div>
                <span className="text-3xl font-bold text-white">Ren-Ren Works</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome Back</h2>
              <p className="text-slate-300 text-lg mb-8">
                Sign in to access your {loginType === 'admin' ? 'management dashboard' : 'ordering portal'}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Secure Access</p>
                    <p className="text-slate-400 text-sm">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <User className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Personalized Experience</p>
                    <p className="text-slate-400 text-sm">Tailored to your needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h3>
              <p className="text-slate-500">Choose your login type and enter your credentials</p>
            </div>

            {/* Login Type Toggle */}
            <div className="mb-8">
              <div className="bg-slate-100 rounded-2xl p-1.5 flex gap-2">
                <button
                  onClick={() => {
                    setLoginType('admin');
                    setError('');
                    setUsername('');
                    setPassword('');
                  }}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    loginType === 'admin'
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>
                <button
                  onClick={() => {
                    setLoginType('customer');
                    setError('');
                    setUsername('');
                    setPassword('');
                  }}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    loginType === 'customer'
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Customer
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={`Enter ${loginType} username`}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
              >
                Sign In as {loginType === 'admin' ? 'Admin' : 'Customer'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};