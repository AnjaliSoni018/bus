export interface SeatsHeldEvent {
  tripId: string;
  seatIds: string[];
  holdToken: string;
  expiresAt: string;
}

export interface SeatsBookedEvent {
  tripId: string;
  seatIds: string[];
}

export interface SeatsReleasedEvent {
  tripId: string;
  seatIds: string[];
  reason: string;
}
