import AngryReaction from "@/components/svg/reactions/Angry";
import HahaReaction from "@/components/svg/reactions/Haha";
import LikeReaction from "@/components/svg/reactions/Like";
import LoveReaction from "@/components/svg/reactions/Love";

const reactionMap = {
  like: LikeReaction,
  love: LoveReaction,
  haha: HahaReaction,
  angry: AngryReaction,
  unreact: null,
};

export default reactionMap;
