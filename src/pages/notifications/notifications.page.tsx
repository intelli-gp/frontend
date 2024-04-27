import { useState } from 'react';
import { IoIosSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import ExplorePageHeader from '../../components/explore-page-header/explore-page-header.component';
import NotificationItem from '../../components/notification-item/notification-item.component';
import { BetweenPageAnimation, PageTitle } from '../../index.styles';
import { Notification } from '../../types/notifications';
import { EditButton } from '../view-group/view-group.styles';
import { NotificationsContainer, PageContainer } from './notifications.styles';

const NOTIFICATIONS: Notification[] = [
    {
        Username: 'ahmed',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'starred',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '1',
    },
    {
        Username: 'ahmed',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'commented',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '2',
    },
    {
        Username: 'ahmed',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'followed',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '3',
    },
    {
        Username: 'Khaled',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'created',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '4',
    },
    {
        Username: 'Khaled',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'starred',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '1',
    },
    {
        Username: 'Khaled',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'commented',
        Read: false,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '2',
    },
    {
        Username: 'Khaled',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'followed',
        Read: false,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '3',
    },
    {
        Username: 'Khaled',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'created',
        Read: false,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '4',
    },
    {
        Username: 'Khaled',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'starred',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '1',
    },
    {
        Username: 'Khaled',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'commented',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '2',
    },
    {
        Username: 'user3',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'followed',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '3',
    },
    {
        Username: 'user4',
        UserImage: 'https://randomuser.me/api/portraits/men/10.jpg',
        Action: 'created',
        Read: true,
        CreatedAt: '2021-07-01T12:00:00Z',
        TargetID: '4',
    },
];

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const handleSearchValueChange = (value: string) => {
        setSearchValue(value);
    };
    return (
        <PageContainer {...BetweenPageAnimation}>
            <div className="flex justify-between items center">
                <PageTitle>Notification Center</PageTitle>
                <EditButton onClick={() => navigate('/app/settings')}>
                    <IoIosSettings size={24} />
                </EditButton>
            </div>
            <ExplorePageHeader
                WithoutButton
                searchValue={searchValue}
                onSearchValueChange={handleSearchValueChange}
            />
            <NotificationsContainer>
                {NOTIFICATIONS.map((notification) => (
                    <NotificationItem
                        key={notification.TargetID}
                        {...notification}
                    />
                ))}
            </NotificationsContainer>
        </PageContainer>
    );
};

export default NotificationsPage;
