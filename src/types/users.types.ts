import { UserRole, UserStatus } from "@/enums/user.enum";

export type UserAuth = {
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  username: string;
};
