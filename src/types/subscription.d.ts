import { Stripe } from '@stripe/stripe-js';

export type CreateSubscriptionDto = {
    interval: 'monthly' | 'yearly';
};

export type ReceivedSubscription = {
    Title: string;
    ID: string;
    Interval: 'monthly' | 'yearly';
    StartDate: string;
    RenewalDate: string;
    Price: number;
    Status: Stripe.Subscription.Status;
    IsCancelled: boolean;
};

export type CancelSubscriptionDto = {
    subscriptionId: string;
};
