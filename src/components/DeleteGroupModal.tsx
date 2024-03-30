import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteGroupMutation } from '../store';
import { errorToast, successToast } from '../utils/toasts';
import Button from './button/button.component';
import { Modal } from './modal/modal.component';

interface ModalProps {
    id: string | undefined;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSectionModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
    id,
}) => {
    const navigate = useNavigate();

    const [
        deleteGroup,
        { isLoading: isDeletingGroup, isSuccess: groupDeletedSuccessfully },
    ] = useDeleteGroupMutation();

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(id!).unwrap();
            setShowModal(false);
            navigate('/app/groups');
        } catch (error) {
            errorToast('Error occurred while deleting the group');
        }
    };

    // Toasts handling
    useEffect(() => {
        if (groupDeletedSuccessfully) {
            successToast('Exit the group successfully!');
        }
    }, [groupDeletedSuccessfully]);

    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            width="lg"
            title="Are you sure you want to delete this group?"
        >
            <div className="flex flex-col gap-8">
                <div className="flex gap-4 flex-row-reverse">
                    <Button
                        className="!px-8"
                        select="danger"
                        outline
                        loading={isDeletingGroup}
                        onClick={handleDeleteGroup}
                    >
                        Yes
                    </Button>
                    <Button
                        className="!px-6"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
export default DeleteSectionModal;
