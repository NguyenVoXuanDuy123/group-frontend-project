import { GroupJoinRequestStatus } from "@/enums/group.enums";
import { NotificationType } from "@/enums/notification.enums";
import { ReactionTargetType, ReactionType } from "@/enums/post.enums";
import { FriendRequestStatus } from "@/enums/user.enums";
import { UserInformation } from "@/types/user.types";

export type CommentResponseNotification = {
  _id: string;
  post: string;
  content: string;
};

export type PostResponseNotification = {
  _id: string;
  content: string;
};

export type CommentNotification = {
  type: NotificationType.COMMENT;
  comment: CommentResponseNotification;
};

export type GroupResponseNotification = {
  _id: string;
  name: string;
};

export type FriendRequestNotification =
  | {
      type: NotificationType.FRIEND_REQUEST_ACCEPTED;
    }
  | PendingFriendRequestNotification;

type PendingFriendRequestNotification = {
  type: NotificationType.FRIEND_REQUEST;
  friendRequestStatus?: FriendRequestStatus;
};

type CommentReactionNotification = {
  targetType: ReactionTargetType.COMMENT;
  comment: CommentResponseNotification;
};

type PostReactionNotification = {
  targetType: ReactionTargetType.POST;
  post: PostResponseNotification;
};

type ReactionNotification = {
  type: NotificationType.REACTION;
  reaction: {
    _id: string;
    type: ReactionType;
  } & (CommentReactionNotification | PostReactionNotification);
};

type GroupJoinRequestNotification = (
  | {
      type: NotificationType.GROUP_JOIN_REQUEST_ACCEPTED;
    }
  | PendingGroupJoinRequestNotification
) & { group: GroupResponseNotification };

type PendingGroupJoinRequestNotification = {
  type: NotificationType.GROUP_JOIN_REQUEST;
  groupJoinRequestStatus?: GroupJoinRequestStatus;
};

type GroupCreationApprovalNotification = {
  type: NotificationType.GROUP_CREATION_APPROVAL;
  group: GroupResponseNotification;
};

export type Notification = {
  _id: string;
  createdAt: string;
  isRead: boolean;
  relatedEntity: string;
  senderDetail: UserInformation;
} & (
  | FriendRequestNotification
  | CommentNotification
  | ReactionNotification
  | GroupJoinRequestNotification
  | GroupCreationApprovalNotification
);
