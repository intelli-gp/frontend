import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
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
    AddCard,
    AddCardContainer,
    EditButton,
    InlineInputsContainer,
    PageContainer,
    SectionContainer,
    SectionTitle,
} from './settings.styles';

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

            <Accordion title="Payment">
                <div className="flex flex-row justify-start gap-6">
                    <CardInfo Number="4242424242424242" Expire="12/25" />
                    <AddCardContainer
                        onClick={() => setAddCreditCardIsOpen(true)}
                    >
                        <AddCard />
                        <p className="font-bold text-md w-[110px] text-center text-[var(--indigo-950)]">
                            Add Payment Method
                        </p>
                    </AddCardContainer>
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
