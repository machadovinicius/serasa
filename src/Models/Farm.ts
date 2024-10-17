export interface Farm {
  id?: string | undefined;
  farmName: string;
  farmerName: string;
  state: string;
  city: string;
  cpfCnpj: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: string[];
}
