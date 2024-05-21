import { useEffect, useState } from 'react';
import { PiArrowFatLineUpFill } from 'react-icons/pi';

import { BetweenPageAnimation } from '../../index.styles';
import { UpButtonContainer } from './up-buttons.styles';

export type UpButtonProps = {
    pageHeaderElement?: HTMLElement;
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
    }, [pageHeaderElement]);
    const onUpButtonClick = () => {
        document
            .getElementById('mujedd-root')
            ?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (!showUpButton) {
        return null;
    }
    return (
        <UpButtonContainer {...BetweenPageAnimation} onClick={onUpButtonClick}>
            <PiArrowFatLineUpFill />
        </UpButtonContainer>
    );
};

export default UpButton;
