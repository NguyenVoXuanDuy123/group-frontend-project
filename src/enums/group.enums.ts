export enum GroupVisibilityLevel {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum GroupStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum GroupJoinRequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum GroupRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export enum UserGroupRelation {
  ADMIN = "admin",
  MEMBER = "member",
  NOT_MEMBER = "not_member",
  // When user sent a join request to the group.
  OUTGOING_REQUEST = "outgoing_request",
}
