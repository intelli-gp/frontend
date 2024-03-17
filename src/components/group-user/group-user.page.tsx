import { IoIosArrowDown } from "react-icons/io";
import { usePermissionGroupMutation } from "../../store";
import { GroupUser } from "../../types/group";
import defaultUserImage from '../../assets/imgs/user.jpg';
import { successToast, errorToast } from "../../utils/toasts";
import { PersonContainer, PersonName,PersonImage } from "./group-user.style";
import DropdownMenu from "../Menu/menu.component";
type GroupUserType = GroupUser & {
    sameUser: boolean;
    Admin: boolean;
    GroupID: string | undefined;
};

const UserContainer = ({
    ID: idUser,
    ProfileImage: ProfileImage,
    FullName: FullName,
    Type: type,
    Admin: Admin,
    sameUser: sameUser,
    GroupID: GroupID
}: GroupUserType) => {

    const [updateStatus] = usePermissionGroupMutation();

    const handleStatus = async () => {
        console.log('Heree')
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
            option: type == 'MEMBER' ?'Add an admin': 'Dismiss an admin',
            handler: () =>{ handleStatus() }
        },
    ];
    return (
        <PersonContainer>
            <PersonImage
                alt=""
                src={
                    ProfileImage ??
                    defaultUserImage
                }
            />
            <span className="flex flex-row items-center gap-2 relative">
                <PersonName title={FullName}>
                    {FullName}
                </PersonName>
                {sameUser && Admin ? (
                    <>
                        <DropdownMenu
                            options={statusOption}
                            right="10%"
                            top="100%"
                            left="auto"
                            bottom="auto"
                            menuWidth="10rem"
                        >
                                <IoIosArrowDown/>
                        </DropdownMenu>
                    </>
                ) : (
                    <></>
                )}
            </span>
        </PersonContainer>
    );
}
export default UserContainer;