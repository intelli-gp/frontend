import React, { useRef } from 'react';

import Button from '../../../components/Button';
import { Background, ModalWrapper } from './TasksModal.styles';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Modal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper showModal={showModal}>
                        <h1 className="text-lg text-txt">Add Task</h1>
                        <div className="pt-6 w-full flex flex-col gap-4 justify-center items-center ">
                            <Button type="submit" select="primary">
                                Create
                            </Button>
                            <Button
                                type="button"
                                outline={true}
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </ModalWrapper>
                </Background>
            ) : null}
        </>
    );
};
