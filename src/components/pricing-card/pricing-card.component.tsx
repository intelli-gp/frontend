import { useNavigate } from 'react-router-dom';

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
    const isUnique = title === 'premium';

    const CardButton = () => {
        if (withoutButton) return <></>;
        if (isUnique) {
            return (
                <UpgradeButton
                    select="success"
                    onClick={() => navigate(`/app/checkout`)}
                >
                    Get Started Now
                </UpgradeButton>
            );
        }
        if (!isUnique) {
            return (
                <SwitchToPremiumButton
                    onClick={() => navigate(`/app/checkout`)}
                >
                    Switch to Premium
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
