type AvatarProps = {
  preview: string | undefined;
};

const Avatar = ({ preview }: AvatarProps) => {
  console.log(preview);
  return (
    <>
      {preview && (
        <img src={preview} alt="avatar" className="w-32 h-32 rounded-full" />
      )}
    </>
  );
};

export default Avatar;
