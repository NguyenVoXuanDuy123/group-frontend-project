import PostCard from "@/components/PostCard";
import { Post } from "@/types/post.types";

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={`${post._id}`} post={post} />
      ))}
    </>
  );
};

export default PostList;
