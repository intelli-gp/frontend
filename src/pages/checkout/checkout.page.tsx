import { motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { useCreditCardValidator } from 'react-creditcard-validator';
import { useNavigate } from 'react-router-dom';

import checkout from '../../assets/imgs/checkout.svg';
import Button from '../../components/button/button.component';
import { CustomInput } from '../../components/input/Input.component';
import { Input, Label } from '../../components/input/input.styles';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    ContentWrapper,
    FlexContainer,
    Image,
    Return,
    SidePanel,
    Title,
} from './checkout.style';
import moment from 'moment';

const CheckoutPage = () => {
    const [holderName, setHolderName] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [CVV, setCVV] = useState('');

    function expDateValidate(month: string, year: string) {
        console.log(month);

        const tenYearsFromNow = moment().year() + 10;

        if (Number(year) > tenYearsFromNow) {
            return `Year cannot be greater than ${tenYearsFromNow}`;
        }
        return;
    }

    const {
        getCardNumberProps,
        getCVCProps,
        getExpiryDateProps,
        meta: { erroredInputs },
    } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

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
    const navigate = useNavigate();

    return (
        <FlexContainer>
            <SidePanel>
                <ContentWrapper>
                    <Return onClick={() => navigate(`/app/upgrade`)} />
                    <Title>Checkout</Title>
                    <div className="w-full flex flex-col text-white gap-2 ">
                        <p>Subscription Details</p>
                        <hr />
                        <span className="flex justify-between">
                            <p>Premium Plan</p>
                            <p>EG$200.00</p>
                        </span>
                        <hr />
                        <span className="flex justify-between">
                            <p>Subtotal</p>
                            <p>EG$200.00</p>
                        </span>
                        <span className="flex justify-between text-[var(--indigo-900)]">
                            <p>Discount</p>
                            <p>EG$0.00</p>
                        </span>
                        <hr />
                        <span className="flex justify-between">
                            <p>Total Due</p>
                            <p>EG$200.00</p>
                        </span>
                    </div>
                    <div className="w-[100%] flex justify-center items-center">
                        <Image src={checkout} />
                    </div>
                </ContentWrapper>
            </SidePanel>
            <div className="flex flex-col justify-center items-center w-[100%] lg:w-[60%]">
                <motion.div
                    {...BetweenPageAnimation}
                    className="flex flex-col justify-center lg:items-start items-center w-[90%] lg:w-[60%] py-8"
                >
                    <PageTitle className="text-start mb-6">
                        Payment Method
                    </PageTitle>
                    <form className="flex flex-col gap-4 w-[100%]">
                        <CustomInput
                            required
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
                            required
                            maxlength="19"
                            value={handleCardDisplay()}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCreditCardNumber(e.target.value)
                            }
                            error={erroredInputs.cardNumber}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' ) {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <div className="flex flex-row justify-between gap-6">
                            <div className="flex flex-col w-full">
                                <Label> Expiry Date</Label>
                                <Input
                                    {...getExpiryDateProps()}
                                    required
                                    value={expriy_format()}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setExpiryDate(e.target.value)}
                                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' ) {
                                            event.preventDefault();
                                        }
                                    }}
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
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => setCVV(e.target.value)}
                                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' ) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <span className="text-red-600 text-sm">
                                    {erroredInputs.cvc && erroredInputs.cvc}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 my-4">
                            <input
                                required
                                className="accent-indigo-800 w-4 h-4"
                                type="checkbox"
                                id="savingInformation"
                            />
                            <label htmlFor="savingInformation">
                                Securely save this card for later purchase.
                            </label>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button type="submit" className="w-[85%]">
                                Complete checkout
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </FlexContainer>
    );
};

export default CheckoutPage;
