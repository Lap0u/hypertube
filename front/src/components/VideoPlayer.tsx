import ReactPlayer from 'react-player';
import { API_URL } from '../../shared/constants';

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
  subtitle: Subtitle[];
};

const subtitleMock: Subtitle[] = [
  {
    kind: 'subtitles',
    src: 'Superbad.Unrated.2007.Subtitles.YIFY.srt.vtt',
    srcLang: 'en',
    label: `anglais`,
    default: false,
  },
  {
    kind: 'subtitles',
    src: 'Spider-Man Homecoming 2017 Russian.srt.vtt',
    srcLang: 'fr',
    label: `francais`,
    default: true,
  },
];

const VideoPlayer = ({ torrentHash, pageId, subtitle }: VideoPlayerProps) => {
  if (!subtitle) return <div>Loading...</div>;
  console.log('subtitle', subtitle);
  console.log('pageId', pageId);
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
            tracks: subtitleMock,
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
