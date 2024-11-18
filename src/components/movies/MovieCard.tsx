import Image from "next/image";
import React from "react";

type Props = {
  posterImg: string;
  title: string;
  releaseDate: string;
  rating: number;
};

const MovieCard = ({ posterImg, title, rating, releaseDate }: Props) => {
  const calcRating = Math.ceil(rating * 10);
  return (
    <div
      style={{ boxShadow: "0px 0px 5px -2px gray" }}
      className="bg-white rounded-lg w-full md:w-[15rem] lg:w-[20rem] h-96"
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
      <div className="p-1 flex flex-col gap-1">
        <p className="font-semibold text-sm lg:text-base text-[#777777]">
          Movie Title: <span className="text-black">{title}</span>
        </p>
        <p className="font-semibold text-sm lg:text-base text-[#777777] flex gap-1">
          Movie Rating:{" "}
          <span className="text-black flex">
            {calcRating}
            <span className="text-[8px] text-black">%</span>
          </span>
        </p>
        <p className="font-semibold text-sm lg:text-base text-[#777777]">
          Release Date: <span className="text-black">{releaseDate}</span>
        </p>
      </div>
      {/* add to fav */}
    </div>
  );
};

export default MovieCard;
