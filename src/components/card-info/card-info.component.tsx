

import { useEffect, useState } from 'react';
import DropdownMenu from '../menu/menu.component';
import { CardContainer, EditIcon } from './card-info.style';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons/dist/index.mjs';
import { number } from "card-validator";
import { CardNumberVerification } from 'card-validator/dist/card-number';
type CardInfoProps = {
    Number: string;
    Expire: string;
};
type CardType = "Alipay" | "Amex" | "Code" | "Diners" | "Discover"
    | "Elo" | "Generic" | "Hiper" | "Hipercard" | "Jcb" | "Maestro"
    | "Mastercard" | "Mir" | "Paypal" | "Unionpay" | "Visa";

const CardInfo = ({ Number, Expire }: CardInfoProps) => {
    const [cardType, setCardType] = useState<CardType>();

    const cardNumberValidator: CardNumberVerification = number(Number);
    console.log(cardNumberValidator?.card?.niceType as CardType)
    useEffect(() => {
        setCardType(cardNumberValidator?.card?.niceType as CardType);

    },[cardNumberValidator]);
    const maskedNumber =( `${"*".repeat(Number.length - 4)}${Number.slice(-4)}`).replace(/(.{4})/g, '$1 ');

    const CreditOptions = [
        {
            option: 'Set default',
            handler: () => {
                console.log('Set default')
            },
        },
        {
            option: 'Remove',
            handler: () => {
                console.log('Remove')
            },
        },
        {
            option: 'Edit',
            handler: () => {
                console.log('Edit')
            },
        },
    ];
    return (
        <CardContainer>
            <span className='flex justify-between w-[100%]'>
                <PaymentIcon type={cardType||'Amex'} format="flat" width={80} />
                <DropdownMenu
                    options={CreditOptions}
                    top="40%"
                    right="10%"
                    left="auto"
                    bottom="auto"
                    menuWidth="10rem"
                >
                    <EditIcon />
                </DropdownMenu>
            </span>

            <span className='flex flex-col gap-[8px]'>
                <p className='text-lg'>{maskedNumber}</p>
                <p className='text-[var(--slate-500)] text-sm'>Expires - {Expire}</p>
            </span>
        </CardContainer>
    );
};
export default CardInfo;
