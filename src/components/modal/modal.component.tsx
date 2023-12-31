import React, { useRef } from 'react';

import { Background, ModalWrapper } from './model.styles';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
    children,
}) => {
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
                    <ModalWrapper>{children}</ModalWrapper>
                </Background>
            ) : null}
        </>
    );
};
