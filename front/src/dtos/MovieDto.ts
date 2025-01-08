export type MovieDto = {
  imdbId: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  imdbRating: number;
  watched: boolean | undefined;
};

// Cast DTO
export type CastDto = {
  name: string;
  character: string;
  pictureUrl: string;
};

// Crew DTO
export type CrewDto = {
  name: string;
  job: string;
  pictureUrl: string;
};

// Torrent DTO
export type TorrentDto = {
  source: string;
  hash: string;
  quality: string;
  seeds: number;
  peers: number;
  size: string;
  type: string;
};

// Movie DTO
export type FullMovieDto = {
  tmdbId: number;
  imdbId: string;
  title: string;
  posterUrl: string;
  releaseDate: string; // ISO 8601 date string (e.g., "2008-01-01")
  summary: string;
  cast: CastDto[];
  crew: CrewDto[];
  imdbRating: number;
  torrents: TorrentDto[];
};
