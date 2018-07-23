export interface Bill {
    id: string;
    date: Date;
    amount: number;
    typeOfBill: any; // TODO Create an interface TypeBill
    location: any; // TODO Create an interface location
    description: string;
  }

  export function generateMockBill(): Bill {
    return {
      id: '1',
      date: new Date('23/07/2018'),
      amount: -50,
      typeOfBill: {
        prelevementType: 'FACTURE',
        type: ['IMMOBILIER'],
        sousType: ['EAU'],
        couverture: {
          from: null,
          to: null
        }
      },
      location: {
        id: 1,
        city: 'Nantes',
        type: [''],
        description: '',
        tag: ['']
      },
      description: 'mock'
    };
  }
