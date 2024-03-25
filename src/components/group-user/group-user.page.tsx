import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { usePermissionGroupMutation } from '../../store';
import { GroupUser } from '../../types/group';
import { profileURL } from '../../utils/profileUrlBuilder';
import { errorToast, successToast } from '../../utils/toasts';
import DropdownMenu from '../menu/menu.component';
import { PersonContainer, PersonImage, PersonName } from './group-user.style';

type GroupUserType = GroupUser & {
    Admin: boolean;
    GroupID: string | undefined;
};

const UserContainer = ({
    ID: idUser,
    ProfileImage,
    FullName,
    Username,
    Type: type,
    Admin: Admin,
    GroupID: GroupID,
}: GroupUserType) => {
    const navigate = useNavigate();
    const [updateStatus] = usePermissionGroupMutation();

    const handleStatus = async () => {
        try {
            if (GroupID) {
                const updatedGroupData: Partial<GroupUser> & { id: string } = {
                    id: GroupID,
                    ID: idUser,
                    Type: type === 'MEMBER' ? 'ADMIN' : 'MEMBER',
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
            option: type == 'MEMBER' ? 'Add an admin' : 'Dismiss an admin',
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
    return (
        <PersonContainer>
            <PersonImage alt="" src={ProfileImage ?? defaultUserImage} />
            <span className="flex flex-row items-center gap-2 relative">
                <PersonName title={FullName}>{FullName}</PersonName>
                {Admin ? (
                    <>
                        <DropdownMenu
                            options={statusOptionAdmin}
                            right="10%"
                            top="100%"
                            left="auto"
                            bottom="auto"
                            menuWidth="10rem"
                        >
                            <IoIosArrowDown />
                        </DropdownMenu>
                    </>
                ) : type === 'MEMBER' ? (
                    <>
                        <DropdownMenu
                            options={statusOptionMember}
                            right="10%"
                            top="100%"
                            left="auto"
                            bottom="auto"
                            menuWidth="10rem"
                        >
                            <IoIosArrowDown />
                        </DropdownMenu>
                    </>
                ) : (
                    <></>
                )}
            </span>
        </PersonContainer>
    );
};
export default UserContainer;
