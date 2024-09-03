import { PostVisibilityLevel, ReactionType } from "@/enums/post.enums";
import { UserInformation } from "./user.types";

export type Post = {
  /**
   * The information of the author.
   */
  author: UserInformation;
  /**
   * The count of comment for the post.
   */
  commentCount: number;
  /**
   * The content of the post.
   */
  content: string;
  /**
   * Represents the timestamp of when the entity was created.
   */
  createdAt: string;
  /**
   * The list of edit histories of The post.
   */
  editHistory: EditHistory[];
  /**
   * The information of the group if post visibilityLevel is 'group'.
   */
  group: null | Group;
  /**
   * Must be a 24-character hexadecimal string.
   */
  _id: string;
  /**
   * The list of image URLs, provided as an array.
   */
  images: string[];
  /**
   * The count of reactions for the post.
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
  /**
   * Defines the visibility level of a post, determining who can view it based on the selected
   * level.
   */
  visibilityLevel: PostVisibilityLevel;
};

type Group = {
  /**
   * Must be a 24-character hexadecimal string.
   */
  _id: string;
  /**
   * The name of the group.
   */
  name: string;

  /*
   * The id of the admin of the group.
   */
  admin: string;
};

export type EditHistory = {
  /**
   * The content of post.
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
  /**
   * The list of image URLs, provided as an array.
   */
  images: string[] | null;
};

export type UserReaction = {
  type: ReactionType;
};

export type ReactionCounter = {
  count: number;
  /**
   * Representing different types of reactions that users can give to posts or comments.
   */
  type: ReactionType;
};
