// Get the API base URL from environment variables
// In production (Vercel), we use the NEXT_PUBLIC_API_URL or fall back to relative URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

// Helper function for API calls
export async function fetchAPI(endpoint: string, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  console.log(`Fetching from: ${url}`) // Add logging to help debug

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options as any).headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error(`API request failed for ${url}:`, error)
    throw error
  }
}

// Business-related API calls
export const businessAPI = {
  // Get all businesses with optional filters
  getBusinesses: async (params = {}) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString()
    const endpoint = `/api/businesses${queryString ? `?${queryString}` : ""}`
    return fetchAPI(endpoint)
  },

  // Get a single business by ID
  getBusiness: async (id: string) => {
    console.log(`API client: Fetching business with ID: ${id}`)
    return fetchAPI(`/api/businesses/${id}`)
  },

  // Create a new business
  createBusiness: async (data: any) => {
    return fetchAPI("/api/businesses", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

// Category-related API calls
export const categoryAPI = {
  // Get all categories
  getCategories: async () => {
    return fetchAPI("/api/categories")
  },
}

