
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  busRouteId: 'busRouteId',
  departureTime: 'departureTime',
  arrivalTime: 'arrivalTime',
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

exports.Prisma.TripInstanceScalarFieldEnum = {
  id: 'id',
  tripId: 'tripId',
  journeyDate: 'journeyDate',
  status: 'status',
  totalSeats: 'totalSeats',
  availableSeats: 'availableSeats',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted'
};

exports.Prisma.TripSeatStateScalarFieldEnum = {
  id: 'id',
  tripInstanceId: 'tripInstanceId',
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
  TripInstance: 'TripInstance',
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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
