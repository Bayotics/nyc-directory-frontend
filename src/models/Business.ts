export interface Business {
    _id: string
    name: string
    category: string
    address: string
    phone?: string
    website?: string
    hours?: string
    description: string
    features?: string[]
    dateAdded: Date
    location: {
      lat: number
      lng: number
    }
  }
  
  