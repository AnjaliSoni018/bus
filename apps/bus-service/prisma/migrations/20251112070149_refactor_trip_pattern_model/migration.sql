/*
  Warnings:

  - You are about to drop the column `arrivalAt` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `busId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `departureAt` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `routeId` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `arrivalTime` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureTime` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Made the column `busRouteId` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_busId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_busRouteId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_routeId_fkey";

-- DropIndex
DROP INDEX "Trip_busId_departureAt_idx";

-- DropIndex
DROP INDEX "Trip_routeId_departureAt_idx";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "arrivalAt",
DROP COLUMN "busId",
DROP COLUMN "departureAt",
DROP COLUMN "routeId",
ADD COLUMN     "arrivalTime" TEXT NOT NULL,
ADD COLUMN     "departureTime" TEXT NOT NULL,
ALTER COLUMN "busRouteId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Trip_busRouteId_idx" ON "Trip"("busRouteId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_busRouteId_fkey" FOREIGN KEY ("busRouteId") REFERENCES "BusRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
