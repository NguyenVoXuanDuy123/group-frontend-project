import { ReactionTargetType, ReactionType } from "@/enums/post.enums";
import { UserInformation } from "@/types/user.types";

export type ReactionUserInfo = {
  _id: string;
  targetType: ReactionTargetType;
  type: ReactionType;
  user: UserInformation;
};
