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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      setIsLoading(false);
    };
    fetchPosts();
  }, [dispatch, user.id]);

  return (
    <>
      {user.userFriendRelation === UserFriendRelation.SELF && !isLoading && (
        <div className="w-full flex justify-center mt-4">
          <div className="w-[672px]">
            <CreatePostPrompt setPosts={setPosts} />
          </div>
        </div>
      )}
      <PostList posts={posts} />

      {posts.length === 0 && !isLoading && (
        <div className="py-10 bg-white rounded-xl mt-4">
          <p className="text-gray-500 text-center   ">No posts to show</p>
        </div>
      )}
    </>
  );
};

export default ProfilePosts;
