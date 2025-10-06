import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon, 
  TrophyIcon, 
  ArrowRightOnRectangleIcon as LoginIcon, 
  ArrowLeftOnRectangleIcon as LogoutIcon 
} from '@heroicons/react/24/outline';
import UserProfileModal from './UserProfileModal';
import AchievementsModal from './AchievementsModal';
import { auth, provider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const NavLink = ({ to, children }) => (
  <Link to={to} className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400 transition-colors font-medium px-3 py-2 rounded-md">
    {children}
  </Link>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setIsAdmin(!!userDoc.data()?.isAdmin);
      } else {
        setIsAdmin(false);
      }
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                StyleGuru.ai
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/">Features</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {currentUser ? (
              <>
                <button onClick={() => setProfileOpen(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Profile">
                  <UserCircleIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
                <button onClick={() => setAchievementsOpen(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Achievements">
                  <TrophyIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
                <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Logout">
                  <LogoutIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
                {isAdmin && <button onClick={() => { /* Open Admin Panel */ }} className="p-2 rounded-full bg-purple-500 text-white">Admin</button>}
              </>
            ) : (
              <button onClick={handleLogin} disabled={isLoggingIn} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Login">
                <LoginIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </button>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" title="Toggle Theme">
              <SunIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 hidden dark:block" />
              <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 block dark:hidden" />
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {/* Mobile Menu Icon */}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/">Features</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
      <UserProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} currentUser={currentUser} />
      <AchievementsModal open={achievementsOpen} onClose={() => setAchievementsOpen(false)} />
    </>
  );
} 