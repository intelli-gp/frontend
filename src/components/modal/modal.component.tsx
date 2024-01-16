import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import { Background, ModalWrapper } from './model.styles';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}
export const Modal = ({ showModal, setShowModal, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    return ReactDOM.createPortal(
        <>
            {showModal && (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper>{children}</ModalWrapper>
                </Background>
            )}
        </>,
        document.getElementById('modal-container')!,
    );
};
