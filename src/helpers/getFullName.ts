
type Nameable = {
    firstName: string;
    lastName: string;
}

const getFullName = (user: Nameable): string => {
    return `${user.firstName} ${user.lastName}`;
}   

export default getFullName;