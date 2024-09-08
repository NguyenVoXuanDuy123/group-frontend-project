// store/reactionsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactionType } from "@/enums/post.enums";
import { UserReaction } from "@/types/post.types";
import { RootState } from "@/redux/store";

type ReactionState = {
  reactions: Record<string, UserReaction>;
  offlineReactions: Array<{
    id: string;
    type: ReactionType;
    isComment: boolean;
  }>;
};

const initialState: ReactionState = {
  reactions: {},
  offlineReactions: [],
};

const reactionsSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    addReaction: (
      state,
      action: PayloadAction<{
        id: string;
        reaction: UserReaction;
        isComment: boolean;
      }>
    ) => {
      const { id, reaction, isComment } = action.payload;
      state.reactions[id] = reaction;
      state.offlineReactions.push({ id, type: reaction.type, isComment });
    },
    removeReaction: (
      state,
      action: PayloadAction<{ id: string; isComment: boolean }>
    ) => {
      const { id, isComment } = action.payload;
      delete state.reactions[id];
      state.offlineReactions = state.offlineReactions.filter(
        (item) => item.id !== id || item.isComment !== isComment
      );
    },
    clearOfflineReactions: (state) => {
      state.offlineReactions = [];
    },
  },
});

export const { addReaction, removeReaction, clearOfflineReactions } =
  reactionsSlice.actions;
export const selectReactions = (state: RootState) => state.reactions.reactions;
export const selectOfflineReactions = (state: RootState) =>
  state.reactions.offlineReactions;
export default reactionsSlice.reducer;
