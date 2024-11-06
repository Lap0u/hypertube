import { AxiosResponse } from 'axios';

export const transformTmdbGetMovieResponse = (response: AxiosResponse) => {
  const data = response.data;

  if (data.success === false) {
    return null;
  }

  const details = {
    tmdbId: data.id,
    imdbId: data.imdb_id,
    title: data.title,
    posterUrl: `${process.env.TMDB_IMAGE_URL}${data.poster_path}`,
    releaseDate: data.release_date,
    summary: data.overview,
    cast: data.credits.cast.map((actor) => {
      return {
        name: actor.name,
        character: actor.character,
        pictureUrl: `${process.env.TMDB_IMAGE_URL}${actor.profile_path}`,
      };
    }),
    crew: data.credits.crew.map((person) => {
      return {
        name: person.name,
        job: person.job,
        pictureUrl:
          person.profile_path == null
            ? null
            : `${process.env.TMDB_IMAGE_URL}${person.profile_path}`,
      };
    }),
  };
  return details;
};

export const transformTmdbFindMovieResponse = (response: AxiosResponse) => {
  const data = response.data;

  if (data.movie_results.length != 1) {
    return null;
  }

  const result = response.data.movie_results[0];
  const movie = {
    tmdbId: result.id,
    title: result.title,
    posterUrl: `${process.env.TMDB_IMAGE_URL}${result.poster_path}`,
    releaseDate: result.release_date,
  };
  return movie;
};
