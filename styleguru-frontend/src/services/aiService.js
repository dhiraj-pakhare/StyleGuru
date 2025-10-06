// styleguru-frontend/src/services/aiService.js
import { postRequest } from '../api';

/**
 * This service acts as a client to the StyleGuru.ai backend.
 * It uses a shared postRequest function and handles the response structure.
 */

// A generic handler to process the API response.
async function handleApiResponse(responsePromise) {
    try {
        const { data, error } = await responsePromise;
        if (error) {
            // Return null instead of throwing error for 404s
            console.log("API returned error:", error);
            return null;
        }
        return data;
    } catch (err) {
        // Handle network errors or other exceptions
        console.log("API request failed:", err);
        return null;
    }
}

export const getAIOutfitSuggestions = async (profile) => {
  return handleApiResponse(postRequest('outfit-suggestions', profile));
};

export const getAIEyewearRecommendations = async (profile) => {
    return handleApiResponse(postRequest('eyewear-recommendations', profile));
}

export const getAIAccessoriesSuggestions = async (profile) => {
    return handleApiResponse(postRequest('accessories-suggestions', profile));
};

export const getAIDietPlan = async (profile) => {
    return handleApiResponse(postRequest('diet-plan', profile));
}

export const getAICareRoutine = async (profile) => {
    return handleApiResponse(postRequest('care-routine', profile));
};

export const getAIProductSuggestions = async (profile, productType) => {
    return handleApiResponse(postRequest('product-suggestions', { profile, productType }));
};

export const getAIWorkoutPlan = async (profile) => {
    return handleApiResponse(postRequest('workout-plan', profile));
};

// The old mock service code has been migrated to the styleguru-backend.
// This file is now clean and only contains the API client logic. 