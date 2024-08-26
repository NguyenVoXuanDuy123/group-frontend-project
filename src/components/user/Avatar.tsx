import { profileImgURL } from "@/constants";
import { useState } from "react";
import loginPicture from "@/assets/image/AvatarFallback.png";
import { useNavigate } from "react-router-dom";
interface AvatarProps {
  photoURL: string;
  size?: number;
  username?: string;
  onClick?: () => void;
}

const Avatar = ({
  photoURL = profileImgURL,
  size = 48,
  username,
  onClick,
}: AvatarProps) => {
  const [url, setUrl] = useState<string>(photoURL);
  const navigate = useNavigate();
  return (
    <img
      onClick={() => {
        // if username is provided, navigate to the user's profile
        if (username) {
          navigate(`/${username}`);
        }
        // if onClick is provided, call the function
        if (onClick) {
          onClick();
        }
      }}
      src={url}
      alt="Avatar"
      onError={() => setUrl(loginPicture)}
      style={{
        width: size,
        height: size,
        //for smooth transition
        transition: "filter 0.3s",
      }}
      className="rounded-full object-cover hover:brightness-75 cursor-pointer"
    />
  );
};

export default Avatar;
