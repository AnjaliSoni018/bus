export interface SeatTemplatePayload {
  title: string;
  description?: string;
  totalSeats: number;
  layoutJson?: Record<string, any>;
}
