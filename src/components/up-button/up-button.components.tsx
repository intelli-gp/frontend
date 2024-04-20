import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PiArrowFatLineUpFill } from "react-icons/pi";

import { BetweenPageAnimation } from '../../index.styles';
import { UpButtonContainer } from './up-buttons.styles';

export type UpButtonProps = {
    pageHeaderElement: HTMLDivElement;
};
export const UpButton = ({ pageHeaderElement }: UpButtonProps) => {
    const [showUpButton, setShowUpButton] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowUpButton(!entry.isIntersecting);
            },
            { threshold: 0.5 }, // Adjust the threshold as needed
        );

        if (pageHeaderElement) {
            observer.observe(pageHeaderElement);
        }

        return () => {
            if (pageHeaderElement) {
                observer.unobserve(pageHeaderElement);
            }
        };
    }, []);
    const onUpButtonClick = () => {
        pageHeaderElement.scrollIntoView({ behavior: 'smooth' });
    };
    if (!showUpButton) {
        return null;
    }
    return (
        <AnimatePresence>
            <UpButtonContainer
                {...BetweenPageAnimation}
                onClick={onUpButtonClick}
            >
                <PiArrowFatLineUpFill />
            </UpButtonContainer>
        </AnimatePresence>
    );
};

export default UpButton;
