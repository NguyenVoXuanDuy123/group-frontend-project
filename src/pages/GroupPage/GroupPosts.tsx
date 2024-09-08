import InfiniteScroll from "@/components/Common/InfiniteScroll";
import CreatePostPrompt from "@/components/Common/Post/CreatePostPrompt";
import PostCard from "@/components/PostCard";
import { POSTS_PER_FETCH } from "@/constants";
import {
  GroupStatus,
  GroupVisibilityLevel,
  UserGroupRelation,
} from "@/enums/group.enums";
import { UserRole } from "@/enums/user.enums";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GroupLayoutContextType } from "@/pages/layout/GroupLayout";
import { Post } from "@/types/post.types";
import { useOutletContext } from "react-router-dom";

const GroupPosts = () => {
  const { group } = useOutletContext<GroupLayoutContextType>();
  const { user } = useAuth();
  /*
   * Only allow fetching if the user is a member or admin of the group or the user is site-admin
   * Or the group is public
   */
  const isAllowFetch =
    group.visibilityLevel === GroupVisibilityLevel.PUBLIC ||
    user?.role === UserRole.ADMIN ||
    group.userGroupRelation === UserGroupRelation.ADMIN ||
    group.userGroupRelation === UserGroupRelation.MEMBER;
  const [posts, setPosts, loadMorePosts, isLoading] = useInfiniteScroll<Post>({
    endpoint: `/api/groups/${group._id}/posts`,
    limit: POSTS_PER_FETCH,
    isAllowFetch: isAllowFetch,
  });

  return (
    <>
      {/* Only show the create post prompt if the user is a member or admin of the group
       *  and the group is approved
       */}
      {(group.userGroupRelation === UserGroupRelation.MEMBER ||
        group.userGroupRelation === UserGroupRelation.ADMIN) &&
        group.status === GroupStatus.APPROVED &&
        !isLoading && (
          <div className="mt-4">
            <CreatePostPrompt setPosts={setPosts} groupId={group._id} />
          </div>
        )}
      {isAllowFetch && (
        <InfiniteScroll
          items={posts}
          loadMore={loadMorePosts}
          renderItem={(post) => (
            <PostCard
              key={post._id}
              post={post}
              setPosts={setPosts}
              group={group}
            />
          )}
        />
      )}

      {/* Show a message if the user is not a member of the group and the group is private */}
      {!isAllowFetch && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-3">
          <p className="text-gray-500 text-center    ">
            This group is private. Join the group to see posts.
          </p>
        </div>
      )}
    </>
  );
};

export default GroupPosts;
