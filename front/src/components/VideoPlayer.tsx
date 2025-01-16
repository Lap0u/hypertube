import { useContext } from 'react';
import ReactPlayer from 'react-player';
import { AppContext } from '../components/AppContextProvider';
import { API_URL } from '../../shared/constants';

type SubtitleProps = {
  kind: string;
  src: string;
  srcLang: string;
}

type VideoPlayerProps = {
  torrentHash: string;
  pageId: string | undefined;
  subtitle: SubtitleProps[] | undefined | string
};

const VideoPlayer = ({ torrentHash, pageId, subtitle }: VideoPlayerProps) => {
  const user = useContext(AppContext);
  if (!subtitle || subtitle=="No subtitle available") return <div>Loading...</div>
  console.log('subtitle', subtitle);
  console.log('pageId', pageId)
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
        config={{ file: {
          attributes: {
            crossOrigin: 'anonymous', // Required for subtitles to work properly
          },
          tracks: [
            {kind: 'subtitles', src: `${API_URL}/${subtitle}`, srcLang: 'en', default: true},
            // {kind: 'subtitles', src: `${API_URL}/Superbad.Unrated.2007.Subtitles.YIFY.srt.vtt`, srcLang: 'en', default: true},
          ]
          // [
            // {kind: 'subtitles', src: 'subs/subtitles.ja.vtt', srcLang: 'ja'},
            // {kind: 'subtitles', src: 'subs/subtitles.de.vtt', srcLang: 'de'}
            // ]
          }}}
      />
    </div>
  );
};

export default VideoPlayer;
