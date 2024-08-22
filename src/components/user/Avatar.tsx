interface AvatarProps {
  size: number;
  photoURL: string;
}

const Avatar = ({ size, photoURL }: AvatarProps) => {
  return (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden`}>
      <img src={photoURL} alt="Avatar" className="w-full h-full object-cover" />
    </div>
  );
};

export default Avatar;
