import {Type} from '../../types/models/type';

export interface Localisation {
  id: string;
  city: string;
  name: string;
  types: Type[];
  description: string;
  tag: string[];
}

export function generateMockLocalisation(): Localisation {
  return {
    id: '1',
      city: 'Nantes',
      types: null,
      name: 'Test',
      description: '',
      tag: ['']
  };
}
