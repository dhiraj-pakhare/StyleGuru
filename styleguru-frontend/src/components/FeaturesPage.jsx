import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Features from './Features';
import StyleProfileForm from './StyleProfileForm';
import EyewearForm from './EyewearForm';
import DietPlanForm from './DietPlanForm';
import CareRoutineForm from './CareRoutineForm';
import WorkoutForm from './WorkoutForm';
import OutfitSuggestionsForm from './OutfitSuggestionsForm';
import AccessoriesForm from './AccessoriesForm';
import GenderSelectionModal from './GenderSelectionModal';

export default function FeaturesPage() {
  const [activeForm, setActiveForm] = useState(null);
  const [isGenderModalOpen, setGenderModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (path, profileData) => {
    navigate(path, { state: { profile: { ...profileData, gender } } });
    setActiveForm(null);
    setGender(null);
  };

  const handleOutfitSubmit = (data) => handleFormSubmit('/outfit-recommendations', data);
  const handleEyewearSubmit = (data) => handleFormSubmit('/eyewear-recommendations', data);
  const handleDietSubmit = (data) => handleFormSubmit('/diet-plan', data);
  const handleCareRoutineSubmit = (data) => handleFormSubmit('/care-routine', data);
  const handleWorkoutSubmit = (data) => handleFormSubmit('/workout-plan', data);
  const handleOutfitSuggestionsSubmit = (data) => handleFormSubmit('/outfit-suggestions', data);
  const handleAccessoriesSubmit = (data) => handleFormSubmit('/accessories-suggestions', data);

  const openFeatureFlow = (feature) => {
    setSelectedFeature(feature.key);
    setGenderModalOpen(true);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setGenderModalOpen(false);
    setActiveForm(selectedFeature);
  };

  const closeForm = () => {
    setActiveForm(null);
    setSelectedFeature(null);
    setGender(null);
    setGenderModalOpen(false);
  };

  return (
    <>
      <Hero onGetStarted={() => openFeatureFlow({ key: 'outfit' })} />
      <Features onGetRecommendation={openFeatureFlow} />

      <GenderSelectionModal
        open={isGenderModalOpen}
        onClose={closeForm}
        onSelect={handleGenderSelect}
      />

      {/* Forms will now be controlled by `activeForm` state */}
      <StyleProfileForm 
        open={activeForm === 'outfit'}
        onClose={closeForm}
        onSubmit={handleOutfitSubmit}
      />
      <EyewearForm
        open={activeForm === 'eyewear'}
        onClose={closeForm}
        onSubmit={handleEyewearSubmit}
      />
      <DietPlanForm 
        open={activeForm === 'diet'}
        onClose={closeForm}
        onSubmit={handleDietSubmit}
      />
      <CareRoutineForm
        open={activeForm === 'care'}
        onClose={closeForm}
        onSubmit={handleCareRoutineSubmit}
      />
      <WorkoutForm
        open={activeForm === 'workout'}
        onClose={closeForm}
        onSubmit={handleWorkoutSubmit}
      />
      <OutfitSuggestionsForm
        open={activeForm === 'outfit-suggestions'}
        onClose={closeForm}
        onSubmit={handleOutfitSuggestionsSubmit}
      />
      <AccessoriesForm
        open={activeForm === 'accessories-suggestions'}
        onClose={closeForm}
        onSubmit={handleAccessoriesSubmit}
      />

      {/* Add other forms here as they are built */}
      {/* 
      <DietForm 
        open={activeForm === 'diet'}
        onClose={closeForm}
        onSubmit={handleDietSubmit}
      /> 
      */}
    </>
  );
} 