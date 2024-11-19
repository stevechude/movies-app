"use client";
import { Fav } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoStarHalf } from "react-icons/io5";

type Props = {
  posterImg: string;
  title: string;
  releaseDate: string;
  rating: number;
  id: number;
};

const MovieCard = ({ posterImg, title, rating, releaseDate, id }: Props) => {
  const calcRating = Math.ceil(rating * 10);
  const [_, setFavorites] = useState<Array<Fav>>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Initialize favorites from localStorage and check if this movie is already a favorite
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setFavorites(parsedFavorites);
    setIsFavorite(parsedFavorites.some((movie: Fav) => movie.id === id));
  }, [id]);

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavorite = {
      title,
      posterImg,
      rating,
      releaseDate,
      id,
    };

    setFavorites((prevFavorites) => {
      // Check if the movie is already in favorites
      const isAlreadyFavorite = prevFavorites.some(
        (movie: Fav) => movie.id === id
      );

      const updatedFavorites = isAlreadyFavorite
        ? prevFavorites.filter((movie: Fav) => movie.id !== id) // Remove from favorites if it exists
        : [...prevFavorites, newFavorite]; // Add to favorites if it doesn't exist

      // Update localStorage with the new favorites array
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      // Toggle the favorite state
      setIsFavorite(!isAlreadyFavorite);

      return updatedFavorites; // Return the new favorites array to update state
    });
  };

  return (
    <Link
      href={`/${id}`}
      style={{ boxShadow: "0px 0px 5px -2px gray" }}
      className="bg-white rounded-lg w-full md:w-[15rem] lg:w-[20rem] h-96 overflow-y-auto"
    >
      <div className="w-full">
        <Image
          src={posterImg}
          alt="Movie Poster"
          width={200}
          height={100}
          className="w-full h-64"
        />
      </div>
      <div className="px-2 py-1 flex flex-col gap-1">
        <p className="font-semibold text-sm lg:text-base text-black text-center">
          {title}
        </p>
        <p className="font-semibold text-sm lg:text-base text-[#777777] flex gap-1 items-center">
          Movie Rating:{" "}
          <span className="text-black flex items-start">
            {calcRating}
            <span className="text-[8px] text-black">%</span>
          </span>
          <IoStarHalf color="#eab308" />
        </p>
        <p className="font-semibold text-sm lg:text-base text-[#777777]">
          Release Date: <span className="text-black">{releaseDate}</span>
        </p>
        {/* add to fav */}
        <button
          onClick={addToFavorite}
          className="rounded-lg text-sm lg:text-base px-2 py-1.5 bg-gradient-to-r from-slate-400 to-slate-600 self-center w-fit flex items-center justify-center gap-3 text-white hover:text-black"
        >
          <p className="font-medium">Add Favorite</p>
          <FaHeart color={isFavorite ? "white" : "black"} />
        </button>
      </div>
    </Link>
  );
};

export default MovieCard;
