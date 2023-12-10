import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';

type SideNavItemPropType = {
    icon: JSX.Element;
    extendable: boolean;
    path: string;
    text: string;
    active: boolean;
    extended?: boolean;
    subItems?: string[];
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function SideNavItem({
    icon,
    extendable,
    path,
    text,
    active,
    extended,
    subItems,
    onClick,
}: SideNavItemPropType) {
    const className = classNames(
        'flex flex-col w-full text-white text-base gap-4 rounded p-3 px-4 hover:bg-indigo-100/10',
        {
            'bg-indigo-100/10': active,
            'bg-indigo-900': !active,
        },
    );

    return (
        <Link className={className} onClick={onClick} to={path}>
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    {icon}
                    {text}
                </div>
                {extendable && extended ? (
                    <IoIosArrowBack />
                ) : (
                    extendable && <IoIosArrowDown />
                )}
            </div>

            {extended && (
                <div className="flex flex-col gap-2">
                    {subItems?.map((link) => {
                        return (
                            <Link
                                className="flex w-full text-white text-sm rounded p-2 pl-10 hover:bg-indigo-100/20"
                                to={link}
                            >
                                {link}
                            </Link>
                        );
                    })}
                </div>
            )}
        </Link>
    );
}
