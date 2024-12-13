import { useContext } from 'react';
import ReactPlayer from 'react-player';
import { AppContext } from '../components/AppContextProvider';

type VideoPlayerProps = {
  torrentHash: string;
};

const VideoPlayer = ({ torrentHash }: VideoPlayerProps) => {
  const user = useContext(AppContext);
  console.log('context user', user);
  return (
    <div className="flex flex-col justify-center items-center w-100">
      <ReactPlayer
        width="100%"
        height="100%"
        playing
        muted
        controls
        autoPlay
        url={`http://localhost:5050/stream?magnetLink=${torrentHash}`}
      />
    </div>
  );
};

export default VideoPlayer;
