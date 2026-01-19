---
# folder structure:
---

src/
├── app.ts
├── main.ts
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

#final flow:

User
↓
booking-service (INITIATE)
↓
bus-service (HOLD SEATS)
↓
booking-service (BOOKING_INITIATED event)
↓
payment-service (PAYMENT_INITIATED)
↓
payment-gateway
↓
payment-service emits:

- PAYMENT_SUCCESS
- PAYMENT_FAILED
  ↓
  booking-service reacts:
- CONFIRM booking
- CANCEL booking
  ↓
  bus-service reacts:
- BOOK seats
- RELEASE seats
  ↓
  notification-service reacts

---

Actors & Ownership (locked)

booking-service

Owns booking lifecycle

Emits booking events

bus-service

Owns seat state

Never trusts booking-service blindly

payment-service

Owns money & gateway truth

Does NOT confirm bookings

notification-service

Pure consumer

---

PHASE A — Seat Hold + Booking Init
User
↓
booking-service

- validate input
- create booking (INITIATED)
  ↓
  bus-service
- atomically hold seats
- return holdToken + expiry
  ↓
  booking-service
- store holdToken + expiresAt
- emit BOOKING_INITIATED

If seat hold fails → booking is deleted or marked CANCELLED.

PHASE B — Payment
BOOKING_INITIATED
↓
payment-service

- create payment intent
- call gateway
- wait for callback

Payment-service emits only facts, not commands.

PHASE C — Resolution
Payment SUCCESS
PAYMENT_SUCCESS
↓
booking-service

- mark CONFIRMED
- emit BOOKING_CONFIRMED
  ↓
  bus-service
- convert HELD → BOOKED
  ↓
  notification-service

Payment FAILED / TIMEOUT
PAYMENT_FAILED
↓
booking-service

- mark PAYMENT_FAILED
- emit BOOKING_CANCELLED
  ↓
  bus-service
- release seats

PHASE D — Expiry (critical)
(now > expiresAt)
↓
booking-service (cron / worker)

- mark EXPIRED
- emit BOOKING_EXPIRED
  ↓
  bus-service
- release seats

No expiry = memory leak of inventory.
