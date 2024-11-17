"use client";
import React from "react";
import SideBar from "./SIdeBar";
import Header from "./Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <SideBar />
        <div className="h-screen md:w-full flex flex-col overflow-y-auto bg-[#F5F5F5]">
          <Header />
          <div className="flex-grow p-2 md:p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
