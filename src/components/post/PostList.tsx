import { Post } from "@/types/post.types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PostCard from ".";
import { fetchApi } from "@/helpers/fetchApi";

const PostList = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);
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
        console.log(posts);
        setPostsList(posts);
      }
    };
    getPosts();
  }, [dispatch]);

  return postsList.map((post) => <PostCard key={post.id} post={post} />);
};

export default PostList;
