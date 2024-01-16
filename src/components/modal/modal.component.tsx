import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Background, ModalWrapper } from './model.styles';

interface ModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    className?: string;
}
export const Modal = ({
    showModal,
    setShowModal,
    children,
    className,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showModal]);

    return ReactDOM.createPortal(
        <>
            {showModal && (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper className={className ?? ''}>
                        {children}
                    </ModalWrapper>
                </Background>
            )}
        </>,
        document.getElementById('modal-container')!,
    );
};
