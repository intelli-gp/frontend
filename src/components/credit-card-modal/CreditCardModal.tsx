import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import usePaymentMethod from '../../hooks/usePaymentMethod.hook';
import Button from '../button/button.component';
import { Modal } from '../modal/modal.component';
import { ButtonsContainer } from './CreditCardModal.styles';
import { FormContainer } from './CreditCardModal.styles';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCreditCardForm: React.FC<Pick<ModalProps, 'setShowModal'>> = ({
    setShowModal,
}) => {
    const handleSuccess = () => {
        setShowModal(false);
    };
    const handleCancel = () => {
        setShowModal(false);
    };
    const { handleAddPaymentMethod, isLoading } =
        usePaymentMethod(handleSuccess);

    return (
        <FormContainer onSubmit={handleAddPaymentMethod}>
            <CardElement />

            <ButtonsContainer>
                <Button select="danger" outline onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    loading={isLoading}
                    type="submit"
                    onClick={handleAddPaymentMethod}
                >
                    Submit
                </Button>
            </ButtonsContainer>
        </FormContainer>
    );
};

const AddCreditCardModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
}) => {
    const [stripePromise] = useState(() =>
        loadStripe(
            'pk_test_51PIHhPP0T7WwoKshw9KZhCQnUcb4Y0bq0Zb0pVlkPu4ReHEpkEbeQwJq7Lu5UdcDRuasPOg9MJrjeBV780EXgJ2000wU0y9MYl',
        ),
    );

    return (
        <Elements stripe={stripePromise}>
            <Modal isOpen={showModal} setIsOpen={setShowModal} width="md">
                <AddCreditCardForm setShowModal={setShowModal} />
            </Modal>
        </Elements>
    );
};

export default AddCreditCardModal;
