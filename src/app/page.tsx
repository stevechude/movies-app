"use client";
import Loader from "@/components/Loader";
import MovieCard from "@/components/movies/MovieCard";
import { fetchMovieList } from "@/services/fetch-movies";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-movies"],
    queryFn: fetchMovieList,
  });
  const movies = data?.results;
  console.log("movies data==", movies);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-8 lg:gap-5 justify-between w-full">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          movies?.map((movie: any) => (
            <MovieCard
              key={movie?.id}
              posterImg={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              title={movie?.title}
              releaseDate={movie?.release_date}
              rating={movie?.vote_average}
            />
          ))
        ) : (
          <p>No available movies</p>
        )}
      </div>
    </div>
  );
}
