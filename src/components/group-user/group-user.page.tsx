import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { usePermissionGroupMutation } from "../../store";
import { GroupUser } from "../../types/group";
import defaultUserImage from '../../assets/imgs/user.jpg';
import { successToast, errorToast } from "../../utils/toasts";
import { PersonContainer, PersonName, Arrow, Menu, MenuContent } from "./group-user.style";
type GroupUserType = GroupUser & {
     sameUser: boolean;
     Admin:boolean;
     GroupID:string|undefined;
};

const UserContainer =({
ID: ID,    
Username:username,
ProfileImage:ProfileImage,
FullName:FullName,
Type:Type,
Admin:Admin,
sameUser:sameUser,
GroupID:GroupID
}: GroupUserType)=>{

    const [ShowMenu, setMenu] = useState(false);
    const [updateStatus] = usePermissionGroupMutation();
    const handleStatus = async (
        id: string | undefined,
        type: 'ADMIN' | 'MEMBER',
    ) => {
        try {
            if(GroupID){
                const updatedGroupData: Partial<GroupUser> & { id: string } = {
                
                    id:GroupID,
                    ID: id,
                    Type: type,
                };
                await updateStatus(updatedGroupData).unwrap();
                successToast('Changed the permission successfully!');
                setMenu(false);
            }
        } catch (error) {
            errorToast('Error occurred while giving permission!');
        }
    };

    return (
        <PersonContainer key={username}>
            <img
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
                {sameUser && Admin? (
                    <>
                        <Arrow>
                            <IoIosArrowDown
                                onClick={() =>
                                    setMenu((prev) => !prev)
                                }
                            />
                        </Arrow>
                        {ShowMenu && (
                            <Menu>
                                <MenuContent
                                    onClick={() =>
                                        handleStatus(
                                            ID,
                                            Type=='MEMBER'?'ADMIN':'MEMBER'
                                        )
                                    }
                                >
                                    <h1>
                                       { Type=='MEMBER'?'Add an admin':' Dismiss an admin'}
                                    </h1>
                                </MenuContent>
                            </Menu>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </span>
        </PersonContainer>
    );
}
export default UserContainer;