import CreatePostPrompt from "@/components/home/CreatePostPrompt";
import PostList from "@/components/PostCard/PostList";
import { UserGroupRelation } from "@/enums/group.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { GroupLayoutContextType } from "@/pages/layout/GroupLayout";
import { Post } from "@/types/post.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const GroupPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch();
  const { group } = useOutletContext<GroupLayoutContextType>();
  useEffect(() => {
    // fetch posts of the profile owner
    const fetchPosts = async () => {
      const posts = await fetchApi<Post[]>(
        `/api/groups/${group.id}/posts`,
        "GET",
        dispatch
      );

      if (posts) {
        setPosts(posts);
      }
    };
    fetchPosts();
  }, [dispatch, group.id]);

  return (
    <>
      {(group.userGroupRelation === UserGroupRelation.MEMBER ||
        group.userGroupRelation === UserGroupRelation.ADMIN) && (
        <div className="w-full flex justify-center mt-4">
          <div className="w-[672px]">
            <CreatePostPrompt setPosts={setPosts} groupId={group.id} />
          </div>
        </div>
      )}
      <PostList posts={posts} />;
    </>
  );
};

export default GroupPosts;
