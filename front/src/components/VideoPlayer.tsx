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

const testResponse = [
  {
    kind: 'subtitles',
    src: 'https://www.opensubtitles.com/download/B156EF5993C5A8CDF574D8097E02E36CE5C5E252DDD6B7E1F1D08ED58E68B63B21E65E2D236354DF0970C47B53E7A4F1B47A931098E3F15E97A3919479C5A499F1C0E4CDFC5D9CC665CF632187EBAEF7D38D25421B3C592A23D7BFE776885AAC27A3F267093935B4A5567246ECBA4F58E2F3A5361F30FBF7690121127B9586392A49D8064485ECAFF9FE6F9687A6D59B89E1C68488AC937AC99E5E35B4ACA32E36A2C3F5C1B0BF5A574411819DC16F51DC530A1EC1EDE512174BCB681E32773620E949CFB86DF009E585991523AFA1CF985A5C98422896DA6590F46BF8ABB990D2BED093347CC1C4C7EAF1B9D9BA2A53CCDF8845897C1807DBCEA7222E34CAA631A6E732DB6010425F7A4E0F7364EA912A04A6A0E81E6BA61E7461E6736FE37A3380AE9823609C2F4B855F6880AE3F8481665DBD8DE357C068AE5EC56B761963/subfile/The%20Shawshank%20Redemption.Eng_BluRay_Full_Fixed_v2.webvtt',
    srcLang: 'en',
    label: 'English',
    default: false,
  },
];

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

  const tracks = subtitles.map((sub: Subtitle) => ({
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
            tracks: tracks,
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
