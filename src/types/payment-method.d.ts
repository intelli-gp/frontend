export type PaymentMethod ={
    holderName:string;
    cardId: string;
    cardNumber:string;
    expiryDate:string;
}
export type RecievePaymentMethod ={
    ID:number;
    holderName:string;
    cardId?: string;
    cardNumber:string;
    expiryDate:string;
}