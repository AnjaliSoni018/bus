
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.BusScalarFieldEnum = {
  id: 'id',
  operatorUserId: 'operatorUserId',
  operatorName: 'operatorName',
  operatorEmail: 'operatorEmail',
  operatorPhone: 'operatorPhone',
  registrationNo: 'registrationNo',
  brand: 'brand',
  model: 'model',
  category: 'category',
  capacity: 'capacity',
  totalSeats: 'totalSeats',
  busTemplateId: 'busTemplateId',
  status: 'status',
  hasUpperDeck: 'hasUpperDeck',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
};

exports.Prisma.SeatTemplateScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  totalSeats: 'totalSeats',
  layoutJson: 'layoutJson',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.SeatScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  seatNo: 'seatNo',
  seatLabel: 'seatLabel',
  type: 'type',
  row: 'row',
  column: 'column',
  deck: 'deck',
  priceFactor: 'priceFactor',
  genderOnly: 'genderOnly',
  isAvailable: 'isAvailable',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.RouteScalarFieldEnum = {
  id: 'id',
  sourceCity: 'sourceCity',
  sourceStation: 'sourceStation',
  destinationCity: 'destinationCity',
  destinationStation: 'destinationStation',
  distanceKm: 'distanceKm',
  durationMin: 'durationMin',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.RouteStopScalarFieldEnum = {
  id: 'id',
  routeId: 'routeId',
  name: 'name',
  city: 'city',
  latitude: 'latitude',
  longitude: 'longitude',
  sequence: 'sequence',
  arrivalOffsetMin: 'arrivalOffsetMin',
  isBoardingPoint: 'isBoardingPoint',
  isDroppingPoint: 'isDroppingPoint',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.BusRouteScalarFieldEnum = {
  id: 'id',
  busId: 'busId',
  routeId: 'routeId',
  effectiveFrom: 'effectiveFrom',
  effectiveTo: 'effectiveTo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.TripScalarFieldEnum = {
  id: 'id',
  busId: 'busId',
  routeId: 'routeId',
  busRouteId: 'busRouteId',
  departureAt: 'departureAt',
  arrivalAt: 'arrivalAt',
  durationMin: 'durationMin',
  baseFare: 'baseFare',
  currency: 'currency',
  status: 'status',
  totalSeats: 'totalSeats',
  availableSeats: 'availableSeats',
  pricingStrategy: 'pricingStrategy',
  pricingMeta: 'pricingMeta',
  meta: 'meta',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy'
};

exports.Prisma.TripStopScalarFieldEnum = {
  id: 'id',
  tripId: 'tripId',
  routeStopId: 'routeStopId',
  scheduledArrival: 'scheduledArrival',
  scheduledDeparture: 'scheduledDeparture',
  sequence: 'sequence',
  isBoarding: 'isBoarding',
  isDropping: 'isDropping',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TripSeatStateScalarFieldEnum = {
  id: 'id',
  tripId: 'tripId',
  seatId: 'seatId',
  seatLabel: 'seatLabel',
  state: 'state',
  holdToken: 'holdToken',
  heldUntil: 'heldUntil',
  price: 'price',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.BusAmenityScalarFieldEnum = {
  id: 'id',
  busId: 'busId',
  amenity: 'amenity',
  createdAt: 'createdAt'
};

exports.Prisma.BusImageScalarFieldEnum = {
  id: 'id',
  busId: 'busId',
  url: 'url',
  type: 'type',
  caption: 'caption',
  createdAt: 'createdAt'
};

exports.Prisma.CancellationPolicyScalarFieldEnum = {
  id: 'id',
  operatorUserId: 'operatorUserId',
  routeId: 'routeId',
  policyJson: 'policyJson',
  note: 'note',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TripLogScalarFieldEnum = {
  id: 'id',
  tripId: 'tripId',
  event: 'event',
  payload: 'payload',
  createdAt: 'createdAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  entity: 'entity',
  entityId: 'entityId',
  action: 'action',
  performedBy: 'performedBy',
  payload: 'payload',
  createdAt: 'createdAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent'
};

exports.Prisma.PricingSnapshotScalarFieldEnum = {
  id: 'id',
  tripId: 'tripId',
  snapshot: 'snapshot',
  createdAt: 'createdAt'
};

exports.Prisma.EventQueueScalarFieldEnum = {
  id: 'id',
  topic: 'topic',
  key: 'key',
  payload: 'payload',
  status: 'status',
  attempts: 'attempts',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  nextRetry: 'nextRetry'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.BusCategory = exports.$Enums.BusCategory = {
  SEATER: 'SEATER',
  SLEEPER: 'SLEEPER',
  SEMI_SLEEPER: 'SEMI_SLEEPER',
  SLEEPER_AC: 'SLEEPER_AC',
  SEATER_AC: 'SEATER_AC',
  VOLVO: 'VOLVO',
  MINI: 'MINI'
};

exports.BusStatus = exports.$Enums.BusStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MAINTENANCE: 'MAINTENANCE',
  RETIRED: 'RETIRED'
};

exports.SeatType = exports.$Enums.SeatType = {
  REGULAR: 'REGULAR',
  LOWER: 'LOWER',
  UPPER: 'UPPER',
  MIDDLE: 'MIDDLE',
  SIDE_LOWER: 'SIDE_LOWER',
  SIDE_UPPER: 'SIDE_UPPER',
  WOMAN_ONLY: 'WOMAN_ONLY',
  WHEELCHAIR: 'WHEELCHAIR'
};

exports.TripStatus = exports.$Enums.TripStatus = {
  SCHEDULED: 'SCHEDULED',
  CANCELLED: 'CANCELLED',
  DEPARTED: 'DEPARTED',
  COMPLETED: 'COMPLETED',
  DELAYED: 'DELAYED'
};

exports.PricingStrategy = exports.$Enums.PricingStrategy = {
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC'
};

exports.SeatState = exports.$Enums.SeatState = {
  AVAILABLE: 'AVAILABLE',
  HELD: 'HELD',
  BOOKED: 'BOOKED',
  BLOCKED: 'BLOCKED'
};

exports.Amenity = exports.$Enums.Amenity = {
  WIFI: 'WIFI',
  CHARGING_POINT: 'CHARGING_POINT',
  BLANKET: 'BLANKET',
  WATER_BOTTLE: 'WATER_BOTTLE',
  AC: 'AC',
  TV: 'TV',
  READING_LIGHT: 'READING_LIGHT',
  LUGGAGE: 'LUGGAGE',
  SNACK: 'SNACK'
};

exports.Prisma.ModelName = {
  Bus: 'Bus',
  SeatTemplate: 'SeatTemplate',
  Seat: 'Seat',
  Route: 'Route',
  RouteStop: 'RouteStop',
  BusRoute: 'BusRoute',
  Trip: 'Trip',
  TripStop: 'TripStop',
  TripSeatState: 'TripSeatState',
  BusAmenity: 'BusAmenity',
  BusImage: 'BusImage',
  CancellationPolicy: 'CancellationPolicy',
  TripLog: 'TripLog',
  AuditLog: 'AuditLog',
  PricingSnapshot: 'PricingSnapshot',
  EventQueue: 'EventQueue'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/lenovo/bus/apps/bus-service/src/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/lenovo/bus/apps/bus-service/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum BusStatus {\n  ACTIVE\n  INACTIVE\n  MAINTENANCE\n  RETIRED\n}\n\nenum BusCategory {\n  SEATER\n  SLEEPER\n  SEMI_SLEEPER\n  SLEEPER_AC\n  SEATER_AC\n  VOLVO\n  MINI\n}\n\nenum SeatType {\n  REGULAR\n  LOWER\n  UPPER\n  MIDDLE\n  SIDE_LOWER\n  SIDE_UPPER\n  WOMAN_ONLY\n  WHEELCHAIR\n}\n\nenum SeatState {\n  AVAILABLE\n  HELD\n  BOOKED\n  BLOCKED\n}\n\nenum TripStatus {\n  SCHEDULED\n  CANCELLED\n  DEPARTED\n  COMPLETED\n  DELAYED\n}\n\nenum Amenity {\n  WIFI\n  CHARGING_POINT\n  BLANKET\n  WATER_BOTTLE\n  AC\n  TV\n  READING_LIGHT\n  LUGGAGE\n  SNACK\n}\n\nenum PricingStrategy {\n  FIXED\n  DYNAMIC\n}\n\nmodel Bus {\n  id             String      @id @default(uuid())\n  operatorUserId String // corresponds to user.id of the BUS_OPERATOR in user-service\n  operatorName   String? // optional local cache\n  operatorEmail  String? // optional local cache (useful for quick lookups)\n  operatorPhone  String? // optional local cache\n  registrationNo String      @unique\n  brand          String?\n  model          String?\n  category       BusCategory\n  capacity       Int\n  totalSeats     Int\n  busTemplateId  String?\n  status         BusStatus   @default(ACTIVE)\n  hasUpperDeck   Boolean     @default(false)\n  createdAt      DateTime    @default(now())\n  updatedAt      DateTime    @updatedAt\n  isDeleted      Boolean     @default(false)\n\n  createdBy String?\n  updatedBy String?\n\n  seatTemplate SeatTemplate? @relation(\"BusSeatTemplate\", fields: [busTemplateId], references: [id])\n  busAmenities BusAmenity[]\n  busImages    BusImage[]\n  busRoutes    BusRoute[]\n  trips        Trip[]\n}\n\nmodel SeatTemplate {\n  id          String   @id @default(uuid())\n  title       String\n  description String?\n  totalSeats  Int\n  layoutJson  Json?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n  isDeleted   Boolean  @default(false)\n\n  seats Seat[]\n  buses Bus[]  @relation(\"BusSeatTemplate\")\n}\n\nmodel Seat {\n  id          String   @id @default(uuid())\n  templateId  String\n  seatNo      String\n  seatLabel   String?\n  type        SeatType @default(REGULAR)\n  row         Int?\n  column      Int?\n  deck        Int?\n  priceFactor Float?   @default(1.0)\n  genderOnly  Boolean? @default(false)\n  isAvailable Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n  isDeleted   Boolean  @default(false)\n\n  template       SeatTemplate    @relation(fields: [templateId], references: [id], onDelete: Cascade)\n  tripSeatStates TripSeatState[]\n\n  @@index([templateId, seatNo])\n}\n\nmodel Route {\n  id                 String   @id @default(uuid())\n  sourceCity         String\n  sourceStation      String?\n  destinationCity    String\n  destinationStation String?\n  distanceKm         Float?\n  durationMin        Int?\n  createdAt          DateTime @default(now())\n  updatedAt          DateTime @updatedAt\n  isDeleted          Boolean  @default(false)\n\n  stops                RouteStop[]\n  busRoutes            BusRoute[]\n  trips                Trip[]\n  cancellationPolicies CancellationPolicy[]\n\n  @@index([sourceCity, destinationCity])\n}\n\nmodel RouteStop {\n  id               String   @id @default(uuid())\n  routeId          String\n  name             String\n  city             String\n  latitude         Float?\n  longitude        Float?\n  sequence         Int\n  arrivalOffsetMin Int?\n  isBoardingPoint  Boolean  @default(true)\n  isDroppingPoint  Boolean  @default(true)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n  isDeleted        Boolean  @default(false)\n\n  route     Route      @relation(fields: [routeId], references: [id], onDelete: Cascade)\n  tripStops TripStop[]\n\n  @@index([routeId, sequence])\n}\n\nmodel BusRoute {\n  id            String    @id @default(uuid())\n  busId         String\n  routeId       String\n  effectiveFrom DateTime?\n  effectiveTo   DateTime?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  isDeleted     Boolean   @default(false)\n\n  bus   Bus    @relation(fields: [busId], references: [id], onDelete: Cascade)\n  route Route  @relation(fields: [routeId], references: [id], onDelete: Cascade)\n  trips Trip[]\n\n  @@index([routeId, busId])\n}\n\nmodel Trip {\n  id              String          @id @default(uuid())\n  busId           String\n  routeId         String\n  busRouteId      String?\n  departureAt     DateTime\n  arrivalAt       DateTime\n  durationMin     Int?\n  baseFare        Float\n  currency        String          @default(\"INR\")\n  status          TripStatus      @default(SCHEDULED)\n  totalSeats      Int\n  availableSeats  Int\n  pricingStrategy PricingStrategy @default(FIXED)\n  pricingMeta     Json?\n  meta            Json?\n  createdAt       DateTime        @default(now())\n  updatedAt       DateTime        @updatedAt\n  isDeleted       Boolean         @default(false)\n\n  createdBy String?\n  updatedBy String?\n\n  bus              Bus               @relation(fields: [busId], references: [id], onDelete: Cascade)\n  route            Route             @relation(fields: [routeId], references: [id], onDelete: Cascade)\n  busRoute         BusRoute?         @relation(fields: [busRouteId], references: [id])\n  tripStops        TripStop[]\n  tripSeatStates   TripSeatState[]\n  tripLogs         TripLog[]\n  pricingSnapshots PricingSnapshot[]\n\n  @@index([routeId, departureAt])\n  @@index([busId, departureAt])\n}\n\nmodel TripStop {\n  id                 String    @id @default(uuid())\n  tripId             String\n  routeStopId        String\n  scheduledArrival   DateTime?\n  scheduledDeparture DateTime?\n  sequence           Int\n  isBoarding         Boolean   @default(true)\n  isDropping         Boolean   @default(true)\n  createdAt          DateTime  @default(now())\n  updatedAt          DateTime  @updatedAt\n\n  trip      Trip      @relation(fields: [tripId], references: [id], onDelete: Cascade)\n  routeStop RouteStop @relation(fields: [routeStopId], references: [id], onDelete: Cascade)\n\n  @@index([tripId, sequence])\n}\n\nmodel TripSeatState {\n  id        String    @id @default(uuid())\n  tripId    String\n  seatId    String\n  seatLabel String?\n  state     SeatState @default(AVAILABLE)\n  holdToken String?\n  heldUntil DateTime?\n  price     Float?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  isDeleted Boolean   @default(false)\n\n  trip Trip  @relation(fields: [tripId], references: [id], onDelete: Cascade)\n  seat Seat? @relation(fields: [seatId], references: [id], onDelete: SetNull)\n\n  @@index([tripId, seatId])\n  @@index([tripId, state])\n}\n\nmodel BusAmenity {\n  id        String   @id @default(uuid())\n  busId     String\n  amenity   Amenity\n  createdAt DateTime @default(now())\n\n  bus Bus @relation(fields: [busId], references: [id], onDelete: Cascade)\n\n  @@unique([busId, amenity])\n}\n\nmodel BusImage {\n  id        String   @id @default(uuid())\n  busId     String\n  url       String\n  type      String?\n  caption   String?\n  createdAt DateTime @default(now())\n\n  bus Bus @relation(fields: [busId], references: [id], onDelete: Cascade)\n}\n\nmodel CancellationPolicy {\n  id             String   @id @default(uuid())\n  operatorUserId String?\n  routeId        String?\n  policyJson     Json\n  note           String?\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  route Route? @relation(fields: [routeId], references: [id], onDelete: Cascade)\n}\n\nmodel TripLog {\n  id        String   @id @default(uuid())\n  tripId    String\n  event     String\n  payload   Json?\n  createdAt DateTime @default(now())\n\n  trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)\n}\n\nmodel AuditLog {\n  id          String   @id @default(uuid())\n  entity      String\n  entityId    String\n  action      String\n  performedBy String?\n  payload     Json?\n  createdAt   DateTime @default(now())\n  ipAddress   String?\n  userAgent   String?\n\n  @@index([entity, entityId])\n}\n\nmodel PricingSnapshot {\n  id        String   @id @default(uuid())\n  tripId    String\n  snapshot  Json\n  createdAt DateTime @default(now())\n\n  trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)\n}\n\nmodel EventQueue {\n  id        String    @id @default(uuid())\n  topic     String\n  key       String?\n  payload   Json\n  status    String    @default(\"PENDING\")\n  attempts  Int       @default(0)\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  nextRetry DateTime?\n\n  @@index([topic, status])\n}\n",
  "inlineSchemaHash": "bee6bad18a947d1760597228721bfefc5be4f70500d805f1c1ac1d3ac05758fe",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma",
    "generated/prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Bus\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operatorUserId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operatorName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operatorEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operatorPhone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"registrationNo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brand\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"model\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"capacity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalSeats\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busTemplateId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BusStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hasUpperDeck\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatTemplate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SeatTemplate\",\"relationName\":\"BusSeatTemplate\",\"relationFromFields\":[\"busTemplateId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busAmenities\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusAmenity\",\"relationName\":\"BusToBusAmenity\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busImages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusImage\",\"relationName\":\"BusToBusImage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busRoutes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusRoute\",\"relationName\":\"BusToBusRoute\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trips\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trip\",\"relationName\":\"BusToTrip\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SeatTemplate\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalSeats\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"layoutJson\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seats\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Seat\",\"relationName\":\"SeatToSeatTemplate\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"buses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bus\",\"relationName\":\"BusSeatTemplate\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Seat\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"templateId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatNo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatLabel\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SeatType\",\"default\":\"REGULAR\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"row\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"column\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deck\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priceFactor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genderOnly\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isAvailable\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"template\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SeatTemplate\",\"relationName\":\"SeatToSeatTemplate\",\"relationFromFields\":[\"templateId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripSeatStates\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TripSeatState\",\"relationName\":\"SeatToTripSeatState\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Route\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceCity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceStation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationCity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationStation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distanceKm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"durationMin\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stops\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RouteStop\",\"relationName\":\"RouteToRouteStop\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busRoutes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusRoute\",\"relationName\":\"BusRouteToRoute\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trips\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trip\",\"relationName\":\"RouteToTrip\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cancellationPolicies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CancellationPolicy\",\"relationName\":\"CancellationPolicyToRoute\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RouteStop\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"arrivalOffsetMin\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isBoardingPoint\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isDroppingPoint\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"route\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"relationName\":\"RouteToRouteStop\",\"relationFromFields\":[\"routeId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripStops\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TripStop\",\"relationName\":\"RouteStopToTripStop\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BusRoute\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"effectiveFrom\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"effectiveTo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bus\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bus\",\"relationName\":\"BusToBusRoute\",\"relationFromFields\":[\"busId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"route\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"relationName\":\"BusRouteToRoute\",\"relationFromFields\":[\"routeId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trips\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trip\",\"relationName\":\"BusRouteToTrip\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Trip\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busRouteId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departureAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"arrivalAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"durationMin\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"baseFare\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"INR\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TripStatus\",\"default\":\"SCHEDULED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalSeats\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"availableSeats\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pricingStrategy\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PricingStrategy\",\"default\":\"FIXED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pricingMeta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"meta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bus\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bus\",\"relationName\":\"BusToTrip\",\"relationFromFields\":[\"busId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"route\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"relationName\":\"RouteToTrip\",\"relationFromFields\":[\"routeId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busRoute\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusRoute\",\"relationName\":\"BusRouteToTrip\",\"relationFromFields\":[\"busRouteId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripStops\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TripStop\",\"relationName\":\"TripToTripStop\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripSeatStates\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TripSeatState\",\"relationName\":\"TripToTripSeatState\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TripLog\",\"relationName\":\"TripToTripLog\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pricingSnapshots\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PricingSnapshot\",\"relationName\":\"PricingSnapshotToTrip\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TripStop\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routeStopId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scheduledArrival\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scheduledDeparture\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isBoarding\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isDropping\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"trip\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trip\",\"relationName\":\"TripToTripStop\",\"relationFromFields\":[\"tripId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routeStop\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RouteStop\",\"relationName\":\"RouteStopToTripStop\",\"relationFromFields\":[\"routeStopId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TripSeatState\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seatLabel\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SeatState\",\"default\":\"AVAILABLE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"holdToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"heldUntil\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trip\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trip\",\"relationName\":\"TripToTripSeatState\",\"relationFromFields\":[\"tripId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"seat\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Seat\",\"relationName\":\"SeatToTripSeatState\",\"relationFromFields\":[\"seatId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BusAmenity\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amenity\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Amenity\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bus\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bus\",\"relationName\":\"BusToBusAmenity\",\"relationFromFields\":[\"busId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"busId\",\"amenity\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"busId\",\"amenity\"]}],\"isGenerated\":false},\"BusImage\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"busId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caption\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bus\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bus\",\"relationName\":\"BusToBusImage\",\"relationFromFields\":[\"busId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CancellationPolicy\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"operatorUserId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"policyJson\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"route\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"relationName\":\"CancellationPolicyToRoute\",\"relationFromFields\":[\"routeId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TripLog\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"event\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trip\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trip\",\"relationName\":\"TripToTripLog\",\"relationFromFields\":[\"tripId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AuditLog\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entityId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"performedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PricingSnapshot\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tripId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"snapshot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trip\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trip\",\"relationName\":\"PricingSnapshotToTrip\",\"relationFromFields\":[\"tripId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EventQueue\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"topic\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"nextRetry\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"BusStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"INACTIVE\",\"dbName\":null},{\"name\":\"MAINTENANCE\",\"dbName\":null},{\"name\":\"RETIRED\",\"dbName\":null}],\"dbName\":null},\"BusCategory\":{\"values\":[{\"name\":\"SEATER\",\"dbName\":null},{\"name\":\"SLEEPER\",\"dbName\":null},{\"name\":\"SEMI_SLEEPER\",\"dbName\":null},{\"name\":\"SLEEPER_AC\",\"dbName\":null},{\"name\":\"SEATER_AC\",\"dbName\":null},{\"name\":\"VOLVO\",\"dbName\":null},{\"name\":\"MINI\",\"dbName\":null}],\"dbName\":null},\"SeatType\":{\"values\":[{\"name\":\"REGULAR\",\"dbName\":null},{\"name\":\"LOWER\",\"dbName\":null},{\"name\":\"UPPER\",\"dbName\":null},{\"name\":\"MIDDLE\",\"dbName\":null},{\"name\":\"SIDE_LOWER\",\"dbName\":null},{\"name\":\"SIDE_UPPER\",\"dbName\":null},{\"name\":\"WOMAN_ONLY\",\"dbName\":null},{\"name\":\"WHEELCHAIR\",\"dbName\":null}],\"dbName\":null},\"SeatState\":{\"values\":[{\"name\":\"AVAILABLE\",\"dbName\":null},{\"name\":\"HELD\",\"dbName\":null},{\"name\":\"BOOKED\",\"dbName\":null},{\"name\":\"BLOCKED\",\"dbName\":null}],\"dbName\":null},\"TripStatus\":{\"values\":[{\"name\":\"SCHEDULED\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null},{\"name\":\"DEPARTED\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"DELAYED\",\"dbName\":null}],\"dbName\":null},\"Amenity\":{\"values\":[{\"name\":\"WIFI\",\"dbName\":null},{\"name\":\"CHARGING_POINT\",\"dbName\":null},{\"name\":\"BLANKET\",\"dbName\":null},{\"name\":\"WATER_BOTTLE\",\"dbName\":null},{\"name\":\"AC\",\"dbName\":null},{\"name\":\"TV\",\"dbName\":null},{\"name\":\"READING_LIGHT\",\"dbName\":null},{\"name\":\"LUGGAGE\",\"dbName\":null},{\"name\":\"SNACK\",\"dbName\":null}],\"dbName\":null},\"PricingStrategy\":{\"values\":[{\"name\":\"FIXED\",\"dbName\":null},{\"name\":\"DYNAMIC\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "src/generated/prisma/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma/schema.prisma")
