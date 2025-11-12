import { PricingStrategy, TripStatus } from '../../generated/prisma';
export interface CreateTripDTO {
  busRouteId: string;
  departureTime: string;
  arrivalTime: string;
  baseFare: number;
  currency?: string;
  totalSeats?: number;
  pricingStrategy?: PricingStrategy;
  pricingMeta?: any;
  meta?: any;
  durationMin?: number;
}

export interface UpdateTripDTO {
  departureTime?: string;
  arrivalTime?: string;
  baseFare?: number;
  status?: TripStatus;
  totalSeats?: number;
  pricingMeta?: any;
  meta?: any;
}
