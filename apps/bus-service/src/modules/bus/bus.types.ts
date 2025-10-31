export interface CreateBusDTO {
  operatorUserId?: string;
  registrationNo: string;
  brand?: string;
  model?: string;
  category: string;
  capacity: number;
  totalSeats: number;
  busTemplateId?: string | null;
  hasUpperDeck?: boolean;
  busImages?: { url: string; type?: string; caption?: string }[];
  amenities?: string[];
}

export interface UpdateBusDTO extends Partial<CreateBusDTO> {}
