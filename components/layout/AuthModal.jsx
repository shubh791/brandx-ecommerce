'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setUser, user, showToast } = useShop();

  const [mode, setMode] = useState(authModalMode || 'login');
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
  });

  useEffect(() => {
    if (authModalMode) setMode(authModalMode);
  }, [authModalMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = formData.name || formData.emailOrPhone.split('@')[0] || 'VIP Member';
    setUser({
      name: displayName,
      email: formData.emailOrPhone,
      phone: '+91 98120 44550',
      isVip: true,
      tier: 'VIP ARCHIVE TIER 01',
      address: 'Flat 402, Block B, Samalkha Grandeur, NH-44, Samalkha, Haryana 132101',
    });
    showToast(
      mode === 'login'
        ? 'Welcome back, ' + displayName + '!'
        : 'Welcome to Brand X VIP, ' + displayName + '!',
      'success'
    );
    closeAuthModal();
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out of Brand X', 'info');
    closeAuthModal();
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-md border border-zinc-300 bg-[#faf9f6] p-6 sm:p-8 shadow-2xl text-zinc-900"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeAuthModal}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center bg-white border border-zinc-200 text-zinc-500 hover:text-black"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {user ? (
              // Logged in
              <div className="text-center py-2 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-black text-white">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-zinc-950">{user.name}</h3>
                  <p className="text-xs font-mono font-bold text-zinc-500 mt-0.5">BRAND X VIP MEMBER</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{user.email || 'Samalkha Member'}</p>
                </div>

                <div className="bg-white p-4 border border-zinc-200 text-left space-y-2 text-xs text-zinc-700">
                  <div className="flex items-center gap-1.5 text-black font-bold font-mono uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Your VIP Privileges</span>
                  </div>
                  <ul className="space-y-1 text-zinc-600 pl-1 font-mono text-[11px]">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      10% discount on orders (Code: BRANDX10)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Free express delivery across India
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#fecaca]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // Auth Form
              <div className="space-y-5">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white border border-zinc-200 text-zinc-700 text-[10px] font-mono uppercase font-bold tracking-widest">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Brand X Member Portal
                  </div>
                  <h3 className="text-2xl font-black font-mono tracking-tight text-zinc-950 uppercase">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {mode === 'login'
                      ? 'Access your orders & saved streetwear archive.'
                      : 'Join the VIP archive for exclusive Samalkha drop alerts.'}
                  </p>
                </div>

                {/* Tab Switcher */}
                <div className="grid grid-cols-2 p-1 bg-white border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={'py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all ' + (mode === 'login' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black')}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={'py-2 text-xs font-mono font-bold tracking-widest uppercase transition-all ' + (mode === 'signup' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black')}
                  >
                    Register
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-zinc-500 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-200 text-black placeholder-zinc-400 focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-zinc-500 mb-1">
                      Email or Mobile Number
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        required
                        placeholder="phone or email address"
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-200 text-black placeholder-zinc-400 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-zinc-500 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-zinc-200 text-black placeholder-zinc-400 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-zinc-800"
                  >
                    {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
                  </button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={closeAuthModal}
                    className="text-[11px] font-mono text-zinc-500 hover:text-black underline uppercase"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
