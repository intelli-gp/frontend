import { IoIosArrowDown } from 'react-icons/io';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { usePermissionGroupMutation } from '../../store';
import { GroupUser } from '../../types/group';
import { errorToast, successToast } from '../../utils/toasts';
import DropdownMenu from '../menu/menu.component';
import { PersonContainer, PersonImage, PersonName } from './group-user.style';
import { useNavigate } from 'react-router-dom';

type GroupUserType = GroupUser & {
    Admin: boolean;
    GroupID: string | undefined;
};

const UserContainer = ({
    ID: idUser,
    ProfileImage: ProfileImage,
    FullName: FullName,
    Username:username,
    Type: type,
    Admin: Admin,
    GroupID: GroupID,
}: GroupUserType) => {
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
    const navigate = useNavigate();

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
                 navigate(`/app/user/${username}`)}
            ,
        },
    ];
    const statusOptionMember = [
        {
            option: 'View Profile',
            handler: () => {
                 navigate(`/app/user/${username}`)}
            ,
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
                ) : (type ==='MEMBER'? (
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
                    </>):(<></>
                ))}
            </span>
        </PersonContainer>
    );
};
export default UserContainer;
