import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { ItemContainer, MainItemContent } from './sidenav-item.styles';

export type SideNavItemProps = {
    icon?: JSX.Element;
    extendable?: boolean;
    path: string;
    text?: string;
    active?: boolean;
    extended?: boolean;
    subItems?: string[];
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function SideNavItem({
    icon,
    extendable = false,
    path,
    text,
    active = false,
    extended,
    subItems,
    onClick,
}: SideNavItemProps) {
    return (
        <ItemContainer onClick={onClick} to={path} active={active}>
            <div className="flex items-center justify-between">
                <MainItemContent>
                    {icon}
                    {text}
                </MainItemContent>

                {extendable && extended ? (
                    <IoIosArrowBack />
                ) : (
                    extendable && <IoIosArrowDown />
                )}
            </div>

            {extended && (
                <div className="flex flex-col gap-2">
                    {subItems?.map((item) => {
                        return (
                            <Link
                                key={item}
                                to={item}
                                className="flex w-full text-white text-sm rounded p-2 pl-10 hover:bg-indigo-100/20"
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>
            )}
        </ItemContainer>
    );
}
