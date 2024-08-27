import CreatePostPrompt from "@/components/home/CreatePostPrompt";
import PostList from "@/components/PostCard/PostList";
import { UserFriendRelation } from "@/enums/user.enums";
import { fetchApi } from "@/helpers/fetchApi";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { Post } from "@/types/post.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const ProfilePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch();
  const { user } = useOutletContext<ProfileLayoutContextType>();
  useEffect(() => {
    // fetch posts of the profile owner
    const fetchPosts = async () => {
      const posts = await fetchApi<Post[]>(
        `/api/users/${user.id}/posts`,
        "GET",
        dispatch
      );

      if (posts) {
        setPosts(posts);
      }
    };
    fetchPosts();
  }, [dispatch, user.id]);

  return (
    <>
      {user.userFriendRelation === UserFriendRelation.SELF && (
        <div className="w-full flex justify-center mt-4">
          <div className="w-[672px]">
            <CreatePostPrompt setPosts={setPosts} />
          </div>
        </div>
      )}
      <PostList posts={posts} />;
    </>
  );
};

export default ProfilePosts;
