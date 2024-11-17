"use client";
import React, { useState } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaWindowClose } from "react-icons/fa";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const [openTab, setOpenTab] = useState(false);
  return (
    <div className="h-20 lg:h-16 w-full bg-white shadow-md text-[#0096c4] flex justify-between items-center">
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
                <Link
                  href={"/contact"}
                  onClick={() => setOpenTab(false)}
                  className="border-b border-white"
                >
                  Contact
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
              className="w-full h-full pl-2 outline-none"
            />
            <IoSearch />
          </div>
        </div>
      </div>

      {/* desk */}
      <div className="hidden md:flex w-full items-center justify-between px-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Movies App
        </h2>

        {/* search */}
        <div className="border rounded-3xl shadow">
          <div className="w-full p-2 px-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="search movies..."
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
