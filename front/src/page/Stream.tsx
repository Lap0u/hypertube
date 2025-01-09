import MainTitle from '../components/MainTitle';
import { API_URL } from '../../shared/constants';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { downloadMovie } from '../api/downlaod';
import Comments from '../components/Comments';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Stream = () => {
  const { torrentHash } = useParams();
  const location = useLocation();
  const imdbId = location.state.imdbId;
  const pageId = uuidv4()
  useEffect(() => {
    const handleUnload = () => {
      console.log('User is leaving the page');
      navigator.sendBeacon(`${API_URL}/stream/stopEngine?pageId=${pageId}`)
    };

    window.addEventListener('unload', handleUnload);


    return () => {
      handleUnload()
      window.removeEventListener('unload', handleUnload);
      }
  }, [pageId]);
  return (
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center">
      <MainTitle />
      <div className="flex justify-center gap-x-12 items-start flex-col gap-16">
        <video
          className="border border-2 border-white"
          width="800"
          height="600"
          controls
          src={`http://localhost:5050/stream?hash=${torrentHash}&pageId=${pageId}`}></video>
        <Comments imdbId={imdbId} />
        <Button
          text="Download Movie"
          onClick={() => downloadMovie(torrentHash)}
        />
      </div>
    </div>
  );
};

export default Stream;
