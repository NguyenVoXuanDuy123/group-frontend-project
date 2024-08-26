import { Post } from "@/types/post.types";
import PostCard from ".";

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return posts.map((post) => <PostCard key={post.id} post={post} />);
};

export default PostList;
