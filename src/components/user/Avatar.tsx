interface AvatarProps {
  size: number;
  photoURL: string;
}

const Avatar = ({ size, photoURL }: AvatarProps) => {
  return (
    <img
      src={photoURL}
      alt="Avatar"
      className={`w-${size} h-${size} rounded-full object-cover`}
    />
  );
};

export default Avatar;
