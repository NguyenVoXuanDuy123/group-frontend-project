import { GroupJoinRequestStatus } from "@/enums/group.enums";
import { NotificationType } from "@/enums/notification.enums";
import { FriendRequestStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { RootState } from "@/redux/store";
import { Notification } from "@/types/notification.type";
import {
  createSlice,
  createAsyncThunk,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

type NotificationsState = {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  lastFetchedDate: string | null;
  unreadCount: number;
};

type changeFriendRequestStatusPayload = {
  friendRequestId: string;
  status: FriendRequestStatus;
};

type changeJoinGroupRequestStatusPayload = {
  groupJoinRequestId: string;
  status: GroupJoinRequestStatus;
};

const NOTIFICATION_PER_FETCH = 10;

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
  hasMore: true,
  lastFetchedDate: null,
  unreadCount: 0,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (
    payload: {
      dispatch: Dispatch;
    },
    { getState, rejectWithValue }
  ) => {
    const { lastFetchedDate } = (getState() as RootState).notification;
    const query = new URLSearchParams({
      limit: NOTIFICATION_PER_FETCH.toString(),
      beforeDate: lastFetchedDate || "",
    }).toString();

    const response = await fetchApi<Notification[]>(
      `/api/users/me/notifications?${query}`,
      "GET",
      payload.dispatch
    );

    if (response.status === "error") {
      return rejectWithValue("Failed to fetch notifications");
    }
    return response.result;
  }
);

export const fetchUnreadNotificationCount = createAsyncThunk(
  "notifications/fetchUnreadNotificationCount",
  async (payload: { dispatch: Dispatch }, { rejectWithValue }) => {
    const response = await fetchApi<number>(
      "/api/users/me/notifications/unread-count",
      "GET",
      payload.dispatch
    );

    if (response.status === "error") {
      return rejectWithValue("Failed to fetch unread notification count");
    }
    return response.result;
  }
);

export const fetchUnreadNotifications = createAsyncThunk(
  "notifications/fetchUnreadNotifications",
  async (
    payload: {
      dispatch: Dispatch;
    },
    { rejectWithValue }
  ) => {
    const response = await fetchApi<Notification[]>(
      "/api/users/me/notifications/unread",
      "GET",
      payload.dispatch
    );
    if (response.status === "error") {
      return rejectWithValue("Failed to fetch unread notifications");
    }
    return response.result;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    resetNotifications: (state) => {
      state.notifications = [];
      state.error = null;
      state.hasMore = true;
      state.lastFetchedDate = null;
    },
    resetUnreadNotificationCount: (state) => {
      state.unreadCount = 0;
    },
    changeFriendRequestStatus: (
      state,
      action: PayloadAction<changeFriendRequestStatusPayload>
    ) => {
      const index = state.notifications.findIndex(
        (notification) =>
          notification.relatedEntity === action.payload.friendRequestId
      );
      if (index !== -1) {
        const notification = state.notifications[index];
        if (notification.type === NotificationType.FRIEND_REQUEST) {
          console.log(
            "FriendRequestNotification",
            notification.friendRequestStatus
          );
          notification.friendRequestStatus = action.payload.status;
        }
      }
    },
    changeJoinGroupRequestStatus: (
      state,
      action: PayloadAction<changeJoinGroupRequestStatusPayload>
    ) => {
      const index = state.notifications.findIndex(
        (notification) =>
          notification.relatedEntity === action.payload.groupJoinRequestId
      );
      if (index !== -1) {
        const notification = state.notifications[index];
        if (notification.type === NotificationType.GROUP_JOIN_REQUEST) {
          notification.groupJoinRequestStatus = action.payload.status;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        // If the number of notifications fetched is less than the limit, it means there are no more notifications to fetch
        if (action.payload.length < NOTIFICATION_PER_FETCH) {
          state.hasMore = false;
        }

        if (action.payload.length > 0) {
          state.notifications = [...state.notifications, ...action.payload];
          state.lastFetchedDate =
            action.payload[action.payload.length - 1].createdAt;
        }
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        if (action.payload === "No more notifications to fetch") {
          state.hasMore = false;
        } else {
          state.error = action.error.message || "Failed to fetch notifications";
        }
        state.loading = false;
      })
      .addCase(fetchUnreadNotificationCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.notifications = [...action.payload, ...state.notifications];
          state.unreadCount = state.unreadCount + action.payload.length;
          state.lastFetchedDate =
            action.payload[action.payload.length - 1].createdAt;
        }
      });
  },
});
export const {
  resetNotifications,
  changeFriendRequestStatus,
  changeJoinGroupRequestStatus,
  resetUnreadNotificationCount,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
