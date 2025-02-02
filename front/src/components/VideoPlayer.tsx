import ReactPlayer from 'react-player';
import { API_URL } from '../../shared/constants';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from './AppContextProvider';
import { downloadSubtitles } from '../api/movies';
import { toastConfig } from '../../shared/toastConfig';
import { toast } from 'react-toastify';

type Subtitle = {
  kind: string;
  src: string;
  srcLang: string;
  label: string;
  default: boolean;
};

type VideoPlayerProps = {
  torrentHash: string;
  pageId: string | undefined;
  imdbId: string;
};

const VideoPlayer = ({ torrentHash, pageId, imdbId }: VideoPlayerProps) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const getSubtitles = async () => {
      const response = await downloadSubtitles(imdbId, user.id); // choosen language
      if (response.status === 200) {
        console.log('Subtitles fetched successfully', response.data);
        setSubtitles(response.data);
      } else {
        toast.error('Failed to fetch subtitles', toastConfig);
      }
    };
    getSubtitles();
  }, []);

  console.log("SUBS", subtitles);
  if (subtitles.length == 0) return <div>loading</div>
  return (
    <div className="flex flex-col justify-center items-center w-100">
      <ReactPlayer
        width="100%"
        height="100%"
        playing
        muted
        controls
        autoPlay
        url={`${API_URL}/stream?hash=${torrentHash}&pageId=${pageId}`}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous', // Required for subtitles to work properly
            },
            tracks: subtitles
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
