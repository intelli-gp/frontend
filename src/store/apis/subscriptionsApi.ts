import { appApi } from '.';
import { GenericResponse } from '../../types/response';
import {
    CancelSubscriptionDto,
    CreateSubscriptionDto,
    ReceivedSubscription,
} from '../../types/subscription';

export const paymentMethodsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        createSubscription: builder.mutation<void, CreateSubscriptionDto>({
            invalidatesTags: ['Subscriptions'],
            query: ({ interval }) => ({
                url: `/payment/subscription/${
                    interval === 'monthly' ? 'monthly' : 'yearly'
                }`,
                method: 'POST',
            }),
        }),
        getSubscription: builder.query<
            GenericResponse<ReceivedSubscription>,
            void
        >({
            providesTags: ['Subscriptions'],
            query: () => ({
                url: '/payment/subscription',
                method: 'GET',
            }),
        }),
        cancelSubscription: builder.mutation<void, CancelSubscriptionDto>({
            invalidatesTags: ['Subscriptions'],
            query: (cancelSubscriptionData) => ({
                url: '/payment/subscription/cancel',
                body: cancelSubscriptionData,
                method: 'PATCH',
            }),
        }),
    }),
});

export const {
    useCreateSubscriptionMutation,
    useGetSubscriptionQuery,
    useCancelSubscriptionMutation,
} = paymentMethodsApi;
