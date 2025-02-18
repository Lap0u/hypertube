import ReactPlayer from 'react-player';
import { API_URL } from '../../shared/constants';
import { useEffect, useState } from 'react';
import { downloadSubtitles } from '../api/movies';
import { toastConfig } from '../../shared/toastConfig';
import { toast } from 'react-toastify';
import { AppContext } from '../components/AppContextProvider';
import { useContext } from 'react';

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
  const { user, isLoading } = useContext(AppContext);

  useEffect(() => {
    if (isLoading) return; // Wait for context to initialize
    if (!user) return;
    const getSubtitles = async () => {
      console.log('fetching subtitles', user);
      const response = await downloadSubtitles(imdbId, user.id); // choosen language
      if (response.status === 200) {
        console.log('Subtitles fetched successfully', response.data);
        setSubtitles(response.data);
      } else {
        toast.error('Failed to fetch subtitles', toastConfig);
      }
    };
    if (user) getSubtitles();
    console.log('userid', user);
  }, [imdbId, user, isLoading]);

  console.log('SUBS', subtitles);
  if (subtitles.length == 0) return <div>loading</div>;
  return (
    <div className="flex flex-col justify-center items-center w-100">
      <ReactPlayer
        width="100%"
        height="100%"
        playing
        muted
        controls
        autoPlay
        url={`${API_URL}/stream?hash=${torrentHash}&pageId=${pageId}&imdbId=${imdbId}&userId=${user?.id}`}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous', // Required for subtitles to work properly
            },
            tracks: subtitles,
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
