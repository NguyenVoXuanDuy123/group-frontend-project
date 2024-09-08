import { useState } from "react";
import InfiniteScroll from "@/components/Common/InfiniteScroll";
import { GroupVisibilityLevel } from "@/enums/group.enums";
import { timeAgo } from "@/helpers/timeAgo";
import { truncateText } from "@/helpers/truncateText";
import { GroupCard } from "@/types/group.types";
import { Link } from "react-router-dom";

export type ExtendedGroupInformation = GroupCard & {
  createdAt: string;
};

type GroupManagementTabProps = {
  groups: ExtendedGroupInformation[];
  loadMoreGroups: () => void;
};

const GroupManagementTab = ({
  groups,
  loadMoreGroups,
}: GroupManagementTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderGroup = (group: ExtendedGroupInformation) => (
    <div
      key={group._id}
      className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
      <div className="px-4 py-5 sm:px-6">
        <Link
          to={`/groups/${group._id}`}
          className="text-lg leading-6 font-medium text-gray-900 hover:underline">
          {group.name}
        </Link>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {truncateText(group.description, 100)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Visibility Level
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  group.visibilityLevel === GroupVisibilityLevel.PUBLIC
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                {group.visibilityLevel}
              </span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {timeAgo(group.createdAt)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Member Count</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {group.memberCount}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden min-h-[800px]">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Group Management
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage and search for groups
        </p>
        <div className="mt-4">
          <label htmlFor="group-search" className="sr-only">
            Search groups
          </label>
          <input
            type="text"
            id="group-search"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <InfiniteScroll
          items={filteredGroups}
          loadMore={loadMoreGroups}
          renderItem={renderGroup}
        />
      </div>
    </div>
  );
};

export default GroupManagementTab;
