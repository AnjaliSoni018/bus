/*
  Warnings:

  - You are about to drop the column `tripId` on the `TripSeatState` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TripSeatState" DROP CONSTRAINT "TripSeatState_tripId_fkey";

-- DropIndex
DROP INDEX "TripSeatState_tripId_seatId_idx";

-- DropIndex
DROP INDEX "TripSeatState_tripId_state_idx";

-- AlterTable
ALTER TABLE "TripSeatState" DROP COLUMN "tripId",
ADD COLUMN     "tripInstanceId" TEXT;

-- CreateTable
CREATE TABLE "TripInstance" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "journeyDate" TIMESTAMP(3) NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'SCHEDULED',
    "totalSeats" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TripInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TripInstance_tripId_journeyDate_idx" ON "TripInstance"("tripId", "journeyDate");

-- CreateIndex
CREATE UNIQUE INDEX "TripInstance_tripId_journeyDate_key" ON "TripInstance"("tripId", "journeyDate");

-- CreateIndex
CREATE INDEX "TripSeatState_tripInstanceId_seatId_idx" ON "TripSeatState"("tripInstanceId", "seatId");

-- CreateIndex
CREATE INDEX "TripSeatState_tripInstanceId_state_idx" ON "TripSeatState"("tripInstanceId", "state");

-- AddForeignKey
ALTER TABLE "TripInstance" ADD CONSTRAINT "TripInstance_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripSeatState" ADD CONSTRAINT "TripSeatState_tripInstanceId_fkey" FOREIGN KEY ("tripInstanceId") REFERENCES "TripInstance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
