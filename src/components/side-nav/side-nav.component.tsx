import React, { useEffect, useRef, useState } from 'react';
import { BsFillPostcardFill } from 'react-icons/bs';
import { FaHandsHelping } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { GiBookshelf, GiRobotGolem, GiTomato, GiUpgrade } from 'react-icons/gi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoIosSettings } from 'react-icons/io';
import { IoPersonSharp } from 'react-icons/io5';
import { LuListTodo, LuSearch } from 'react-icons/lu';
import { MdLogout, MdMessage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { RootState, clearCredentials, useLogoutUserMutation } from '../../store';
import { deleteSocket } from '../../utils/socket';
import SideNavItem from '../SideNavItem';
import Button from '../button/button.component';
import DropdownMenu from '../menu/menu.component';
import { ChatsLink, Logo, SideNavContainer, UserContainer } from './side-nav.styles';

type SideNavLinkType = {
    icon: JSX.Element;
    extendable: boolean;
    path: string;
    text?: string;
    active: boolean;
    extended?: boolean;
    subItems?: string[];
    notScroll?:boolean;
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
        {
            icon: <MdMessage color='white' />,
            extendable: false,
            path: '/app/chats',
            active: false,
            notScroll:true,
            id: 10,

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

    return (
        <>
            <SideNavContainer sideNavOpen={sideNavOpen} ref={sideNavRef}>
                <div className="side-nav-links min-h-0 flex justify-between flex-col">
                    <Logo>
                        Mujedd
                    </Logo>
                    <div className="flex flex-col gap-2 overflow-y-scroll max-h-[70vh] side-nav-links p-2">
                        {links.filter((link)=>!link.notScroll).map((link) => (
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
                <div className=' flex justify-center items-center'>
                        <ChatsLink
                            active= {links[9].active}
                            onClick={() => {
                                handleSideLinkClick(10);
                                navigate(links[9].path);
                            }}

                        >
                            {links[9].icon}
                        </ChatsLink>
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
                    <UserContainer
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
                    </UserContainer>
                </DropdownMenu>
            </SideNavContainer>
            <nav className="lg:hidden bg-indigo-950 ">
                <Button
                    type="button"
                    className="!bg-indigo-950 block text-white z-10 !p-2 !border-indigo-950"
                    onClick={openSideNav}
                >
                    <FiMenu size={32} />
                </Button>
            </nav>
        </>
    );
}
