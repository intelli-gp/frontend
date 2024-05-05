import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/button.component';
import { BetweenPageAnimation } from '../../index.styles';
import {
    ButtonsHolder,
    CardHolder,
    CardsHolder,
    Check,
    CircleHolder,
    PageContainer,
    UpgradeButton,
    UpgradeTitle,
} from './upgrade.styles';

type Type = {
    id: number;
    type: string;
    price: number;
    middle: boolean;
    para: string[];
    payment: string;
    myPlan?: boolean;
};

const Card = ({ el }: { el: Type }) => {
    const navigate = useNavigate();
    const changeSubscription = new URL(window.location.href).pathname.includes(
        'subscriptionManagement',
    );

    return (
        <CardHolder Border={el.myPlan && changeSubscription}>
            <div>
                <h2 className="font-bold text-[var(--indigo-950)]">
                    {el.type}
                </h2>
                <span>
                    <h1 className="font-extrabold text-[32px]  text-[var(--indigo-950)]">
                        {el.price}$
                    </h1>
                    <p>/{el.payment} </p>
                </span>
                <ul className="text-sm text-[var(--slate-800)] p-4 ">
                    {el.para.map((sentence) => (
                        <span className="relative pl-4 mb-2">
                            <Check />
                            <li>{sentence}</li>
                        </span>
                    ))}
                </ul>
            </div>
            {el.type == 'Free' ? (
                <></>
            ) : !changeSubscription ? (
                <UpgradeButton onClick={() => navigate(`/app/checkout`)}>
                    Get Started Now
                </UpgradeButton>
            ) : !el.myPlan && changeSubscription ? (
                <UpgradeButton onClick={() => navigate(`/app/checkout`)}>
                    Upgrade Plan
                </UpgradeButton>
            ) : (
                <></>
            )}
        </CardHolder>
    );
};

const UpgradePage = () => {
    const [selectedPlan, setSelectedPlan] = useState('Monthly');

    const handleButtonClick = (plan: SetStateAction<string>) => {
        setSelectedPlan(plan);
    };
    const changeSubscription = new URL(window.location.href).pathname.includes(
        'subscriptionManagement',
    );

    const subscriptionPlans: Type[] = [
        {
            id: 1,
            type: 'Free',
            price: 0,
            middle: false,
            para: [
                'Tailor and design personalized study plans.',
                'Find and collaborate with study groups.',
                'Receive personalized course recommendations based on your progress and interests.',
                'Get assistance from chatbot helper for up to 3 questions per month.',
            ],
            payment: selectedPlan,
        },
        {
            id: 2,
            type: 'Premium',
            price: selectedPlan === 'Yearly' ? 10 * 12 : 10,
            middle: true,
            para: [
                'Enjoy all the features included in the Free Plan.',
                'Utilize chatbot helper for up to 10 questions per month.',
                'Receive 2 personalized study plans per month, carefully crafted by our AI.',
            ],
            payment: selectedPlan,
            myPlan: true,
        },
        {
            id: 3,
            type: 'VIP',
            price: selectedPlan === 'Yearly' ? 15 * 12 : 15,
            middle: false,
            para: [
                'Enjoy all the features included in the Premium Plan.',
                'Unlock unlimited personalized study plans, carefully crafted by our AI.',
                'Enjoy unlimited access to the chatbot helper feature.',
            ],
            payment: selectedPlan,
        },
    ];
    return (
        <PageContainer {...BetweenPageAnimation}>
            <UpgradeTitle>
                {changeSubscription
                    ? 'Manage your plan'
                    : 'Find the plan that suits you the best'}{' '}
            </UpgradeTitle>
            <ButtonsHolder>
                <Button
                    select="primary500"
                    className={`!w-[50%] !rounded-[20px] !py-[12px] ${
                        selectedPlan === 'Monthly'
                            ? ''
                            : '!text-[var(--indigo-950)]'
                    }`}
                    outline={selectedPlan !== 'Monthly'}
                    onClick={() => handleButtonClick('Monthly')}
                >
                    Monthly
                </Button>
                <Button
                    select="primary500"
                    className={`!rounded-[15px] !py-[10px] !w-[50%] ${
                        selectedPlan === 'Yearly'
                            ? ''
                            : '!text-[var(--indigo-950)]'
                    }`}
                    outline={selectedPlan !== 'Yearly'}
                    onClick={() => handleButtonClick('Yearly')}
                >
                    Yearly
                </Button>
            </ButtonsHolder>
            <CardsHolder>
                {subscriptionPlans.map((plan) => {
                    if (plan.middle) {
                        return (
                            <div className="lg:pb-8 pt-8 relative ">
                                <CircleHolder>
                                    {changeSubscription
                                        ? 'Your Plan'
                                        : 'Most Popular'}
                                </CircleHolder>
                                <Card el={plan} />
                            </div>
                        );
                    } else {
                        return <Card el={plan} />;
                    }
                })}
            </CardsHolder>
        </PageContainer>
    );
};
export default UpgradePage;
