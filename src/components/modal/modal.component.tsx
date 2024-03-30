import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';

import {
    Background,
    ModalContentContainer,
    ModalExitButton,
    ModalHeader,
    ModalTitle,
    ModalWrapper,
} from './model.styles';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (show: boolean) => void;
    children: React.ReactNode;
    className?: string;

    /**
     * width fo the modal
     * @default md 450px
     */
    width?: 'sm' | 'md' | 'lg';

    /**
     * title of the modal
     */
    title?: string;

    /**
     * a function called when modal is closed.
     */
    cleanupFn?: () => void;
}
export const Modal = ({
    isOpen,
    setIsOpen,
    children,
    className,
    width,
    title,
    cleanupFn,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = (e: React.MouseEvent<HTMLElement>) => {
        if (modalRef.current === e.target) {
            setIsOpen(false);
            if (cleanupFn) cleanupFn();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <Background
                    onClick={closeModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={modalRef}
                >
                    <ModalWrapper
                        width={width}
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 25,
                        }}
                    >
                        {title && (
                            <ModalHeader>
                                <ModalTitle>{title}</ModalTitle>
                                <ModalExitButton
                                    onClick={() => setIsOpen(false)}
                                >
                                    <IoCloseOutline size={28} />
                                </ModalExitButton>
                            </ModalHeader>
                        )}
                        <ModalContentContainer className={className ?? ''}>
                            {children}
                        </ModalContentContainer>
                    </ModalWrapper>
                </Background>
            )}
        </AnimatePresence>,
        document.getElementById('modal-container')!,
    );
};
