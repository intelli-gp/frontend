import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import checkout from '../../assets/imgs/checkout.svg';
import Button from '../../components/button/button.component';
import CardInfo from '../../components/card-info/card-info.component';
import AddCreditCardModal from '../../components/credit-card-modal/CreditCardModal';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import { changeUserPlan } from '../../store';
import { useFetchPaymentMethodsQuery } from '../../store/apis/paymentMethodsApi';
import { useCreateSubscriptionMutation } from '../../store/apis/subscriptionsApi';
import { errorToast, successToast } from '../../utils/toasts';
import {
    AddCardButton,
    CardsContainer,
    ContentWrapper,
    FlexContainer,
    Image,
    NoContentHolder,
    Return,
    SidePanel,
    Title,
} from './checkout.style';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Checkout | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    const [subscribeToPro, { isLoading: isSubscriptionCreationLoading }] =
        useCreateSubscriptionMutation();

    const { data: paymentMethodsResponse } = useFetchPaymentMethodsQuery();

    const price = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(20);

    const discount = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(0);

    const handleCheckout = async () => {
        try {
            await subscribeToPro({
                interval: 'monthly',
            }).unwrap();
            dispatch(changeUserPlan('pro'));
            successToast('Subscription created successfully');
            navigate('/app/settings');
        } catch (error) {
            errorToast((error as any).data.data.errorMessage);
        }
    };

    const [addCreditCardIsOpen, setAddCreditCardIsOpen] = useState(false);

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
                            <p>{price}</p>
                        </span>
                        <hr />
                        <span className="flex justify-between">
                            <p>Subtotal</p>
                            <p>{price}</p>
                        </span>
                        <span className="flex justify-between text-[var(--indigo-900)]">
                            <p>Discount</p>
                            <p>{discount}</p>
                        </span>
                        <hr />
                        <span className="flex justify-between">
                            <p>Total Due</p>
                            <p>{price}</p>
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
                    className="flex flex-col justify-center lg:items-start items-center w-[90%] lg:w-[60%] py-8 gap-4"
                >
                    <PageTitle size="sm">Select default card </PageTitle>
                    {paymentMethodsResponse ? (
                        <CardsContainer>
                            {paymentMethodsResponse?.data?.map(
                                (paymentMethod, index) => (
                                    <div className="w-[100%]" key={index}>
                                        <CardInfo
                                            paymentMethodId={
                                                paymentMethod.PaymentMethodId
                                            }
                                            LastFourDigits={
                                                paymentMethod.LastFourDigits
                                            }
                                            ExpiryMonth={paymentMethod.ExpMonth}
                                            ExpiryYear={paymentMethod.ExpYear}
                                            Brand={paymentMethod.Brand}
                                            IsDefault={paymentMethod.IsDefault}
                                        />
                                    </div>
                                ),
                            )}
                        </CardsContainer>
                    ) : (
                        <NoContentHolder>
                            {' '}
                            No Payment Methods Added.
                        </NoContentHolder>
                    )}
                    <div className="w-[100%] flex flex-col items-center gap-4">
                        <AddCardButton
                            onClick={() => setAddCreditCardIsOpen(true)}
                            title="Add credit card"
                        >
                            Add a new card
                        </AddCardButton>
                        <Button
                            type="submit"
                            className="w-[100%] "
                            loading={isSubscriptionCreationLoading}
                            onClick={handleCheckout}
                        >
                            Complete checkout
                        </Button>
                    </div>
                </motion.div>
            </div>
            <AddCreditCardModal
                showModal={addCreditCardIsOpen}
                setShowModal={setAddCreditCardIsOpen}
            />
        </FlexContainer>
    );
};

export default CheckoutPage;
