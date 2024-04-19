import { number } from 'card-validator';
import { CardNumberVerification } from 'card-validator/dist/card-number';
import { useEffect, useState } from 'react';
import { PaymentIcon } from 'react-svg-credit-card-payment-icons/dist/index.mjs';

import DropdownMenu from '../menu/menu.component';
import { CardContainer, EditIcon } from './card-info.style';

type CardInfoProps = {
    Number: string;
    Expire: string;
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

const CardInfo = ({ Number, Expire }: CardInfoProps) => {
    const [cardType, setCardType] = useState<CardType>();

    const cardNumberValidator: CardNumberVerification = number(Number);
    console.log(cardNumberValidator?.card?.niceType as CardType);
    useEffect(() => {
        setCardType(cardNumberValidator?.card?.niceType as CardType);
    }, [cardNumberValidator]);
    const maskedNumber = `${'*'.repeat(Number.length - 4)}${Number.slice(
        -4,
    )}`.replace(/(.{4})/g, '$1  ').slice(-14);

    const CreditOptions = [
        {
            option: 'Set default',
            handler: () => {
                console.log('Set default');
            },
        },
        {
            option: 'Remove',
            handler: () => {
                console.log('Remove');
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
                <span className='flex gap-4'>
                    <PaymentIcon
                        type={cardType || 'Amex'}
                        format="flatRounded"
                        width={50}
                    />
                    <p className="text-lg font-bold">{maskedNumber}</p>
                </span>
                <DropdownMenu
                    options={CreditOptions}
                    top="40%"
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
        </CardContainer>
    );
};
export default CardInfo;
