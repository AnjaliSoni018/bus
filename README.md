generator client {
provider = "prisma-client-js"
output = "../src/generated/prisma"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}
/_
Enums
_/
enum BusStatus {
ACTIVE
INACTIVE
MAINTENANCE
RETIRED
}

enum BusCategory {
SEATER
SLEEPER
SEMI_SLEEPER
SLEEPER_AC
SEATER_AC
VOLVO
MINI
}

enum SeatType {
REGULAR
LOWER
UPPER
MIDDLE
SIDE_LOWER
SIDE_UPPER
WOMAN_ONLY
WHEELCHAIR
}

enum SeatState {
AVAILABLE
HELD
BOOKED
BLOCKED
}

enum TripStatus {
SCHEDULED
CANCELLED
DEPARTED
COMPLETED
DELAYED
}

enum Amenity {
WIFI
CHARGING_POINT
BLANKET
WATER_BOTTLE
AC
TV
READING_LIGHT
LUGGAGE
SNACK
}

enum PricingStrategy {
FIXED
DYNAMIC
}

/_
Core Models
_/

/_
Operators: minimal local cache of operator identity.
operatorUserId is user.id (from user-service). We keep it as string (no FK).
_/
model Operator {
id String @id @default(uuid())
operatorUserId String @unique
name String
email String?
phone String?
isVerified Boolean @default(false) // mirror from user-service KYC/approval
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

// relations
buses Bus[]
cancellationPolicies CancellationPolicy[]
}

/_
Bus: static details about a physical bus.
_/
model Bus {
id String @id @default(uuid())
operatorId String
registrationNo String @unique
brand String?
model String?
category BusCategory
capacity Int
totalSeats Int
busTemplateId String? // seat template reference
status BusStatus @default(ACTIVE)
hasUpperDeck Boolean @default(false)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

// audit (user-service user id strings)
createdBy String?
updatedBy String?

// relations
operator Operator @relation(fields: [operatorId], references: [id], onDelete: Cascade)
seatTemplates SeatTemplate? @relation(fields: [busTemplateId], references: [id])
busAmenities BusAmenity[]
busImages BusImage[]
busRoutes BusRoute[] // many-to-many via BusRoute
trips Trip[]
}

/_
SeatTemplate: declarative seat map for a bus type / operator / bus.
A seat template maps seats with positions; used to render seat-map UI.
_/
model SeatTemplate {
id String @id @default(uuid())
title String
description String?
totalSeats Int
layoutJson Json? // full layout + coordinates (for UI rendering)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

seats Seat[]
buses Bus[] @relation("TemplateBuses")
}

/_
Seat: seat definitions belonging to a template.
_/
model Seat {
id String @id @default(uuid())
templateId String
seatNo String
seatLabel String? // UI label e.g. "1A"
type SeatType @default(REGULAR)
row Int?
column Int?
deck Int? // 0 => lower, 1 => upper
priceFactor Float? @default(1.0) // multiplier for base fare if seat-specific pricing
genderOnly Boolean? @default(false)
isAvailable Boolean @default(true)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

template SeatTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)
tripSeatStates TripSeatState[]
@@index([templateId, seatNo])
}

/_
Routes & Stops
Route is a logical origin-destination (may include many stops)
_/
model Route {
id String @id @default(uuid())
sourceCity String
sourceStation String? // optional normalized station
destinationCity String
destinationStation String?
distanceKm Float?
durationMin Int? // estimated duration
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

stops RouteStop[]
busRoutes BusRoute[]
trips Trip[] // convenience relation: trips for this route
@@index([sourceCity, destinationCity])
}

/_
RouteStop: ordered stops for a route (boarding/dropping options)
_/
model RouteStop {
id String @id @default(uuid())
routeId String
name String
city String
latitude Float?
longitude Float?
sequence Int // order in route: 1..n
arrivalOffsetMin Int? // minutes from route start (estimate)
isBoardingPoint Boolean @default(true)
isDroppingPoint Boolean @default(true)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

route Route @relation(fields: [routeId], references: [id], onDelete: Cascade)
tripStops TripStop[]
@@index([routeId, sequence])
}

/_
BusRoute: linking bus <-> route for scheduling. A bus can operate on many routes.
_/
model BusRoute {
id String @id @default(uuid())
busId String
routeId String
effectiveFrom DateTime?
effectiveTo DateTime?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

bus Bus @relation(fields: [busId], references: [id], onDelete: Cascade)
route Route @relation(fields: [routeId], references: [id], onDelete: Cascade)
trips Trip[]
@@index([routeId, busId])
}

/_
Trip: a scheduled run of a bus on a specific date/time.
_/
model Trip {
id String @id @default(uuid())
busId String
routeId String
busRouteId String?
departureAt DateTime
arrivalAt DateTime
durationMin Int?
baseFare Float
currency String @default("INR")
status TripStatus @default(SCHEDULED)
totalSeats Int
availableSeats Int
pricingStrategy PricingStrategy @default(FIXED)
pricingMeta Json? // e.g. dynamic pricing rules or snapshot
meta Json? // free-form JSON snapshot (operator notes, tags)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

// audit & owner references
createdBy String? // user.id who created (operator/admin)
updatedBy String?

// relations
bus Bus @relation(fields: [busId], references: [id], onDelete: Cascade)
route Route @relation(fields: [routeId], references: [id], onDelete: Cascade)
busRoute BusRoute? @relation(fields: [busRouteId], references: [id])
tripStops TripStop[]
tripSeatStates TripSeatState[]
tripLogs TripLog[]
@@index([routeId, departureAt])
@@index([busId, departureAt])
}

/_
TripStop: the actual times for each stop for a specific trip (derived from RouteStop + offsets)
Used for boarding/dropping points offering to customers.
_/
model TripStop {
id String @id @default(uuid())
tripId String
routeStopId String
scheduledArrival DateTime?
scheduledDeparture DateTime?
sequence Int
isBoarding Boolean @default(true)
isDropping Boolean @default(true)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)
routeStop RouteStop @relation(fields: [routeStopId], references: [id], onDelete: Cascade)
@@index([tripId, sequence])
}

/_
TripSeatState: dynamic seat status per trip. This is the authoritative seat status in DB.
High-frequency updates expected; index and partition this table in the DB if needed.
_/
model TripSeatState {
id String @id @default(uuid())
tripId String
seatId String // points to Seat.id (from template) OR a seat code string if seats managed per bus
seatLabel String? // duplicate label for faster read
state SeatState @default(AVAILABLE)
holdToken String? // token used for holds (booking-service id or redis hold id)
heldUntil DateTime? // timestamp when hold expires
price Float? // final price for this seat
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
isDeleted Boolean @default(false)

trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)
seat Seat? @relation(fields: [seatId], references: [id], onDelete: SetNull)
@@index([tripId, seatId])
@@index([tripId, state])
}

/_
Amenities & mapping
_/
model BusAmenity {
id String @id @default(uuid())
busId String
amenity Amenity
createdAt DateTime @default(now())

bus Bus @relation(fields: [busId], references: [id], onDelete: Cascade)
@@unique([busId, amenity])
}

/_
Images for buses, seatmaps, operator logos
_/
model BusImage {
id String @id @default(uuid())
busId String
url String
type String? // "seatmap", "banner", "operator_logo"
caption String?
createdAt DateTime @default(now())

bus Bus @relation(fields: [busId], references: [id], onDelete: Cascade)
}

/_
CancellationPolicy: per-operator or per-route policy
_/
model CancellationPolicy {
id String @id @default(uuid())
operatorId String?
routeId String?
policyJson Json // e.g. [{ "beforeMinutes": 360, "refundPercent": 90 }, ...]
note String?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

operator Operator? @relation(fields: [operatorId], references: [id], onDelete: Cascade)
route Route? @relation(fields: [routeId], references: [id], onDelete: Cascade)
}

/_
TripLog & AuditLog
_/
model TripLog {
id String @id @default(uuid())
tripId String
event String // "DELAY", "BOARDING_STARTED", "CANCELLED", etc.
payload Json?
createdAt DateTime @default(now())

trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)
}

model AuditLog {
id String @id @default(uuid())
entity String // e.g. "Bus", "Trip", "Route"
entityId String
action String // CREATE, UPDATE, DELETE
performedBy String? // user.id
payload Json?
createdAt DateTime @default(now())
ipAddress String?
userAgent String?
@@index([entity, entityId])
}

/_
Auxiliary: pricing snapshots, cache tables, etc.
_/
model PricingSnapshot {
id String @id @default(uuid())
tripId String
snapshot Json
createdAt DateTime @default(now())

trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)
}

/_
EventQueue: optional persistent event log for replay
_/
model EventQueue {
id String @id @default(uuid())
topic String
key String?
payload Json
status String @default("PENDING") // PENDING, SENT, FAILED
attempts Int @default(0)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
nextRetry DateTime?
@@index([topic, status])
}

---

# folder structure:

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

Phase 1 — Bus Service (Production-grade, future-proof roadmap & implementation plan)

Awesome — we’ll implement Phase 1 in small, testable increments so each piece is production-quality and pluggable for later phases. Below is a concrete, prioritized plan (deliverables, API contracts, DB interactions, infra/ops checklist, testing, and “done” criteria) so you can start coding immediately and ship safely.

Goals for Phase 1: provide fully working, secure, observable, and well-documented core Bus capabilities that let operators add buses and seat templates, let admins/operators list and manage them, and let other services (search/booking) read canonical bus data. Everything is implemented with production best practices: validation, RBAC, logging, tracing hooks, schema migrations, and event emission hooks.

Phase 1 scope (high level — what we implement now)

Bus core CRUD (create, read, update, soft-delete)

Seat Templates & Seat definitions (create, read) — seat-map JSON + seat entities

Bus Amenities & Bus Images (attach amenities + images metadata)

Operator link & minimal operator sync (use operatorUserId from user-service; validate existence via JWT claims or user-service lookup)

Search / List API (filter by city/route later — for now filter by operator, category, availability)

Health / readiness (already done) + metrics + request logging

Event emission hooks (publish bus.created, bus.updated, seattemplate.created) to Kafka (producer stubbed; real send in next phase)

Database migrations & seed for a few operators, a bus, and a template

API documentation (basic OpenAPI / swagger for the module)

Tests: unit tests for services + integration tests hitting endpoints with an in-memory DB or test Postgres instance

Prioritization & order of implementation (step-by-step)

Project infra already done (app, prisma, routes, health). ✅

Implement BusModule code skeleton (types, validation, controller, service, routes).

Add SeatTemplateModule (template + seats creation, store layout JSON).

Add BusAmenity + BusImage endpoints (simple attach/detach).

Implement List/Search endpoint with pagination, sorting and filtering.

Add event producer wiring and emit events at create/update points (use Kafka client but publish asynchronously + non-blocking).

Add DB seed and migration scripts.

Add tests, documentation, and example curl requests.

Add monitoring/metrics hooks and readiness enhancements.

We will implement items 2–5 in the first coding pass (this is your Phase 1 deliverable).

Deliverables for Phase 1 (concrete)
A. APIs (versioned under /api/v1)
Bus endpoints

POST /api/v1/buses — create bus

Auth: BUS_OPERATOR or ADMIN (JWT)

Body (JSON):

{
"operatorId":"<uuid>",
"registrationNo":"KA01AB1234",
"brand":"Tata",
"model":"Ultra",
"category":"SLEEPER_AC",
"capacity":40,
"totalSeats":40,
"busTemplateId":"<uuid|null>",
"hasUpperDeck":false
}

Responses: 201 created with created bus DTO, 400 validation error, 401/403 auth.

Side effects: write DB, emit bus.created event (async)

GET /api/v1/buses — list buses (paginated)

Query params: page=1&limit=20&operatorId=&category=&isActive=&search=

Response: paginated list with total, items[] (include amenities, seatTemplate minimal)

GET /api/v1/buses/:id — get bus by id

Response includes seatTemplate (if any), amenities, images (metadata), trip count (optional)

PUT /api/v1/buses/:id — update bus (partial)

Auth: BUS_OPERATOR (owner) or ADMIN

Emits bus.updated

DELETE /api/v1/buses/:id — soft-delete (set isDeleted=true)

Auth: BUS_OPERATOR (owner) or ADMIN

SeatTemplate endpoints

POST /api/v1/seat-templates — create seat template

Body:

{
"title":"2+2 Sleeper 40",
"description":"Upper/lower sleeper layout",
"totalSeats":40,
"layoutJson": { /_ coordinates & seat metadata used by UI _/ }
}

Creates SeatTemplate and multiple Seat rows based on layoutJson or separate seats[].

GET /api/v1/seat-templates/:id — get seat template + seats array

GET /api/v1/seat-templates — list templates (for operator)

BusAmenity & BusImage endpoints

PATCH /api/v1/buses/:id/amenities — set amenities (array of Amenity enums)

POST /api/v1/buses/:id/images — add image metadata (URL & type)

B. DTOs / Validation

Use Zod schemas in bus.validators.ts for each endpoint (create/update/list).

Strict validation: UUID checks, enum checks, numeric ranges.

Return precise 4xx messages (shape: { success:false, message, errors?: {...} }).

C. Service layer (Prisma interactions)

Use src/modules/bus/bus.service.ts as internal API:

createBus(dto, actorId) → validate operator ownership (if operator) then prisma.bus.create with nested relations for busAmenities if present.

getBusById(id) → prisma.bus.findUnique({ where: { id }, include: { seatTemplate: true, busAmenities: true, busImages: true }}).

listBuses(query) → prisma.bus.findMany with skip/ take for pagination, orderBy, and where filters (isDeleted=false).

updateBus(id, dto, actor) → ensure RBAC ownership, prisma.bus.update.

softDeleteBus(id) → prisma.bus.update({ data: { isDeleted: true }}).

Important: service methods must be small, testable, and return domain DTOs (map Prisma models to response shapes).

D. RBAC & Auth

Use auth.middleware.ts to validate JWT and attach req.user = { id, role }. For Phase 1, JWT validation can be done by verifying signature and reading sub/role claims (user-service public key verification is recommended).

Authorization rules:

BUS_OPERATOR can create/update/delete only for operatorId matching their user.id.

ADMIN/SUPER_ADMIN can manage everything.

On create: createdBy = req.user.id and updatedBy set.

E. Events (Kafka)

Add kafka/producers/busProducer.ts with functions:

emitBusCreated(payload) — non-blocking: push to Kafka and also write to EventQueue if send fails for retries.

Emit events asynchronously; failures should not block response and should be retried with backoff.

F. Observability & Logging

Use logger (pino) with request ID middleware (generate/propagate X-Request-Id).

Each controller call logs: actor, endpoint, payload size, latency.

Add metrics recording hooks (prom-client or other) for request count, latency histograms, error rates.

G. DB & Indexing (Prisma)

Ensure queries use proper indexes:

@@index([operatorId]) on Bus (we already index on route fields; add explicit operator index if needed).

Partitioning: note TripSeatState is hot — not in Phase 1 but plan for partitioning / sharding later.

H. Testing

Unit tests for bus.service using a mocked Prisma client (or @prisma/client stub).

Integration tests using test Postgres (Docker Compose) that run migrations before tests:

POST /api/v1/buses → GET /api/v1/buses/:id → PUT → DELETE lifecycle test

Add continuous test step in CI pipeline.

I. Docs & Examples

Provide OpenAPI snippets for each endpoint and example curl commands in README.

Example create bus curl:

curl -X POST http://localhost:4002/api/v1/buses \
 -H "Authorization: Bearer <token>" \
 -H "Content-Type: application/json" \
 -d '{ "operatorId":"<uuid>","registrationNo":"KA01AB0001","category":"SEATER","capacity":40,"totalSeats":40 }'

Implementation details & coding conventions (production-grade)

Controllers: thin, just validate, call service, send response.

Services: business logic + Prisma. Handle race conditions (use DB transactions for multi-step operations).

Validators: Zod schemas placed in bus.validators.ts. Reuse schema fragments.

Errors: throw typed errors AppError { message, statusCode, code }. Global error handler maps to responses.

Idempotency: For create endpoints, accept optional idempotency-key header later. For now ensure registrationNo unique constraint prevents duplicates.

Migrations: use prisma migrate in CI and production with blue-green or offline migration strategy (no destructive changes without rollout).

Secrets: use environment variables per 12-factor app. Don’t commit .env.

“Done” criteria for Phase 1 (acceptance)

All API endpoints listed above implemented and passing integration tests.

Prisma migrations applied successfully to test DB; seed script created.

RBAC properly enforced (tested with operator and admin tokens).

Events are emitted on bus/seat template creation (Kafka client integrated, but can be mocked in dev).

OpenAPI docs for these endpoints published (Swagger JSON).

Basic load/latency measurement added (one histogram metric) and logs show request ids.

CI pipeline runs lint, tests, prisma:generate & migration check.

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

Cancellation policies CRUD + refund logic — finalize operator-side controls.
