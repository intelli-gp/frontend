import { ChangeEvent, useState } from 'react';

import { ModalTitle } from '../index.styles';
import { useGetAllTagsQuery } from '../store';
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

    const { data: allTags } = useGetAllTagsQuery();
    let tags = allTags?.data;

    const resetForm = () => {
        setGroupName('');
        setGroupDescription('');
        setGroupImage('');
        setSelectedTags([]);
    };

    const handleCreateGroup = () => {
        // TODO: Create group
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="flex flex-col gap-4"
        >
            <ModalTitle className='mb-6'>Create New Group</ModalTitle>
            <OpenImage
                height="250px"
                value={groupImage}
                onChange={(newImage) => setGroupImage(newImage)}
                editButton
            />
            <InputWithLabel
                label={'Group Name'}
                placeholder={'Enter group name...'}
                value={groupName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setGroupName(e.target.value)
                }
            />
            <InputWithLabel
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
                <Button type="button" onClick={handleCreateGroup}>
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
        </Modal>
    );
};

export default CreateGroupModal;
