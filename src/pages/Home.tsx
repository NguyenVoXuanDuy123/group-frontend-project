import CreatePostModal from "@/components/home/CreatePostModal";
import CreatePostPrompt from "@/components/home/CreatePostPrompt";
import PostCard from "@/components/post";

const Home = () => {
  return (
    <div>
      <CreatePostPrompt />
      <CreatePostModal />
      <PostCard />
    </div>
  );
};

export default Home;
