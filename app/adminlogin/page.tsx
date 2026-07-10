"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const { data } = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('adminToken', data.token);
      router.push('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-lg mx-4 z-10">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-zinc-800 p-8 md:p-12">
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 mb-6 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
              <img src="/IRKLogo.webp" alt="IRK Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Admin Portal
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 mt-2 text-center font-medium text-sm md:text-base">
              Enter your credentials to securely access the dashboard.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-5 py-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2 block" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-zinc-950/50 border-transparent border focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-emerald-500/10 text-slate-800 dark:text-white p-4 transition-all outline-none font-medium"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2 block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-zinc-950/50 border-transparent border focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-emerald-500/10 text-slate-800 dark:text-white p-4 transition-all outline-none font-medium"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] cursor-pointer text-lg tracking-wide flex items-center justify-center gap-2"
            >
              Sign In
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
        
        <p className="text-center text-slate-400 dark:text-zinc-600 mt-8 text-sm font-medium">
          &copy; {new Date().getFullYear()} IRK Innovations. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
