import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import CreditCardModal from '../../components/CreditCardModal';
import Accordion from '../../components/accordion/accordion.component';
import Button from '../../components/button/button.component';
import CardInfo from '../../components/card-info/card-info.component';
import { CustomInput } from '../../components/input/Input.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    setCredentials,
    useGetAllTagsQuery,
    useUpdateUserMutation,
} from '../../store';
import { ReceivedUser, UserToSend } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import {
    AddCardContainer,
    EditButton,
    InlineInputsContainer,
    PageContainer,
    PayTime,
    PlanButton,
    SectionContainer,
    SectionTitle,
} from './settings.styles';
import { useNavigate } from 'react-router-dom';
import { useFetchPaymentMethodsQuery } from '../../store/apis/paymentMethodsApi';
import { RecievePaymentMethod } from '../../types/payment-method';
import { Response } from '../../types/response';


export const SettingsPage = () => {
    const dispatch = useDispatch();

    // Network calls
    const { data: tagsRes } = useGetAllTagsQuery();
    const [triggerUpdateUser, { isLoading, reset: resetUserUpdateMutation }] =
        useUpdateUserMutation();

    // Local state
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
    const storedUser = useSelector(
        (state: RootState) => state.auth.user,
    ) as ReceivedUser;
    const userToken = useSelector((state: RootState) => state.auth.token);
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
    const { data: getPaymentMethods } = useFetchPaymentMethodsQuery(undefined);
    const PaymentMethodsData: RecievePaymentMethod[] =
        (getPaymentMethods as unknown as Response)?.data ?? [];
    console.log(PaymentMethodsData)
    function formatExpirationDate(dateString:string) {
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
            new Date(storedUser.DOB).getTime() !== new Date(birthDate).getTime()
        ) {
            diff.dob = birthDate;
        }
        if (storedUser.Bio !== bio) {
            diff.bio = bio;
        }
        if (JSON.stringify(storedUser.UserTags) !== JSON.stringify(interests)) {
            diff.addedInterests = _.difference(interests, storedUser.UserTags);
            diff.removedInterests = _.difference(
                storedUser.UserTags,
                interests,
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

    useEffect(() => {
        setFirstName(storedUser.FullName?.split(' ')[0]);
        setLastName(storedUser.FullName?.substring(firstName.length + 1));
        setUsername(storedUser.Username);
        setEmail(storedUser.Email);
        setPhone(storedUser.PhoneNumber);
        setBirthDate(
            new Date(storedUser.DOB ?? Date.now()).toISOString().split('T')[0],
        );
        setBio(storedUser.Bio);
        setInterests(storedUser.UserTags);
    }, [storedUser]);
    const navigate = useNavigate();


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
                        selectedTags={interests}
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

                <SectionContainer>
                    <SectionTitle>password</SectionTitle>
                    <CustomInput
                        type="password"
                        label={'Current Password'}
                        value=""
                        onChange={() => { }}
                    />
                    <InlineInputsContainer>
                        <CustomInput
                            type="password"
                            label={'New Password'}
                            value=""
                            onChange={() => { }}
                        />
                        <CustomInput
                            type="password"
                            label={'Repeat New Password'}
                            value=""
                            onChange={() => { }}
                        />
                    </InlineInputsContainer>
                </SectionContainer>

                <EditButton
                    select="warning"
                    title="Edit this section"
                    loading={isLoading}
                    editing={isEditingPersonalInfo}
                    onClick={() => {
                        setIsEditingPersonalInfo((isEditingPersonalInfo) => {
                            if (isEditingPersonalInfo) {
                                handleUpdatePersonalInformation();
                            }
                            return !isEditingPersonalInfo;
                        });
                    }}
                >
                    Save{' '}
                </EditButton>
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
                            <PlanButton onClick={() => navigate('/app/subscriptionManagement')} >Change Plan</PlanButton>
                            <PlanButton select="danger" outline={true}>
                                Cancel Plan
                            </PlanButton>
                        </div>
                    </div>

                    <SectionTitle>Payment Method</SectionTitle>
                    <div className="flex flex-col justify-center items-center gap-4 p-2">
                        {PaymentMethodsData.map((paymentMethod, index) =>

                            <div className='w-[100%]' key={index}>
                                <CardInfo Number={paymentMethod.cardNumber} ID={paymentMethod.ID} Expire={formatExpirationDate(paymentMethod.expiryDate)} />
                                {index !== PaymentMethodsData.length - 1 && <hr />}
                            </div>
                        )}
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

            <Accordion title="Security">
                <EditButton select="warning" title="Edit this section">
                    Save
                </EditButton>
            </Accordion>

            <Button outline select="danger" className="self-start mt-auto">
                Delete Account
            </Button>
            <CreditCardModal
                showModal={addCreditCardIsOpen}
                setShowModal={setAddCreditCardIsOpen}
            />

        </PageContainer>
    );
};
