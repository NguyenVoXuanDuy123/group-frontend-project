import {
  FriendRequestStatus,
  UserFriendRelation,
  UserRole,
  UserStatus,
} from "@/enums/user.enums";

export type UserInformation = {
  avatar: string;
  firstName: string;
  _id: string;
  lastName: string;
  username: string;
  mutualFriendCount?: number;
};

export type UserProfile = {
  avatar: string;
  bio: string;
  firstName: string;
  friendCount: number;
  friendRequest: null | FriendRequest;
  groupCount: number;
  _id: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  userFriendRelation: UserFriendRelation;
  username: string;
  mutualFriendCount: number;
};

export type FriendRequest = {
  createdAt: string;
  _id: string;
  status: FriendRequestStatus;
};

export type FriendRequestCardType = {
  _id: string;
  senderDetail: UserInformation;
  status: FriendRequestStatus;
  createdAt: string;
};
