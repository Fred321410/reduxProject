
import { Localisation } from '../../localisations/models/localisation';

export interface Bill {
  id: string;
  date: Date;
  amount: number;
  localisation: Localisation;
  description: string;
  types: string[];
  prelevementType: string;
  couverture: {
    from: Date,
    to: Date
  };
}

  export function generateMockBill(): Bill {
    return {
      id: '1',
      date: new Date('23/07/2018'),
      amount: -50,
      types: ['EAU'],
      prelevementType: 'FACTURE',
      couverture: {
        from: null,
        to: null
      },
      localisation: {
        id: '1',
        city: 'Nantes',
        types: null,
        description: '',
        tag: [''],
        name: ''
      },
      description: 'mock'
    };
  }
