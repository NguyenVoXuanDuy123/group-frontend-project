import { ReactionCounter, UserReaction } from "./post.types";
import { UserInformation } from "./user.types";

export type Comment = {
  /**
   * Author of this comment.
   */
  author: UserInformation;
  /**
   * Content of the comment.
   */
  content: string;
  /**
   * Represents the timestamp of when the entity was created.
   */
  createdAt: string;
  /**
   * Edit histories of this comment.
   */
  editHistory: Array<CommentEditHistory>;
  /**
   * Must be a 24-character hexadecimal string.
   */
  _id: string;
  /**
   * The count of reactions for the comment.,
   */
  reactionCount: number;
  reactionSummary: ReactionCounter[];
  /**
   * Represents the timestamp of when the entity was last updated.
   */
  updatedAt: string;
  /**
   * This object will exist if user have reacted to the post.
   */
  userReaction?: null | UserReaction;
};

export type CommentEditHistory = {
  /**
   * Content of the comment.
   */
  content: string;
  /**
   * Represents the timestamp of when a post or comment was last edited.
   */
  editedAt: string;
  /**
   * Must be a 24-character hexadecimal string.
   */
  _id: string;
};
