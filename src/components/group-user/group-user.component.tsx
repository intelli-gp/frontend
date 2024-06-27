import { FaCrown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { usePermissionGroupMutation } from '../../store';
import { GroupUser } from '../../types/group';
import { profileURL } from '../../utils/profileUrlBuilder';
import { errorToast, successToast } from '../../utils/toasts';
import DropdownMenu from '../menu/menu.component';
import {
    CardFooter,
    CrownHolder,
    OptionsButton,
    PersonContainer,
    PersonImage,
    PersonName,
} from './group-user.style';

type GroupUserType = GroupUser & {
    GroupID?: string;
    Admin?: boolean;
    IsMe?: boolean;
    Owner?: boolean;
};

const UserContainer = ({
    ID: idUser,
    ProfileImage,
    FullName,
    Username,
    Type,
    Admin,
    GroupID,
    IsMe,
    Owner,
}: GroupUserType) => {
    const navigate = useNavigate();
    const [updateStatus] = usePermissionGroupMutation();

    const handleStatus = async () => {
        try {
            if (GroupID) {
                const updatedGroupData: Partial<GroupUser> & { id: string } = {
                    id: GroupID,
                    ID: idUser,
                    Type: Type === 'MEMBER' ? 'ADMIN' : 'MEMBER',
                };
                await updateStatus(updatedGroupData).unwrap();
                successToast('Changed the permission successfully!');
            }
        } catch (error) {
            errorToast('Error occurred while giving permission!');
        }
    };

    const statusOptionAdmin = [
        {
            option: Type == 'MEMBER' ? 'Set as Admin' : 'Dismiss as Admin',
            handler: () => {
                handleStatus();
            },
        },
        {
            option: 'View Profile',
            handler: () => {
                navigate(profileURL(Username));
            },
        },
    ];

    const statusOptionMember = [
        {
            option: 'View Profile',
            handler: () => {
                navigate(profileURL(Username));
            },
        },
    ];

    const UserOptions = () => {
        if (IsMe) return null;
        return (
            <DropdownMenu
                options={
                    Admin && !Owner ? statusOptionAdmin : statusOptionMember
                }
                right="10%"
                top="100%"
                menuWidth="8rem"
                menuFontSize="0.75rem"
                menuElementClassName='!px-1'
            >
                <OptionsButton />
            </DropdownMenu>
        );
    };

    return (
        <PersonContainer>
            {Owner && (
                <CrownHolder>
                    <FaCrown size={14} color="#FFBB48" />
                </CrownHolder>
            )}

            <PersonImage
                alt="group member profile"
                src={ProfileImage}
                fallbackType="user"
            />

            <CardFooter>
                <PersonName
                    title={FullName}
                    width="13ch"
                    to={profileURL(Username)}
                >
                    {IsMe ? 'You' : FullName}
                </PersonName>
                <UserOptions />
            </CardFooter>
        </PersonContainer>
    );
};
export default UserContainer;
