import axios from 'axios';
import { AppError } from '../utils/AppError';

const BUS_SERVICE_URL = process.env.BUS_SERVICE_URL!;

export const BusServiceClient = {
  async getTripInstance(tripInstanceId: string) {
    try {
      const { data } = await axios.get(
        `${BUS_SERVICE_URL}/api/v1/trip-instances/${tripInstanceId}`
      );

      return data?.data;
    } catch (err) {
      throw new AppError('TripInstance fetch failed', 404, err);
    }
  },

  async holdSeats(payload: {
    tripInstanceId: string;
    seatIds: string[];
    bookingId: string;
    holdUntil: Date;
  }) {
    try {
      const { data } = await axios.post(
        `${BUS_SERVICE_URL}/api/v1/trip-instances/${payload.tripInstanceId}/hold-seats`,
        payload
      );

      return data?.data;
    } catch (err) {
      throw new AppError('Seat hold failed', 409, err);
    }
  },
};
