import MainTitle from '../components/MainTitle';
import { API_URL } from '../../shared/constants';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { downloadMovie } from '../api/downlaod';
import Comments from '../components/Comments';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { toastConfig } from '../../shared/toastConfig';
import { downloadSubtitles } from '../api/movies';

const Stream = () => {
  const { torrentHash } = useParams();
  const [subtitles, setSubtitles] = useState();
  const location = useLocation();
  const imdbId = location.state.imdbId;
  const pageId = uuidv4();
  useEffect(() => {
    const getSubtitles = async () => {
      const response = await downloadSubtitles(torrentHash, pageId);
      if (response.status === 200) {
        console.log('Subtitles fetched successfully', response.data);
        setSubtitles(response.data);
      } else {
        toast.error('Failed to fetch subtitles', toastConfig);
      }
    };
    getSubtitles();
    const handleUnload = () => {
      console.log('User is leaving the page');
      navigator.sendBeacon(`${API_URL}/stream/stopEngine?pageId=${pageId}`);
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener('unload', handleUnload);
    };
  }, [pageId, torrentHash]);
  return (
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center">
      <MainTitle />
      <div className="flex justify-center gap-x-12 items-start flex-col gap-16">
        <video
          className="border border-2 border-white"
          width="800"
          height="600"
          controls
          src={`${API_URL}/stream?hash=${torrentHash}&pageId=${pageId}`}>
          <track
            // src={`${API_URL}/stream/subtitles?hash=${torrentHash}&pageId=${pageId}`}
            // src={`http://localhost:5050/stream/subtitles?hash=${torrentHash}&pageId=${pageId}`}
            kind="subtitles"
            srcLang="en"
            label="English"
            default
          />
        </video>
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
