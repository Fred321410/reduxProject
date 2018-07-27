export interface BillType {
  description: string;
  type: string[]; // IMMOBILIER-LOISIR-NOURITURE
  sousType: string[]; // ELEC-JEUX-SUPERMARCHE
  prelevementType: string;
  couverture: {
    from: Date,
    to: Date
  };
}

export function generateMockBillType(): BillType {
  return {
    description: 'mock',
    type: [''],
    sousType: [''],
    prelevementType: '',
    couverture: {
      from: null,
      to: null
    }
  };
}
