export interface CreateMovieRequest {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  isAdult: boolean;
  availableCopies: number;
}
