import classNames from 'classnames';
import React from 'react';
import { FiEdit } from 'react-icons/fi';

import cameraImage from '../../assets/imgs/camera.png';
import defaultProfile from '../../assets/imgs/user.jpg';
import Button from '../../components/Button';
import { InputsGrid } from '../../components/Input';
import Accordion from '../../components/accordion/accordion.component';
import Tag from '../../components/tag/tag.component';
import { SerializedInput } from '../../types/serialized-input';
import {
    EditButton,
    PageContainer,
    PageHeader,
    PictureOverlay,
    ProfilePicture,
    ProfilePictureContainer,
} from './settings.styles';

export const SettingsPage = () => {
    const [isEditingPersonalInfo, setIsEditingPersonalInfo] =
        React.useState(false);
    const [isEditingSecurity, setIsEditingSecurity] = React.useState(false);

    const tags = [
        'Math',
        'Physics',
        'Chemistry',
        'Biology',
        'English',
        'Arabic',
    ];

    const personalInfoInputs: SerializedInput[] = [
        {
            label: 'First Name',
            value: 'Ahmed',
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Last Name',
            value: 'Khaled',
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Email',
            type: 'email',
            value: '',
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Phone',
            value: '',
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Birth Date',
            type: 'date',
            value: '',
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Bio',
            value: '',
            multiline: true,
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
        {
            label: 'Interests',
            value: '',
            onChange: () => {},
            disabled: !isEditingPersonalInfo,
        },
    ];

    const securityInputs: SerializedInput[] = [
        {
            label: 'Current Password',
            value: 'Ahmed',
            type: 'password',
            onChange: () => {},
            disabled: !isEditingSecurity,
        },
        {
            label: 'New Password',
            value: 'Ahmed',
            type: 'password',
            onChange: () => {},
            disabled: !isEditingSecurity,
        },
        {
            label: 'Repeat New Password',
            value: 'Ahmed',
            type: 'password',
            onChange: () => {},
            disabled: !isEditingSecurity,
        },
    ];

    return (
        <PageContainer>
            <h1 className="text-4xl font-bold text-slate-600">
                Account Settings
            </h1>

            <PageHeader>
                <section className="flex flex-col items-center">
                    <ProfilePictureContainer>
                        <ProfilePicture src={defaultProfile} />
                        <PictureOverlay src={cameraImage} />
                    </ProfilePictureContainer>
                    <h2 className="text-xl font-bold mt-4"> Ahmed Khaled </h2>
                    <h2 className="text-md opacity-75 font-thin">
                        @ahmedkhaled
                    </h2>
                </section>
                <section className="flex flex-col gap-6">
                    <p className="max-w-[70ch]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea suscipit sint asperiores, sequi officiis consequatur
                        dignissimos a totam in! Excepturi facilis laboriosam
                        illum, id nulla incidunt. Veritatis delectus voluptatum
                        eaque!
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        {tags.map((tag) => (
                            <Tag key={tag} text={tag} size="small" />
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
                    editing={isEditingPersonalInfo}
                    onClick={() => {
                        setIsEditingPersonalInfo(!isEditingPersonalInfo);
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
                    editing={isEditingSecurity}
                    onClick={() => {
                        setIsEditingSecurity(!isEditingSecurity);
                    }}
                >
                    {isEditingSecurity ? 'Save' : <FiEdit size={18} />}
                </EditButton>
            </Accordion>

            <Button
                type="button"
                outline
                select="danger"
                className="self-start"
            >
                Delete Account
            </Button>
        </PageContainer>
    );
};
