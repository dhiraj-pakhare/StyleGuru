import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalFocusTrap from './ModalFocusTrap';

export default function UserProfileModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    if (open) {
      setName(localStorage.getItem('userName') || '');
      setAvatar(localStorage.getItem('userAvatar') || '');
    }
  }, [open]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userAvatar', avatar);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.8, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md mx-auto sm:my-12 p-0"
        >
          <ModalFocusTrap open={open} onClose={onClose}>
            <button
              aria-label="Close profile"
              onClick={onClose}
              className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:scale-110 transition"
            >
              <span className="material-icons text-gray-700 dark:text-gray-200">close</span>
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 min-h-[300px] flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Your Profile</h2>
              <div className="mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mx-auto mb-2 flex items-center justify-center">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-icons text-5xl text-gray-400">person</span>
                  )}
                </div>
                <button
                  className="block mx-auto px-3 py-1 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-purple-500 transition-all"
                  onClick={() => fileInputRef.current.click()}
                >
                  {avatar ? 'Change Avatar' : 'Upload Avatar'}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <input
                className="w-full rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base mb-4"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <button
                onClick={handleSave}
                className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                Save
              </button>
            </div>
          </ModalFocusTrap>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 