export interface CreateBusRouteDTO {
  busId: string;
  routeId: string;
  effectiveFrom?: string | Date | null;
  effectiveTo?: string | Date | null;
}

export interface UpdateBusRouteDTO {
  effectiveFrom?: string | Date | null;
  effectiveTo?: string | Date | null;
}

export interface BusRouteQuery {
  busId?: string;
  routeId?: string;
  activeOnly?: string | boolean;
  page?: number | string;
  limit?: number | string;
}
