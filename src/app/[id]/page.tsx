"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/services/movie-details";
import Loader from "@/components/Loader";
import Image from "next/image";
import { TfiAngleLeft } from "react-icons/tfi";

const MovieDetailPage = () => {
  const path = usePathname();
  const id = path?.substring(path.lastIndexOf("/") + 1);
  const {
    data: movieDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => fetchMovieDetails(Number(id)),
    enabled: !!id,
  });
  // console.log("details==", movieDetails);

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Failed to load movie details. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20 md:mt-16">
      <button
        onClick={goBack}
        className="flex items-center gap-1 font-semibold"
      >
        <TfiAngleLeft />
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{movieDetails?.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
        alt={movieDetails?.title}
        width={300}
        height={200}
        className="mb-4 rounded-lg"
      />
      <p className="text-lg mb-2">
        <strong>Release Date:</strong> {movieDetails?.release_date}
      </p>
      <p className="text-lg mb-2">
        <strong>Rating:</strong> {movieDetails?.vote_average} / 10
      </p>
      <p className="text-lg mb-4">
        <strong>Overview:</strong> {movieDetails?.overview}
      </p>
    </div>
  );
};

export default MovieDetailPage;
