import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { BsFillPostcardFill } from 'react-icons/bs';
import { FaHandsHelping } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { GiBookshelf, GiRobotGolem, GiTomato, GiUpgrade } from 'react-icons/gi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoIosSettings } from 'react-icons/io';
import { IoPersonSharp } from 'react-icons/io5';
import { LuListTodo, LuSearch } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import defaultUserImage from '../assets/imgs/user.jpg';
import { RootState, clearCredentials, useLogoutUserMutation } from '../store';
import { deleteSocket } from '../utils/socket';
import DropdownMenu from './Menu/menu.component';
import SideNavItem from './SideNavItem';
import Button from './button/button.component';

type SideNavLinkType = {
    icon: JSX.Element;
    extendable: boolean;
    path: string;
    text: string;
    active: boolean;
    extended?: boolean;
    subItems?: string[];
    id: number;
};

export default function SideNav() {
    const [links, setLinks] = useState<SideNavLinkType[]>([
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
            extendable: false,
            path: '/app/groups',
            text: 'Chat Groups',
            active: false,
            id: 3,
        },
        {
            icon: <BsFillPostcardFill />,
            extendable: false,
            path: '/app/articles',
            text: 'Articles',
            active: false,
            id: 4,
        },
        {
            icon: <GiBookshelf />,
            extendable: false,
            path: '/app',
            text: 'Courses',
            active: false,
            id: 5,
        },
        {
            icon: <FaHandsHelping />,
            extendable: false,
            path: '/app/AI-helper',
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
            path: '/app/upgrade',
            text: 'Upgrade',
            active: false,
            id: 8,
        },
        {
            icon: <GiTomato />,
            extendable: false,
            path: '/app/pomodoro',
            text: 'Pomodoro',
            active: false,
            id: 9,
        },
    ]);
    const navigate = useNavigate();

    /**
     * This is for mobile view only. To handle the side nav open and close
     */
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const sideNavRef = useRef<HTMLElement>(null);

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [logoutUser] = useLogoutUserMutation();

    useEffect(() => {
        const screenClickHandler = (e: MouseEvent) => {
            /**
             * This is for mobile view only. If the click is not on the side nav
             * then close the side nav.
             */
            if (sideNavRef.current !== (e.target as HTMLElement)) {
                setSideNavOpen(false);
            }
        };
        window.addEventListener('click', screenClickHandler);
        return () => {
            window.removeEventListener('click', screenClickHandler);
        };
    }, []);

    /**
     * This is for mobile view only. To handle the side nav open and close
     * and to prevent the body from scrolling when the side nav is open.
     */
    useEffect(() => {
        if (sideNavOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [sideNavOpen]);

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
        /**
         * only in this case the order of operations matters
         * because the logoutUser need the token to send the request.
         */
        logoutUser();
        dispatch(clearCredentials());
        deleteSocket(); // Clear socket connection
        navigate('/');
    };

    // This is for mobile view only.
    const openSideNav = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.nativeEvent.stopImmediatePropagation();
        setSideNavOpen(true);
    };

    const sideNavClassNames = classNames(
        'bg-indigo-950  w-[300px] h-screen max-h-screen flex flex-col fixed lg:sticky top-0 px-2 py-6 justify-between gap-4 overflow-y-hidden z-20',
        'transition-all duration-500 linear',
        {
            'left-[-100%]': !sideNavOpen,
            'left-0': sideNavOpen,
        },
    );

    return (
        <>
            <aside className={sideNavClassNames} ref={sideNavRef}>
                <div className="side-nav-links min-h-0">
                    <h1 className="font-black text-white text-4xl sticky top-0 pb-8 min-h-0 flex justify-center font-serif select-none">
                        Mujedd
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

                <DropdownMenu
                    mainElementClassName="relative flex justify-center"
                    menuWidth="8rem"
                    bottom={'110%'}
                    options={[
                        {
                            option: (
                                <>
                                    <IoPersonSharp /> Profile
                                </>
                            ),
                            handler: () => navigate('/app/profile'),
                        },
                        {
                            option: (
                                <>
                                    <IoIosSettings /> Settings
                                </>
                            ),
                            handler: () => navigate('/app/settings'),
                        },
                        {
                            option: (
                                <>
                                    <MdLogout /> Logout
                                </>
                            ),
                            handler: handleLogout,
                        },
                    ]}
                >
                    <div
                        className="rounded-full bg-indigo-100/20 hover:bg-indigo-100/30 flex gap-2 justify-between items-center text-white text-sm font-bold py-2 pl-2 pr-6 hover:cursor-pointer w-3/4"
                        title={user.Username}
                    >
                        <img
                            src={user.ProfileImage ?? defaultUserImage}
                            alt="profile pic"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <p className="select-none text-ellipsis overflow-hidden whitespace-nowrap">
                            {user.Username}
                        </p>
                    </div>
                </DropdownMenu>
            </aside>
            <nav className="lg:hidden bg-indigo-950 ">
                <Button
                    type="button"
                    className="!bg-indigo-950 block text-white z-10 !p-2"
                    onClick={openSideNav}
                >
                    <FiMenu size={32} />
                </Button>
            </nav>
        </>
    );
}
