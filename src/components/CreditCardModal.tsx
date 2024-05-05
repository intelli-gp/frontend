import { ChangeEvent, useEffect, useState } from 'react';
import { useCreditCardValidator } from 'react-creditcard-validator';

import { useAddPaymentMethodsMutation } from '../store/apis/paymentMethodsApi';
import { PaymentMethod } from '../types/payment-method';
import { errorToast, successToast } from '../utils/toasts';
import Button from './button/button.component';
import { CustomInput } from './input/Input.component';
import { Input, Label } from './input/input.styles';
import { Modal } from './modal/modal.component';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCardModal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
    const [holderName, setHolderName] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [CVV, setCVV] = useState('');
    const [flag, setFlag] = useState(false);
    function expDateValidate(month: string, year: string) {
        console.log(month);
        if (Number(year) > 2035) {
            return 'Year cannot be greater than 2035';
        }
        return;
    }
    const {
        getCardNumberProps,
        getCVCProps,
        getExpiryDateProps,
        meta: { erroredInputs },
    } = useCreditCardValidator({ expiryDateValidator: expDateValidate });
    const [
        createPaymentMethod,
        {
            isSuccess: isPaymentMethodCreatedSuccessfully,
            isError: isPaymentMethodCreateError,
            isLoading: isPaymentMethodCreating,
            error: paymentMethodCreateError,
        },
    ] = useAddPaymentMethodsMutation();
    useEffect(() => {
        if (isPaymentMethodCreateError) {
            errorToast(
                'Error creating the card!',
                paymentMethodCreateError as string,
            );
        }
        if (isPaymentMethodCreatedSuccessfully) {
            successToast('Card created successfully!');
        }
    }, [isPaymentMethodCreatedSuccessfully, isPaymentMethodCreateError]);
    useEffect(() => {
        const allUndefined = Object.values(erroredInputs).every(
            (value) => value === undefined,
        );
        if (allUndefined) {
            setFlag(false);
        } else {
            setFlag(true);
        }
    }, [erroredInputs]);
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (flag) {
            errorToast('Error creating the card!');
            return;
        }
        let [month, year] = expiryDate.split('/');
        let formattedDate =
            new Date(parseInt('20' + year), parseInt(month) - 1)
                .toISOString()
                .slice(0, 10) + 'T00:00';
        const paymentMethod: Partial<PaymentMethod> = {
            holderName: holderName,
            cardNumber: creditCardNumber,
            cardId: CVV,
            expiryDate: formattedDate,
        };
        await createPaymentMethod(paymentMethod as PaymentMethod).unwrap();
        setShowModal(false);
    };
    const handleCardDisplay = () => {
        const rawText = [...creditCardNumber.split(' ').join('')];
        const creditCard: string[] = [];
        rawText.forEach((t, i) => {
            if (i % 4 === 0 && i !== 0) creditCard.push(' ');
            creditCard.push(t);
        });
        return creditCard.join('');
    };
    const expriy_format = () => {
        const expdate = expiryDate;
        const expDateFormatter =
            expdate.replace(/\//g, '').substring(0, 2) +
            (expdate.length > 2 ? '/' : '') +
            expdate.replace(/\//g, '').substring(2, 4);

        return expDateFormatter;
    };
    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            title={'Add Payment Method'}
            width="md"
        >
            <form
                className="flex flex-col gap-4 p-2 py-2"
                onSubmit={handleSubmitForm}
            >
                <CustomInput
                    label={'Card Holder Name'}
                    placeholder={'Card holder name'}
                    value={holderName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setHolderName(e.target.value)
                    }
                />
                <CustomInput
                    {...getCardNumberProps()}
                    label={'Card Number'}
                    maxlength="19"
                    value={handleCardDisplay()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCreditCardNumber(e.target.value)
                    }
                    error={erroredInputs.cardNumber}
                />

                <div className="flex flex-row justify-between gap-6">
                    <div className="flex flex-col w-full">
                        <Label> Expiry Date</Label>
                        <Input
                            {...getExpiryDateProps()}
                            value={expriy_format()}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setExpiryDate(e.target.value)
                            }
                        />
                        <span className="text-red-600 text-sm">
                            {erroredInputs.expiryDate &&
                                erroredInputs.expiryDate}
                        </span>
                    </div>
                    <div className="flex flex-col w-full">
                        <Label> CVV/CVC</Label>
                        <Input
                            {...getCVCProps()}
                            value={CVV}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCVV(e.target.value)
                            }
                        />
                        <span className="text-red-600 text-sm">
                            {erroredInputs.cvc && erroredInputs.cvc}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-4 mt-4">
                    <Button
                        type="submit"
                        className="w-[28%]"
                        loading={isPaymentMethodCreating}
                    >
                        Add Card
                    </Button>
                    <Button
                        select="danger"
                        outline={true}
                        onClick={() => setShowModal(false)}
                        className="w-[28%]"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
export default CreditCardModal;
