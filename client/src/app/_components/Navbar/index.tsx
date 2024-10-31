"use client";
import React from "react";
import { Bell, Link, Menu, Moon, Settings, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";
import Image from "next/image";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE*/}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4"></Menu>
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups $ products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 boarder-gray-300 bg-white rounded-lg
            focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20}></Bell>
          </div>
        </div>
      </div>
      {/** RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button data-testid="change-mode" onClick={toggleDarkMode}>
              {!isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24}></Sun>
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24}></Moon>
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24}></Bell>
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-gray-300 mx-3"></hr>
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}profile.jpg`}
              alt="Profile"
              width={50}
              height={20}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold">Ellie Pta</span>
          </div>
        </div>
        <Link href="/setting">
          <Settings
            className="cursor-pointer text-gray-500"
            size={24}
          ></Settings>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
