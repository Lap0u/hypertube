import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { downloadMovie } from '../api/download';
import Comments from '../components/Comments';
import VideoPlayer from '../components/VideoPlayer';

const Stream = () => {
  const { torrentHash, imdbId } = useParams();
  if (!torrentHash || !imdbId) {
    return (
      <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl">
          No torrent hash or imdbId provided
        </h1>
      </div>
    );
  }
  return (
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center px-32 gap-y-12">
      <VideoPlayer torrentHash={torrentHash} />

      <Comments imdbId={imdbId} />
      <Button
        text="Download Movie"
        onClick={() => downloadMovie(torrentHash)}
      />
    </div>
  );
};

export default Stream;
