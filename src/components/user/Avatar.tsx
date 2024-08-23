import { profileImgURL } from "@/constants";

interface AvatarProps {
  photoURL?: string;
  size?: number;
}

const Avatar = ({ photoURL = profileImgURL, size = 12 }: AvatarProps) => {
  return (
    <img
      src={photoURL}
      alt="Avatar"
      className={`w-${size} h-${size} rounded-full object-cover`}
    />
  );
};

export default Avatar;
