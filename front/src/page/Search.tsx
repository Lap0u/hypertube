import { useEffect, useState } from 'react';
import MainTitle from '../components/MainTitle';
import { MovieDto } from '../dtos/MovieDto';
import { toastConfig } from '../../shared/toastConfig';
import { toast } from 'react-toastify';
import { getMovies, movieQueryParams } from '../api/movies';
import MovieGallery from '../components/MovieGallery';
import Button from '../components/Button';
import {
  GenreField,
  MinRatingField,
  OrderByField,
  SortMovieField,
} from '../../shared/enum';
import MovieFilterSelects from '../components/MovieFilter';

const Search = () => {
  const [page, setPage] = useState(1);
  const refreshMovies = async () => {
    const queryParam: movieQueryParams = {
      page: page + 1,
      limit: 20,
      order_by: orderBy,
      sort_by: sortField,
      query_term: searchField,
      minimum_rating: minRating,
      genre: genre,
    };
    setMovies([...movies, ...nextMovies]);
    const response = await getMovies(queryParam);
    if (response.status === 200) {
      setNextMovies(response.data);
      setPage(page + 1);
    } else {
      toast.error(response.message || 'An error occurred', toastConfig);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollRatio = (scrollY + windowHeight) / scrollHeight;

    if (scrollRatio >= 0.98) {
      refreshMovies();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [nextMovies, setNextMovies] = useState<MovieDto[]>([]);
  const [searchField, setSearchField] = useState<string>('');
  const [sortField, setSortField] = useState<SortMovieField>(
    SortMovieField.TITLE
  );
  const [orderBy, setOrderBy] = useState<OrderByField>(OrderByField.ASC);
  const [minRating, setMinRating] = useState<MinRatingField>(
    MinRatingField.ZERO
  );
  const [genre, setGenre] = useState<GenreField>(GenreField.ALL);
  return (
    <div
      className="w-100  bg-cover py-8 min-h-screen bg-mainBlack
     text-white flex justify-start items-center text-3xl bg-bottom flex-col gap-12">
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex gap-x-8 w-full">
          <input
            onChange={(e) => {
              setSearchField(e.target.value);
            }}
            className="text-black rounded-xl p-4 w-full"
            type="text"
            placeholder="Rechercher..."
            value={searchField}
          />
          <Button text="Rechercher" onClick={() => refreshMovies()} />
        </div>
        <MovieFilterSelects
          onSortFieldChange={setSortField}
          onOrderChange={setOrderBy}
          onMinRatingChange={setMinRating}
          onGenreChange={setGenre}
        />
      </div>
      <MovieGallery movies={movies} />
    </div>
  );
};

export default Search;
