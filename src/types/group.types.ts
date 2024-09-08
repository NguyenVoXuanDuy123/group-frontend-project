import {
  GroupJoinRequestStatus,
  GroupStatus,
  GroupVisibilityLevel,
  UserGroupRelation,
} from "@/enums/group.enums";
import { UserInformation } from "@/types/user.types";

export type GroupCard = {
  _id: string;
  name: string;
  visibilityLevel: GroupVisibilityLevel;
  status: GroupStatus;
  description: string;
  memberCount: number;
  admin?: UserInformation;
  rejectedReason?: string;
  createdAt: string;
};

export type Group = {
  admin: UserInformation;
  createdAt: string;
  description: string;
  groupJoinRequest: null | GroupJoinRequest;
  _id: string;
  memberCount: number;
  name: string;
  status: GroupStatus;
  updatedAt: string;
  userGroupRelation: UserGroupRelation;
  visibilityLevel: GroupVisibilityLevel;
};

export type GroupJoinRequest = {
  _id: string;
  status: GroupJoinRequestStatus;
  createdAt: string;
};

export type GroupJoinRequestCardType = {
  _id: string;
  senderDetail: UserInformation;
  status: GroupJoinRequestStatus;
  createdAt: string;
};
