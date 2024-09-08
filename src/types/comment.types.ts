import { ReactionCounter, UserReaction } from "@/types/post.types";
import { UserInformation } from "@/types/user.types";

export type Comment = {
  author: UserInformation;
  content: string;
  createdAt: string;
  editHistory: Array<CommentEditHistory>;
  _id: string;
  reactionCount: number;
  reactionSummary: ReactionCounter[];
  updatedAt: string;
  userReaction?: null | UserReaction;
};

export type CommentEditHistory = {
  content: string;
  editedAt: string;
  _id: string;
};
