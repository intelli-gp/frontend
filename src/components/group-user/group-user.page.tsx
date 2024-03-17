import { IoIosArrowDown } from 'react-icons/io';

import defaultUserImage from '../../assets/imgs/user.jpg';
import { usePermissionGroupMutation } from '../../store';
import { GroupUser } from '../../types/group';
import { errorToast, successToast } from '../../utils/toasts';
import DropdownMenu from '../Menu/menu.component';
import { PersonContainer, PersonImage, PersonName } from './group-user.style';

type GroupUserType = GroupUser & {
    Admin: boolean;
    GroupID: string | undefined;
};

const UserContainer = ({
    ID: idUser,
    ProfileImage: ProfileImage,
    FullName: FullName,
    Type: type,
    Admin: Admin,
    GroupID: GroupID,
}: GroupUserType) => {
    const [updateStatus] = usePermissionGroupMutation();

    const handleStatus = async () => {
        console.log('Heree');
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
    const statusOption = [
        {
            option: type == 'MEMBER' ? 'Add an admin' : 'Dismiss an admin',
            handler: () => {
                handleStatus();
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
                            options={statusOption}
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
