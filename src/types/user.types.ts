import {
  FriendRequestStatus,
  UserFriendRelation,
  UserRole,
  UserStatus,
} from "@/enums/user.enums";

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

  /**
   *  The count of friends the user has in common with the authenticated user.
   */
  mutualFriendCount?: number;
};

export type UserProfile = {
  /**
   * The URL of the user's avatar.
   */
  avatar: string;
  /**
   * The user bio is a short summary of a person's background or interests.
   */
  bio: string;
  /**
   * The first name of the user.
   */
  firstName: string;
  /**
   * The count of friends for the user.
   */
  friendCount: number;
  /**
   * friendRequest Object if request exists.
   */
  friendRequest: null | FriendRequest;
  /**
   * The count of groups the user is a part of.
   */
  groupCount: number;
  /**
   * Must be a 24-character hexadecimal string.
   */
  id: string;
  /**
   * The last name of the user.
   */
  lastName: string;
  /**
   * Represents the different roles that users can have on the social media platform. Each
   * role determines the user's permissions and access level.
   */
  role: UserRole;
  /**
   * Represents the current status of a user on the social media platform. This status helps
   * determine the user's level of access and participation within the community.
   */
  status: UserStatus;
  /**
   * The possible relationship statuses between two users on the social media platform.
   */
  userFriendRelation: UserFriendRelation;
  /**
   * The username for the new user.
   */
  username: string;

  /**
   * The count of friends the user has in common with the authenticated user.
   * This field is only available when the authenticated user is viewing another user's profile.
   */
  mutualFriendCount: number;
};

export type FriendRequest = {
  /**
   * Represents the timestamp of when the entity was created.
   */
  createdAt: string;
  /**
   * Must be a 24-character hexadecimal string.
   */
  id: string;
  /**
   * Represents the different stages a friend request can go through in a social networking
   * application.
   */
  status: FriendRequestStatus;
};

export type FriendRequestCardType = {
  id: string;
  senderDetail: UserInformation;
  status: FriendRequestStatus;
  createdAt: string;
};
