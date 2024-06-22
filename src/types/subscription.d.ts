import { Stripe } from "@stripe/stripe-js";

export type CreateSubscriptionDto = {
    interval: 'monthly' | 'yearly';
};

export type ReceivedSubscription = {
    ID: string;

    Interval: 'monthly' | 'yearly';

    StartDate: Date;

    RenewalDate: Date;

    Price: number;

    Status: Stripe.Subscription.Status;

    IsCancelled: boolean;
};

export type CancelSubscriptionDto = {
    subscriptionId: string;
};
