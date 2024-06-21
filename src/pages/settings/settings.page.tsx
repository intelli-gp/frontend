import _ from 'lodash';
import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { MdOutlineAddCard } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Accordion from '../../components/accordion/accordion.component';
import Button from '../../components/button/button.component';
import CardsInfo from '../../components/card-info/cards-info.component';
import AddCreditCardModal from '../../components/credit-card-modal/CreditCardModal';
import { CustomInput } from '../../components/input/Input.component';
import { Label } from '../../components/input/input.styles';
import { Modal, ModalProps } from '../../components/modal/modal.component';
import SubscriptionInfo from '../../components/subscription-info/subscription-info.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import ToggleButton from '../../components/toggle-button/toggle-button.component';
import {
    useNotificationsHook,
    usePersonalInfoHook,
} from '../../hooks/settings.hook';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    changeUserPlan,
    setCredentials,
    useDisable2faMutation,
    useEnable2faMutation,
    useGetAllTagsQuery,
    useLazyGenerate2faQuery,
    useUpdateUserMutation,
} from '../../store';
import {
    useCancelSubscriptionMutation,
    useGetSubscriptionQuery,
} from '../../store/apis/subscriptionsApi';
import { errorToast, successToast } from '../../utils/toasts';
import {
    AddCardContainer,
    EditButton,
    InlineInputsContainer,
    NoContentHolder,
    NotificationSettingsContainer,
    NotificationSettingsRow,
    PageContainer,
    PlanButton,
    QRCodeImg,
    QRCodeModalButtons,
    QRCodeText,
    QRCodeTextContainer,
    SectionContainer,
    SectionTitle,
    TwoFABadge,
    TwoFaContainer,
} from './settings.styles';

const Enable2faModal = ({
    isOpen,
    setIsOpen,
    QRCode,
}: Pick<ModalProps, 'isOpen' | 'setIsOpen'> & { QRCode: string }) => {
    const dispatch = useDispatch();
    const { user: storedUser } = useSelector((state: RootState) => state.auth);

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    const [triggerEnable2fa, { isLoading: isEnabling2fa }] =
        useEnable2faMutation();

    const handleEnable2fa = async (otp: string) => {
        try {
            const res = await triggerEnable2fa(otp).unwrap();
            const { access_token } = res.data;
            dispatch(
                setCredentials({
                    user: {
                        ...storedUser,
                        TwoFactorAuthEnabled: true,
                    },
                    token: access_token,
                }),
            );
            successToast('Two Factor Authentication has been enabled!');
            setIsOpen(false);
        } catch (error) {
            errorToast('An error occurred while enabling 2FA');
            console.log(error);
        }
    };

    const handleEnable2faWithValidation = async () => {
        if (otp.length !== 6 || isNaN(Number(otp))) {
            setOtpError('Please enter a valid six-digit code');
        } else {
            handleEnable2fa(otp);
        }
    };

    return (
        <Modal
            title="Enable Two Factor Authentication"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <QRCodeImg src={QRCode} alt="QRCode" />
            <QRCodeTextContainer>
                <li>
                    Download any Authenticator app such as
                    <strong> Google Authenticator</strong>, or
                    <strong> Microsoft Authenticator</strong>.
                </li>
                <li>Scan the QR code above with the app to generate a code.</li>
                <li>
                    Enter the six-digit code below to enable two factor
                    authentication.
                </li>
            </QRCodeTextContainer>
            <CustomInput
                label={'Six-digit code'}
                Placeholder={'- - - - - -'}
                value={otp}
                error={otpError}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOtp(e.target.value)
                }
            />
            <QRCodeModalButtons>
                <Button
                    onClick={handleEnable2faWithValidation}
                    className={'w-[90px] h-[38px]'}
                    loading={isEnabling2fa}
                >
                    Enable
                </Button>
                <Button
                    select="danger"
                    outline
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </Button>
            </QRCodeModalButtons>
        </Modal>
    );
};

const Disable2faModal = ({
    isOpen,
    setIsOpen,
}: Pick<ModalProps, 'isOpen' | 'setIsOpen'>) => {
    const dispatch = useDispatch();

    const { user: storedUser } = useSelector((state: RootState) => state.auth);

    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    const [triggerDisable2fa, { isLoading: isDisabling2fa }] =
        useDisable2faMutation();
    const handleDisable2fa = async (otp: string) => {
        try {
            const res = await triggerDisable2fa(otp).unwrap();
            const { access_token } = res.data;
            dispatch(
                setCredentials({
                    user: {
                        ...storedUser,
                        TwoFactorAuthEnabled: false,
                    },
                    token: access_token,
                }),
            );
            successToast('Two Factor Authentication has been disabled!');
            setIsOpen(false);
        } catch (error) {
            errorToast('An error occurred while disabling 2FA');
            console.log(error);
        }
    };

    const handleDisable2faWithValidation = async () => {
        if (otp.length !== 6 || isNaN(Number(otp))) {
            setOtpError('Please enter a valid six-digit code');
        } else {
            handleDisable2fa(otp);
        }
    };

    return (
        <Modal
            title="Disable Two Factor Authentication"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <QRCodeText>
                Enter the six-digit code from your <br />
                <strong> Authenticator app</strong>
            </QRCodeText>
            <CustomInput
                label={'Six-digit code to disable'}
                Placeholder={'- - - - - -'}
                value={otp}
                error={otpError}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOtp(e.target.value)
                }
            />
            <QRCodeModalButtons>
                <Button
                    onClick={handleDisable2faWithValidation}
                    className={'w-[90px] h-[38px]'}
                    loading={isDisabling2fa}
                    select="danger"
                    outline
                >
                    Disable
                </Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </QRCodeModalButtons>
        </Modal>
    );
};

export const SettingsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user: storedUser, token: userToken } = useSelector(
        (state: RootState) => state.auth,
    );

    const { data: tagsRes } = useGetAllTagsQuery();
    const [triggerUpdateUser, { isLoading, reset: resetUserUpdateMutation }] =
        useUpdateUserMutation();
    const [triggerGenerate2faCode, { isFetching: isGenerating2faQRCode }] =
        useLazyGenerate2faQuery();

    const { data: subscriptionResponse, isLoading: isSubscriptionDataLoading } =
        useGetSubscriptionQuery();
    const subscriptionData = subscriptionResponse?.data;
    const [cancelSubscription, { isLoading: isCancellingSubscription }] =
        useCancelSubscriptionMutation();

    const [addCreditCardIsOpen, setAddCreditCardIsOpen] = useState(false);
    const [enable2faIsOpen, setEnable2faIsOpen] = useState(false);
    const [disable2faIsOpen, setDisable2faIsOpen] = useState(false);
    const [QRCode, setQRCode] = useState('');

    const {
        messagesIsOn,
        followIsOn,
        commentsIsOn,
        allOn,
        toggleFollow,
        toggleComments,
        toggleMessages,
        toggleAllOn,
        updateNotificationsSettings,
        isUpdateNotificationsLoading,
    } = useNotificationsHook({});
    const {
        firstName,
        lastName,
        username,
        email,
        headline,
        phone,
        birthDate,
        bio,
        interests,
        setFirstName,
        setLastName,
        setUsername,
        setEmail,
        setHeadline,
        setPhone,
        setBirthDate,
        setBio,
        setInterests,
        getUpdateDiff,
    } = usePersonalInfoHook();

    const handleUpdatePersonalInformation = async () => {
        /**
         * 1. Check if any of the fields have changed
         * 2. If so, send a request to update the user
         * 3. If not, do nothing
         */
        const diff = getUpdateDiff();
        if (Object.keys(diff).length > 0) {
            try {
                const {
                    data: { updatedUser },
                } = await triggerUpdateUser(diff).unwrap();

                dispatch(
                    setCredentials({
                        user: updatedUser,
                        token: userToken,
                    }),
                );

                successToast(
                    'Your personal data has been updated successfully!',
                );
            } catch (error) {
                errorToast('An error occurred while updating your data.');
            } finally {
                resetUserUpdateMutation();
            }
        }
    };

    const handleGenerate2faQRCode = async () => {
        try {
            const rawImage = await triggerGenerate2faCode().unwrap();
            const reader = new FileReader();
            reader.readAsDataURL(new Blob([rawImage]));
            reader.onloadend = () => {
                setQRCode(reader.result as string);
                setEnable2faIsOpen(true);
            };
        } catch (error) {
            errorToast('An error occurred while generating the 2FA code');
            console.log(error);
        }
    };

    const handleCancelSubscription = async () => {
        try {
            await cancelSubscription({
                subscriptionId: subscriptionData?.ID as string,
            }).unwrap();
            dispatch(changeUserPlan('free'));
            successToast('Subscription cancelled successfully');
        } catch (error) {
            errorToast('An error occurred while cancelling your subscription');
            console.log(error);
        }
    };

    // Setting document title
    useLayoutEffect(() => {
        document.title = 'Settings | Mujedd';
        return () => {
            document.title = 'Mujedd';
        };
    }, []);

    return (
        <PageContainer {...BetweenPageAnimation}>
            <PageTitle>Settings</PageTitle>

            <Accordion title="Account Information" className="!gap-6">
                <SectionContainer>
                    <SectionTitle>FullName and username</SectionTitle>
                    <InlineInputsContainer>
                        <CustomInput
                            label={'First name'}
                            value={firstName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <CustomInput
                            label={'Last name'}
                            value={lastName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </InlineInputsContainer>
                    <CustomInput
                        label={'Username'}
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value);
                        }}
                    />
                </SectionContainer>

                <SectionContainer>
                    <SectionTitle>Contact Information</SectionTitle>
                    <InlineInputsContainer>
                        <CustomInput
                            label={'Email'}
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <CustomInput
                            label={'Phone'}
                            value={phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPhone(e.target.value);
                            }}
                        />
                    </InlineInputsContainer>
                </SectionContainer>

                <SectionContainer>
                    <SectionTitle>About</SectionTitle>
                    <CustomInput
                        label={'Headline or Title'}
                        value={headline}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setHeadline(e.target.value);
                        }}
                    />
                    <CustomInput
                        label={'Bio'}
                        value={bio}
                        multiline
                        rows={6}
                        limit={2000}
                        maxLength={2000}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setBio(e.target.value);
                        }}
                    />
                </SectionContainer>

                <SectionContainer>
                    <SectionTitle>Other</SectionTitle>
                    <TagsInput2
                        label={'Interests'}
                        updateSelectedTags={(tags: string[]) =>
                            setInterests(tags)
                        }
                        availableTags={tagsRes?.data ?? []}
                        selectedTags={interests!}
                    />
                    <CustomInput
                        type="date"
                        label={'Birth Date'}
                        value={birthDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setBirthDate(e.target.value);
                        }}
                    />
                </SectionContainer>

                <EditButton
                    select="secondary"
                    title="Save changes"
                    loading={isLoading}
                    onClick={handleUpdatePersonalInformation}
                >
                    Save
                </EditButton>
            </Accordion>

            <Accordion title="Change Password">
                <SectionTitle>update your password</SectionTitle>
                <SectionContainer>
                    <CustomInput
                        type="password"
                        label={'Current Password'}
                        value=""
                        onChange={() => {}}
                    />
                    <InlineInputsContainer>
                        <CustomInput
                            type="password"
                            label={'New Password'}
                            value=""
                            onChange={() => {}}
                        />
                        <CustomInput
                            type="password"
                            label={'Repeat New Password'}
                            value=""
                            onChange={() => {}}
                        />
                    </InlineInputsContainer>
                    <EditButton
                        select="secondary"
                        title="Save changes"
                        loading={false}
                        onClick={() => {}}
                    >
                        Save
                    </EditButton>
                </SectionContainer>
            </Accordion>

            <Accordion title="Security">
                <SectionTitle>Strengthen your account security</SectionTitle>
                <TwoFaContainer>
                    Two Factor Authentication
                    <TwoFABadge isEnabled={!!storedUser.TwoFactorAuthEnabled}>
                        {storedUser.TwoFactorAuthEnabled
                            ? ' Enabled'
                            : ' Disabled'}
                    </TwoFABadge>
                </TwoFaContainer>
                <EditButton
                    className="!mt-0"
                    onClick={
                        storedUser.TwoFactorAuthEnabled
                            ? () => setDisable2faIsOpen(true)
                            : handleGenerate2faQRCode
                    }
                    loading={isGenerating2faQRCode}
                    outline={storedUser.TwoFactorAuthEnabled}
                    select={
                        storedUser.TwoFactorAuthEnabled ? 'danger' : 'secondary'
                    }
                >
                    {storedUser.TwoFactorAuthEnabled ? 'Disable' : 'Enable'}
                </EditButton>
            </Accordion>

            <Accordion title="Notifications">
                <NotificationSettingsContainer>
                    <SectionTitle>All at once</SectionTitle>
                    <NotificationSettingsRow className="pb-2">
                        <ToggleButton isOn={allOn} toggle={toggleAllOn} />
                        <Label>All Notifications </Label>
                    </NotificationSettingsRow>

                    <SectionTitle>One by One</SectionTitle>
                    <NotificationSettingsRow>
                        <ToggleButton
                            isOn={messagesIsOn}
                            toggle={toggleMessages}
                        />
                        <Label>Messages Notifications</Label>
                    </NotificationSettingsRow>
                    <NotificationSettingsRow>
                        <ToggleButton isOn={followIsOn} toggle={toggleFollow} />
                        <Label>Follow Notifications</Label>
                    </NotificationSettingsRow>
                    <NotificationSettingsRow>
                        <ToggleButton
                            isOn={commentsIsOn}
                            toggle={toggleComments}
                        />
                        <Label>Likes & Comments Notifications</Label>
                    </NotificationSettingsRow>
                </NotificationSettingsContainer>
                <EditButton
                    select="secondary"
                    title="Save changes"
                    onClick={updateNotificationsSettings}
                    loading={isUpdateNotificationsLoading}
                >
                    Save
                </EditButton>
            </Accordion>

            <Accordion title="Billing">
                <div className="flex flex-col p-2">
                    <SectionTitle>Current Plan</SectionTitle>
                    {isSubscriptionDataLoading ? (
                        <NoContentHolder>
                            <p>Loading...</p>
                        </NoContentHolder>
                    ) : (
                        !subscriptionData && (
                            <div className="flex flex-col justify-between mb-6 p-2">
                                <NoContentHolder>
                                    <p>
                                        You don’t have any active subscription.
                                    </p>
                                </NoContentHolder>
                                <div className="flex justify-end gap-4 mt-6 w-full">
                                    <PlanButton
                                        onClick={() => navigate('/app/upgrade')}
                                        select="secondary"
                                    >
                                        Upgrade
                                    </PlanButton>
                                </div>
                            </div>
                        )
                    )}
                    {subscriptionData && (
                        <SubscriptionInfo
                            subscriptionData={subscriptionData}
                            subscriptionResponse={subscriptionResponse}
                            isCancellingSubscription={isCancellingSubscription}
                            handleCancelSubscription={handleCancelSubscription}
                        />
                    )}
                    <SectionTitle>Payment Method</SectionTitle>
                    <div className="flex flex-col justify-center items-center gap-4 p-2">
                    <CardsInfo/>

                        <span className="flex justify-end w-full">
                            <AddCardContainer
                                onClick={() => setAddCreditCardIsOpen(true)}
                                select="secondary"
                                title="Add credit card"
                            >
                                <MdOutlineAddCard size={26} />
                            </AddCardContainer>
                        </span>
                    </div>
                </div>
            </Accordion>

            <Button outline select="danger" className="self-start mt-auto">
                Delete Account
            </Button>

            {/* Modals */}
            <Enable2faModal
                isOpen={enable2faIsOpen}
                setIsOpen={setEnable2faIsOpen}
                QRCode={QRCode}
            />
            <Disable2faModal
                isOpen={disable2faIsOpen}
                setIsOpen={setDisable2faIsOpen}
            />
            <AddCreditCardModal
                showModal={addCreditCardIsOpen}
                setShowModal={setAddCreditCardIsOpen}
            />
        </PageContainer>
    );
};
