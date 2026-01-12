---
# folder structure:
---

src/
├── app.ts
├── server.ts
├── routes.ts 👈 Central router aggregator (replaces old routes/index.ts)
├── config/
│ ├── env.ts
│ ├── logger.ts
├── db/
│ ├── prisma.ts
├── modules/
│ ├── bus/
│ │ ├── bus.controller.ts
│ │ ├── bus.service.ts
│ │ ├── bus.routes.ts
│ │ ├── bus.types.ts
│ │ ├── bus.validators.ts
│ ├── route/
│ ├── trip/
│ ├── seat/
│ └── common/
other modules
│ ├── health.controller.ts
│ ├── health.routes.ts
├── middlewares/
│ ├── error.middleware.ts
│ ├── auth.middleware.ts
│ ├── notFound.middleware.ts
├── utils/
│ ├── apiResponse.ts
│ ├── asyncHandler.ts
└── kafka/
├── kafkaClient.ts
├── producers/
├── consumers/

---

Sample file list to implement immediately (I can generate these files for you)
src/modules/bus/
├── bus.controller.ts // routes handlers
├── bus.routes.ts // express Router
├── bus.service.ts // prisma interactions
├── bus.validators.ts // zod schemas
├── bus.types.ts // DTO TS types
├── bus.producer.ts // emits events

---

🚀 So the Real Lifecycle is:

Bus-Service → Create Bus
Registers the physical bus.
Route-Service → Create Route
Defines available routes (city-to-city).
Bus-Service → Assign Route
Create record in BusRoute table linking them.
Trip-Service → Schedule Trip

## Creates specific trip instances for passengers to book.

Excellent step 👏 — this is exactly what a real project lead or architect would do before scaling out further.
Let’s now align everything you’ve built so far with a real-world RedBus-like user journey and see which functional flows are ✅ completed, 🔄 in progress, and ⏳ pending.

🎯 Overall Platform Vision

We’re building a production-grade bus booking system (like RedBus) using:

Node.js + Express + TypeScript

PostgreSQL + Prisma

Nx monorepo (microservice-ready)

Functional architecture (asyncHandler, apiResponse, AppError)

Zod validation

Docker-based deployment

The system should support bus operators, routes, bus scheduling, and later, ticket booking by passengers.

🧭 User Interaction Flow (End-to-End)
1️⃣ Admin / Operator Onboarding

Goal: Register bus operators so they can add buses, routes, and trips.

Step Description Status

1. Operator registration (in user-service) Operator signs up, gets a userId with role BUS_OPERATOR. ✅ (Handled in user-service)
2. Auth service integration Token generation, operator identity verification across services. 🔄 (Integration pending for this microservice)
   2️⃣ Bus Creation Flow

Goal: Operator adds a bus with specifications (category, seats, amenities, etc.)

Feature Description Status
Bus model + schema Created in Prisma ✅
Create bus endpoint Functional + Zod validated ✅
Add seat templates Linked via SeatTemplate (future for layout import) ⏳ (To be expanded)
Add amenities & images BusAmenity + BusImage models ready ⏳ (Feature layer pending)

✅ Outcome so far:
Operator can successfully create and manage basic bus data.

3️⃣ Route Management Flow

Goal: Define city-to-city routes and their intermediate stops.

Feature Description Status
Route model + schema Prisma model with source/destination, distance, etc. ✅
Create route endpoint Functional + validated ✅
Route stops Supports ordered list of stops (RouteStop) ✅
Attach route to buses Done via BusRoute ✅

✅ Outcome so far:
System supports defining any route and linking it with buses.

4️⃣ Bus–Route Linking

Goal: Assign a specific bus to a route, defining effective dates (service duration).

Feature Description Status
BusRoute model + endpoint Connects Bus ↔ Route ✅
Validation Checks for valid bus/route and duplicates ✅

✅ Outcome so far:
A bus is now “live” on a route — foundation for trip scheduling.

5️⃣ Trip Creation & Scheduling

Goal: Schedule trips on a route for specific dates/times, with seat availability and fares.

Feature Description Status
Trip model Created with references to Bus, Route, BusRoute ✅
Trip creation endpoint Fully functional (Zod + AppError) ✅
Pricing strategy + meta Fields ready for dynamic logic ⏳ (Static for now)
Seat state (TripSeatState) Placeholder for booking system ⏳ (To be implemented next)

✅ Outcome so far:
Operator can define when and how the bus runs on a route.

6️⃣ Booking Flow (Passenger Side)

Goal: User searches trips, selects seats, and confirms booking.

Step Description Status
Search trips by route/date Find trips using filters (source, destination, date) ⏳
Show seat layout Derived from SeatTemplate and TripSeatState ⏳
Seat selection & hold Temporarily hold seats before payment ⏳
Payment integration After seat confirmation ⏳
Ticket confirmation + cancellation Uses TripSeatState + CancellationPolicy ⏳

🧩 Outcome: Core data models ready — but booking and seat-state logic pending.

7️⃣ Auxiliary Modules
Module Purpose Status
CancellationPolicy For route- or operator-specific refund rules ✅ (model ready, CRUD pending)
TripStop For trip-specific arrival/departure times ⏳ (next step)
TripLog To track trip events (start, delay, completion) ⏳ (later enhancement)
PricingSnapshot Store pricing versions for dynamic pricing ⏳ (optional future feature)
✅ Summary
Layer Feature Status
Operator Auth Core in user-service 🔄 pending integration
Bus Full CRUD ✅
Route + Stops Full CRUD ✅
BusRoute Link Bus ↔ Route ✅
Trip Creation + validation ✅
TripStop Boarding/Dropping points per trip ⏳ next
Seat states & Booking Holding, reserving, confirming ⏳ later
Pricing & Cancellation Core schema done, logic pending ⏳
Logs & Audit Optional add-on ⏳
🧩 Next Logical Steps

Here’s the most realistic and efficient order to continue:

TripStop module — to link trips with specific stop times.

TripSeatState module — for real-time seat availability.

Trip search API — allow users to find available trips between cities.

Seat booking + hold logic — introduce transaction-safe seat reservation.

## Cancellation policies CRUD + refund logic — finalize operator-side controls.

The Core Idea

Every bus has a seat layout (SeatTemplate) and actual seat records (Seat).
When a bus runs a trip, system creates TripSeatState to track seat bookings.

So basically:

SeatTemplate → defines seat layout design
Seat → defines each physical seat in that template
Bus → uses that template
TripSeatState → shows seat’s status (available/booked) for a trip

🧩 Step-by-Step Real World Flow
STEP 1: SeatTemplate banta hai (layout design stage)

Imagine ek bus company “Orange Travels” new Volvo Sleeper bus la rahi hai.
Designer decide karta hai:

Bus mein 40 seats honge

2 decks (upper/lower)

2+1 arrangement

Kuch seats "woman-only" hongi

They create a record in DB:

SeatTemplate:
id = tpl-1
title = "Volvo Sleeper 2+1 Layout"
totalSeats = 40
layoutJson = {... seat positions map ...}

Then they create 40 Seat records linked to that template:

Seat No Type Deck Row Column
L1 LOWER LOWER 1 1
L2 LOWER LOWER 1 2
U1 UPPER UPPER 1 1
U2 UPPER UPPER 1 2
... ... ... ... ...

So now we have a reusable blueprint — this can be assigned to many buses.

STEP 2: Bus banta hai (physical vehicle)

Now the company adds a new bus:

Bus:
id = bus-101
registrationNo = KA09A1234
brand = Volvo
category = SLEEPER_AC
capacity = 40
totalSeats = 40
busTemplateId = tpl-1 (links to SeatTemplate)

👉 This means:
This physical bus follows the Volvo Sleeper 2+1 layout.

STEP 3: Route define hoti hai

They add a route:

Bengaluru → Hyderabad

Route table mein:

Route:
id = route-1
sourceCity = "Bengaluru"
destinationCity = "Hyderabad"

STEP 4: Bus assign hoti hai route pe

They create a BusRoute record:

BusRoute:
busId = bus-101
routeId = route-1

Now this bus can run trips on that route.

STEP 5: Trip schedule hota hai (daily journey)

Operator creates a trip for 5th Nov 2025:

Trip:
id = trip-5001
busId = bus-101
routeId = route-1
departureAt = 2025-11-05 9:00 PM
arrivalAt = 2025-11-06 6:00 AM
totalSeats = 40
availableSeats = 40
baseFare = 1200

STEP 6: System creates seat states for the trip

Now comes the most important part → TripSeatState.

For this trip, the system copies all seats from SeatTemplate and makes a record for each in TripSeatState:

Trip ID Seat ID SeatLabel State Price
trip-5001 seat-1 L1 AVAILABLE 1200
trip-5001 seat-2 L2 AVAILABLE 1200
trip-5001 seat-3 U1 AVAILABLE 1200
... ... ... ... ...

So each seat now has its own live status for that trip.

STEP 7: User searches and selects seats

User opens app → searches Bengaluru → Hyderabad, 5th Nov
Backend shows available trips with available seats.

From TripSeatState, system shows:

L1, L2, U1, U2 → AVAILABLE

User selects seat L1 → state changes to HELD (temporarily locked for payment):

TripSeatState:
seatLabel = "L1"
state = HELD
holdToken = "xyz123"
heldUntil = 5 minutes from now

STEP 8: User completes payment

After successful payment:

Seat L1 → BOOKED

availableSeats in Trip → decreases from 40 to 39

If user doesn’t pay in time, HELD seats automatically revert to AVAILABLE.

STEP 9: Trip runs

Once the bus departs:

Trip.status → DEPARTED

After arrival → COMPLETED

All TripSeatState are frozen for records.

🧭 Visual Summary (Flow)
SeatTemplate → defines design
│
├── Seat (each seat in layout)
│
└── Bus (uses that template)
│
├── BusRoute (assigns route)
│
└── Trip (specific date/time journey)
│
└── TripSeatState (each seat’s live status)

💡 Example Analogy

Think of it like this:

Real World Database
Bus designer makes a seating plan SeatTemplate
Seats are numbered and fixed Seat
Physical bus is built using that layout Bus
Bus runs a journey on a date Trip
Each seat’s status for that trip (free/booked) TripSeatState
🔁 Why this design is powerful

✅ Reusability → one layout (SeatTemplate) used by 100 buses.
✅ Flexibility → each bus can have its own seat states per trip.
✅ Performance → live booking only touches TripSeatState (fast updates).
✅ Accuracy → physical layout never changes, only seat states change trip to trip.

---

booking-service specific:

generator client {
provider = "prisma-client-js"
output = "../src/generated/prisma"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

enum BookingStatus {
INITIATED // Created but payment not done yet
CONFIRMED // Successfully booked
PAYMENT_FAILED // Payment failed
CANCELLED // Cancelled by user/operator/system
COMPLETED // Trip completed
REFUNDED // Refund issued
}

enum PaymentStatus {
PENDING
SUCCESS
FAILED
REFUNDED
}

enum PaymentMethod {
UPI
CARD
NETBANKING
WALLET
CASH
OTHER
}

enum RefundStatus {
INITIATED
PROCESSING
SUCCESS
FAILED
}

model Booking {
id String @id @default(uuid())
bookingRef String @unique // human-readable booking reference like "RBX123456"
userId String // references user-service.user.id
tripId String // references bus-service.trip.id
operatorUserId String? // for quick reporting (redundant cache)
routeId String? // for analytics & filtering
busId String? // redundant cache for reporting
totalAmount Float
baseFare Float
taxes Float? @default(0)
discount Float? @default(0)
currency String @default("INR")
status BookingStatus @default(INITIATED)
paymentStatus PaymentStatus @default(PENDING)
paymentMethod PaymentMethod?
transactionId String? // from PaymentGateway
bookedSeatsCount Int
bookedSeats BookingSeat[]
passengers Passenger[]
cancellation BookingCancellation?
refund Refund?
payment Payment?

bookedAt DateTime?  
 cancelledAt DateTime?
completedAt DateTime?
expiresAt DateTime? // hold expiry for temporary bookings

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
createdBy String?
updatedBy String?

auditLogs AuditLog[]

@@index([userId, status])
@@index([tripId])
@@index([bookingRef])
}

model BookingSeat {
id String @id @default(uuid())
bookingId String
tripId String
seatId String
seatLabel String?
fare Float
state String? // AVAILABLE / BOOKED / CANCELLED
heldToken String? // For concurrency-safe seat hold
heldUntil DateTime?
createdAt DateTime @default(now())

booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)

@@unique([tripId, seatId, bookingId])
@@index([tripId, seatId])
}

model Passenger {
id String @id @default(uuid())
bookingId String
name String
gender String?
age Int?
seatLabel String?
phone String?
email String?
idProofType String?
idProofNo String?
isPrimary Boolean @default(false)

booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

model Payment {
id String @id @default(uuid())
bookingId String
amount Float
method PaymentMethod
transactionId String? @unique
gatewayResponse Json?
status PaymentStatus @default(PENDING)
initiatedAt DateTime @default(now())
completedAt DateTime?
refundId String?

booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

model Refund {
id String @id @default(uuid())
bookingId String
amount Float
status RefundStatus @default(INITIATED)
initiatedAt DateTime @default(now())
completedAt DateTime?
reason String?
processedBy String?

booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

model BookingCancellation {
id String @id @default(uuid())
bookingId String
reason String?
refundEligible Boolean @default(false)
refundAmount Float? @default(0)
policySnapshot Json? // store cancellation policy details from bus-service
cancelledBy String?
cancelledAt DateTime @default(now())

booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
}

model AuditLog {
id String @id @default(uuid())
entity String
entityId String
action String
performedBy String?
payload Json?
createdAt DateTime @default(now())
ipAddress String?
userAgent String?

@@index([entity, entityId])
}
