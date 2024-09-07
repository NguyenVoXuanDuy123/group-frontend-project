import CreatePostPrompt from "@/components/Common/Post/CreatePostPrompt";
import { Post } from "@/types/post.types";
import PostCard from "@/components/PostCard";
import InfiniteScroll from "@/components/Common/InfiniteScroll";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import SearchBar from "@/components/Home/SearchBar";

const POSTS_PER_FETCH = 20;

const Home = () => {
  const [posts, setPosts, loadMorePosts] = useInfiniteScroll<Post>({
    endpoint: "/api/users/me/feeds",
    limit: POSTS_PER_FETCH,
  });

  return (
    <div className="container mx-auto px-4">
      <SearchBar />
      <CreatePostPrompt setPosts={setPosts} />
      <InfiniteScroll
        items={posts}
        loadMore={loadMorePosts}
        renderItem={(post) => (
          <PostCard key={post._id} post={post} setPosts={setPosts} />
        )}
      />
    </div>
  );
};

export default Home;
