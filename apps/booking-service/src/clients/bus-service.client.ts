import axios from 'axios';
import { AppError } from '../utils/AppError';

const BUS_SERVICE_URL = process.env.BUS_SERVICE_URL!;

export const BusServiceClient = {
  async getTrip(tripId: string) {
    const { data } = await axios.get(
      `${BUS_SERVICE_URL}/api/v1/trip-routes/${tripId}`
    );
    return data?.data;
  },

  async holdSeats(payload: {
    tripId: string;
    seatIds: string[];
    bookingId: string;
    holdUntil: Date;
  }) {
    try {
      await axios.post(
        `${BUS_SERVICE_URL}/api/v1/trip-routes/trips/${payload.tripId}/hold-seats`,
        payload
      );
    } catch (err) {
      throw new AppError('Seat hold failed', 409, err);
    }
  },
};
