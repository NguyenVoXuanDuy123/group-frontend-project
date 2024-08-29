import reactionMap from "@/constants/reactionMap";
import getThreeMostReactionTypes from "@/helpers/getThreeMostReactionTypes";
import { ReactionCounter } from "@/types/post.types";

type ThreeMostReactionProps = {
  reactionSummary: ReactionCounter[];
  id: string;
};

const ThreeMostReaction = ({ reactionSummary, id }: ThreeMostReactionProps) => {
  return (
    <div className="ml-2 mr-2 flex items-center">
      {/* get the three most reacted types to display */}
      {getThreeMostReactionTypes(reactionSummary).map((reactionType) => {
        const ReactionComponent = reactionMap[reactionType];
        return (
          <ReactionComponent
            key={`${id}-${reactionType}`}
            className={`ml-[-8px]`}
          />
        );
      })}
    </div>
  );
};

export default ThreeMostReaction;
