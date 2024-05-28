export type CreateSubscriptionDto = {
    interval: 'monthly' | 'yearly';
};

export type ReceivedSubscription = {
    ID: string;

    Interval: 'monthly' | 'yearly';

    StartDate: Date;

    RenewalDate: Date;

    Price: number;
};

export type CancelSubscriptionDto = {
    subscriptionId: string;
};
