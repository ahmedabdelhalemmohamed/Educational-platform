import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
// 1. استيراد النوع الخاص بالمستخدم من مكتبة سوبابيز الرسمية
import type { User } from '@supabase/supabase-js'; 

export const Navbar: React.FC = () => {
  // 2. حددنا نوع الـ state إنه إما يكون كائن User أو null في البداية
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Get current user session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user); // التايب هنا مطابق تماماً الآن
      console.log("Supabase User Object:", user);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm backdrop-blur-md bg-opacity-90 transition-all">
      {/* باقي كود الـ JSX بتاع الـ Navbar زي ما هو بدون أي تغيير */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-200">
              E
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              Edu<span className="text-blue-600">Platform</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Courses</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pathways</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
          </div>

          {/* Desktop Authentication Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <a href="/login" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-2">Sign In</a>
                <a href="/login" className="text-sm font-semibold bg-blue-600 text-white rounded-xl px-5 py-2.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 transition-all duration-200 transform active:scale-95">Start Learning</a>
              </>
            ) : (
              <>
                <a href="/dashboard" className="text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 hover:bg-blue-100 transition-colors">Dashboard</a>
                <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-3 py-2">Sign Out</button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none">
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100 shadow-inner`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-medium">
          <a href="#" className="block px-3 py-2 rounded-lg text-blue-600 bg-blue-50">Home</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">Courses</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">Pathways</a>
          <a href="#" className="block px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">About Us</a>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-100 px-4">
          {!user ? (
            <div className="flex flex-col gap-2">
              <a href="/login" className="w-full text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg py-2.5 transition-colors">Sign In</a>
              <a href="/login" className="w-full text-center text-sm font-semibold bg-blue-600 text-white rounded-xl py-2.5 hover:bg-blue-700 shadow-md transition-all">Start Learning</a>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <a href="/dashboard" className="w-full text-center text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl py-2.5">Dashboard</a>
              <button onClick={handleLogout} className="w-full text-center text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg py-2.5 transition-colors">Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};