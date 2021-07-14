export interface EditMovieRequest {
  title?: string;
  overview?: string;
  genres?: string[];
  releaseDate?: string;
  isAdult?: boolean;
  availableCopies?: number;
  enabled?: boolean;
}
