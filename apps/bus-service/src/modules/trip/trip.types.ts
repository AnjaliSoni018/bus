import { PricingStrategy, TripStatus } from '../../generated/prisma';
export interface CreateTripDTO {
  busId: string;
  routeId: string;
  busRouteId?: string | null;
  departureAt: string | Date;
  arrivalAt: string | Date;
  baseFare: number;
  currency?: string;
  totalSeats?: number;
  pricingStrategy?: PricingStrategy;
  pricingMeta?: any;
  meta?: any;
  durationMin?: number;
}

export interface UpdateTripDTO {
  departureAt?: string | Date;
  arrivalAt?: string | Date;
  baseFare?: number;
  status?: TripStatus;
  totalSeats?: number;
  pricingMeta?: any;
  meta?: any;
}
