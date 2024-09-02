import { profileImgURL } from "@/constants";
import { useState } from "react";
import loginPicture from "@/assets/image/AvatarFallback.png";
type AvatarProps = {
  photoURL?: string;
  size?: number;
};

const Avatar = ({ photoURL = profileImgURL, size = 48 }: AvatarProps) => {
  const [url, setUrl] = useState<string>(photoURL);
  return (
    <img
      //key is used to force the component to re-render when the photoURL changes
      key={photoURL}
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
      loading="lazy"
    />
  );
};

export default Avatar;
