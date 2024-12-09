import MainTitle from '../components/MainTitle';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { downloadMovie } from '../api/downlaod';

const Stream = () => {
  const { torrentHash } = useParams();
  return (
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center">
      <MainTitle />
      <div className="absolute gap-y-8 top-64 left-12 flex flex-col justify-center items-center">
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
      <div className="absolute gap-y-8 top-64 right-12 flex flex-col justify-center items-center">
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
      <div className="flex justify-center gap-x-12 items-start">
        <video
          className="border border-2 border-white"
          width="800"
          height="600"
          controls
          src={`http://localhost:5050/stream?magnetLink=${torrentHash}`}></video>{' '}
      </div>
    </div>
  );
};

export default Stream;
