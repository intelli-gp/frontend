
import { appApi } from '.';

export const paymentMethodsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        addPaymentMethods: builder.mutation({
            invalidatesTags: ['PaymentMethods'],
            query: (paymentMethod) => ({
                url: '/payment-method',
                method: 'POST',
                body: paymentMethod,
            }),
        }),
        fetchPaymentMethods: builder.query({
            providesTags: ['PaymentMethods'],
            query: () => ({
                url: '/payment-method',
                method: 'GET',
            }),
        }),
        removePaymentMethod: builder.mutation({
            invalidatesTags: ['PaymentMethods'],
            query: (ID) => {
                return {
                    url: `/payment-method/${ID}`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});

export const {
   useAddPaymentMethodsMutation,
   useFetchPaymentMethodsQuery,
   useRemovePaymentMethodMutation
} = paymentMethodsApi;

