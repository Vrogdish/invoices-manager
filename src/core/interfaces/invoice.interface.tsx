export interface InvoiceInterface {
    id : string;
    uid : string;
    customerId : string;
    products : {productID : string, quantity:number}[];
    createdAt : Date;
}

export interface InvoiceFormInterface {
    uid : string;
    customerId : string;
    products : {productId : string, quantity:number}[];
}