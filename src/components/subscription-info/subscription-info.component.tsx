import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import {
    NotificationSettingsRow,
    PayTime,
    PlanButton,
} from '../../pages/settings/settings.styles';
import { useCreateSubscriptionMutation } from '../../store/apis/subscriptionsApi';
import { ReceivedSubscription } from '../../types/subscription';
import { Label } from '../input/input.styles';
import ToggleButton from '../toggle-button/toggle-button.component';
import {
    BoldText,
    ButtonWrapper,
    Container,
    DateWrapper,
    Header,
    InfoSection,
    Price,
    PriceWrapper,
    Status,
    StatusWrapper,
    Title,
} from './subscription-info.style';

interface SubscriptionInfoProps {
    subscriptionData: ReceivedSubscription;
    handleCancelSubscription: () => void;
    isCancellingSubscription: boolean;
}
const SubscriptionInfo = ({
    subscriptionData,
    handleCancelSubscription,
    isCancellingSubscription,
}: SubscriptionInfoProps) => {
    const [toggleOn, setToggleOn] = useState(!subscriptionData?.IsCancelled);
    const buttonDisabled = toggleOn === !subscriptionData?.IsCancelled;
    const [subscribeToPro, { isLoading: isSubscriptionCreationLoading }] =
        useCreateSubscriptionMutation();

    const toggleHandler = () => {
        setToggleOn(!toggleOn);
    };

    const saveChangesHandler = () => {
        if (toggleOn) {
            subscribeToPro({ interval: 'monthly' });
        } else {
            handleCancelSubscription();
        }
    };

    return (
        <Container>
            <InfoSection>
                <Header>
                    <Title>Professional</Title>
                    <PayTime>{subscriptionData?.Interval}</PayTime>
                    <PriceWrapper>
                        ${subscriptionData?.Price}
                        <Price>
                            /
                            {subscriptionData?.Interval === 'monthly'
                                ? 'month'
                                : 'year'}
                        </Price>
                    </PriceWrapper>
                </Header>
                <StatusWrapper>
                    <p>Status:</p>
                    <Status>
                        <FaCheckCircle color="green" />
                        <p>{subscriptionData.Status}</p>
                    </Status>
                </StatusWrapper>
                <DateWrapper>
                    <div>Joined:</div>
                    <BoldText>
                        {new Date(
                            subscriptionData?.StartDate || '',
                        ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    </BoldText>
                </DateWrapper>
                <DateWrapper>
                    <p>Renew subscription by</p>
                    <BoldText>
                        {new Date(
                            subscriptionData?.RenewalDate || '',
                        ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    </BoldText>
                </DateWrapper>
            </InfoSection>
            <ButtonWrapper>
                <NotificationSettingsRow className="pb-2">
                    <ToggleButton isOn={toggleOn} toggle={toggleHandler} />
                    <Label>Auto Renew </Label>
                </NotificationSettingsRow>
                <PlanButton
                    onClick={saveChangesHandler}
                    select="success"
                    loading={
                        isCancellingSubscription ||
                        isSubscriptionCreationLoading
                    }
                    outline={true}
                    disabled={buttonDisabled}
                >
                    Save Changes
                </PlanButton>
            </ButtonWrapper>
        </Container>
    );
};

export default SubscriptionInfo;
