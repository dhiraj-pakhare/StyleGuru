import React from 'react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Privacy', href: '#' },
  { name: 'Terms', href: '#' },
  { name: 'Contact', href: '#' },
];

const socials = [
  { name: 'Twitter', href: '#', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z" /></svg>
  ) },
  { name: 'Instagram', href: '#', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
  ) },
  { name: 'LinkedIn', href: '#', icon: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" /></svg>
  ) },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="footer"
      className="bg-white/80 dark:bg-gray-900/80 py-8 px-4 mt-12 shadow-inner rounded-t-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Links */}
        <div className="flex gap-6 mb-2 md:mb-0">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-gray-700 dark:text-gray-200 hover:text-pink-500 transition font-medium">
              {link.name}
            </a>
          ))}
        </div>
        {/* Socials */}
        <div className="flex gap-4">
          {socials.map(social => (
            <a key={social.name} href={social.href} className="text-gray-500 hover:text-pink-500 transition" aria-label={social.name}>
              {social.icon}
            </a>
          ))}
        </div>
        {/* Copyright */}
        <div className="text-xs text-gray-400 mt-2 md:mt-0">&copy; {new Date().getFullYear()} StyleGuru.ai. All rights reserved.</div>
      </div>
    </motion.footer>
  );
} 