import moment from 'moment';
import { useState } from 'react';
import { PiInfinityBold } from 'react-icons/pi';

import { NotificationSettingsRow as ToggleWithLabel } from '../../pages/settings/settings.styles';
import { EditButton } from '../../pages/settings/settings.styles';
import { useCreateSubscriptionMutation } from '../../store/apis/subscriptionsApi';
import { ReceivedSubscription } from '../../types/subscription';
import { successToast } from '../../utils/toasts';
import Skeleton from '../Skeleton';
import { Label } from '../input/input.styles';
import ToggleButton from '../toggle-button/toggle-button.component';
import {
    Container,
    InfoSection,
    PlanInterval,
    PlanName,
    PlanNameWrapper,
    PlanStatus,
} from './subscription-info.style';

type DateWithInfinityProps = {
    /**
     * Date to display
     */
    date?: string;
    /**
     * If true, will display the difference between the date and now
     */
    diff?: boolean;
};
const DateWithInfinity = ({ date, diff }: DateWithInfinityProps) => {
    if (diff) {
        return date ? (
            <div>{moment(date).diff(moment(), 'days')}</div>
        ) : (
            <PiInfinityBold />
        );
    }

    return date ? (
        <div>{moment(date).format('MMMM Do YYYY')}</div>
    ) : (
        <PiInfinityBold />
    );
};

type SubscriptionInfoProps = {
    subscriptionData?: ReceivedSubscription;
    handleCancelSubscription: () => void;
    isCancellingSubscription: boolean;
    isLoading: boolean;
};
const SubscriptionInfo = ({
    subscriptionData,
    handleCancelSubscription,
    isCancellingSubscription,
    isLoading,
}: SubscriptionInfoProps) => {
    const [autoRenewalIsOn, setAutoRenewalIsOn] = useState(
        !subscriptionData?.IsCancelled,
    );

    const buttonDisabled = autoRenewalIsOn === !subscriptionData?.IsCancelled;

    const [subscribeToPro, { isLoading: isSubscriptionCreationLoading }] =
        useCreateSubscriptionMutation();

    const toggleHandler = () => {
        setAutoRenewalIsOn(!autoRenewalIsOn);
    };

    const saveChangesHandler = async () => {
        if (autoRenewalIsOn) {
            await subscribeToPro({ interval: 'monthly' });
            successToast('Auto renewal activated successfully');
        } else {
            handleCancelSubscription();
        }
    };

    if (isLoading) {
        return (
            <Skeleton times={1} className="h-[180px] w-full rounded-[1.5rem]" />
        );
    }

    return (
        <Container>
            <InfoSection isPremium={!!subscriptionData}>
                <PlanNameWrapper>
                    <PlanName>{subscriptionData?.Title ?? 'Starter'}</PlanName>
                </PlanNameWrapper>
                <ToggleWithLabel>
                    <ToggleButton
                        isOn={autoRenewalIsOn}
                        toggle={toggleHandler}
                    />
                    <Label>Auto Renew</Label>
                    <PlanInterval>
                        {subscriptionData?.Interval || 'monthly'}
                    </PlanInterval>
                </ToggleWithLabel>

                <Label>Status</Label>
                <PlanStatus> {subscriptionData?.Status || 'active'}</PlanStatus>

                <Label>Started at</Label>
                <DateWithInfinity date={subscriptionData?.StartDate} />

                <Label>
                    {subscriptionData?.IsCancelled
                        ? 'Expires at'
                        : 'Renewal date'}
                </Label>
                <DateWithInfinity date={subscriptionData?.RenewalDate} />

                <Label>Days left</Label>
                <DateWithInfinity
                    date={subscriptionData?.RenewalDate}
                    diff={true}
                />
            </InfoSection>

            <EditButton
                title="Save Changes"
                onClick={saveChangesHandler}
                select="secondary"
                loading={
                    isCancellingSubscription || isSubscriptionCreationLoading
                }
                disabled={buttonDisabled}
            >
                Save
            </EditButton>
        </Container>
    );
};

export default SubscriptionInfo;
