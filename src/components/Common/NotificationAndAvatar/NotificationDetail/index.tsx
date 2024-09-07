import CommentNotification from "@/components/Common/NotificationAndAvatar/NotificationDetail/CommentNotification";
import FriendRequestAcceptNotification from "@/components/Common/NotificationAndAvatar/NotificationDetail/FriendRequestAcceptedNotification";
import FriendRequestNotification from "@/components/Common/NotificationAndAvatar/NotificationDetail/FriendRequestNotification";
import GroupCreationApprovalNotification from "@/components/Common/NotificationAndAvatar/NotificationDetail/GroupCreationApprovalNotification";
import GroupJoinRequestAcceptedNotification from "@/components/Common/NotificationAndAvatar/NotificationDetail/GroupJoinRequestAcceptedNotification";
import GroupJoinRequestNotification from "@/components/Common/NotificationAndAvatar/NotificationDetail/GroupJoinRequestNotification";
import PostOrCommentReactionNotification from "@/components/Common/NotificationAndAvatar/NotificationDetail/PostOrCommentReactionNotification";
import { GroupJoinRequestStatus } from "@/enums/group.enums";
import { NotificationType } from "@/enums/notification.enums";
import { ReactionTargetType } from "@/enums/post.enums";
import { FriendRequestStatus } from "@/enums/user.enums";
import { Notification } from "@/types/notification.type";

type NotificationDetailProps = {
  notification: Notification;
};

const NotificationDetail = ({ notification }: NotificationDetailProps) => {
  if (notification.type === NotificationType.FRIEND_REQUEST) {
    return (
      <FriendRequestNotification
        createdAt={notification.createdAt}
        friendRequestId={notification.relatedEntity}
        senderDetail={notification.senderDetail}
        friendRequestStatus={
          notification.friendRequestStatus || FriendRequestStatus.PENDING
        }
        isRead={notification.isRead}
      />
    );
  }

  if (notification.type === NotificationType.FRIEND_REQUEST_ACCEPTED) {
    return (
      <FriendRequestAcceptNotification
        senderDetail={notification.senderDetail}
        createdAt={notification.createdAt}
        isRead={notification.isRead}
      />
    );
  }

  // if the notification is a comment notification
  if (notification.type === NotificationType.COMMENT) {
    const comment = notification.comment;
    return (
      <CommentNotification
        comment={comment}
        createdAt={notification.createdAt}
        senderDetail={notification.senderDetail}
        postId={comment.post}
        isRead={notification.isRead}
      />
    );
  }

  // if the notification is a reaction notification
  if (notification.type === NotificationType.REACTION) {
    if (notification.reaction.targetType === ReactionTargetType.COMMENT) {
      const comment = notification.reaction.comment;
      return (
        <PostOrCommentReactionNotification
          postId={comment.post}
          content={comment.content}
          senderDetail={notification.senderDetail}
          createdAt={notification.createdAt}
          targetType={ReactionTargetType.COMMENT}
          type={notification.reaction.type}
          isRead={notification.isRead}
        />
      );
    }

    if (notification.reaction.targetType === ReactionTargetType.POST) {
      const post = notification.reaction.post;
      return (
        <PostOrCommentReactionNotification
          postId={post._id}
          content={post.content}
          senderDetail={notification.senderDetail}
          createdAt={notification.createdAt}
          targetType={ReactionTargetType.POST}
          type={notification.reaction.type}
          isRead={notification.isRead}
        />
      );
    }
  }

  if (notification.type === NotificationType.GROUP_JOIN_REQUEST) {
    return (
      <GroupJoinRequestNotification
        groupJoinRequestStatus={
          notification.groupJoinRequestStatus || GroupJoinRequestStatus.PENDING
        }
        groupRequestId={notification.relatedEntity}
        createdAt={notification.createdAt}
        group={notification.group}
        senderDetail={notification.senderDetail}
        isRead={notification.isRead}
      />
    );
  }

  if (notification.type === NotificationType.GROUP_JOIN_REQUEST_ACCEPTED) {
    return (
      <GroupJoinRequestAcceptedNotification
        createdAt={notification.createdAt}
        group={notification.group}
        isRead={notification.isRead}
      />
    );
  }

  if (notification.type === NotificationType.GROUP_CREATION_APPROVAL) {
    return (
      <GroupCreationApprovalNotification
        group={notification.group}
        createdAt={notification.createdAt}
        isRead={notification.isRead}
      />
    );
  }

  return <div>NotificationDetail</div>;
};

export default NotificationDetail;
