import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotButton from './components/ChatbotButton';
import ChatbotModal from './components/ChatbotModal';
import HomePage from './components/HomePage';
import FeaturesPage from './components/FeaturesPage';
import RecommendationPage from './components/RecommendationPage';
import EyewearRecommendationPage from './components/EyewearRecommendationPage';
import DietPlanPage from './components/DietPlanPage';
import CareRoutinePage from './components/CareRoutinePage';
import WorkoutPlanPage from './components/WorkoutPlanPage';
import OutfitSuggestionsPage from './components/OutfitSuggestionsPage';
import AccessoriesPage from './components/AccessoriesPage';

function App() {
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:to-black">
        <a
          href="#main-content"
          className="absolute left-2 top-2 z-[10000] bg-white dark:bg-gray-900 text-purple-600 dark:text-pink-300 px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-pink-400 transition-transform -translate-y-16 focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<FeaturesPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/outfit-recommendations" element={<RecommendationPage />} />
            <Route path="/eyewear-recommendations" element={<EyewearRecommendationPage />} />
            <Route path="/diet-plan" element={<DietPlanPage />} />
            <Route path="/care-routine" element={<CareRoutinePage />} />
            <Route path="/workout-plan" element={<WorkoutPlanPage />} />
            <Route path="/outfit-suggestions" element={<OutfitSuggestionsPage />} />
            <Route path="/accessories-suggestions" element={<AccessoriesPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatbotButton onClick={() => setAiChatOpen(true)} />
        <ChatbotModal open={aiChatOpen} onClose={() => setAiChatOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
