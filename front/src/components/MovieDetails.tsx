import React, { useState, useEffect } from 'react';
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

type MovieDetailsProps = {
  imdbId: string;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ imdbId }) => {
  const [movie, setMovie] = useState<FullMovieDto | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'cast' | 'crew'>(
    'summary'
  );
  const nav = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovie(imdbId);
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
          <div className="p-4 text-gray-700 text-2xl">
            <p>{movie.summary}</p>
          </div>
        );
      case 'cast':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {movie.cast.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white p-3 rounded-lg shadow-md transition hover:scale-105">
                <img
                  src={
                    member.pictureUrl.includes('originalnull')
                      ? '/user-default.png'
                      : member.pictureUrl
                  }
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-100"
                />
                <p className="mt-2 font-semibold text-gray-800">
                  {member.name}
                </p>
                <p className="text-sm text-gray-500"></p>
              </div>
            ))}
          </div>
        );
      case 'crew':
        return (
          <div className="grid grid-cols-2 gap-4 p-4 space-y-2">
            {movie.crew.map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.job}</p>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-[60vw] min-h-[80vh] mx-auto bg-white rounded-xl shadow-2xl py-4">
      <div className=" relative z-10 px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-48 h-72 rounded-lg shadow-lg border-4 border-white"
          />
          <div className="flex flex-col">
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaDownload className="mr-2 text-secMarine" /> <p>Torrents</p>
              </h2>
              <div className="flex flex-wrap md:grid-cols-4 gap-4">
                {movie.torrents
                  .filter((torrent) => torrent.seeds >= 10)
                  .map((torrent, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 w-52 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition hover:cursor-pointer"
                      onClick={() =>
                        nav(`/stream/${torrent.hash}`, {
                          state: { imdbId: movie.imdbId },
                        })
                      }>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {torrent.quality}
                        </p>
                        <p className="text-sm text-gray-600">
                          {torrent.source}
                        </p>
                        <p className="text-sm text-gray-600">{torrent.size}</p>
                      </div>
                      <div className="text-right">
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
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6">
        <div className="flex border-b border-gray-200">
          {['summary', 'cast', 'crew'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'summary' | 'cast' | 'crew')}
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
