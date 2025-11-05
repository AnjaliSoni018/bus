export interface SeatPayload {
  templateId: string;
  seatNo: string;
  seatLabel?: string;
  type?:
    | 'REGULAR'
    | 'LOWER'
    | 'UPPER'
    | 'MIDDLE'
    | 'SIDE_LOWER'
    | 'SIDE_UPPER'
    | 'WOMAN_ONLY'
    | 'WHEELCHAIR';
  row?: number;
  column?: number;
  deck?: number;
  priceFactor?: number;
  genderOnly?: boolean;
}
