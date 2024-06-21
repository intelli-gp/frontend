import { useNavigate } from 'react-router-dom';

import LockImage from '../assets/imgs/lock.svg';
import Button from './button/button.component';
import EnhancedImage from './image/image.component';
import { Modal, ModalProps } from './modal/modal.component';

export const ForbiddenModal = ({
    isOpen,
    setIsOpen,
}: Pick<ModalProps, 'isOpen' | 'setIsOpen'>) => {
    const navigate = useNavigate();

    const customSetIsOpen = (show: boolean) => {
        if (!show) {
            navigate(-1);
            setIsOpen(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={customSetIsOpen}
            title="Invalid Subscription"
            className="!gap-8"
        >
            <EnhancedImage
                src={LockImage}
                className="mx-auto !h-[100px] !w-[100px]"
                transparentPlaceholder
            />
            <p className="text-center">
                Your subscription doesn't include this feature!
            </p>
            <div className="flex gap-2 align-center justify-center">
                <Button outline onClick={() => navigate(-1)}>
                    Go Back
                </Button>
                <Button onClick={() => navigate('/app/upgrade')}>
                    Upgrade
                </Button>
            </div>
        </Modal>
    );
};
