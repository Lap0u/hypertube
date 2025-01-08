import { useContext, useEffect, useState } from 'react';
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
import { AppContext } from '../components/AppContextProvider';

const Search = () => {
  const { user } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
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
    const response = await getMovies(queryParam, user);
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
  useEffect(() => {
    const fetchMovies = async () => {
      const queryParam: movieQueryParams = {
        page: page,
        limit: 20,
        order_by: orderBy,
        sort_by: sortField,
        query_term: searchField,
        minimum_rating: minRating,
        genre: genre,
      };
      const response = await getMovies(queryParam, user);
      if (response.status === 200) {
        setMovies(response.data);
      } else {
        toast.error(response.message || 'An error occurred', toastConfig);
      }
    };
    fetchMovies();
    const fetchNewMovies = async () => {
      const queryParam: movieQueryParams = {
        page: page + 1,
        limit: 20,
        order_by: orderBy,
        sort_by: sortField,
        query_term: searchField,
        minimum_rating: minRating,
        genre: genre,
      };
      setPage(page + 1);
      const response = await getMovies(queryParam, user);
      if (response.status === 200) {
        setNextMovies(response.data);
      } else {
        toast.error(response.message || 'An error occurred', toastConfig);
      }
    };
    fetchNewMovies();
  }, [genre, minRating, sortField, orderBy, searchField]);
  return (
    <div
      className="w-100  bg-cover py-8 min-h-screen bg-mainBlack
     text-white flex justify-start items-center text-3xl bg-bottom flex-col gap-12">
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col lg:flex-row gap-y-4 gap-x-8 w-[80%]">
          <input
            onChange={(e) => {
              setSearchField(e.target.value);
              setPage(1);
            }}
            className="text-mainBlack rounded-xl p-4 w-full"
            type="text"
            placeholder="Rechercher..."
            value={searchField}
          />
          <Button
            text="FILTRES"
            onClick={() => setVisible((visible) => !visible)}
            mobile={true}
          />
        </div>
        <MovieFilterSelects
          onSortFieldChange={setSortField}
          onOrderChange={setOrderBy}
          onMinRatingChange={setMinRating}
          onGenreChange={setGenre}
          setPage={setPage}
          desktop={true}
        />
        {visible && (
          <MovieFilterSelects
            onSortFieldChange={setSortField}
            onOrderChange={setOrderBy}
            onMinRatingChange={setMinRating}
            onGenreChange={setGenre}
            setPage={setPage}
            desktop={false}
          />
        )}
      </div>
      <MovieGallery movies={movies} />
    </div>
  );
};

export default Search;
