export class MovieDetails {
  tmdbId?: number;
  imdbId: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  summary: string;
  cast: [] | null;
  crew: [] | null;
  imdbRating?: number;
}
