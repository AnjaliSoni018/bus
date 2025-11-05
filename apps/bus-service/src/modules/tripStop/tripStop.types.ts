export interface CreateTripStopInput {
  tripId: string;
  routeStopId: string;
  scheduledArrival?: Date;
  scheduledDeparture?: Date;
  sequence: number;
  isBoarding?: boolean;
  isDropping?: boolean;
}

export interface UpdateTripStopInput {
  scheduledArrival?: Date;
  scheduledDeparture?: Date;
  isBoarding?: boolean;
  isDropping?: boolean;
}
