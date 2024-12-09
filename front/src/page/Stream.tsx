import React from 'react';
import MainTitle from '../components/MainTitle';

const Stream = () => {
  return (
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center">
      <MainTitle />
      <div className="flex justify-center items-stretch gap-x-12">
        <video
          className="border border-2 border-white"
          width="800"
          height="600"
          controls
          src="http://localhost:5050/stream?hash=3FBFACC87CC7108B60BB64D5C3A38FBB8226B21E"></video>
        <video
          className="border border-2 border-white"
          width="800"
          height="600"
          controls
          // src="http://localhost:5050/stream?hash=3FBFACC87CC7108B60BB64D5C3A38FBB8226B21E">
          src="http://localhost:5050/videos/example.mp4"></video>
      </div>
    </div>
  );
};

export default Stream;
