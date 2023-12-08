import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../store';

import { HiMiniUserGroup } from 'react-icons/hi2';
import { LuSearch, LuListTodo } from 'react-icons/lu';
import { BsFillPostcardFill } from 'react-icons/bs';
import { FaHandsHelping } from 'react-icons/fa';
import { GiRobotGolem, GiUpgrade, GiBookshelf } from 'react-icons/gi';
import { IoIosSettings } from 'react-icons/io';
import { IoPersonSharp } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import defaultUserImage from '../assets/imgs/user.jpg';

import SideNavItem from './SideNavItem';
import { clearCredentials } from '../store';

type PopupUserMenuLinkPropType = {
    text: string;
    icon?: JSX.Element;
    path: string;
} & Record<string, any>;

export default function SideNav() {
    const [links, setLinks] = useState([
        {
            icon: <LuSearch />,
            extendable: false,
            path: '/app',
            text: 'Search',
            active: false,
            id: 2,
        },
        {
            icon: <LuListTodo />,
            extendable: false,
            path: '/app/study-planner',
            text: 'Study Planner',
            active: false,
            id: 1,
        },
        {
            icon: <HiMiniUserGroup />,
            extendable: true,
            path: '/app',
            text: 'Chat Groups',
            active: false,
            id: 3,
            extended: false,
            subItems: ['Group 1', 'Group 2', 'Group 3'],
        },
        {
            icon: <BsFillPostcardFill />,
            extendable: true,
            path: '/app',
            text: 'Articles',
            active: false,
            id: 4,
            extended: false,
            subItems: ['Article1', 'Article2'],
        },
        {
            icon: <GiBookshelf />,
            extendable: true,
            path: '/app',
            text: 'Courses',
            active: false,
            id: 5,
            extended: false,
            subItems: ['Course1', 'Course2'],
        },
        {
            icon: <FaHandsHelping />,
            extendable: false,
            path: '/app',
            text: 'AI helper',
            active: false,
            id: 6,
        },
        {
            icon: <GiRobotGolem />,
            extendable: false,
            path: '/app',
            text: 'AI Service',
            active: false,
            id: 7,
        },
        {
            icon: <GiUpgrade />,
            extendable: false,
            path: '/app',
            text: 'Upgrade',
            active: false,
            id: 8,
        },
    ]);
    const [menuActive, setMenuActive] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
    const [logoutUser, { isLoading }] = useLogoutUserMutation();

    const screenClickHandler = () => setMenuActive(false);

    useEffect(() => {
        window.addEventListener('click', screenClickHandler);
        return () => {
            window.removeEventListener('click', screenClickHandler);
        };
    }, []);

    const handleSideLinkClick = (id: number) => {
        setLinks(
            links.map((link) => {
                if (link.id === id) {
                    link.extendable &&
                        (link.extended = !(link.extended ?? false));
                    return {
                        ...link,
                        active: true,
                    };
                } else {
                    link.extendable && (link.extended = false);
                    return {
                        ...link,
                        active: false,
                    };
                }
            }),
        );
    };

    const handleLogout = async () => {
        await logoutUser().unwrap();
        dispatch(clearCredentials());
    };

    return (
        <aside className=" bg-indigo-900 sticky w-[300px] h-screen max-h-screen flex flex-col left-0 px-2 py-6 justify-between gap-4 overflow-y-hidden">
            <div className="side-nav-links min-h-0">
                <h1 className="font-black text-white text-4xl text-center sticky top-0 pb-8 min-h-0">
                    LoremIpsum
                </h1>

                <div className="flex flex-col gap-2 overflow-y-scroll max-h-[70vh] side-nav-links px-2">
                    {links.map((link) => (
                        <SideNavItem
                            key={link.text}
                            icon={link.icon}
                            extendable={link.extendable}
                            extended={link.extended}
                            subItems={link.subItems}
                            path={link.path}
                            text={link.text}
                            active={link.active}
                            onClick={() => handleSideLinkClick(link.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="relative flex justify-center">
                {menuActive && (
                    <div className="absolute bottom-[110%] bg-indigo-100 text-indigo-900 flex flex-col p-2 rounded-xl">
                        <PopupUserMenuLink
                            text="Profile"
                            path="/app"
                            icon={<IoPersonSharp />}
                        />
                        <PopupUserMenuLink
                            text="Settings"
                            path="/app"
                            icon={<IoIosSettings />}
                        />
                        <PopupUserMenuLink
                            onClick={handleLogout}
                            text="Logout"
                            icon={<MdLogout />}
                            path="/"
                        />
                    </div>
                )}
                <div
                    className="rounded-full bg-indigo-100/20 hover:bg-indigo-100/30 flex justify-between items-center text-white text-base h-14 pl-4 pr-8 hover:cursor-pointer w-4/5"
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuActive(!menuActive);
                    }}
                >
                    <img
                        src={defaultUserImage}
                        alt="profile pic"
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="select-none"> {user.username} </p>
                </div>
            </div>
        </aside>
    );
}

function PopupUserMenuLink({
    text,
    icon,
    path,
    ...other
}: PopupUserMenuLinkPropType) {
    return (
        <Link to={path} {...other}>
            <div className="flex items-center gap-2 font-bold text-sm hover:bg-indigo-200 py-2 px-4 rounded-xl text-center text-indigo-800 select-none">
                {icon}
                {text}
            </div>
        </Link>
    );
}
