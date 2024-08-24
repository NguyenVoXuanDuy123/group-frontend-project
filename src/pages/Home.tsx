import CreatePostModal from "@/components/home/CreatePostModal";
import CreatePostPrompt from "@/components/home/CreatePostPrompt";
import PostList from "@/components/post/PostList";

const Home = () => {
  return (
    <div>
      <CreatePostPrompt />
      <CreatePostModal />
      <PostList />
    </div>
  );
};

export default Home;
