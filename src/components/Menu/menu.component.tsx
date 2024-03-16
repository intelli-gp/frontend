import classNames from 'classnames';
import React, { MouseEventHandler, useEffect, useState } from 'react';

import { MainElement, MenuElement, OptionElement } from './menu.style';

type DropdownMenuProps = {
    /**
     * options to be showed when the
     * dropdown button button clicked
     * and the handler of clicking this option.
     * @example
     * {"Delete", handleDelete}
     */
    options: { option: string; handler: (data: any) => void | Promise<void> }[];
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
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.2,
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
        </MainElement>
    );
};

export default DropdownMenu;
