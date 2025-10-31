-- CreateEnum
CREATE TYPE "BusStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED');

-- CreateEnum
CREATE TYPE "BusCategory" AS ENUM ('SEATER', 'SLEEPER', 'SEMI_SLEEPER', 'SLEEPER_AC', 'SEATER_AC', 'VOLVO', 'MINI');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('REGULAR', 'LOWER', 'UPPER', 'MIDDLE', 'SIDE_LOWER', 'SIDE_UPPER', 'WOMAN_ONLY', 'WHEELCHAIR');

-- CreateEnum
CREATE TYPE "SeatState" AS ENUM ('AVAILABLE', 'HELD', 'BOOKED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('SCHEDULED', 'CANCELLED', 'DEPARTED', 'COMPLETED', 'DELAYED');

-- CreateEnum
CREATE TYPE "Amenity" AS ENUM ('WIFI', 'CHARGING_POINT', 'BLANKET', 'WATER_BOTTLE', 'AC', 'TV', 'READING_LIGHT', 'LUGGAGE', 'SNACK');

-- CreateEnum
CREATE TYPE "PricingStrategy" AS ENUM ('FIXED', 'DYNAMIC');

-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "operatorUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "category" "BusCategory" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "busTemplateId" TEXT,
    "status" "BusStatus" NOT NULL DEFAULT 'ACTIVE',
    "hasUpperDeck" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "totalSeats" INTEGER NOT NULL,
    "layoutJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SeatTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "seatNo" TEXT NOT NULL,
    "seatLabel" TEXT,
    "type" "SeatType" NOT NULL DEFAULT 'REGULAR',
    "row" INTEGER,
    "column" INTEGER,
    "deck" INTEGER,
    "priceFactor" DOUBLE PRECISION DEFAULT 1.0,
    "genderOnly" BOOLEAN DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "sourceCity" TEXT NOT NULL,
    "sourceStation" TEXT,
    "destinationCity" TEXT NOT NULL,
    "destinationStation" TEXT,
    "distanceKm" DOUBLE PRECISION,
    "durationMin" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteStop" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "sequence" INTEGER NOT NULL,
    "arrivalOffsetMin" INTEGER,
    "isBoardingPoint" BOOLEAN NOT NULL DEFAULT true,
    "isDroppingPoint" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RouteStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusRoute" (
    "id" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "effectiveFrom" TIMESTAMP(3),
    "effectiveTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BusRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "busRouteId" TEXT,
    "departureAt" TIMESTAMP(3) NOT NULL,
    "arrivalAt" TIMESTAMP(3) NOT NULL,
    "durationMin" INTEGER,
    "baseFare" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "TripStatus" NOT NULL DEFAULT 'SCHEDULED',
    "totalSeats" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "pricingStrategy" "PricingStrategy" NOT NULL DEFAULT 'FIXED',
    "pricingMeta" JSONB,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripStop" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "routeStopId" TEXT NOT NULL,
    "scheduledArrival" TIMESTAMP(3),
    "scheduledDeparture" TIMESTAMP(3),
    "sequence" INTEGER NOT NULL,
    "isBoarding" BOOLEAN NOT NULL DEFAULT true,
    "isDropping" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripSeatState" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "seatLabel" TEXT,
    "state" "SeatState" NOT NULL DEFAULT 'AVAILABLE',
    "holdToken" TEXT,
    "heldUntil" TIMESTAMP(3),
    "price" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TripSeatState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusAmenity" (
    "id" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "amenity" "Amenity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusImage" (
    "id" TEXT NOT NULL,
    "busId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CancellationPolicy" (
    "id" TEXT NOT NULL,
    "operatorId" TEXT,
    "routeId" TEXT,
    "policyJson" JSONB NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CancellationPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripLog" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "performedBy" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingSnapshot" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PricingSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventQueue" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "key" TEXT,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nextRetry" TIMESTAMP(3),

    CONSTRAINT "EventQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_operatorUserId_key" ON "Operator"("operatorUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_registrationNo_key" ON "Bus"("registrationNo");

-- CreateIndex
CREATE INDEX "Seat_templateId_seatNo_idx" ON "Seat"("templateId", "seatNo");

-- CreateIndex
CREATE INDEX "Route_sourceCity_destinationCity_idx" ON "Route"("sourceCity", "destinationCity");

-- CreateIndex
CREATE INDEX "RouteStop_routeId_sequence_idx" ON "RouteStop"("routeId", "sequence");

-- CreateIndex
CREATE INDEX "BusRoute_routeId_busId_idx" ON "BusRoute"("routeId", "busId");

-- CreateIndex
CREATE INDEX "Trip_routeId_departureAt_idx" ON "Trip"("routeId", "departureAt");

-- CreateIndex
CREATE INDEX "Trip_busId_departureAt_idx" ON "Trip"("busId", "departureAt");

-- CreateIndex
CREATE INDEX "TripStop_tripId_sequence_idx" ON "TripStop"("tripId", "sequence");

-- CreateIndex
CREATE INDEX "TripSeatState_tripId_seatId_idx" ON "TripSeatState"("tripId", "seatId");

-- CreateIndex
CREATE INDEX "TripSeatState_tripId_state_idx" ON "TripSeatState"("tripId", "state");

-- CreateIndex
CREATE UNIQUE INDEX "BusAmenity_busId_amenity_key" ON "BusAmenity"("busId", "amenity");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "EventQueue_topic_status_idx" ON "EventQueue"("topic", "status");

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_busTemplateId_fkey" FOREIGN KEY ("busTemplateId") REFERENCES "SeatTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "SeatTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusRoute" ADD CONSTRAINT "BusRoute_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusRoute" ADD CONSTRAINT "BusRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_busRouteId_fkey" FOREIGN KEY ("busRouteId") REFERENCES "BusRoute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripStop" ADD CONSTRAINT "TripStop_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripStop" ADD CONSTRAINT "TripStop_routeStopId_fkey" FOREIGN KEY ("routeStopId") REFERENCES "RouteStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripSeatState" ADD CONSTRAINT "TripSeatState_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripSeatState" ADD CONSTRAINT "TripSeatState_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusAmenity" ADD CONSTRAINT "BusAmenity_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusImage" ADD CONSTRAINT "BusImage_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancellationPolicy" ADD CONSTRAINT "CancellationPolicy_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancellationPolicy" ADD CONSTRAINT "CancellationPolicy_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripLog" ADD CONSTRAINT "TripLog_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingSnapshot" ADD CONSTRAINT "PricingSnapshot_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
