import React, { useState, useEffect, useContext } from 'react';
import { getMovie } from '../api/movies';
import { FullMovieDto } from '../dtos/MovieDto';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
  FaStar,
  FaClock,
  FaDownload,
  FaPlayCircle,
  FaFileAlt,
} from 'react-icons/fa';
import { toastConfig } from '../../shared/toastConfig';
import Comments from './Comments';
import { AppContext } from './AppContextProvider';
import Cast from './Cast';
import Crew from './Crew';

type MovieDetailsProps = {
  imdbId: string | undefined;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ imdbId }) => {
  const { user, isLoading } = useContext(AppContext);
  const [movie, setMovie] = useState<FullMovieDto | null>(null);
  const [activeTab, setActiveTab] = useState<
    'summary' | 'cast' | 'crew' | 'comments'
  >('summary');
  const nav = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!imdbId) return;
        const response = await getMovie(imdbId, user?.preferredLanguage);
        if (response.status === 200) {
          setMovie(response.data);
        } else {
          toast.error(
            response.message || 'Failed to fetch movie details',
            toastConfig
          );
          nav('/library');
        }
      } catch (error) {
        toast.error('An unexpected error occurred', toastConfig);
        nav('/library');
      }
    };
    fetchMovie();
  }, [imdbId, nav]);

  if (isLoading) {
    return (
      <div className="w-[90vw] lg:w-[70vw] min-h-[80vh] mx-auto bg-white rounded-xl shadow-2xl py-4">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }
  if (!movie) {
    return (
      <div className="w-[90vw] lg:w-[70vw] min-h-[80vh] mx-auto bg-white rounded-xl shadow-2xl py-4">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  const renderMovieInfo = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="p-4 text-gray-700 md:text-2xl">
            <p>{movie.summary}</p>
          </div>
        );
      case 'cast':
        return <Cast cast={movie.cast} />;
      case 'crew':
        return <Crew crew={movie.crew} />;
      case 'comments':
        return <Comments imdbId={imdbId} />;
    }
  };

  return (
    <div className="w-[90vw] lg:w-[70vw] min-h-[80vh] mx-auto bg-white rounded-xl shadow-2xl py-4">
      <div className=" relative z-10 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-48 h-72 rounded-lg shadow-lg border-4 border-white"
          />
          <div className="text-xl flex flex-col">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                {movie.title}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
                <div className="flex items-center text-yellow-500">
                  <FaStar className="mr-1" />
                  <span>{movie.imdbRating}/10</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-1" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 px-6 pb-8">
              {user ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaDownload className="mr-2 text-secMarine" />{' '}
                    <p>Torrents</p>
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {movie.torrents
                      .filter((torrent) => torrent.seeds >= 0)
                      .map((torrent, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 md:w-52 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition hover:cursor-pointer"
                          onClick={() =>
                            nav(`/stream/${torrent.hash}/${movie.imdbId}`)
                          }>
                          <div className="flex flex-col items-center w-full">
                            <p className="font-semibold text-gray-800">
                              {torrent.quality}
                            </p>
                            <p className="hidden md:block text-sm text-gray-600">
                              {torrent.source}
                            </p>
                            <p className=" hidden md:block text-sm text-gray-600">
                              {torrent.size}
                            </p>
                            <p className="md:hidden text-green-600 flex items-center">
                              <span className="mr-1">{torrent.seeds}</span>
                              <FaFileAlt size={16} />
                            </p>
                            <p className="md:hidden text-red-600 flex items-center">
                              <span className="mr-1">{torrent.peers}</span>
                              <FaPlayCircle size={16} />
                            </p>
                          </div>
                          <div className="hidden md:block text-right">
                            <p className="text-green-600 flex items-center">
                              <span className="mr-1">{torrent.seeds}</span>
                              <FaFileAlt size={16} />
                            </p>
                            <p className="text-red-600 flex items-center">
                              <span className="mr-1">{torrent.peers}</span>
                              <FaPlayCircle size={16} />
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <h2 className="text-mainBlack">
                  <a className="hover:text-mainYellow" href="/login">
                    Login
                  </a>{' '}
                  to watch movies
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-2 text-sm md:text-2xl">
        <div className="flex border-b border-gray-200">
          {['summary', 'cast', 'crew', 'comments'].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as 'summary' | 'cast' | 'crew' | 'comments')
              }
              className={`px-4 py-2 font-semibold ${
                activeTab === tab
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {renderMovieInfo()}
      </div>
    </div>
  );
};

export default MovieDetails;
