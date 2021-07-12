export interface Movie {
  id: string;
  title: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  isAdult: boolean;
  availableCopies: number;
  imageUrl?: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
