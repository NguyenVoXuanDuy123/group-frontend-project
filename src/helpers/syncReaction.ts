// helpers/syncReactions.ts
import {
  getOfflineReactionsFromIndexedDB,
  clearIndexedDB,
} from "@/helpers/indexedDB";
import { fetchApi } from "@/helpers/fetchApi";
import { store } from "@/redux/store";
import { clearOfflineReactions } from "@/redux/slices/reactionSlice";

const syncOfflineReactions = async () => {
  try {
    const offlineReactions = await getOfflineReactionsFromIndexedDB();

    let error = false;
    await Promise.all(
      offlineReactions.map(async (reaction) => {
        const { id, type, isComment } = reaction;
        const endpoint = isComment
          ? `/api/comments/${id}/reactions`
          : `/api/posts/${id}/reactions`;
        const method = type === "UNREACT" ? "DELETE" : "PUT";
        const response = await fetchApi(endpoint, method, store.dispatch, {
          type,
        });
        if (
          response.status === "error" &&
          response.errorCode === "ERR_CONNECTION_REFUSED"
        ) {
          error = true;
        }
      })
    );

    if (error || !offlineReactions.length) {
      // return false if there was an error or no reactions to sync
      return false;
    }
    store.dispatch(clearOfflineReactions());
    await clearIndexedDB();
    // return true if all reactions were synced successfully
    return true;
  } catch (error) {
    console.error("Error syncing offline reactions:", error);
  }
};

export default syncOfflineReactions;
