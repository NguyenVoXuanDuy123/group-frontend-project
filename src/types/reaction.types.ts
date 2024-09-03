import { ReactionTargetType, ReactionType } from "@/enums/post.enums";
import { UserInformation } from "./user.types";

export type ReactionUserInfo = {
  /**
   * Must be a 24-character hexadecimal string.
   */
  _id: string;
  /**
   * Defines the type of target that a reaction can be applied to. This determines whether the
   * reaction is related to a post or a comment.
   */
  targetType: ReactionTargetType;
  /**
   * Representing different types of reactions that users can give to posts or comments.
   */
  type: ReactionType;
  /**
   * The information of the user.
   */
  user: UserInformation;
};
