export interface TripSearchQuery {
  sourceCity: string;
  destinationCity: string;
  date: string;
  category?: string;
  minFare?: number;
  maxFare?: number;
}

export interface TripStopResult {
  id: string;
  name: string;
  city: string;
  sequence: number;
  isBoarding: boolean;
  isDropping: boolean;
  scheduledArrival?: Date | null;
  scheduledDeparture?: Date | null;
}

export interface TripSeatStateResult {
  id: string;
  seatId: string;
  seatLabel?: string;
  state: string;
  price?: number;
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
  tripStops: TripStopResult[];
  tripSeatStates: TripSeatStateResult[];
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  baseFare: number;
  currency: string;
}
