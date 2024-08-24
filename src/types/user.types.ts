export type UserInformation = {
    avatar: string;
    /**
     * The first name of the user.
     */
    firstName: string;
    /**
     * Must be a 24-character hexadecimal string.
     */
    id: string;
    /**
     * The last name of the user.
     */
    lastName: string;
    /**
     * The username for the user.
     */
    username: string;
}