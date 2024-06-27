import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons/dist/index.mjs';

import {
    useFetchPaymentMethodsQuery,
    useSetPaymentMethodAsDefaultMutation,
} from '../../store/apis/paymentMethodsApi';
import { useRemovePaymentMethodMutation } from '../../store/apis/paymentMethodsApi';
import { errorToast, successToast } from '../../utils/toasts';
import Button from '../button/button.component';
import AddCreditCardModal from '../credit-card-modal/CreditCardModal';
import DropdownMenu from '../menu/menu.component';
import { Modal } from '../modal/modal.component';
import {
    AddNewCardButton,
    AddNewCardIcon,
    AddNewCardText,
    CardContainer,
    CardNumber,
    CardsContainer,
    DefaultBadge,
    EditButton,
    ExpireDate,
} from './cards-info.style';

interface ModalProps {
    paymentMethodId: string;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSectionModal: React.FC<ModalProps> = ({
    paymentMethodId,
    showModal,
    setShowModal,
}) => {
    const [deletePaymentMethod, { isLoading }] =
        useRemovePaymentMethodMutation();

    const handleDeleteGroup = async () => {
        try {
            await deletePaymentMethod({ paymentMethodId }).unwrap();
            successToast('Card deleted successfully');
            setShowModal(false);
        } catch (error) {
            errorToast((error as any).data.data.errorMessage);
        }
    };

    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            width="lg"
            title="Are you sure you want to delete this card?"
        >
            <div className="flex gap-2 flex-row-reverse">
                <Button
                    className="w-[88.5px] h-[38px]"
                    select="danger"
                    outline
                    loading={isLoading}
                    onClick={handleDeleteGroup}
                >
                    Yes
                </Button>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
        </Modal>
    );
};

type CardInfoProps = {
    paymentMethodId: string;
    LastFourDigits: string;
    ExpiryMonth: number;
    ExpiryYear: number;
    Brand: string;
    IsDefault?: boolean;
};

type CardType =
    | 'Alipay'
    | 'Amex'
    | 'Code'
    | 'Diners'
    | 'Discover'
    | 'Elo'
    | 'Generic'
    | 'Hiper'
    | 'Hipercard'
    | 'Jcb'
    | 'Maestro'
    | 'Mastercard'
    | 'Mir'
    | 'Paypal'
    | 'Unionpay'
    | 'Visa';

const PaymentCard = ({
    paymentMethodId,
    LastFourDigits,
    ExpiryMonth,
    ExpiryYear,
    Brand,
    IsDefault = false,
}: CardInfoProps) => {
    const [showDeleteModal, setDeleteModal] = useState(false);

    const [setCardAsDefault, { isLoading }] =
        useSetPaymentMethodAsDefaultMutation();

    const cardType = Brand as CardType;
    const Expire = `${ExpiryMonth}/${ExpiryYear}`;

    const CardOptions = [
        {
            option: 'Set default',
            handler: () => {
                // TODO: call the API to set the default card and refetch the cards
                setCardAsDefault({ paymentMethodId });
                // setDeleteModal(true);
            },
        },
        {
            option: 'Remove',
            handler: () => {
                setDeleteModal(true);
            },
        },
    ];

    return (
        <CardContainer>
            <div className="flex w-full">
                <div className="flex gap-4 items-center">
                    <PaymentIcon
                        type={cardType || 'Amex'}
                        format="flatRounded"
                        width={50}
                    />
                    <CardNumber>{`XXXX XXXX XXXX ${LastFourDigits}`}</CardNumber>
                </div>
                <DropdownMenu
                    options={CardOptions}
                    top="70%"
                    right="10%"
                    left="auto"
                    bottom="auto"
                    menuWidth="8rem"
                    mainElementClassName="ml-auto"
                >
                    <EditButton loading={isLoading}>
                        <BsThreeDotsVertical />
                    </EditButton>
                </DropdownMenu>
            </div>
            <div className="flex items-center gap-4 w-full">
                <ExpireDate>Expires - {Expire}</ExpireDate>
                {IsDefault && <DefaultBadge>Default</DefaultBadge>}
            </div>
            <DeleteSectionModal
                paymentMethodId={paymentMethodId}
                showModal={showDeleteModal}
                setShowModal={setDeleteModal}
            />
        </CardContainer>
    );
};

const CardsList = () => {
    const [addCreditCardIsOpen, setAddCreditCardIsOpen] = useState(false);

    const { data: paymentMethodResponse } = useFetchPaymentMethodsQuery();
    const PaymentMethodsData = paymentMethodResponse?.data || [];

    if (PaymentMethodsData?.length > 0) {
        return (
            <CardsContainer>
                {PaymentMethodsData.map((paymentMethod) => (
                    <PaymentCard
                        paymentMethodId={paymentMethod.PaymentMethodId}
                        LastFourDigits={paymentMethod.LastFourDigits}
                        ExpiryMonth={paymentMethod.ExpMonth}
                        ExpiryYear={paymentMethod.ExpYear}
                        Brand={paymentMethod.Brand}
                        IsDefault={paymentMethod.IsDefault}
                    />
                ))}

                <AddNewCardButton
                    title="Add New Card"
                    onClick={() => setAddCreditCardIsOpen(true)}
                >
                    <AddNewCardIcon />
                </AddNewCardButton>

                <AddCreditCardModal
                    showModal={addCreditCardIsOpen}
                    setShowModal={setAddCreditCardIsOpen}
                />
            </CardsContainer>
        );
    } else {
        return (
            <div className="flex flex-col items-center">
                <AddNewCardButton
                    title="Add New Card"
                    onClick={() => setAddCreditCardIsOpen(true)}
                    className="!w-full"
                >
                    <AddNewCardText>
                        No cards found. Click here to add a new card.
                    </AddNewCardText>
                </AddNewCardButton>
                <AddCreditCardModal
                    showModal={addCreditCardIsOpen}
                    setShowModal={setAddCreditCardIsOpen}
                />
            </div>
        );
    }
};

export default CardsList;
