import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';

import {
    AccordionContainer,
    AccordionContent,
    AccordionHeader,
} from './accordion.styles';

type AccordionProps = {
    title: string;
    children: React.ReactNode;
    /**
     * Optional className to apply to the accordion content container
     */
    className?: string;
};

const Accordion = ({ title, children, className }: AccordionProps) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <AccordionContainer>
            <AccordionHeader
                isOpen={isOpen}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {title}
                {isOpen ? (
                    <MdKeyboardArrowDown size={28} />
                ) : (
                    <MdKeyboardArrowLeft size={28} />
                )}
            </AccordionHeader>
            {isOpen && (
                <AccordionContent className={className}>
                    {children}
                </AccordionContent>
            )}
        </AccordionContainer>
    );
};

export default Accordion;
