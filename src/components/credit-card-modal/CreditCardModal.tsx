import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import usePaymentMethod from '../../hooks/usePaymentMethod.hook';
import Button from '../button/button.component';
import { Modal } from '../modal/modal.component';

const stripePromise = loadStripe(
    'pk_test_51PIHhPP0T7WwoKshw9KZhCQnUcb4Y0bq0Zb0pVlkPu4ReHEpkEbeQwJq7Lu5UdcDRuasPOg9MJrjeBV780EXgJ2000wU0y9MYl',
);

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
    const { handleAddPaymentMethod, isLoading } =
        usePaymentMethod(handleSuccess);

    return (
        <form onSubmit={handleAddPaymentMethod}>
            <CardElement />
            <Button loading={isLoading} type="submit">
                Submit
            </Button>
        </form>
    );
};

const AddCreditCardModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
}) => {
    return (
        <Elements stripe={stripePromise}>
            <Modal isOpen={showModal} setIsOpen={setShowModal} width="md">
                <AddCreditCardForm setShowModal={setShowModal} />
            </Modal>
        </Elements>
    );
};

export default AddCreditCardModal;
