/*
  Warnings:

  - You are about to drop the column `operatorId` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `operatorId` on the `CancellationPolicy` table. All the data in the column will be lost.
  - You are about to drop the `Operator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `operatorUserId` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bus" DROP CONSTRAINT "Bus_operatorId_fkey";

-- DropForeignKey
ALTER TABLE "CancellationPolicy" DROP CONSTRAINT "CancellationPolicy_operatorId_fkey";

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "operatorId",
ADD COLUMN     "operatorEmail" TEXT,
ADD COLUMN     "operatorName" TEXT,
ADD COLUMN     "operatorPhone" TEXT,
ADD COLUMN     "operatorUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CancellationPolicy" DROP COLUMN "operatorId",
ADD COLUMN     "operatorUserId" TEXT;

-- DropTable
DROP TABLE "Operator";
