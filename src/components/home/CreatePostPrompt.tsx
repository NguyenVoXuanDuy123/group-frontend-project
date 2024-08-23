import ImageAdd from "../svg/ImageAdd";
import Avatar from "../user/Avatar";

const CreatePostPrompt = () => {
  return (
    <div className="w-full rounded-xl bg-light-grey p-4 flex">
      <Avatar
        photoURL="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/447670612_1510338959911026_7071178279042352058_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGg0BBSpcTY_athjcZsckWU28AT3bK6fNLbwBPdsrp80jm52aGZhpFZQQ_DUnsHhQdInt7g6U9ZvwTsb-A4e2mF&_nc_ohc=nzbvn1rf8IYQ7kNvgHc3Qv3&_nc_ht=scontent.fsgn2-3.fna&oh=00_AYD_4AJiHIB9yz1oKUb8JuebZniug6RX4UvA4KPxivu1cw&oe=66CCFB24"
        size={12}
      />
      <div className="flex items-center justify-between ml-4 w-full h-12 rounded-full bg-white p-2.5">
        <span className="text-grey">What's on your mind?</span>
        <div className="w-8 h-8 rounded-full bg-light-grey flex items-center justify-center">
          <ImageAdd />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPrompt;
