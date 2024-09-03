import { useAuth } from "@/hooks/useAuth";
import ProfileLayout from "@/pages/layout/ProfileLayout";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Toast from "./components/Common/Toast";
import ProfilePosts from "@/pages/ProfilePage/ProfilePosts";
import ProfileFriends from "@/pages/ProfilePage/ProfileFriends";
import ProfileRequests from "@/pages/ProfilePage/ProfileRequests";
import ProfileGroups from "@/pages/ProfilePage/ProfileGroups";
import ProfileMyGroups from "@/pages/ProfilePage/ProfileMyGroups";
import BaseLayout from "@/pages/layout/BaseLayout";
import Home from "@/pages/Home";
import NoPage from "@/pages/NoPage";
import AuthPage from "@/pages/AuthPage";
import GroupLayout from "@/pages/layout/GroupLayout";
import GroupPosts from "@/pages/GroupPage/GroupPosts";
import GroupMembers from "@/pages/GroupPage/GroupMembers";
import GroupRequests from "@/pages/GroupPage/GroupRequests";
import { UserStatus } from "@/enums/user.enums";
import BannedPage from "@/pages/BannedPage";

function ProtectedRoute() {
  const { status, isAuthenticated, user } = useAuth();

  if (status === "firstLoading") {
    return;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }
  if (user?.status === UserStatus.BANNED) {
    return <BannedPage />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="/:username/" element={<ProfileLayout />}>
              <Route index element={<ProfilePosts />} />
              <Route path="friends" element={<ProfileFriends />} />
              <Route path="groups" element={<ProfileGroups />} />
              <Route path="my-groups" element={<ProfileMyGroups />} />
              <Route path="friend-requests" element={<ProfileRequests />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="/groups/:groupId" element={<GroupLayout />}>
              <Route index element={<GroupPosts />} />
              <Route path="members" element={<GroupMembers />} />
              <Route path="requests" element={<GroupRequests />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      {/*Global Toast, can be triggered by dispatching toast actions*/}
      <Toast />
    </Provider>
  );
}
