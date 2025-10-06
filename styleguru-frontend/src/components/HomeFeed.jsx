import React from 'react';
import ProductCarousel from './ProductCarousel';

const trendingProducts = [
  {
    id: 't1',
    name: 'Vibrant Summer Dress',
    image: 'https://picsum.photos/seed/t1/400/400',
    description: 'Perfect for sunny days and brunches.',
    price: 1799,
    link: 'https://www.amazon.in/',
    eco: true,
  },
  {
    id: 't2',
    name: 'Minimalist Sneakers',
    image: 'https://picsum.photos/seed/t2/400/400',
    description: 'Goes with everything. Super comfy.',
    price: 2499,
    link: 'https://www.flipkart.com/',
    eco: false,
  },
  {
    id: 't3',
    name: 'Chic Sunglasses',
    image: 'https://picsum.photos/seed/t3/400/400',
    description: 'Protect your eyes in style.',
    price: 899,
    link: 'https://www.flipkart.com/',
    eco: false,
  },
];

const aiPicks = [
  {
    id: 'a1',
    name: 'AI-Recommended Blazer',
    image: 'https://picsum.photos/seed/a1/400/400',
    description: 'Smart, sharp, and sustainable.',
    price: 3999,
    link: 'https://www.amazon.in/',
    eco: true,
  },
  {
    id: 'a2',
    name: 'Eco Yoga Mat',
    image: 'https://picsum.photos/seed/a2/400/400',
    description: 'For your wellness journey.',
    price: 999,
    link: 'https://www.flipkart.com/',
    eco: true,
  },
  {
    id: 'a3',
    name: 'Classic Watch',
    image: 'https://picsum.photos/seed/a3/400/400',
    description: 'A timeless accessory for any outfit.',
    price: 4999,
    link: 'https://www.flipkart.com/',
    eco: false,
  },
];  // End of aiPicks array

// Remove the quizResults array definition

export default function HomeFeed() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Curated For <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">You</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          Personalized recommendations powered by AI.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Trending Now</h3>
        <ProductCarousel products={trendingProducts} />
      </div>
      
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">AI Picks</h3>
        <ProductCarousel products={aiPicks} />
      </div>
    </section>
  );
}