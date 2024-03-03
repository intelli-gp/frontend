import { ChangeEvent, useEffect, useState } from 'react';

import { useUploadImage } from '../hooks/uploadImage.hook';
import { ModalTitle } from '../index.styles';
import { useAddGroupMutation, useGetAllTagsQuery } from '../store';
import { errorToast, successToast } from '../utils/toasts';
import Button from './Button';
import { InputWithLabel } from './Input';
import { Modal } from './modal/modal.component';
import OpenImage from './openImage/openImage.component';
import TagsInput2 from './tagsInput2/tagsInput2.component';

type CreateGroupModalProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const CreateGroupModal = ({ isOpen, setIsOpen }: CreateGroupModalProps) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupImage, setGroupImage] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [
        addGroup,
        { isLoading, isError, isSuccess, reset: resetCreatingGroup },
    ] = useAddGroupMutation();
    const { isLoading: isImageLoading, trigger: uploadImage } =
        useUploadImage();

    const { data: allTags } = useGetAllTagsQuery();
    let tags = allTags?.data;

    const resetForm = () => {
        setGroupName('');
        setGroupDescription('');
        setGroupImage('');
        setSelectedTags([]);
    };

    const validateGroupData = () => {
        if (selectedTags.length === 0) {
            return 'Please select at least one tag';
        }
        if (!groupImage) {
            return 'Please add a group cover image';
        }
    };

    const handleCreateGroup = async () => {
        let validationError = validateGroupData();
        if (validationError) {
            return errorToast(validationError);
        }
        try {
            const imageURL = await uploadImage(groupImage);
            addGroup({
                GroupTitle: groupName,
                GroupDescription: groupDescription,
                GroupTags: selectedTags,
                GroupCoverImageUrl: imageURL,
            });
        } catch (err) {
            errorToast('Error occurred while uploading group image');
        }
    };

    useEffect(() => {
        if (isError) {
            errorToast('Error occurred while creating group');
            resetCreatingGroup();
        } else if (isSuccess) {
            resetForm();
            setIsOpen(false);
            successToast('Group created successfully');
        }
    }, [isError, isSuccess]);

    return (
        <Modal
            className="flex flex-col gap-4"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <ModalTitle className="mb-6">Create New Group</ModalTitle>
            <OpenImage
                height="250px"
                value={groupImage}
                onChange={(newImage) => setGroupImage(newImage)}
                editButton
            />
            <form className="flex flex-col gap-4" onSubmit={handleCreateGroup}>
                <InputWithLabel
                    required
                    label={'Group Name'}
                    placeholder={'Enter group name...'}
                    value={groupName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setGroupName(e.target.value)
                    }
                />
                <InputWithLabel
                    required
                    multiline
                    label={'Group Description (max 512 characters)'}
                    placeholder={'Describe what this groups is about...'}
                    maxLength={512}
                    rows={5}
                    value={groupDescription}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setGroupDescription(e.target.value)
                    }
                />
                <TagsInput2
                    label={'Tags'}
                    availableTags={tags}
                    selectedTags={selectedTags}
                    updateSelectedTags={(tags) => {
                        setSelectedTags(tags);
                    }}
                />
                <div className="flex gap-4 mt-8 justify-end">
                    <Button type="submit" loading={isImageLoading || isLoading}>
                        Create
                    </Button>
                    <Button
                        type="button"
                        select="danger"
                        outline
                        onClick={() => {
                            resetForm();
                            setIsOpen(false);
                        }}
                        title="Discard group creation"
                    >
                        Discard
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateGroupModal;
