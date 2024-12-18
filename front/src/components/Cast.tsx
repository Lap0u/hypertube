import React from 'react';
import { CastDto } from '../dtos/MovieDto';

type CastProps = {
  CastList: CastDto[];
};

const Cast = ({ CastList }: CastProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {CastList.map((member, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center bg-white p-3 rounded-lg shadow-md transition hover:scale-105">
          <img
            src={
              member.pictureUrl.includes('originalnull')
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
