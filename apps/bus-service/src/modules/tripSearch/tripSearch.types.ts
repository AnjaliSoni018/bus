export interface TripSearchQuery {
  sourceCity: string;
  destinationCity: string;
  date: string;
  category?: string;
  minFare?: number;
  maxFare?: number;
}

export interface TripSearchResult {
  tripId: string;
  bus: {
    id: string;
    brand?: string;
    category: string;
    registrationNo: string;
    amenities?: string[];
  };
  route: {
    id: string;
    sourceCity: string;
    destinationCity: string;
    distanceKm?: number;
    durationMin?: number;
  };
  departureAt: Date;
  arrivalAt: Date;
  availableSeats: number;
  baseFare: number;
  currency: string;
}
