import { appApi } from '.';
import {
    AddPaymentMethodDto,
    ReceivedPaymentMethod,
} from '../../types/payment-method';
import { GenericResponse } from '../../types/response';

export const paymentMethodsApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        addPaymentMethod: builder.mutation<
            GenericResponse<ReceivedPaymentMethod>,
            AddPaymentMethodDto
        >({
            invalidatesTags: ['PaymentMethods'],
            query: (paymentMethod) => ({
                url: '/payment/payment-method',
                method: 'POST',
                body: paymentMethod,
            }),
        }),
        setPaymentMethodAsDefault: builder.mutation<void, AddPaymentMethodDto>({
            invalidatesTags: ['PaymentMethods'],
            query: (paymentMethodData) => ({
                url: `/payment/payment-method/default`,
                body: paymentMethodData,
                method: 'PATCH',
            }),
        }),
        fetchPaymentMethods: builder.query<
            GenericResponse<ReceivedPaymentMethod[]>,
            void
        >({
            providesTags: ['PaymentMethods'],
            query: () => ({
                url: '/payment/payment-method',
                method: 'GET',
            }),
        }),
        removePaymentMethod: builder.mutation<void, AddPaymentMethodDto>({
            invalidatesTags: ['PaymentMethods'],
            query: ({ paymentMethodId }) => {
                return {
                    url: `/payment/payment-method/${paymentMethodId}`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});

export const {
    useAddPaymentMethodMutation,
    useFetchPaymentMethodsQuery,
    useRemovePaymentMethodMutation,
    useSetPaymentMethodAsDefaultMutation,
} = paymentMethodsApi;
