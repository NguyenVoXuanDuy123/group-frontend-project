import CreatePostPrompt from "@/components/Home/CreatePostPrompt";
import PostList from "@/components/PostCard/PostList";
import { GroupStatus, UserGroupRelation } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { GroupLayoutContextType } from "@/pages/layout/GroupLayout";
import { Post } from "@/types/post.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const GroupPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { group } = useOutletContext<GroupLayoutContextType>();
  useEffect(() => {
    // fetch posts of the group
    const fetchPosts = async () => {
      const posts = await fetchApi<Post[]>(
        `/api/groups/${group.id}/posts`,
        "GET",
        dispatch
      );

      if (posts) {
        setPosts(posts);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [dispatch, group.id]);

  return (
    <>
      {/* Only show the create post prompt if the user is a member or admin of the group
       *  and the group is approved
       */}
      {(group.userGroupRelation === UserGroupRelation.MEMBER ||
        group.userGroupRelation === UserGroupRelation.ADMIN) &&
        group.status === GroupStatus.APPROVED &&
        !isLoading && (
          <div className="w-full flex justify-center mt-4">
            <div className="w-[672px]">
              <CreatePostPrompt setPosts={setPosts} groupId={group.id} />
            </div>
          </div>
        )}
      <PostList posts={posts} />
      {posts.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center   ">
            {group.userGroupRelation === UserGroupRelation.NOT_MEMBER
              ? "Join the group to see posts"
              : "No posts to show"}
          </p>
        </div>
      )}
    </>
  );
};

export default GroupPosts;
