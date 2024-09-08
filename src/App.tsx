import GroupCreationRequests from "@/pages/AdminPage/GroupCreationRequests";
import GroupMembers from "@/pages/GroupPage/GroupMembers";
import GroupPosts from "@/pages/GroupPage/GroupPosts";
import GroupRequests from "@/pages/GroupPage/GroupRequests";
import Home from "@/pages/Home";
import NoPage from "@/pages/NoPage";
import ProfileFriends from "@/pages/ProfilePage/ProfileFriends";
import ProfileGroups from "@/pages/ProfilePage/ProfileGroups";
import ProfileMyGroups from "@/pages/ProfilePage/ProfileMyGroups";
import ProfilePosts from "@/pages/ProfilePage/ProfilePosts";
import ProfileRequests from "@/pages/ProfilePage/ProfileRequests";
import BaseLayout from "@/pages/layout/BaseLayout";
import GroupLayout from "@/pages/layout/GroupLayout";
import ProfileLayout from "@/pages/layout/ProfileLayout";
import ProtectedRoute from "@/pages/layout/ProtectedRoute";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Toast from "@/components/Common/Toast";
import AdminDashboard from "@/pages/AdminPage";
import SearchPage from "@/pages/SearchPage";
import AdminLayout from "@/pages/layout/AdminLayout";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Home />} />
              <Route
                path="/group-creation-requests"
                element={<GroupCreationRequests />}
              />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route path="/admin-dashboard" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>

            <Route path="/:username/" element={<ProfileLayout />}>
              <Route index element={<ProfilePosts />} />
              <Route path="friends" element={<ProfileFriends />} />
              <Route path="groups" element={<ProfileGroups />} />
              <Route path="my-groups" element={<ProfileMyGroups />} />
              <Route path="friend-requests" element={<ProfileRequests />} />
            </Route>
            <Route path="/groups/:groupId" element={<GroupLayout />}>
              <Route index element={<GroupPosts />} />
              <Route path="members" element={<GroupMembers />} />
              <Route path="requests" element={<GroupRequests />} />
            </Route>
          </Route>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>

      {/*Global Toast, can be triggered by dispatching toast actions*/}
      <Toast />
    </Provider>
  );
}
