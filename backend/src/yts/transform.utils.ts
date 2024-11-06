import { AxiosResponse } from 'axios';

export const transformYtsGetMovieResponse = (response: AxiosResponse) => {
  const data = response.data.data;
  if (data.movie_count == 0) {
    return [];
  }

  const movies = data.movies.map((movie) => {
    return {
      imdbId: movie.imdb_code,
      title: movie.title,
      posterUrl: movie.medium_cover_image,
      releaseDate: String(movie.year),
      imdbRating: movie.rating,
    };
  });
  return movies;
};

export const transformYtsGetMovieDetailsResponse = (
  response: AxiosResponse,
) => {
  const data = response.data;
  if (!data) {
    return null;
  }
  const movie = data.data.movie;
  if (movie.id == 0) {
    return null;
  }
  const details = {
    imdbId: movie.imdb_code,
    title: movie.title,
    posterUrl: movie.large_cover_image,
    releaseDate: String(movie.year),
    summary: movie.description_full.length != 0 ? movie.description_full : null,
    cast: movie.cast
      ? movie.cast.map((actor) => {
          return {
            name: actor.name,
            character: actor.character_name,
            pictureUrl: actor.url_small_image,
          };
        })
      : null,
    crew: null,
    imdbRating: movie.rating,
  };
  return details;
};

export const transformYtsFindTorrentsResponse = (response: AxiosResponse) => {
  const data = response.data.data;
  if (data.movie_count == 0) {
    return [];
  }
  const torrents = data.movies[0].torrents.map((torrent) => {
    return {
      source: 'YTS',
      hash: torrent.hash,
      quality: torrent.quality,
      seeds: torrent.seeds,
      peers: torrent.peers,
      size: torrent.size,
      type: torrent.type,
    };
  });
  return torrents;
};
