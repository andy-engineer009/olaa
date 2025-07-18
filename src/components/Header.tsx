'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token') ? true : false);
  }, []);

  // Mobile navigation items with proper SVG icons
  const mobileNavItems = [
    { 
      name: 'Home', 
      path: '/', 
      active: pathname === '/',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'Booster', 
      path: '/booster', 
      active: pathname === '/booster',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      name: 'Chat', 
      path: '/chat/1', 
      active: pathname.startsWith('/chat'),
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      active: pathname === '/profile',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-orange-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center" onClick={() => router.push('/')}>
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">OLX</span>
              </div>
            </div>

            {/* Right side - Icons, Influencer Button, and Profile */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              {isLoggedIn && (
                <button className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors" onClick={() => router.push('/chat/1')}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
              )}

              {!isLoggedIn && (
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors" onClick={() => router.push('/login')}>
                  Login
                </button>
              )}

              {/* List as Influencer Button */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                List as Influencer
              </button>

              {/* Profile Section */}
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    {/* Profile Image */}
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/api/placeholder/40/40"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-full h-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                    </div>
                    
                    {/* Dropdown Arrow */}
                    <svg
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        isProfileDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">john.doe@example.com</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <a
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => router.push('/booster')}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Booster
                        </a>
                        
                        <a
                          onClick={() => router.push('/profile')}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          View Profile
                        </a>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-1" onClick={() => {
                        localStorage.removeItem('token');
                        setIsLoggedIn(false);
                      }}>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

{!pathname.includes('/detail') && !pathname.includes('/chat') &&  !pathname.includes('/profile') && (
  <>
      {/* Mobile Header - Simple top bar */}
      <header className="bg-white shadow-sm sticky top-0 z-40 hidden md:block">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center" onClick={() => router.push('/')}>
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold text-gray-800">OLX</span>
            </div>

            {/* Right side - Login/Profile */}
            <div className="flex items-center space-x-2">
              {!isLoggedIn && (
                <button 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors text-sm"
                  onClick={() => router.push('/login')}
                >
                  Login
                </button>
              )}
              
              {isLoggedIn && (
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JD</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar - App-like Design */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden shadow-lg">
        <div className="grid grid-cols-5 items-center py-2 px-2 relative">
          {/* Home */}
          <button
            onClick={() => router.push('/')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all duration-300 ${
              pathname === '/' 
                ? 'text-orange-500 bg-orange-50 shadow-sm' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-50'
            }`}
          >
            <div className="mb-0.5">
              <svg className={`w-6 h-6 ${pathname === '/' ? 'text-[#6f43fe]' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/' ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className={`text-xs font-medium transition-colors ${pathname === '/' ? 'text-[#6f43fe]' : 'text-gray-500'}`}>
              Home
            </span>
            {/* {pathname === '/' && (
              <div className="w-1 h-1 bg-orange-500 rounded-full mt-0.5 animate-pulse"></div>
            )} */}
          </button>

          {/* Booster */}
          <button
            onClick={() => router.push('/discover')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all duration-300 ${
              pathname === '/discover' 
                ? 'text-orange-500 bg-orange-50 shadow-sm' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-50'
            }`}
          >
            <div className="mb-0.5">
              <svg className={`w-6 h-6 ${pathname === '/discover' ? 'text-[#6f43fe]' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/discover' ? 2.5 : 2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`text-xs font-medium transition-colors ${pathname === '/discover' ? 'text-[#6f43fe]' : 'text-gray-500'}`}>
              Discover
            </span>
            {/* {pathname === '/booster' && (
              <div className="w-1 h-1 bg-orange-500 rounded-full mt-0.5 animate-pulse"></div>
            )} */}
          </button>
          {/* <button
            onClick={() => router.push('/booster')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all duration-300 ${
              pathname === '/booster' 
                ? 'text-orange-500 bg-orange-50 shadow-sm' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-50'
            }`}
          >
            <div className="mb-0.5">
              <svg className={`w-6 h-6 ${pathname === '/booster' ? 'text-orange-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/booster' ? 2.5 : 2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`text-xs font-medium transition-colors ${pathname === '/booster' ? 'text-orange-500' : 'text-gray-500'}`}>
              Booster
            </span>
 
          </button> */}

          {/* Center - List as Influencer Button (Prominent) */}
          <div className="flex justify-center">
          {/* bg-[#d2fc31] */}
            <button
              onClick={() => router.push(isLoggedIn ? '/infulanceradded' : '/login')}
              className="flex flex-col items-center justify-center w-14 h-14 bg-[#6f43fe] text-[#fff] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-4 border-white -mt-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          {/* Chat */}
          <button
            onClick={() => router.push('/chat/1')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all duration-300 ${
              pathname.startsWith('/chat') 
                ? 'text-orange-500 bg-orange-50 shadow-sm' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-50'
            }`}
          >
            <div className="mb-0.5">
              <svg className={`w-6 h-6 ${pathname.startsWith('/chat') ? 'text-orange-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname.startsWith('/chat') ? 2.5 : 2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className={`text-xs font-medium transition-colors ${pathname.startsWith('/chat') ? 'text-orange-500' : 'text-gray-500'}`}>
              Chat
            </span>
            {/* {pathname.startsWith('/chat') && (
              <div className="w-1 h-1 bg-orange-500 rounded-full mt-0.5 animate-pulse"></div>
            )} */}
          </button>

          {/* Profile */}
          <button
            onClick={() => router.push('/profile')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-all duration-300 ${
              pathname === '/profile' 
                ? 'text-orange-500 bg-orange-50 shadow-sm' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-50'
            }`}
          >
            <div className="mb-0.5">
              <svg className={`w-6 h-6 ${pathname === '/profile' ? 'text-orange-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === '/profile' ? 2.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className={`text-xs font-medium transition-colors ${pathname === '/profile' ? 'text-orange-500' : 'text-gray-500'}`}>
              Profile
            </span>
            {/* {pathname === '/profile' && (
              <div className="w-1 h-1 bg-orange-500 rounded-full mt-0.5 animate-pulse"></div>
            )} */}
          </button>
        </div>
        
        {/* Bottom safe area for devices with home indicator */}
        {/* <div className="h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"></div> */}
      </nav>
      </>
)}
  

      {/* Bottom padding for mobile to account for bottom navigation */}
      {/* <div className="pb-2 md:pb-0"></div> */}
    </>
  );
};

export default Header;
