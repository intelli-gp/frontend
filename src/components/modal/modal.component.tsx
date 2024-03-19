import { AnimatePresence, motion } from 'framer-motion';
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
                        className={className ?? ''}
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
                            y: 200,
                        }}
                    >
                        {children}
                    </ModalWrapper>
                </Background>
            )}
        </AnimatePresence>,
        document.getElementById('modal-container')!,
    );
};
