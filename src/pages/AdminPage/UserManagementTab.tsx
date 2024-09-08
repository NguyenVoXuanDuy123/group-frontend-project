import InfiniteScroll from "@/components/Common/InfiniteScroll";
import Avatar from "@/components/Common/User/Avatar";
import { UserStatus } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import getFullName from "@/helpers/getFullName";
import { timeAgo } from "@/helpers/timeAgo";
import { setToast } from "@/redux/slices/toastSlice";
import { UserInformation } from "@/types/user.types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

export type ExtendedUserInformation = UserInformation & {
  role: "user";
  status: UserStatus;
  createdAt: string;
  friendCount: number;
  groupCount: number;
};

type UserManagementTabProps = {
  users: ExtendedUserInformation[];
  setUsers: React.Dispatch<React.SetStateAction<ExtendedUserInformation[]>>;
  loadMoreUsers: () => void;
};

export default function UserManagementTab({
  users,
  setUsers,
  loadMoreUsers,
}: UserManagementTabProps) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    const res = await fetchApi(
      `/api/users/${userId}/status`,
      "PATCH",
      dispatch,
      {
        status: newStatus,
      }
    );

    if (res) {
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
      dispatch(
        setToast({
          message: "User status updated successfully",
          type: "success",
        })
      );
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      getFullName(user).toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden min-h-[800px]">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Management
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage user accounts and their statuses
        </p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Friends
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Groups
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <InfiniteScroll
              items={filteredUsers}
              loadMore={loadMoreUsers}
              renderItem={(user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Link
                        to={`/${user.username}`}
                        className="flex-shrink-0 h-10 w-10">
                        <Avatar photoURL={user.avatar} size={48} />
                      </Link>
                      <div className="ml-4">
                        <Link
                          to={`/${user.username}`}
                          className="text-sm font-medium text-gray-900">
                          {getFullName(user)}
                        </Link>
                        <Link
                          to={`/${user.username}`}
                          className="block text-sm text-gray-500">
                          @{user.username}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      User
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.friendCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.groupCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {timeAgo(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusChange(
                          user._id,
                          e.target.value as UserStatus
                        )
                      }
                      className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option value={UserStatus.ACTIVE}>Active</option>
                      <option value={UserStatus.BANNED}>Suspended</option>
                    </select>
                  </td>
                </tr>
              )}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
