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

const VideoPlayer = ({ torrentHash, pageId, subtitle }: VideoPlayerProps) => {
  if (!subtitle) return <div>Loading...</div>;
  console.debug(subtitle)
  const tracks = subtitle.map(sub => ({
    kind: sub.kind,
    src: `${API_URL}/${sub.src}`,
    srcLang: sub.srcLang,
    label: sub.label,
    default: sub.default,
  }));
  console.log(tracks);
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
            tracks: tracks
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
