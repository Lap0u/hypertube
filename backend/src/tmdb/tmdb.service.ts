import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TmdbService {
  private tmdbClient = axios.create({
    baseURL: process.env.TMDB_API_URL,
    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
  });

  async getMovieDetails(tmdb_id: number) {
    const response = await this.tmdbClient.get(
      `/movie/${tmdb_id}?append_to_response=credits`,
    );
    const data = response.data;
    const details = {
      tmdbId: data.tmdb_id,
      imdbId: data.imdb_id,
      title: data.title,
      posterUrl: `${process.env.TMDB_IMAGE_URL}${data.poster_path}`,
      releasedDate: data.release_date,
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
  }

  async findMovie(imdb_id: string) {
    const response = await this.tmdbClient.get(
      `/find/${imdb_id}?external_source=imdb_id`,
    );
    if (response.data.movie_results.length != 1) {
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
  }
}
