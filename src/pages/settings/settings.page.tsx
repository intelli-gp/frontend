import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import defaultProfile from '../../assets/imgs/user.jpg';
import { InputsGrid } from '../../components/Input';
import Accordion from '../../components/accordion/accordion.component';
import Button from '../../components/button/button.component';
import Tag from '../../components/tag/tag.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import {
    RootState,
    setCredentials,
    useGetAllTagsQuery,
    useUpdateUserMutation,
} from '../../store';
import {
    SerializedCustomInput,
    SerializedInput,
} from '../../types/serialized-input';
import { ReceivedUser, UserToSend } from '../../types/user';
import { errorToast, successToast } from '../../utils/toasts';
import {
    EditButton,
    HeaderTagsContainer,
    PageContainer,
    PageHeader,
    ProfilePicture,
    ProfilePictureContainer,
} from './settings.styles';

export const SettingsPage = () => {
    const dispatch = useDispatch();

    // Network calls
    const { data: tagsRes } = useGetAllTagsQuery();
    const [triggerUpdateUser, { isLoading, reset }] = useUpdateUserMutation();

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
    const [phone, setPhone] = useState(storedUser.PhoneNumber);
    const [birthDate, setBirthDate] = useState(
        new Date(storedUser.DOB ?? Date.now()).toISOString().split('T')[0],
    );
    const [bio, setBio] = useState(storedUser.Bio);
    const [interests, setInterests] = useState(storedUser.UserTags);

    // Serialized inputs
    const personalInfoInputs: SerializedCustomInput[] = [
        {
            label: 'First Name',
            value: firstName,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setFirstName(e.target.value);
            },
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Last Name',
            value: lastName,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setLastName(e.target.value);
            },
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Username',
            value: username,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
            },
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Email',
            type: 'email',
            value: email,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
            },
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Phone',
            value: phone,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value);
            },
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Birth Date',
            type: 'date',
            value: birthDate,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setBirthDate(e.target.value);
            },
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Bio',
            placeholder: 'Tell us about yourself',
            value: bio,
            multiline: true,
            rows: 4,
            maxLength: 512,
            onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
                setBio(e.target.value);
            },
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Interests',
            value: interests,
            custom: true,
            customComponent: (
                <TagsInput2
                    updateSelectedTags={(tags: string[]) => setInterests(tags)}
                    availableTags={tagsRes?.data ?? []}
                    selectedTags={interests}
                    disabled={!isEditingPersonalInfo}
                />
            ),
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
    ];
    const securityInputs: SerializedInput[] = [
        {
            label: 'Current Password',
            value: '',
            type: 'password',
            placeholder: 'your current password',
            onChange: () => {},
        },
        {
            label: 'New Password',
            value: '',
            placeholder: 'your new password',
            type: 'password',
            onChange: () => {},
        },
        {
            label: 'Repeat New Password',
            value: '',
            placeholder: 'repeat your new password',
            type: 'password',
            onChange: () => {},
        },
    ];

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
                reset();
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
            <PageTitle>Account Settings</PageTitle>

            <PageHeader>
                <section className="flex flex-col items-center">
                    <ProfilePictureContainer>
                        <ProfilePicture
                            src={storedUser.ProfileImage ?? defaultProfile}
                        />
                    </ProfilePictureContainer>
                    <h2 className="text-xl font-bold mt-4">
                        {storedUser.FullName ?? 'Delete me'}
                    </h2>
                    <h2 className="text-md opacity-75 font-thin">
                        @{storedUser.Username ?? 'Delete me'}
                    </h2>
                </section>

                <section className="flex flex-col gap-6">
                    <p className="max-w-[70ch]">
                        {storedUser.Bio ?? "You don't have bio yet."}
                    </p>

                    <HeaderTagsContainer>
                        {storedUser.UserTags?.map((tag) => (
                            <Tag
                                key={tag}
                                text={tag}
                                size="sm"
                                variant="darker"
                            />
                        ))}
                    </HeaderTagsContainer>
                </section>
            </PageHeader>

            <Accordion title="Personal Information">
                <InputsGrid inputs={personalInfoInputs} />
                <EditButton
                    type="button"
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
                    {isEditingPersonalInfo ? 'Save' : <FiEdit size={18} />}
                </EditButton>
            </Accordion>

            <Accordion title="Security">
                <InputsGrid inputs={securityInputs} />
                <EditButton
                    type="button"
                    select="warning"
                    title="Edit this section"
                    editing={true}
                >
                    Save
                </EditButton>
            </Accordion>

            <Button
                type="button"
                outline
                select="danger"
                className="self-start mt-auto"
            >
                Delete Account
            </Button>
        </PageContainer>
    );
};
