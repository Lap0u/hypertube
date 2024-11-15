import { useEffect, useState } from 'react';
import MainTitle from '../components/MainTitle';
import { MovieDto } from '../dtos/MovieDto';
import { toastConfig } from '../../shared/constants';
import { toast } from 'react-toastify';
import { getMovies, movieQueryParams } from '../api/movies';
import MovieGallery from '../components/MovieGallery';

const Library = () => {
  const [page, setPage] = useState(1);
  const refreshMovies = async () => {
    const queryParam: movieQueryParams = {
      page: page + 1,
      limit: 20,
      order_by: 'desc',
      sort_by: 'download_count',
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
        order_by: 'desc',
        sort_by: 'download_count',
      };
      const response = await getMovies(queryParam);
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
        order_by: 'desc',
        sort_by: 'download_count',
      };
      setPage(page + 1);
      const response = await getMovies(queryParam);
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
      className="w-100  bg-cover py-8 min-h-screen bg-mainBlack
     text-white flex justify-center items-center text-3xl bg-bottom flex-col gap-12">
      <MainTitle />
      <MovieGallery movies={movies} />
    </div>
  );
};

export default Library;
