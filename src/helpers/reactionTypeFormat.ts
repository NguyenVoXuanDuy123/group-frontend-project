import { ReactionType } from "@/enums/post.enums";

const reactionTypeFormat = (reactionType: ReactionType) => {
  switch (reactionType) {
    case ReactionType.LIKE:
      return "Like";
    case ReactionType.LOVE:
      return "Love";
    case ReactionType.HAHA:
      return "Haha";
    case ReactionType.ANGRY:
      return "Angry";
    default:
      return "Like";
  }
};

export default reactionTypeFormat;
