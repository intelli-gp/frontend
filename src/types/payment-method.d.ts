export type PaymentMethod = {
    holderName: string;
    cardId: string;
    cardNumber: string;
    expiryDate: string;
};
export type ReceivedPaymentMethod = {
    PaymentMethodId: string;
    CardHolderName: string;
    Brand: string;
    ExpMonth: number;
    ExpYear: number;
    FundingType: string;
    LastFourDigits: string;
    IsDefault: boolean;
};

export type AddPaymentMethodDto = {
    paymentMethodId: string;
};
