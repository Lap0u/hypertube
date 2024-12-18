import { CrewDto } from '../dtos/MovieDto';

type CrewProps = {
  CrewList: CrewDto[];
};
const Crew = ({ CrewList }: CrewProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 space-y-2">
      {CrewList.map((member, index) => (
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
