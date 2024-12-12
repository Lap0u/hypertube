import MainTitle from '../components/MainTitle';
import { API_URL } from '../../shared/constants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { downloadMovie } from '../api/downlaod';
import Comments from '../components/Comments';
import { useEffect, useState } from 'react';
import { UserDto } from '../dtos/UserLoginDto';
import { getMe } from '../api/user';
// import axios from 'axios';

const Stream = () => {
  const { torrentHash } = useParams();
  const nav = useNavigate()
  const location = useLocation();
  const imdbId = location.state.imdbId;
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    const fetchMe = async () => {
      const response = await getMe();
      if (response.status === 401)  {
        nav('/login')
            }
      setUser(response.data);
    };

    const handleUnload = () => {
      console.log('User is leaving the page');
      navigator.sendBeacon(`${API_URL}/stream/stopEngine?hash=${torrentHash}&userId=${user?.id}`)
    };

    fetchMe();
    // window.addEventListener('pagehide', handleUnload);

    return () => {
      // window.removeEventListener('pagehide', handleUnload);
      if (user?.id) {
        handleUnload()
        console.log("un truc a la place de ca")
      }
    };
  }, [user?.id]);
  if (!user) {return <div>loading ... </div>}
  console.log("user", user);
  return (
    <div className="bg-mainBlack w-screen min-h-screen flex flex-col justify-start items-center">
      <MainTitle />
      <div className="flex justify-center gap-x-12 items-start flex-col gap-16">
        <video
          className="border border-2 border-white"
          width="800"
          height="600"
          controls
          src={`http://localhost:5050/stream?hash=${torrentHash}&userId=${user?.id}`}></video>
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
