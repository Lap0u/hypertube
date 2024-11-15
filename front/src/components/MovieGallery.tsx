import { MovieDto } from '../dtos/MovieDto';

type MovieGalleryType = {
  movies: MovieDto[];
};

const MovieGallery = ({ movies }: MovieGalleryType) => {
  return (
    <div className="grid grid-cols-5 px-48 gap-4">
      {movies.map((movie: MovieDto) => {
        return (
          <div key={movie.imdbId}>
            <img src={movie.posterUrl} alt={movie.title} />
            <div>{movie.title}</div>
            <div>{movie.releaseDate}</div>
            <div>{movie.imdbRating}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieGallery;
