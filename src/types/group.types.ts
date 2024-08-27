import {
  GroupJoinRequestStatus,
  GroupStatus,
  GroupVisibilityLevel,
  UserGroupRelation,
} from "@/enums/group.enums";
import { UserInformation } from "@/types/user.types";

export type GroupCard = {
  id: string;
  name: string;
  visibilityLevel: GroupVisibilityLevel;
  status: GroupStatus;
  memberCount: number;
};

export type Group = {
  /**
   * The Information of group admin.
   */
  admin: UserInformation;
  /**
   * Represents the timestamp of when the entity was created.
   */
  createdAt: string;
  /**
   * The description of the group.
   */
  description: string;
  /**
   * If a group join request exists between the user and the group, it will be returned;
   * otherwise, the response will be null.
   */
  groupJoinRequest: null | GroupJoinRequest;
  /**
   * Must be a 24-character hexadecimal string.
   */
  id: string;
  /**
   * The count of members is a part of., The count of members is a part of.
   */
  memberCount: number;
  /**
   * The name of the group.
   */
  name: string;
  /**
   * Represents the current status of a group, indicating whether the group is pending
   * approval, approved, or rejected.
   */
  status: GroupStatus;
  /**
   * Represents the timestamp of when the entity was last updated.
   */
  updatedAt: string;
  /**
   * Defines the possible relationships between a user and a group in the application. It
   * represents the different roles or statuses a user can have concerning a group.
   */
  userGroupRelation: UserGroupRelation;
  /**
   * Defines the visibility levels that can be assigned to a group within the application.
   */
  visibilityLevel: GroupVisibilityLevel;
};

export type GroupJoinRequest = {
  /**
   * Must be a 24-character hexadecimal string.
   */
  id: string;
  /**
   * Represents the status of a user's request to join a group. It indicates whether the
   * request is pending, accepted, rejected, or cancelled.
   */
  status: GroupJoinRequestStatus;
};
