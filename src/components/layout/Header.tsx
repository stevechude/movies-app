"use client";
import React, { useEffect, useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaWindowClose } from "react-icons/fa";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import {
  setLoading,
  setSearchData,
  setSearchQuery,
} from "@/redux/features/movieSlice";
import { searchMovies } from "@/services/search-movie";
import { useQuery } from "@tanstack/react-query";
import { MovieApiResponse } from "@/types/movie";

const Header = () => {
  const { searchQuery } = useAppSelector((state) => state.movieSlice);
  const [openTab, setOpenTab] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery);
  const dispatch = useAppDispatch();
  const { data: searchData, isLoading } = useQuery<MovieApiResponse>({
    queryKey: ["search-movies", debouncedSearchTerm],
    queryFn: () => searchMovies(debouncedSearchTerm),
  });
  // console.log("header search data==", searchData);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
    if (searchData) {
      dispatch(setSearchData(searchData?.results));
      dispatch(setLoading(false));
    }
  }, [searchData, isLoading]);

  const handleSearchQuery = (e: any) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  return (
    <div className="h-20 lg:h-16 w-full bg-white shadow-md text-[#0096c4] flex justify-between items-center fixed">
      <div className="md:hidden flex flex-col gap-1 w-full">
        <div className="px-3 w-full flex items-center justify-between relative">
          <TfiMenuAlt onClick={() => setOpenTab(true)} size={20} />
          <Link
            href={"/"}
            className="text-lg md:text-xl lg:text-2xl font-semibold"
          >
            Movies App
          </Link>

          {openTab ? (
            <div className="absolute bg-[#0096c4] text-white text-lg flex flex-col gap-2 w-[95%] rounded-lg top-0">
              <FaWindowClose
                onClick={() => setOpenTab(false)}
                size={30}
                color="#fff"
                className="self-start m-2"
              />
              <div className="flex flex-col gap-6 p-2 pb-10 font-semibold">
                <Link
                  href={"/"}
                  onClick={() => setOpenTab(false)}
                  className="border-b border-white"
                >
                  Home
                </Link>
                <Link
                  href={"/favorites"}
                  onClick={() => setOpenTab(false)}
                  className="border-b border-white"
                >
                  Favorites
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="border rounded-3xl shadow self-center text-sm">
          <div className="w-full py-1.5 px-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="search movies..."
              value={searchQuery}
              onChange={handleSearchQuery}
              className="w-full h-full pl-2 outline-none"
            />
            <IoSearch />
          </div>
        </div>
      </div>

      {/* desk */}
      <div className="hidden md:flex w-fit gap-40 items-center justify-between px-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Movies App
        </h2>

        {/* search */}
        <div className="border rounded-3xl shadow">
          <div className="w-full p-2 px-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="search movies..."
              value={searchQuery}
              onChange={handleSearchQuery}
              className="w-full h-full pl-2 outline-none"
            />
            <IoSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
