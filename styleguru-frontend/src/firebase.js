// Firebase config and initialization
import { initializeApp } from 'firebase/app';
// Remove this unused import
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';
// Remove this unused import
// import { getMessaging } from 'firebase/messaging';

// TODO: Replace with your own Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBVUHtKPFXfO29kZ20iAyf5pP7W8n4tRoc",
  authDomain: "styleguru-5c280.firebaseapp.com",
  projectId: "styleguru-5c280",
  storageBucket: "styleguru-5c280.appspot.com",
  messagingSenderId: "1074567179742",
  appId: "1:1074567179742:web:f99f71e77f303a65db414f",
  measurementId: "G-5CYYM1S51Q"
};

const app = initializeApp(firebaseConfig);
// Remove the analytics variable declaration
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const functions = getFunctions(app);
// Remove the messaging variable declaration

// Add a helper to call the local OpenAI proxy
export async function getAIReply(prompt) {
  const response = await fetch('http://localhost:5001/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.reply;
}

// Streaming helper for realtime responses from HF proxy
export async function streamAIReply(prompt, onChunk) {
  const response = await fetch('http://localhost:5001/chat-stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok || !response.body) {
    // Fallback to non-streaming
    const text = await getAIReply(prompt);
    onChunk(text, true);
    return;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value || new Uint8Array(), { stream: !done });
    if (chunkValue) onChunk(chunkValue, done);
  }
}

// Mock API for product recommendations
// Replace these with real API calls (Amazon/Flipkart) later

export async function getProductRecommendations(type) {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 900));
  // Example mock data
  const products = {
    outfit: [
      {
        name: "Classic Black Blazer",
        image: "https://via.placeholder.com/150",
        description: "A timeless black blazer for any occasion.",
        link: "https://www.amazon.in/dp/B07XYZ1234"
      },
      {
        name: "Blue Slim Jeans",
        image: "https://via.placeholder.com/150",
        description: "Comfortable and stylish blue jeans.",
        link: "https://www.flipkart.com/product/p/jeans"
      },
      {
        name: "White Sneakers",
        image: "https://via.placeholder.com/150",
        description: "Versatile sneakers for all outfits.",
        link: "https://www.amazon.in/dp/B07ABC5678"
      }
    ],
    eyewear: [
      {
        name: "Round Metal Frames",
        image: "https://via.placeholder.com/150",
        description: "Trendy round frames for a retro look.",
        link: "https://www.amazon.in/dp/B07EYE1234"
      },
      {
        name: "Wayfarer Sunglasses",
        image: "https://via.placeholder.com/150",
        description: "Classic wayfarers for all face shapes.",
        link: "https://www.flipkart.com/product/p/sunglasses"
      },
      {
        name: "Blue Light Glasses",
        image: "https://via.placeholder.com/150",
        description: "Protect your eyes from screens.",
        link: "https://www.amazon.in/dp/B07BLU1234"
      }
    ],
    diet: [
      {
        name: "Protein Granola Bars",
        image: "https://via.placeholder.com/150",
        description: "Healthy snack for energy on the go.",
        link: "https://www.amazon.in/dp/B07DIET123"
      },
      {
        name: "Organic Quinoa",
        image: "https://via.placeholder.com/150",
        description: "High-protein, gluten-free grain.",
        link: "https://www.flipkart.com/product/p/quinoa"
      },
      {
        name: "Green Tea Pack",
        image: "https://via.placeholder.com/150",
        description: "Boost metabolism and stay refreshed.",
        link: "https://www.amazon.in/dp/B07TEA1234"
      }
    ]
  };
  // Return mock data or error for unknown type
  if (!products[type]) throw new Error("No recommendations found.");
  return products[type];
}

export { db, auth, provider, storage, functions };