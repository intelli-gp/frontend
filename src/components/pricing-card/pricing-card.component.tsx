import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../store';
import { Plan } from '../../types/plan';
import {
    BenefitsList,
    CardContainer,
    CardHeader,
    CardPrice,
    CardTitle,
    CheckBoxIcon,
    ListItem,
    SwitchToPremiumButton,
    UpgradeButton,
} from './pricing-card.styles';

type PricingCardProps = Plan & {
    withoutButton?: boolean;
};

const PricingCard = ({
    title,
    price,
    benefits,
    period,
    withoutButton = false,
}: PricingCardProps) => {
    const navigate = useNavigate();
    const userPlan = useSelector(
        (state: RootState) => state.auth.user.SubscriptionsPlan,
    );
    const isUnique = title === 'premium';
    const isSubscribed = userPlan === 2;
 
    console.log('isSubscribed', isSubscribed);

    const CardButton = () => {
        if (withoutButton) return <></>;
        if (isUnique && !isSubscribed) {
            return (
                <UpgradeButton
                    select="success"
                    onClick={() => navigate(`/app/checkout`)}
                >
                    Get Started Now
                </UpgradeButton>
            );
        }
        if (!isUnique && !isSubscribed) {
            return (
                <SwitchToPremiumButton
                    onClick={() => navigate(`/app/checkout`)}
                >
                    Switch to Premium
                </SwitchToPremiumButton>
            );
        }

        if (isSubscribed && isUnique) {
            return (
                <UpgradeButton
                    select="danger"
                    // outline
                    onClick={() => navigate(`/app/settings/#Billing`)}
                >
                    Cancel Subscription
                </UpgradeButton>
            );
        }

        if (isSubscribed && !isUnique) {
            return (
                <SwitchToPremiumButton
                    onClick={() => navigate(`/app/settings/#Billing`)}
                >
                    Switch to Starter
                </SwitchToPremiumButton>
            );
        }
    };

    return (
        <CardContainer unique={isUnique} withoutButton={withoutButton}>
            <CardHeader unique={isUnique}>
                <CardTitle>{title}</CardTitle>
                <CardPrice>
                    ${price} <span>/ {period}</span>
                </CardPrice>
            </CardHeader>

            <BenefitsList>
                {benefits.map((benefit) => (
                    <ListItem>
                        <CheckBoxIcon unique={isUnique} size={20} /> {benefit}
                    </ListItem>
                ))}
            </BenefitsList>

            <CardButton />
        </CardContainer>
    );
};

export default PricingCard;
