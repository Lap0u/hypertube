type AvatarProps = {
  preview: string | undefined;
};

const Avatar = ({ preview }: AvatarProps) => {
  return (
    <>
      {preview && (
        <img src={preview} alt="avatar" className="w-24 h-24 rounded-full" />
      )}
    </>
  );
};

export default Avatar;
