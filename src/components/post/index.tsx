import { useState } from "react";
import LikeReaction from "../svg/reactions/Like";
import LoveReaction from "../svg/reactions/Love";
import Avatar from "../user/Avatar";
import LikeAction from "../svg/post/LikeAction";
import CommentAction from "../svg/post/CommentAction";
import HahaReaction from "../svg/reactions/Haha";
import AngryReaction from "../svg/reactions/Angry";

const PostCard = () => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-light-grey overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="px-4 pt-4">
          {/* Profile Section */}
          <div className="flex items-center mb-4">
            <Avatar
              size={12}
              photoURL="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/447670612_1510338959911026_7071178279042352058_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGg0BBSpcTY_athjcZsckWU28AT3bK6fNLbwBPdsrp80jm52aGZhpFZQQ_DUnsHhQdInt7g6U9ZvwTsb-A4e2mF&_nc_ohc=nzbvn1rf8IYQ7kNvgHc3Qv3&_nc_ht=scontent.fsgn2-3.fna&oh=00_AYD_4AJiHIB9yz1oKUb8JuebZniug6RX4UvA4KPxivu1cw&oe=66CCFB24"
            />
            <div className="ml-4">
              <div className="text-md font-medium text-black">
                Huong Dat Huy
              </div>
              <div className="text-grey">Just now</div>
            </div>
          </div>

          {/* Post Content */}
          <p className="mt-2">
            Are we in gaming paradise up here at Gamescom? When Porsche meets
            gaming, magic happens. Packed with exciting activities – from
            karaoke and fun meet-and-greets to a full gaming setup – the Porsche
            x Overwatch 2 stand at Gamescom 2024 is a gamer’s paradise. Stop by
            between 21 and 25 August to meet other community members...
            <span className="font-bold">See more</span>
          </p>

          {/* Image Section */}
          <img
            className="mt-4 w-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1548978886-6badb16fc09f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace this with the path to your image
            alt="Porsche Car"
          />

          {/* Reactions and Comments */}
          <div className="mt-4 flex justify-between text-gray-500">
            <div className="flex items-center">
              <LikeReaction />
              <LoveReaction />
              <span className="ml-1">76 Reactions</span>
            </div>
            <div className="flex items-center">
              <span className="">12 Comments</span>
            </div>
          </div>

          {/* Reactions and Comments */}
          <div className="border-top py-2 mt-4 flex justify-between items-center text-gray-500">
            <div
              className="rounded-lg p-3 relative flex flex-1 items-center justify-center cursor-pointer hover:bg-light-grey"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <LikeAction />
              <span className="ml-1">Like</span>
              {/* Reaction Popup */}
              {showReactions && (
                <div className="absolute bottom-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex space-x-2">
                  <LikeReaction width={48} height={48} />
                  <LoveReaction width={48} height={48} />
                  <HahaReaction width={48} height={48} />
                  <AngryReaction width={48} height={48} />
                </div>
              )}
            </div>
            <div className="rounded-lg p-3 flex flex-1 items-center justify-center cursor-pointer hover:bg-light-grey">
              <CommentAction />
              <span className="ml-1">Comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
