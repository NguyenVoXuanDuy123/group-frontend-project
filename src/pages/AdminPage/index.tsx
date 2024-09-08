import GroupCreationRequestCard from "@/components/Admin/GroupCreationRequestCard";
import InfiniteScroll from "@/components/Common/InfiniteScroll";
import FriendIcon from "@/components/svg/side-bar-icons/FriendIcon";
import GroupIcon from "@/components/svg/side-bar-icons/GroupIcon";
import { UserRole } from "@/enums/user.enums";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GroupCard } from "@/types/group.types";
import { useEffect, useState } from "react";
import NoPage from "@/pages/NoPage";
import GroupManagementTab, {
  ExtendedGroupInformation,
} from "@/pages/AdminPage/GroupManagementTab";
import UserManagementTab, {
  ExtendedUserInformation,
} from "@/pages/AdminPage/UserManagementTab";

enum AdminTab {
  OVERVIEW = "Overview",
  USER_MANAGEMENT = "User Manager",
  GROUP_MANAGEMENT = "Group Manager",
  GROUP_REQUESTS = "Group Request Manager",
}

const GroupRequestManager = () => {
  const { user } = useAuth();
  const { role } = user || {
    role: UserRole.USER,
  };

  const [groups, , loadMoreGroups, isLoading] = useInfiniteScroll<GroupCard>({
    endpoint: `/api/groups/admin/creation-requests`,
    limit: 10,
    // Only allow fetching if the user is an admin
    isAllowFetch: role === UserRole.ADMIN,
  });

  if (role !== UserRole.ADMIN) {
    return <NoPage />;
  }

  return (
    <div className="bg-white rounded-xl p-4 mt-4">
      <h2 className="text-2xl font-bold mb-4">Group Creation Requests</h2>

      <div className="space-y-2">
        <InfiniteScroll
          loadMore={loadMoreGroups}
          items={groups}
          renderItem={(group) => (
            <div
              key={`group-${group._id}`}
              className="flex justify-center sm:justify-start ">
              <GroupCreationRequestCard groupCreationRequest={group} />
            </div>
          )}
        />
      </div>

      {groups.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center">
            No groups creation requests to show
          </p>
        </div>
      )}
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.OVERVIEW);

  const [users, setUsers, loadMoreUsers] =
    useInfiniteScroll<ExtendedUserInformation>({
      endpoint: "/api/search",
      limit: 10000,
      dataPerRender: 10000,
      queryParams: {
        searchBy: "user",
        q: "",
      },
    });

  const [groups, , loadMoreGroups] =
    useInfiniteScroll<ExtendedGroupInformation>({
      endpoint: "/api/search",
      limit: 10000,
      dataPerRender: 10000,
      queryParams: {
        searchBy: "group",
        q: "",
      },
    });

  useEffect(() => {
    loadMoreUsers();
    loadMoreGroups();
  }, [loadMoreGroups, loadMoreUsers]);

  const renderTabContent = () => {
    switch (activeTab) {
      case AdminTab.OVERVIEW:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FriendIcon size={32} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Users
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {users.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <GroupIcon size={32} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Groups
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {groups.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case AdminTab.GROUP_REQUESTS:
        return <GroupRequestManager />;
      case AdminTab.GROUP_MANAGEMENT:
        return (
          <GroupManagementTab groups={groups} loadMoreGroups={loadMoreGroups} />
        );
      case AdminTab.USER_MANAGEMENT:
        return (
          <UserManagementTab
            users={users}
            setUsers={setUsers}
            loadMoreUsers={loadMoreUsers}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-black mb-6">Admin Dashboard</h1>
      <div className="mb-4">
        <nav className="flex space-x-4" aria-label="Tabs">
          {Object.values(AdminTab).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "bg-indigo-100 text-primary"
                  : "text-gray-500 hover:text-gray-700"
              } bg-white px-3 py-2 text-sm rounded-md`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      <div className="w-full h-[1px] bg-light-grey" />
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
}
