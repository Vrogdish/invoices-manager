export interface CustomerInterface {
    id: string;
    company?: string;
    civility: 'M.' | 'Mme';
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
    address: string;
    postalCode: string;
    locality: string;
    userId: string;
}

export interface CustomerFormInterface {
    company: string;
    civility: 'M.' | 'Mme';
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    locality: string;
    userId: string;
}

