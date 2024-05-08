import React, { useEffect, useRef, useState } from 'react';
import { BsFillPostcardFill } from 'react-icons/bs';
import { FaHandsHelping } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { GiBookshelf, GiRobotGolem, GiTomato, GiUpgrade } from 'react-icons/gi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoIosSettings } from 'react-icons/io';
import { IoBookmark, IoPersonSharp } from 'react-icons/io5';
import { LuListTodo, LuSearch } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import defaultUserImage from '../../assets/imgs/user.jpg';
import {
    RootState,
    clearCredentials,
    useFetchMessagesQuery,
    useFetchUserNotificationsQuery,
    useLogoutUserMutation,
} from '../../store';
import { deleteSocket } from '../../utils/socket';
import { disconnectSSE } from '../../utils/sse';
import Button from '../button/button.component';
import DropdownMenu from '../menu/menu.component';
import SideNavItem, {
    SideNavItemProps,
    SubItemProps,
} from '../sidenav-item/sidenav-item.component';
import {
    Brand,
    IconContainer,
    IconsContainer,
    LinksContainer,
    MessagesIcon,
    MobileNav,
    NotificationsIcon,
    Separator,
    SideNavContainer,
    SideNavFooter,
    UserContainer,
    UserFullName,
    UserImage,
    UserUsername,
} from './side-nav.styles';

export default function SideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [hidden, setHidden] = useState(false);
    const [messagesCounter, setMessageCounter] = useState(0);
    const [notificationsCounter, setNotificationsCounter] = useState(0);

    const { data: messagesData } = useFetchMessagesQuery();
    const { data: notificationsData } = useFetchUserNotificationsQuery({
        limit: 10,
        offset: 0,
    });

    useEffect(() => {
        setNotificationsCounter(
            notificationsData?.data?.reduce((acc, cur) => {
                return acc + (cur?.message?.IsNotificationViewed ? 0 : 1);
            }, 0) ?? 0,
        );
        console.log('Notifications Counter is : ', notificationsCounter);
    }, [notificationsData]);

    useEffect(() => {
        setMessageCounter(
            messagesData?.reduce((acc, cur) => {
                return acc + (cur?.UnreadMessagesCount ?? 0);
            }, 0) ?? 0,
        );
        console.log('Message Counter is : ', messagesCounter);
    }, [messagesData]);

    /**
     * Notes:
     * 1. Don't repeat any path in the navItems.
     * 2. If the item has sub items, clicking it will activate the first sub item.
     * 3. The path added to the item that has sub items will be ignored `DON'T MAKE IT SAME AS THE FIRST SUBITEM`.
     */
    const [navItems, setNavItems] = useState<SideNavItemProps[]>([
        {
            icon: <LuSearch />,
            path: '/app/search',
            text: 'Search',
            id: 1,
        },
        {
            icon: <LuListTodo />,
            path: '/app/study-planner',
            text: 'Study Planner',
            id: 2,
        },
        {
            icon: <HiMiniUserGroup />,
            path: '/app/groups',
            text: 'Chat Groups',
            id: 3,
        },
        {
            icon: <BsFillPostcardFill />,
            path: '#',
            text: 'Articles',
            id: 4,
            extendable: true,
            subItems: [
                {
                    icon: <LuSearch />,
                    path: '/app/articles',
                    text: 'Explore',
                    active: false,
                    id: 4.1,
                },
                {
                    icon: <IoBookmark />,
                    path: '/app/articles/my-bookmarks',
                    text: 'Bookmarks',
                    active: false,
                    id: 4.2,
                },
            ],
        },
        {
            icon: <GiBookshelf />,
            path: '#',
            text: 'Courses',
            id: 5,
            extendable: true,
            subItems: [
                {
                    icon: <LuSearch />,
                    path: '/app/courses',
                    text: 'Explore',
                    active: false,
                    id: 5.1,
                },
                {
                    icon: <LuSearch />,
                    path: '/app/courses/search',
                    text: 'Search',
                    active: false,
                    id: 5.2,
                },
            ],
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

    /**
     * This is for mobile view only. To handle the side nav open and close
     */
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const sideNavRef = useRef<HTMLElement>(null);
    const verticalNavRef = useRef<HTMLElement>(null);

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
        if (location.pathname === '/app/checkout') setHidden(true);
        else setHidden(false);

        document.querySelector('#mujedd-root')?.scrollTo({
            top: 0,
            behavior: 'instant',
        });

        let flattenedItems: Array<SideNavItemProps | SubItemProps> = [];
        navItems.forEach((item) => {
            flattenedItems.push(item);
            if (item.extendable) {
                flattenedItems.push(...item.subItems!);
            }
        });

        let targetItemId = flattenedItems.find(
            (item) => item.path === location.pathname,
        )?.id;

        if (!targetItemId) return; // No match

        let newItems = navItems.map((item) => {
            if (item.id === Math.trunc(Number(targetItemId))) {
                let newItem = {
                    ...item,
                    active: true,
                };
                if (!Number.isInteger(targetItemId)) {
                    // The target is a subItem
                    newItem.extended = true;
                    newItem.subItems = item.subItems?.map((subItem) => {
                        if (subItem.id === targetItemId) {
                            return {
                                ...subItem,
                                active: true,
                            };
                        } else {
                            return {
                                ...subItem,
                                active: false,
                            };
                        }
                    });
                }
                return newItem;
            } else {
                let newItem = {
                    ...item,
                    active: false,
                };
                newItem.subItems = newItem.subItems?.map((subItem) => {
                    return {
                        ...subItem,
                        active: false,
                    };
                });
                return newItem;
            }
        });

        setNavItems(newItems);
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

    const handleToggleExtend = (
        event: React.MouseEvent,
        id: string | number,
    ) => {
        event.preventDefault();
        let newItems = navItems.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    extended: !item.extended,
                };
            }
            return item;
        });
        setNavItems(newItems);
    };

    // This is for mobile view only.
    const openSideNav = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.nativeEvent.stopImmediatePropagation();
        setSideNavOpen(true);
    };

    return (
        <>
            {!hidden && (
                <SideNavContainer sideNavOpen={sideNavOpen} ref={sideNavRef}>
                    <div>
                        <Brand>Mujedd</Brand>
                        <Separator />
                    </div>

                    <LinksContainer>
                        {navItems.map((link) => (
                            <SideNavItem
                                {...link}
                                key={link.text}
                                toggleExtend={(event: React.MouseEvent) =>
                                    handleToggleExtend(event, link.id)
                                }
                                subItems={link.subItems}
                            />
                        ))}
                    </LinksContainer>

                    <SideNavFooter>
                        <IconsContainer>
                            <IconContainer counter={notificationsCounter}>
                                <NotificationsIcon
                                    size={24}
                                    title="Notifications"
                                    onClick={() =>
                                        navigate('/app/notifications')
                                    }
                                />
                            </IconContainer>
                            <IconContainer counter={messagesCounter}>
                                <MessagesIcon
                                    size={24}
                                    title="Messages"
                                    onClick={() => navigate('/app/chats')}
                                />
                            </IconContainer>
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
                                    <UserFullName width="17ch">
                                        {user?.FullName}
                                    </UserFullName>
                                    <UserUsername width="17ch">
                                        @{user?.Username}
                                    </UserUsername>
                                </div>
                            </UserContainer>
                        </DropdownMenu>
                    </SideNavFooter>
                </SideNavContainer>
            )}
            <MobileNav ref={verticalNavRef}>
                <Button
                    className="text-white z-10 !border-none !bg-transparent"
                    onClick={openSideNav}
                >
                    <FiMenu size={32} />
                </Button>
            </MobileNav>
        </>
    );
}
