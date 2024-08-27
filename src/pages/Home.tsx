import CreatePostPrompt from "@/components/home/CreatePostPrompt";
import PostList from "@/components/PostCard/PostList";
import { fetchApi } from "@/helpers/fetchApi";
import { Post } from "@/types/post.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      // Fetch the posts from the API
      const posts = await fetchApi<Post[]>(
        "/api/users/me/feeds",
        "GET",
        dispatch
      );
      if (posts) {
        setPosts(posts);
      }
    };
    getPosts();
  }, [dispatch]);
  return (
    <div>
      <CreatePostPrompt setPosts={setPosts} />
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
