import { FaCheckCircle } from 'react-icons/fa';
import { PayTime, PlanButton } from '../../pages/settings/settings.styles';
import { Container, InfoSection, Header, Title, PriceWrapper, Price, StatusWrapper, Status, DateWrapper, BoldText, ButtonWrapper } from './subscription-info.style';
interface SubscriptionData {
    Interval: 'monthly' | 'yearly';
}

interface SubscriptionResponse {
    data: {
        Price: number;
        StartDate: Date;
        RenewalDate: Date;
    };
}

interface SubscriptionInfoProps {
    subscriptionData: SubscriptionData;
    subscriptionResponse?: SubscriptionResponse;
    handleCancelSubscription: () => void;
    isCancellingSubscription: boolean;
}
const SubscriptionInfo = ({ subscriptionData, subscriptionResponse, handleCancelSubscription, isCancellingSubscription }:SubscriptionInfoProps) => (
    <Container>
        <InfoSection>
            <Header>
                <Title>Professional</Title>
                <PayTime>{subscriptionData?.Interval}</PayTime>
                <PriceWrapper>
                    ${subscriptionResponse?.data?.Price}
                    <Price>
                        /{subscriptionData?.Interval === 'monthly' ? 'month' : 'year'}
                    </Price>
                </PriceWrapper>
            </Header>
            <StatusWrapper>
                <p>Status:</p>
                <Status>
                    <FaCheckCircle color="green" />
                    <p>Active</p>
                </Status>
            </StatusWrapper>
            <DateWrapper>
                <div>Joined:</div>
                <BoldText>
                    {new Date(subscriptionResponse?.data?.StartDate||'').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })}
                </BoldText>
            </DateWrapper>
            <DateWrapper>
                <p>Renew subscription by</p>
                <BoldText>
                    {new Date(subscriptionResponse?.data?.RenewalDate||'').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })}
                </BoldText>
            </DateWrapper>
        </InfoSection>
        <ButtonWrapper>
            <PlanButton
                onClick={handleCancelSubscription}
                select="danger"
                loading={isCancellingSubscription}
                outline={true}
            >
                Cancel Plan
            </PlanButton>
        </ButtonWrapper>
    </Container>
);

export default SubscriptionInfo;