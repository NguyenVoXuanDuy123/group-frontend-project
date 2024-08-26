import { ReactionCounter } from "@/types/post.types";

const getThreeMostReactionTypes = (reactionSumamry: ReactionCounter[]) => {
  const filteredReactions = reactionSumamry.filter(
    (reaction) => reaction.count > 0
  );
  const sortedReactions = filteredReactions.sort((a, b) => b.count - a.count);
  return sortedReactions.slice(0, 3).map((reaction) => reaction.type);
};

export default getThreeMostReactionTypes;
