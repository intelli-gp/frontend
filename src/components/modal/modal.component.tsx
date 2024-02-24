import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Background, ModalWrapper } from './model.styles';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (show: boolean) => void;
    children: React.ReactNode;
    className?: string;
}
export const Modal = ({
    isOpen,
    setIsOpen,
    children,
    className,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return ReactDOM.createPortal(
        <>
            {isOpen && (
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
