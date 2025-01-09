type CrewProps = {
  crew:
    | {
        name: string;
        job: string;
      }[]
    | null;
};

const Crew = ({ crew }: CrewProps) => {
  if (crew === null)
    return (
      <div className="grid grid-cols-2 gap-4 p-4 space-y-2">
        <p className="text-mainBlack">No crew information available</p>
      </div>
    );
  return (
    <div className="grid grid-cols-2 gap-4 p-4 space-y-2">
      {crew.map((member, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
          <div>
            <p className="font-semibold text-gray-800">{member.name}</p>
            <p className="text-sm text-gray-600">{member.job}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Crew;
