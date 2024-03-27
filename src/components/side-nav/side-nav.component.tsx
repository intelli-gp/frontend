import React, { useEffect, useRef, useState } from 'react';
import { BsFillPostcardFill } from 'react-icons/bs';
import { FaHandsHelping } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { GiBookshelf, GiRobotGolem, GiTomato, GiUpgrade } from 'react-icons/gi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoIosSettings } from 'react-icons/io';
import { IoPersonSharp } from 'react-icons/io5';
import { LuListTodo, LuSearch } from 'react-icons/lu';
import { MdLogout, MdNotifications } from 'react-icons/md';
import { TbMessage2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import defaultUserImage from '../../assets/imgs/user.jpg';
import {
    RootState,
    clearCredentials,
    useLogoutUserMutation,
} from '../../store';
import { deleteSocket } from '../../utils/socket';
import { disconnectSSE } from '../../utils/sse';
import Button from '../button/button.component';
import DropdownMenu from '../menu/menu.component';
import SideNavItem, {
    SideNavItemProps,
} from '../sidenav-item/sidenav-item.component';
import {
    Brand,
    IconsContainer,
    LinksContainer,
    Separator,
    SideNavContainer,
    SideNavFooter,
    UserContainer,
    UserFullName,
    UserImage,
    UserUsername,
} from './side-nav.styles';

export default function SideNav() {
    const [links, setLinks] = useState<
        Array<SideNavItemProps & { id: number }>
    >([
        {
            icon: <LuSearch />,
            path: '/app/search',
            text: 'Search',
            id: 2,
        },
        {
            icon: <LuListTodo />,
            path: '/app/study-planner',
            text: 'Study Planner',
            id: 1,
        },
        {
            icon: <HiMiniUserGroup />,
            path: '/app/groups',
            text: 'Chat Groups',
            id: 3,
        },
        {
            icon: <BsFillPostcardFill />,
            path: '/app/articles',
            text: 'Articles',
            id: 4,
        },
        {
            icon: <GiBookshelf />,
            path: '/app/courses',
            text: 'Courses',
            id: 5,
        },
        {
            icon: <FaHandsHelping />,
            path: '/app/AI-helper',
            text: 'AI helper',
            id: 6,
        },
        {
            icon: <GiRobotGolem />,
            path: '/app/ai-service',
            text: 'AI Service',
            id: 7,
        },
        {
            icon: <GiUpgrade />,
            path: '/app/upgrade',
            text: 'Upgrade',
            id: 8,
        },
        {
            icon: <GiTomato />,
            path: '/app/pomodoro',
            text: 'Pomodoro',
            id: 9,
        },
    ]);
    const navigate = useNavigate();
    const location = useLocation();

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

    /**
     * Activate link based on the current location
     */
    useEffect(() => {
        setLinks(
            links.map((link) => {
                return {
                    ...link,
                    active: link.path === location.pathname,
                };
            }),
        );
    }, [location.pathname]);

    const handleLogout = async () => {
        /**
         * only in this case the order of operations matters
         * because the logoutUser need the token to send the request.
         */
        logoutUser();
        dispatch(clearCredentials());
        deleteSocket(); // Clear socket connection
        disconnectSSE(); // Clear SSE connection
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
                <Brand>Mujedd</Brand>

                <LinksContainer>
                    {links.map((link) => (
                        <SideNavItem
                            key={link.text}
                            icon={link.icon}
                            extendable={link?.extendable}
                            extended={link?.extended}
                            subItems={link?.subItems}
                            path={link.path}
                            text={link.text}
                            active={link?.active}
                        />
                    ))}
                </LinksContainer>

                <SideNavFooter>
                    <IconsContainer>
                        <MdNotifications
                            size={24}
                            title="Notifications"
                            onClick={() => navigate('/app/notifications')}
                        />
                        <TbMessage2
                            size={24}
                            title="Messages"
                            onClick={() => navigate('/app/chats')}
                        />
                    </IconsContainer>
                    <Separator />
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
                        <UserContainer title={user?.FullName}>
                            <UserImage
                                src={user.ProfileImage ?? defaultUserImage}
                                alt="profile pic"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <UserFullName width="17ch">{user?.FullName}</UserFullName>
                                <UserUsername width="17ch">@{user?.Username}</UserUsername>
                            </div>
                        </UserContainer>
                    </DropdownMenu>
                </SideNavFooter>
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
