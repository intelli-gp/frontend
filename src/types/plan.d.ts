export type Plan = {
    id: number;
    title: 'starter' | 'premium';
    price: number;
    benefits: string[];
    period: 'month' | 'year';
};
