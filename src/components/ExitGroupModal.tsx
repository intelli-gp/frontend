import { useEffect } from 'react';

import { useLeaveGroupMutation } from '../store';
import { errorToast, successToast } from '../utils/toasts';
import Button from './button/button.component';
import { Modal } from './modal/modal.component';

interface ModalProps {
    id: string | undefined;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExitSectionModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
    id,
}) => {
    const [
        leaveGroup,
        {
            isSuccess: isGroupLeaveSuccessfully,
            isLoading: isGroupLeaving,
            reset: resetLeaveGroup,
        },
    ] = useLeaveGroupMutation();

    const handleExitGroup = async () => {
        try {
            await leaveGroup(id!).unwrap();
            setShowModal(false);
        } catch (error) {
            errorToast('Error occurred while exiting the group');
            resetLeaveGroup();
        }
    };

    // Toasts handling
    useEffect(() => {
        if (isGroupLeaveSuccessfully) {
            successToast('Exit the group successfully!');
        }
    }, [isGroupLeaveSuccessfully]);

    return (
        <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            title={'Are you sure you want to exit this group?'}
            width="lg"
        >
            <div className="flex gap-4 flex-row-reverse">
                <Button
                    className="!px-8"
                    select="danger"
                    outline
                    loading={isGroupLeaving}
                    onClick={handleExitGroup}
                >
                    Yes
                </Button>
                <Button className="!px-6" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};
export default ExitSectionModal;
