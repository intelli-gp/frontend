import { useNavigate } from 'react-router-dom';

import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    BenefitsList,
    CardContainer,
    CardHeader,
    CardPrice,
    CardTitle,
    CardsInnerContainer,
    CardsOuterContainer,
    CheckBoxIcon,
    ListItem,
    PageContainer,
    SwitchToPremiumButton,
    UpgradeButton,
} from './upgrade.styles';

type Plan = {
    id: number;
    title: 'starter' | 'premium';
    price: number;
    benefits: string[];
    subscriptionPeriod: 'month' | 'year';
    myPlan?: boolean;
};

const Card = ({ title, price, benefits, subscriptionPeriod }: Plan) => {
    const navigate = useNavigate();
    const isPro = title === 'premium';

    return (
        <CardContainer pro={isPro}>
            <CardHeader pro={isPro}>
                <CardTitle>{title}</CardTitle>
                <CardPrice>
                    ${price} <span>/ {subscriptionPeriod}</span>
                </CardPrice>
            </CardHeader>
            <BenefitsList>
                {benefits.map((benefit) => (
                    <ListItem>
                        <CheckBoxIcon pro={isPro} size={20} /> {benefit}
                    </ListItem>
                ))}
            </BenefitsList>
            {isPro ? (
                <UpgradeButton
                    select="success"
                    onClick={() => navigate(`/app/checkout`)}
                >
                    Get Started Now
                </UpgradeButton>
            ) : (
                <SwitchToPremiumButton
                    onClick={() => navigate(`/app/checkout`)}
                >
                    Switch to Premium
                </SwitchToPremiumButton>
            )}
        </CardContainer>
    );
};

const UpgradePage = () => {
    const subscriptionPlans: Plan[] = [
        {
            id: 1,
            title: 'starter',
            price: 0,
            benefits: [
                'Tailor and design personalized study plans.',
                'Find and collaborate with study groups.',
                'Receive personalized course recommendations based on your interests.',
                'Get assistance from chatbot helper for up to 3 questions per month.',
            ],
            subscriptionPeriod: 'month',
        },
        {
            id: 2,
            title: 'premium',
            price: 12,
            benefits: [
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
                'Enjoy all the features included in the Free Plan.',
                'Enjoy unlimited access to the chatbot helper feature.',
            ],
            subscriptionPeriod: 'month',
            myPlan: true,
        },
    ];
    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle size="lg" className="text-center !leading-none">
                Find the plan that suits you <br /> the best
            </PageTitle>
            <CardsOuterContainer>
                <CardsInnerContainer>
                    {subscriptionPlans.map((plan) => {
                        return <Card {...plan} />;
                    })}
                </CardsInnerContainer>
            </CardsOuterContainer>
        </PageContainer>
    );
};
export default UpgradePage;
