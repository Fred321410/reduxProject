export interface Type {
  id: string;
  sousType: string[];
  name: string;
  description: string;
}

export function generateMockType(): Type {
  return {
    id: '1',
    sousType: ['ELECTRICITE', 'EAU'],
    name: 'IMMOBILIER',
    description: 'Une description'
  };
}
