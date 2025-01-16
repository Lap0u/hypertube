import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import Comments from '../components/Comments';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { toastConfig } from '../../shared/toastConfig';
import { downloadSubtitles } from '../api/movies';
import { API_URL } from '../../shared/constants';

const Stream = () => {
  const { torrentHash, imdbId } = useParams();
  const [subtitles, setSubtitles] = useState();
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
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center px-2 md:px-32 gap-y-12">
      <VideoPlayer torrentHash={torrentHash} pageId={pageId} subtitle={subtitles}/>
      <Comments imdbId={imdbId} />
    </div>
  );
};

export default Stream;
