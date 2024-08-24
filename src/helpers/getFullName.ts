import { UserInformation } from "@/types/user.types"


const getFullName = (user: UserInformation): string => {
    return `${user.firstName} ${user.lastName}`;
}   

export default getFullName;