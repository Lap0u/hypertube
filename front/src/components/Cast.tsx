type CastProps = {
  cast:
    | {
        name: string;
        pictureUrl: string;
      }[]
    | null;
};

const Cast = ({ cast }: CastProps) => {
  if (cast === null)
    return (
      <div className="grid grid-cols-2 gap-4 p-4 space-y-2">
        <p className="text-black">No cast information available</p>
      </div>
    );
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {cast.map((member, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center bg-gray-100 p-3 rounded-lg  transition">
          <img
            src={
              member.pictureUrl === undefined
                ? '/user-default.png'
                : member.pictureUrl
            }
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-100"
          />
          <p className="mt-2 font-semibold text-gray-800">{member.name}</p>
          <p className="text-sm text-gray-500"></p>
        </div>
      ))}
    </div>
  );
};

export default Cast;
