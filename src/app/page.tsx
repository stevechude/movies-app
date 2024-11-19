"use client";
import Loader from "@/components/Loader";
import MovieCard from "@/components/movies/MovieCard";
import { useAppSelector } from "@/redux/hooks";
import { fetchMovieList } from "@/services/fetch-movies";
import { Movie, MovieApiResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { searchQuery, loading, searchData } = useAppSelector(
    (state) => state.movieSlice
  );
  const { data, isLoading } = useQuery<MovieApiResponse>({
    queryKey: ["get-movies"],
    queryFn: fetchMovieList,
  });
  const movies = !searchQuery ? data?.results : searchData;

  return (
    <div className="w-full">
      {isLoading || loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 lg:gap-5 justify-between w-full mt-20 lg:mt-16">
          {movies && movies?.length > 0 ? (
            movies?.map((movie: Movie) => (
              <MovieCard
                key={movie?.id}
                posterImg={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                title={movie?.title}
                releaseDate={movie?.release_date}
                rating={movie?.vote_average}
                id={movie?.id}
              />
            ))
          ) : (
            <p>No available movies</p>
          )}
        </div>
      )}
    </div>
  );
}
