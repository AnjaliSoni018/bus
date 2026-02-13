/*
  Warnings:

  - A unique constraint covering the columns `[tripInstanceId,seatId,bookingId]` on the table `BookingSeat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tripInstanceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripInstanceId` to the `BookingSeat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BookingSeat_tripId_seatId_bookingId_key";

-- DropIndex
DROP INDEX "BookingSeat_tripId_seatId_idx";

-- DropIndex
DROP INDEX "Passenger_bookingId_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "tripInstanceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BookingSeat" ADD COLUMN     "tripInstanceId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_tripInstanceId_idx" ON "Booking"("tripInstanceId");

-- CreateIndex
CREATE INDEX "BookingSeat_tripInstanceId_seatId_idx" ON "BookingSeat"("tripInstanceId", "seatId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingSeat_tripInstanceId_seatId_bookingId_key" ON "BookingSeat"("tripInstanceId", "seatId", "bookingId");
