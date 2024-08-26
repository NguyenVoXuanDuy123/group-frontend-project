const reactionTypeFormat = (reactionType: string) => {
  switch (reactionType) {
    case "like":
      return "Like";
    case "love":
      return "Love";
    case "haha":
      return "Haha";
    case "wow":
      return "Wow";
    default:
      return "Like";
  }
};

export default reactionTypeFormat;
