export interface CreateRouteStopDTO {
  routeId: string;
  name: string;
  city: string;
  latitude?: number;
  longitude?: number;
  sequence: number;
  arrivalOffsetMin?: number;
  isBoardingPoint?: boolean;
  isDroppingPoint?: boolean;
}

export interface UpdateRouteStopDTO {
  name?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  sequence?: number;
  arrivalOffsetMin?: number;
  isBoardingPoint?: boolean;
  isDroppingPoint?: boolean;
}
