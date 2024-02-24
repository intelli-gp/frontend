import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import cameraImage from '../../assets/imgs/camera.png';
import defaultProfile from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import { InputsGrid } from '../../components/Input';
import Accordion from '../../components/accordion/accordion.component';
import Tag from '../../components/tag/tag.component';
import TagsInput2 from '../../components/tagsInput2/tagsInput2.component';
import { PageTitle } from '../../index.styles';
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
import { User, UserToSend } from '../../types/user';
import { successToast } from '../../utils/toasts';
import {
    EditButton,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePicture,
    ProfilePictureContainer,
} from './settings.styles';

export const SettingsPage = () => {
    const dispatch = useDispatch();

    // Network calls
    const { data: tagsRes } = useGetAllTagsQuery();
    const [triggerUpdateUser, { isLoading, isSuccess, reset }] =
        useUpdateUserMutation();

    // Local state
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
    const storedUser = useSelector(
        (state: RootState) => state.auth.user,
    ) as User;
    const userToken = useSelector((state: RootState) => state.auth.token);
    const [firstName, setFirstName] = useState(
        storedUser.full_name?.split(' ')[0] ?? '',
    );
    const [lastName, setLastName] = useState(
        storedUser.full_name?.substring(firstName.length + 1) ?? '',
    );
    const [username, setUsername] = useState(storedUser.username ?? '');
    const [email, setEmail] = useState(storedUser.email ?? '');
    const [phone, setPhone] = useState(storedUser.phone_number);
    const [birthDate, setBirthDate] = useState(
        new Date(storedUser.dob ?? Date.now()).toISOString().split('T')[0],
    );
    const [bio, setBio] = useState(storedUser.bio);
    const [interests, setInterests] = useState(storedUser.user_tag);

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

        if (storedUser.full_name !== `${firstName} ${lastName}`) {
            diff.fullName = `${firstName} ${lastName}`;
        }
        if (storedUser.username !== username) {
            diff.username = username;
        }
        if (storedUser.email !== email) {
            diff.email = email;
        }
        if (storedUser.phone_number !== phone) {
            diff.phoneNumber = phone;
        }
        if (
            new Date(storedUser.dob).getTime() !== new Date(birthDate).getTime()
        ) {
            diff.dob = birthDate;
        }
        if (storedUser.bio !== bio) {
            diff.bio = bio;
        }
        if (JSON.stringify(storedUser.user_tag) !== JSON.stringify(interests)) {
            diff.addedInterests = _.difference(interests, storedUser.user_tag);
            diff.removedInterests = _.difference(
                storedUser.user_tag,
                interests,
            );
        }

        if (Object.keys(diff).length > 0) {
            const {
                data: { updatedUser },
            } = await triggerUpdateUser(diff).unwrap();

            dispatch(
                setCredentials({
                    user: updatedUser,
                    token: userToken,
                }),
            );
        }
    };

    useEffect(() => {
        if (isSuccess) {
            successToast('Your personal data has been updated successfully!');
            reset();
        }
    }, [isSuccess]);

    return (
        <PageContainer>
            <PageTitle>Account Settings</PageTitle>

            <PageHeader>
                <section className="flex flex-col items-center">
                    <ProfilePictureContainer>
                        <ProfilePicture src={defaultProfile} />
                        <PictureOverlay src={cameraImage} />
                    </ProfilePictureContainer>
                    <h2 className="text-xl font-bold mt-4">
                        {storedUser.full_name ?? 'Delete me'}
                    </h2>
                    <h2 className="text-md opacity-75 font-thin">
                        @{storedUser.username ?? 'Delete me'}
                    </h2>
                </section>

                <section className="flex flex-col gap-6">
                    <p className="max-w-[70ch]">
                        {storedUser.bio ?? "You don't have bio yet."}
                    </p>

                    <div className="flex gap-4 flex-wrap">
                        {storedUser.user_tag?.map((tag) => (
                            <Tag key={tag} text={tag} size="sm" />
                        ))}
                    </div>
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
                className="self-start text-xs"
            >
                Delete Account
            </Button>
        </PageContainer>
    );
};
