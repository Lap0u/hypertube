import { MovieDto } from '../dtos/MovieDto';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type MovieGalleryType = {
  movies: MovieDto[];
};

const MovieGallery = ({ movies }: MovieGalleryType) => {
  const nav = useNavigate();
  return (
    <div className="grid grid-cols-4 px-48 gap-12">
      {movies.map((movie: MovieDto) => {
        console.log('movie', movie);
        return (
          <div
            key={movie.imdbId}
            onClick={() => nav(`/movie/${movie.imdbId}`)}
            className=" relative group hover:cursor-pointer text-2xl">
            <div className=" movie_container flex flex-col transition-transform transform group-hover:scale-110 hover:opacity-85 hover:bg-red-600 rounded-xl p-2">
               <div className='thumbnail_movie mb-2 relative'>
               {Number(movie.imdbId[movie.imdbId.length - 1]) % 2 === 0  && <div className='px-2 text-lg absolute top-2 left-2 bg-mainBlack text-red-600 rounded-md opacity-70'>Watched</div>} {/* En attendant d'avoir l'info du back, pseudo random */}
              <img
                className="w-full"
                src={movie.posterUrl}
                alt={movie.title}
              />

               </div>
              <div>{movie.title}</div>
              <div className="text-lg">({movie.releaseDate})</div>
              <div className="flex gap-x-2 text-lg">
                <FaStar style={{ color: 'yellow' }} /> {movie.imdbRating}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieGallery;
