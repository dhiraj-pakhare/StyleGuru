const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * A robust, generic function to handle POST requests with proper error handling.
 *
 * @param {string} endpoint - The API endpoint to hit (e.g., '/eyewear-recommendations').
 * @param {object} body - The JSON body for the request.
 * @returns {Promise<{data: any, error: string | null}>} - An object containing either the response data or an error message.
 */
export async function postRequest(endpoint, body) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Try to parse a specific error message from the backend, otherwise use status text
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // Response was not JSON, ignore
      }
      return { data: null, error: errorMessage };
    }

    const data = await response.json();
    return { data, error: null };

  } catch (error) {
    // This catches network errors (e.g., server is down, DNS issues)
    console.error("Network or fetch error:", error);
    return { data: null, error: 'Failed to connect to the server. Please check your network connection.' };
  }
}

// You can create specific functions for each service like this
export async function fetchAIEyewearRecommendations(profile) {
    return await postRequest('/eyewear-recommendations', profile);
}

// Add other specific API functions as needed, for example:
// export async function getAIOutfitSuggestions(profile) {
//   return await postRequest('/outfit-suggestions', profile);
// } 