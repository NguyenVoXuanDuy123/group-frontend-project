import { PostVisibilityLevel, ReactionType } from "@/enums/post.enums";
import { UserInformation } from "./user.types";

export type Post = {
  author: UserInformation;
  commentCount: number;
  content: string;
  createdAt: string;
  editHistory: EditHistory[];
  group: null | Group;
  _id: string;
  images: string[];
  reactionCount: number;
  reactionSummary: ReactionCounter[];
  updatedAt: string;
  userReaction?: null | UserReaction;
  visibilityLevel: PostVisibilityLevel;
};

type Group = {
  _id: string;
  name: string;
  admin: string;
};

export type EditHistory = {
  _id: string;
  content: string;
  editedAt: string;
  visibilityLevel: PostVisibilityLevel;
  images: string[] | null;
};

export type UserReaction = {
  type: ReactionType;
};

export type ReactionCounter = {
  count: number;
  type: ReactionType;
};
