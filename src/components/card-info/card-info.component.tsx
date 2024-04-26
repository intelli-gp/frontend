import { number } from 'card-validator';
import { CardNumberVerification } from 'card-validator/dist/card-number';
import { useEffect, useState } from 'react';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons/dist/index.mjs';

import DropdownMenu from '../menu/menu.component';
import { CardContainer, EditIcon } from './card-info.style';
import { useRemovePaymentMethodMutation } from '../../store/apis/paymentMethodsApi';
import { errorToast, successToast } from '../../utils/toasts';
import Button from '../button/button.component';
import { Modal } from '../modal/modal.component';

interface ModalProps {
    id: number | undefined;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSectionModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
    id,
}) => {

    const [
        deleteGroup,
        { isLoading: isDeletingGroup, isSuccess: groupDeletedSuccessfully },
    ] = useRemovePaymentMethodMutation();

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(id!).unwrap();
            setShowModal(false);
        } catch (error) {
            errorToast('Error occurred while deleting the card');
        }
    };

    // Toasts handling
    useEffect(() => {
        if (groupDeletedSuccessfully) {
            successToast('Deleted the card successfully!');
        }
    }, [groupDeletedSuccessfully]);

    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            width="lg"
            title="Are you sure you want to delete this card?"
        >
            <div className="flex flex-col gap-8">
                <div className="flex gap-4 flex-row-reverse">
                    <Button
                        className="!px-8"
                        select="danger"
                        outline
                        loading={isDeletingGroup}
                        onClick={handleDeleteGroup}
                    >
                        Yes
                    </Button>
                    <Button
                        className="!px-6"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
type CardInfoProps = {
    Number: string;
    Expire: string;
    ID: number;
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

const CardInfo = ({ Number, Expire, ID }: CardInfoProps) => {
    const [cardType, setCardType] = useState<CardType>();
    const [showDeleteModal, setDeleteModal] = useState(false);

    const cardNumberValidator: CardNumberVerification = number(Number);
    console.log(cardNumberValidator?.card?.niceType as CardType);
    useEffect(() => {
        setCardType(cardNumberValidator?.card?.niceType as CardType);
    }, [cardNumberValidator]);
    const maskedNumber = `${'*'.repeat(Number.length - 4)}${Number.slice(-4)}`
        .replace(/(.{4})/g, '$1  ')
        .slice(-14);

    const CreditOptions = [
        {
            option: 'Set default',
            handler: () => {
                setDeleteModal(true);
            },
        },
        {
            option: 'Remove',
            handler: () => {
                setDeleteModal(true);
            },
        },
        {
            option: 'Edit',
            handler: () => {
                console.log('Edit');
            },
        },
    ];
    return (
        <CardContainer>
            <span className="flex justify-between w-[100%]">
                <span className="flex gap-4">
                    <PaymentIcon
                        type={cardType || 'Amex'}
                        format="flatRounded"
                        width={50}
                    />
                    <p className="text-lg font-bold">{maskedNumber}</p>
                </span>
                <DropdownMenu
                    options={CreditOptions}
                    top="70%"
                    right="10%"
                    left="auto"
                    bottom="auto"
                    menuWidth="10rem"
                >
                    <div className="hover:bg-[var(--indigo-25)] p-[4px] flex items-center rounded-full">
                        <EditIcon />
                    </div>
                </DropdownMenu>
            </span>
            <p className="text-[var(--slate-500)] text-sm ">
                Expires - {Expire}
            </p>
            <DeleteSectionModal
                id={ID}
                showModal={showDeleteModal}
                setShowModal={setDeleteModal}
            />
        </CardContainer>
    );
};
export default CardInfo;
