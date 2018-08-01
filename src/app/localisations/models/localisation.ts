export interface Localisation {
  id: number;
  city: string;
  type: string[];
  description: string;
  tag: string[];
}

export function generateMockLocalisation(): Localisation {
  return {
    id: 1,
      city: 'Nantes',
      type: [''],
      description: '',
      tag: ['']
  };
}
