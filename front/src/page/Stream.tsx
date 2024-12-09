import MainTitle from '../components/MainTitle';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { downloadMovie } from '../api/download';
import Comments from '../components/Comments';

const Stream = () => {
  const { torrentHash } = useParams();
  const location = useLocation();
  const imdbId = location.state.imdbId;
  return (
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center">
      <MainTitle />
      <div className="flex justify-center items-start gap-12 ">
        <div className="gap-y-8 top-64 left-12 flex flex-col justify-center items-center">
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
        </div>
        <div className="flex justify-center gap-x-12 items-start flex-col gap-16">
          <video
            className="border border-2 border-white"
            width="800"
            height="600"
            controls
            src={`http://localhost:5050/stream?magnetLink=${torrentHash}`}></video>
          <Comments imdbId={imdbId} />
        </div>
        <div className="gap-y-8 top-64 left-12 flex flex-col justify-center items-center">
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
          <Button
            text="Download Movie"
            onClick={() => downloadMovie(torrentHash)}
          />
        </div>
      </div>
    </div>
  );
};

export default Stream;
