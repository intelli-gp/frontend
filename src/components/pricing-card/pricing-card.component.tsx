import { useNavigate } from 'react-router-dom';

import { useGetSubscriptionQuery } from '../../store/apis/subscriptionsApi';
import { Plan } from '../../types/plan';
import { ReceivedSubscription } from '../../types/subscription';
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

    const { data: subscriptions } = useGetSubscriptionQuery();

    const subscriptionsData = subscriptions?.data as ReceivedSubscription;
    const isSubscribed =
        subscriptionsData && subscriptionsData.Status !== 'canceled';

    const isUnique = title === 'premium';

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
