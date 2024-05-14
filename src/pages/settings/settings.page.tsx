import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CreditCardModal from '../../components/CreditCardModal';
import Accordion from '../../components/accordion/accordion.component';
import Button from '../../components/button/button.component';
import CardInfo from '../../components/card-info/card-info.component';
import { CustomInput } from '../../components/input/Input.component';
import { Modal } from '../../components/modal/modal.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    setCredentials,
    useDisable2faMutation,
    useEnable2faMutation,
    useGetAllTagsQuery,
    useLazyGenerate2faQuery,
    useUpdateUserMutation,
} from '../../store';
import { useFetchPaymentMethodsQuery } from '../../store/apis/paymentMethodsApi';
import { RecievePaymentMethod } from '../../types/payment-method';
import { Response } from '../../types/response';
import { UserToSend } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import {
    AddCardContainer,
    EditButton,
    InlineInputsContainer,
    PageContainer,
    PayTime,
    PlanButton,
    QRCodeImg,
    QRCodeModalButtons,
    QRCodeTextContainer,
    SectionContainer,
    SectionTitle,
} from './settings.styles';

export const SettingsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user: storedUser, token: userToken } = useSelector(
        (state: RootState) => state.auth,
    );

    const { data: tagsRes } = useGetAllTagsQuery();
    const [triggerUpdateUser, { isLoading, reset: resetUserUpdateMutation }] =
        useUpdateUserMutation();
    const { data: getPaymentMethods } = useFetchPaymentMethodsQuery(undefined);
    const PaymentMethodsData: RecievePaymentMethod[] =
        (getPaymentMethods as unknown as Response)?.data ?? [];
    const [triggerGenerate2faCode, { isFetching: isGenerating2faQRCode }] =
        useLazyGenerate2faQuery();
    const [triggerEnable2fa, { isLoading: isEnabling2fa }] =
        useEnable2faMutation();
    const [triggerDisable2fa, { isLoading: isDisabling2fa }] =
        useDisable2faMutation();

    const [firstName, setFirstName] = useState(
        storedUser.FullName?.split(' ')[0] ?? '',
    );
    const [lastName, setLastName] = useState(
        storedUser.FullName?.substring(firstName.length + 1) ?? '',
    );
    const [username, setUsername] = useState(storedUser.Username ?? '');
    const [email, setEmail] = useState(storedUser.Email ?? '');
    const [headline, setHeadline] = useState(storedUser.Headline ?? '');
    const [phone, setPhone] = useState(storedUser.PhoneNumber);
    const [birthDate, setBirthDate] = useState(
        new Date(storedUser.DOB ?? Date.now()).toISOString().split('T')[0],
    );
    const [bio, setBio] = useState(storedUser.Bio);
    const [interests, setInterests] = useState(storedUser.UserTags);
    const [addCreditCardIsOpen, setAddCreditCardIsOpen] = useState(false);
    const [enable2faIsOpen, setEnable2faIsOpen] = useState(false);
    const [disable2faIsOpen, setDisable2faIsOpen] = useState(false);
    const [QRCode, setQRCode] = useState('');

    function formatExpirationDate(dateString: string) {
        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: '2-digit' });
        const year = date.getFullYear().toString().slice(2);
        return `${month}/${year}`;
    }

    const handleUpdatePersonalInformation = async () => {
        /**
         * 1. Check if any of the fields have changed
         * 2. If so, send a request to update the user
         * 3. If not, do nothing
         */
        const diff: Partial<UserToSend> = {};

        if (storedUser.FullName !== `${firstName} ${lastName}`) {
            diff.fullName = `${firstName} ${lastName}`;
        }
        if (storedUser.Username !== username) {
            diff.username = username;
        }
        if (storedUser.Email !== email) {
            diff.email = email;
        }
        if (storedUser.PhoneNumber !== phone) {
            diff.phoneNumber = phone;
        }
        if (storedUser.Headline !== headline) {
            diff.headline = headline;
        }
        if (
            new Date(storedUser?.DOB ?? Date.now())?.getTime() !==
            new Date(birthDate).getTime()
        ) {
            diff.dob = birthDate;
        }
        if (storedUser.Bio !== bio) {
            diff.bio = bio;
        }
        if (JSON.stringify(storedUser.UserTags) !== JSON.stringify(interests)) {
            diff.addedInterests = _.difference(interests, storedUser.UserTags!);
            diff.removedInterests = _.difference(
                storedUser.UserTags,
                interests!,
            );
        }

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
            setEnable2faIsOpen(false);
        } catch (error) {
            errorToast('An error occurred while enabling 2FA');
            console.log(error);
        }
    };

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
            setDisable2faIsOpen(false);
        } catch (error) {
            errorToast('An error occurred while disabling 2FA');
            console.log(error);
        }
    };

    useEffect(() => {
        setFirstName(storedUser?.FullName!?.split(' ')[0]);
        setLastName(storedUser?.FullName!?.substring(firstName.length + 1));
        setUsername(storedUser?.Username!);
        setEmail(storedUser?.Email!);
        setPhone(storedUser.PhoneNumber);
        setBirthDate(
            new Date(storedUser.DOB ?? Date.now()).toISOString().split('T')[0],
        );
        setBio(storedUser.Bio);
        setInterests(storedUser.UserTags);
    }, [storedUser]);

    const Enable2faModal = () => {
        const [otp, setOtp] = useState('');
        const [otpError, setOtpError] = useState('');

        const handleEnable2faWithValidation = async () => {
            if (otp.length !== 6 || isNaN(Number(otp))) {
                setOtpError('Please enter a valid 6-digit code');
            } else {
                handleEnable2fa(otp);
            }
        };

        return (
            <Modal
                title="Enable Two Factor Authentication"
                isOpen={enable2faIsOpen}
                setIsOpen={setEnable2faIsOpen}
            >
                <QRCodeImg src={QRCode} alt="QRCode" />
                <QRCodeTextContainer>
                    <li>
                        Get any Authenticator app such as
                        <strong> Google Authenticator</strong>, or
                        <strong> Microsoft Authenticator</strong>.
                    </li>
                    <li>
                        Scan the QR code above with the app to generate a
                        6-digit.
                    </li>
                    <li>Enter the 6-digit code below to enable 2FA.</li>
                </QRCodeTextContainer>
                <CustomInput
                    label={'Enter the 6-digit code'}
                    Placeholder={'######'}
                    value={otp}
                    error={otpError}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOtp(e.target.value)
                    }
                />
                <QRCodeModalButtons>
                    <Button
                        onClick={handleEnable2faWithValidation}
                        loading={isEnabling2fa}
                    >
                        Enable
                    </Button>
                    <Button
                        select="danger"
                        outline
                        onClick={() => setEnable2faIsOpen(false)}
                    >
                        Cancel
                    </Button>
                </QRCodeModalButtons>
            </Modal>
        );
    };

    const Disable2faModal = () => {
        const [otp, setOtp] = useState('');
        const [otpError, setOtpError] = useState('');

        const handleDisable2faWithValidation = async () => {
            if (otp.length !== 6 || isNaN(Number(otp))) {
                setOtpError('Please enter a valid 6-digit code');
            } else {
                handleDisable2fa(otp);
            }
        };

        return (
            <Modal
                title="Disable Two Factor Authentication"
                isOpen={disable2faIsOpen}
                setIsOpen={setDisable2faIsOpen}
            >
                <QRCodeTextContainer>
                    <li>
                        Enter the <strong> 6-digit code </strong> from your
                        Authenticator app to disable 2FA.
                    </li>
                </QRCodeTextContainer>
                <CustomInput
                    label={'Enter the 6-digit code'}
                    Placeholder={'######'}
                    value={otp}
                    error={otpError}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOtp(e.target.value)
                    }
                />
                <QRCodeModalButtons>
                    <Button
                        onClick={handleDisable2faWithValidation}
                        loading={isDisabling2fa}
                        select="danger"
                        outline
                    >
                        Disable
                    </Button>
                    <Button onClick={() => setDisable2faIsOpen(false)}>
                        Cancel
                    </Button>
                </QRCodeModalButtons>
            </Modal>
        );
    };

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
                            setHeadline(e.target.value);
                        }}
                    />
                </SectionContainer>

                <EditButton
                    select="warning"
                    title="Edit this section"
                    loading={isLoading}
                    onClick={handleUpdatePersonalInformation}
                >
                    Save
                </EditButton>
            </Accordion>

            <Accordion title="Change Password">
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
                        select="warning"
                        title="Edit this section"
                        loading={false}
                        onClick={() => {}}
                    >
                        Save
                    </EditButton>
                </SectionContainer>
            </Accordion>

            <Accordion
                title="Security"
                className="!flex-row items-center justify-between"
            >
                <p className="text-lg">
                    Two Factor Authentication
                    <strong>
                        {storedUser.TwoFactorAuthEnabled
                            ? ' (Enabled)'
                            : ' (Disabled)'}
                    </strong>
                </p>
                <Button
                    onClick={
                        storedUser.TwoFactorAuthEnabled
                            ? () => setDisable2faIsOpen(true)
                            : handleGenerate2faQRCode
                    }
                    loading={isGenerating2faQRCode}
                    outline={storedUser.TwoFactorAuthEnabled}
                    select={
                        storedUser.TwoFactorAuthEnabled ? 'danger' : 'success'
                    }
                >
                    {storedUser.TwoFactorAuthEnabled ? 'Disable' : 'Enable'}
                </Button>
            </Accordion>

            <Accordion title="Notifications">
                <EditButton select="warning" title="Edit this section">
                    Save
                </EditButton>
            </Accordion>

            <Accordion title="Billing">
                <div className="flex flex-col p-2">
                    <SectionTitle>Current Plan</SectionTitle>
                    <div className="flex flex-row justify-between mb-6 font-bold">
                        <div className="w-[70%] flex flex-col gap-2">
                            <span className="flex justify-start gap-4 items-center mt-4">
                                <p className="font-extrabold text-lg">
                                    Premium{' '}
                                </p>
                                <PayTime>Monthly</PayTime>
                                <p className="mr-6">
                                    $200
                                    <span className="text-xs text-[var(--slate-500)] font-medium">
                                        /month
                                    </span>
                                </p>
                            </span>
                            <span className="flex gap-2 items-center">
                                <p>Status: </p>
                                <span className="flex gap-2 items-center font-extrabold">
                                    <FaCheckCircle color="green" />
                                    <p>Active</p>
                                </span>
                            </span>
                            <span className="flex gap-2 items-center">
                                <div>Joined:</div>
                                <div className=" font-extrabold">
                                    <span>April 20, 2024</span>
                                </div>
                            </span>
                            <span className="flex gap-2">
                                <p>Renew subscription by </p>
                                <p className="font-extrabold"> May 20, 2024</p>
                            </span>
                        </div>
                        <div className="flex flex-col justify-end gap-4 mt-6 w-[25%]">
                            <PlanButton
                                onClick={() =>
                                    navigate('/app/subscriptionManagement')
                                }
                            >
                                Change Plan
                            </PlanButton>
                            <PlanButton select="danger" outline={true}>
                                Cancel Plan
                            </PlanButton>
                        </div>
                    </div>

                    <SectionTitle>Payment Method</SectionTitle>
                    <div className="flex flex-col justify-center items-center gap-4 p-2">
                        {PaymentMethodsData.map((paymentMethod, index) => (
                            <div className="w-[100%]" key={index}>
                                <CardInfo
                                    Number={paymentMethod.cardNumber}
                                    ID={paymentMethod.ID}
                                    Expire={formatExpirationDate(
                                        paymentMethod.expiryDate,
                                    )}
                                />
                                {index !== PaymentMethodsData.length - 1 && (
                                    <hr />
                                )}
                            </div>
                        ))}
                        <span className="flex justify-end w-full">
                            <AddCardContainer
                                onClick={() => setAddCreditCardIsOpen(true)}
                            >
                                Add Payment Method
                            </AddCardContainer>
                        </span>
                    </div>
                </div>
            </Accordion>

            <Button outline select="danger" className="self-start mt-auto">
                Delete Account
            </Button>

            {/* Modals */}
            <Enable2faModal />
            <Disable2faModal />
            <CreditCardModal
                showModal={addCreditCardIsOpen}
                setShowModal={setAddCreditCardIsOpen}
            />
        </PageContainer>
    );
};
