import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons/dist/index.mjs';

import { useSetPaymentMethodAsDefaultMutation } from '../../store/apis/paymentMethodsApi';
import { useRemovePaymentMethodMutation } from '../../store/apis/paymentMethodsApi';
import { errorToast, successToast } from '../../utils/toasts';
import Button from '../button/button.component';
import DropdownMenu from '../menu/menu.component';
import { Modal } from '../modal/modal.component';
import { CardContainer, EditIcon } from './card-info.style';

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
            <div className="flex flex-col gap-8">
                <div className="flex gap-4 flex-row-reverse">
                    <Button
                        className="!px-8"
                        select="danger"
                        outline
                        loading={isLoading}
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
    paymentMethodId: string;
    LastFourDigits: string;
    Expire: string;
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

const CardInfo = ({
    paymentMethodId,
    LastFourDigits,
    Expire,
    Brand,
    IsDefault = false,
}: CardInfoProps) => {
    const [showDeleteModal, setDeleteModal] = useState(false);

    const [setCardAsDefault, { isLoading }] =
        useSetPaymentMethodAsDefaultMutation();

    const cardType = Brand as CardType;
    const maskedNumber = `**** **** **** ${LastFourDigits}`;

    console.log({ paymentMethodId, LastFourDigits, Expire, Brand, IsDefault });

    const CreditOptions = [
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
            <span className="flex justify-between w-[100%]">
                <span className="flex gap-4">
                    <PaymentIcon
                        type={cardType || 'Amex'}
                        format="flatRounded"
                        width={50}
                    />
                    <p className="text-lg font-bold">{maskedNumber}</p>

                    {IsDefault && (
                        <span className="bg-[var(--indigo-25)] text-[var(--indigo-500)] rounded-full px-2 py-1 text-xs">
                            Default
                        </span>
                    )}
                    <BeatLoader
                        className="pt-2"
                        loading={isLoading}
                        size={5}
                        color="var(--indigo-500)"
                    />
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
                paymentMethodId={paymentMethodId}
                showModal={showDeleteModal}
                setShowModal={setDeleteModal}
            />
        </CardContainer>
    );
};
export default CardInfo;
