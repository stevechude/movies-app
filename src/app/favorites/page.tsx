"use client";
import { getStoredFavorites } from "@/hooks/getStoredFavorites";
import { Fav } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const FavoritesPage = () => {
  const [myFavs, setMyFavs] = useState<Array<Fav>>([]);
  useEffect(() => {
    const storedFavs = getStoredFavorites();
    if (storedFavs) {
      setMyFavs(storedFavs);
    }
  }, []);

  console.log("my favs==", myFavs);

  // Function to remove a favorite
  const removeFavorite = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedFavs = myFavs.filter((fav) => fav.id !== id);
    setMyFavs(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <div className="bg-white rounded-lg h-[85vh] w-full mt-20 lg:mt-16 overflow-y-auto">
      <div className="p-2 md:p-4 lg:p-8 flex flex-wrap lg:justify-between gap-10">
        {myFavs && myFavs?.length > 0 ? (
          myFavs?.map((fav: Fav) => (
            <Link
              href={`/${fav?.id}`}
              key={fav?.id}
              style={{ boxShadow: "0px 0px 5px -2px gray" }}
              className="bg-slate-400 rounded-lg w-full md:w-[15rem] lg:w-[20rem] overflow-y-auto"
            >
              <div className="w-full">
                <Image
                  src={fav?.posterImg}
                  alt="Movie Poster"
                  width={200}
                  height={100}
                  className="w-full h-64"
                />
              </div>
              <div className="px-2 py-3 flex flex-col gap-1">
                <p className="font-semibold text-sm lg:text-base text-black text-center">
                  {fav?.title}
                </p>

                <button
                  onClick={(e) => removeFavorite(e, fav?.id)}
                  className="rounded-lg text-sm lg:text-base px-2 py-1.5 bg-white text-black self-center w-fit flex items-center justify-center gap-3"
                >
                  <p className="font-medium">Remove Favorite</p>
                  <FaHeart color={"black"} />
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p>You haven&apos;t added any favorite movie!</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
