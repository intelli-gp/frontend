import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useState } from 'react';

import { MainElement, MenuElement, OptionElement } from './menu.style';

type DropdownMenuProps = {
    /**
     * options to be showed when the
     * dropdown button clicked
     * and the handler of clicking this option.
     * @example
     * {"Delete", handleDelete}
     */
    options: {
        option: string | JSX.Element;
        handler: (data: any) => void | Promise<void>;
    }[];
    /**
     * The component to be shown as the main element.
     */
    children: React.ReactNode;
    /**
     * The class name of the main element.
     */
    mainElementClassName?: string;
    /**
     * The class name of the main element when the menu is open.
     */
    mainElementClassNameOpen?: string;

    /**
     * The class name of the menu element.
     */
    menuElementClassName?: string;

    /**
     * The font size of the menu element.
     * To use a custom font size pass a string
     * @default 'md'
     */
    menuFontSize?: 'sm' | 'md' | 'lg' | string;

    /**
     * The position of the menu element.
     * relative to the main element.
     */
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    /**
     * The width of the menu element.
     */
    menuWidth?: string;
};

const DropdownMenu = ({
    options,
    children,
    top,
    left,
    right,
    bottom,
    menuWidth,
    mainElementClassName,
    menuElementClassName,
    mainElementClassNameOpen,
}: DropdownMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMainElementClick = (event: MouseEvent) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleHideMenu = () => {
            setIsMenuOpen(false);
        };
        document.addEventListener('click', handleHideMenu);

        return () => {
            document.removeEventListener('click', handleHideMenu);
        };
    });

    const _mainElementClassName = classNames(mainElementClassName, {
        [`${mainElementClassNameOpen}`]: isMenuOpen,
    });

    return (
        <MainElement
            onClick={
                handleMainElementClick as unknown as MouseEventHandler<HTMLDivElement>
            }
            className={_mainElementClassName}
        >
            {children}
            <AnimatePresence>
                {isMenuOpen && (
                    <MenuElement
                        top={top}
                        left={left}
                        right={right}
                        bottom={bottom}
                        width={menuWidth}
                        className={menuElementClassName}
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
                            transition: {
                                duration: 0.1,
                            },
                        }}
                    >
                        {options.map(({ option, handler }, index) => {
                            return (
                                <OptionElement key={index} onClick={handler}>
                                    {option}
                                </OptionElement>
                            );
                        })}
                    </MenuElement>
                )}
            </AnimatePresence>
        </MainElement>
    );
};

export default DropdownMenu;
