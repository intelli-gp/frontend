import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';

import { useAddPaymentMethodMutation } from '../store/apis/paymentMethodsApi';
import { errorToast, infoToast } from '../utils/toasts';

const usePaymentMethod = (onSuccess: () => void) => {
    const stripe = useStripe();
    const elements = useElements();
    const [addPaymentMethod, { isError }] = useAddPaymentMethodMutation();
    const [isLoading, setIsLoading] = useState(false);

    const getPaymentMethodId = async () => {
        const cardElement = elements?.getElement(CardElement);

        if (!stripe || !elements || !cardElement) {
            return;
        }

        const stripeResponse = await stripe?.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        const { error, paymentMethod } = stripeResponse;

        if (error || !paymentMethod) {
            console.log('error: ', error);
            setIsLoading(false);
            errorToast('Failed to create payment method');
            return;
        }

        return paymentMethod.id;
    };

    const handleAddPaymentMethod = async (event: FormEvent) => {
        event.preventDefault();

        setIsLoading(true);

        const paymentMethodId = await getPaymentMethodId();

        if (!paymentMethodId) {
            return;
        }

        console.log('paymentMethodId: ', paymentMethodId);
        console.log(
            'process.env.REACT_APP_API_URL: ',
            import.meta.env.VITE_BACKEND,
        );

        await addPaymentMethod({ paymentMethodId });

        if (isError) {
            errorToast('Failed to add payment method');
        } else {
            infoToast('Payment method added successfully');
            onSuccess();
        }

        setIsLoading(false);
    };

    return {
        handleAddPaymentMethod,
        isLoading,
    };
};

export default usePaymentMethod;
