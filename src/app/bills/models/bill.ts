import {Localisation} from './localisation';
import {BillType} from './billType';

export interface Bill {
    id: string;
    date: Date;
    amount: number;
    typeOfBill: BillType;
    localisation: Localisation;
    description: string;
  }

  export function generateMockBill(): Bill {
    return {
      id: '1',
      date: new Date('23/07/2018'),
      amount: -50,
      typeOfBill: {
        description: '',
        prelevementType: 'FACTURE',
        type: ['IMMOBILIER'],
        sousType: ['EAU'],
        couverture: {
          from: null,
          to: null
        }
      },
      localisation: {
        id: 1,
        city: 'Nantes',
        type: [''],
        description: '',
        tag: ['']
      },
      description: 'mock'
    };
  }
