export interface CreateRouteDTO {
  sourceCity: string;
  sourceStation?: string;
  destinationCity: string;
  destinationStation?: string;
  distanceKm?: number;
  durationMin?: number;
}

export interface UpdateRouteDTO {
  sourceCity?: string;
  sourceStation?: string;
  destinationCity?: string;
  destinationStation?: string;
  distanceKm?: number;
  durationMin?: number;
}
