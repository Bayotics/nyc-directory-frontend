// Get the API base URL from environment variables
// In production (Vercel), we use relative URLs
// In development, we can specify a different base URL if needed
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

// Helper function for API calls
export async function fetchAPI(endpoint: string, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
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
    return fetchAPI(`/api/businesses/${id}`)
  },

  // Create a new business
  createBusiness: async (data: any) => {
    return fetchAPI("/api/businesses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

