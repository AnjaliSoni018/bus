/*
  Warnings:

  - Made the column `tripInstanceId` on table `TripSeatState` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TripSeatState" ALTER COLUMN "tripInstanceId" SET NOT NULL;
