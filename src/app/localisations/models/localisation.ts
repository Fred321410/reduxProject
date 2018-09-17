export interface Localisation {
  id: string;
  city: string;
  name: string;
  type: string[];
  description: string;
  tag: string[];
}

export function generateMockLocalisation(): Localisation {
  return {
    id: '1',
      city: 'Nantes',
      type: [''],
      name: 'Test',
      description: '',
      tag: ['']
  };
}
