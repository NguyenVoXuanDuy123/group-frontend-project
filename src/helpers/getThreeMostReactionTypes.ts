import { ReactionCounter } from "@/types/post.types";

const getThreeMostReactionTypes = (reactionSummary: ReactionCounter[]) => {
  const filteredReactions = reactionSummary.filter(
    (reaction) => reaction.count > 0
  );
  const sortedReactions = filteredReactions.sort((a, b) => b.count - a.count);
  return sortedReactions.slice(0, 3).map((reaction) => reaction.type);
};

export default getThreeMostReactionTypes;
