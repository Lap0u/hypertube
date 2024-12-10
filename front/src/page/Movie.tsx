import { useParams } from 'react-router-dom';
import MainTitle from '../components/MainTitle';
import MovieDetails from '../components/MovieDetails';

const Movie = () => {
  const { imdbId } = useParams(); // Extract imdbId from URL

  return (
    <div
      className="w-100  bg-cover py-8 min-h-screen bg-mainBlack
     text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-12">
      <MovieDetails imdbId={imdbId} />
    </div>
  );
};

export default Movie;
