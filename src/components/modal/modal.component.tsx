import { motion } from 'framer-motion';
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
        <>
            {isOpen && (
                <Background onClick={closeModal} ref={modalRef}>
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 100,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                    >
                        <ModalWrapper className={className ?? ''}>
                            {children}
                        </ModalWrapper>
                    </motion.div>
                </Background>
            )}
        </>,
        document.getElementById('modal-container')!,
    );
};
