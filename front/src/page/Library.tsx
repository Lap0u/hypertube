import { useContext, useEffect, useState } from 'react';
import { MovieDto } from '../dtos/MovieDto';
import { toastConfig } from '../../shared/toastConfig';
import { toast } from 'react-toastify';
import { getMovies, movieQueryParams } from '../api/movies';
import MovieGallery from '../components/MovieGallery';
import { OrderByField, SortMovieField } from '../../shared/enum';
import { AppContext } from '../components/AppContextProvider';

const Library = () => {
  const [page, setPage] = useState(1);
  const { user } = useContext(AppContext);
  const refreshMovies = async () => {
    const queryParam: movieQueryParams = {
      page: page + 1,
      limit: 20,
      order_by: OrderByField.DESC,
      sort_by: SortMovieField.LIKE_COUNT,
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
    // Attach the event listener on mount
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [nextMovies, setNextMovies] = useState<MovieDto[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const queryParam: movieQueryParams = {
        page: page,
        limit: 20,
        order_by: OrderByField.DESC,
        sort_by: SortMovieField.DOWNLOAD_COUNT,
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
        order_by: OrderByField.DESC,
        sort_by: SortMovieField.DOWNLOAD_COUNT,
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
  }, []);

  return (
    <div
      className="w-100 bg-cover py-8 min-h-screen bg-mainBlack
     text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-12">
      <MovieGallery movies={movies} page={page} />
    </div>
  );
};

export default Library;
