export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface MovieApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
