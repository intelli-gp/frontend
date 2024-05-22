import PricingCard from '../../components/pricing-card/pricing-card.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import { Plan } from '../../types/plan';
import {
    CardsInnerContainer,
    CardsOuterContainer,
    PageContainer,
} from './upgrade.styles';

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
            period: 'month',
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
            period: 'month',
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
                        return <PricingCard {...plan} key={plan.id} />;
                    })}
                </CardsInnerContainer>
            </CardsOuterContainer>
        </PageContainer>
    );
};
export default UpgradePage;
