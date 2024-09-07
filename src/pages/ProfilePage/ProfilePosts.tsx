import InfiniteScroll from "@/components/Common/InfiniteScroll";
import CreatePostPrompt from "@/components/Common/Post/CreatePostPrompt";
import PostCard from "@/components/PostCard";
import { POSTS_PER_FETCH } from "@/constants";
import { UserFriendRelation } from "@/enums/user.enums";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProfileLayoutContextType } from "@/pages/layout/ProfileLayout";
import { Post } from "@/types/post.types";
import { useOutletContext } from "react-router-dom";

const ProfilePosts = () => {
  const { user } = useOutletContext<ProfileLayoutContextType>();
  const [posts, setPosts, loadMore] = useInfiniteScroll<Post>({
    endpoint: `/api/users/${user._id}/posts`,
    limit: POSTS_PER_FETCH,
  });

  return (
    <>
      {user.userFriendRelation === UserFriendRelation.SELF && (
        <div className="mt-4">
          <CreatePostPrompt setPosts={setPosts} />
        </div>
      )}
      <InfiniteScroll
        items={posts}
        loadMore={loadMore}
        renderItem={(post) => (
          <PostCard key={post._id} post={post} setPosts={setPosts} />
        )}
      />
    </>
  );
};

export default ProfilePosts;
