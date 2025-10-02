"use client";
import useTheme from "@/hooks/useTheme";
import { ChannelType } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

interface AsideProps {
  username?: string;
  channels: ChannelType[];
}

const AsideComponet = ({ username, channels }: AsideProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleShowMode = () => {
    setShowMode((prev) => !prev);
  };

  const [, setTheme] = useTheme();
  const pathname = usePathname();


  return (
    <aside
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full "}
         fixed inset-y-0 left-0 z-50 w-72 bg-primary-bg dark:bg-main-dark border-r
          dark:border-gray-700 transform transition-transform duration-300 ease-in-out 
          lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex flex-col h-full scrollbar-thin ">
        {/* User Info */}
        <Link href={"/chat"} scroll={true}>
          <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700">
            <span className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              img
            </span>
            <span className="font-medium">{username}</span>
          </div>
        </Link>

        {/* Users List */}
        <ul className="flex-1 overflow-y-auto p-2 space-y-2">
          {channels.map((channel) => (
            <li
              key={channel._id}
              className={`p-3 rounded-lg hover:bg-blue-200 dark:hover:bg-secondry-dark cursor-pointer
                ${pathname ===`/chat/${channel._id}` ? `bg-blue-200/40 dark:bg-primary-dark`:''} 
                transition flex items-center justify-between text-sm`}
            >
              <Link href={`/chat/${channel._id}`} scroll={false}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-col">
                    <span className="font-medium text-text-username dark:text-text-dark">
                      {channel.channel_name}
                    </span>
                    <span className="text-xs text-text-main dark:text-gray-400 truncate w-32">
                      type {channel.channel_type}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(channel.createdAt!).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Options */}
        <div className="p-4 border-t dark:border-gray-700 space-y-4 text-sm">
          <button className="block w-full text-left hover:underline text-blue-400">
            Settings
          </button>
          <div className="w-full text-left ">
            <span
              className="font-medium capitalize hover:cursor-pointer hover:text-blue-300 hover:underline text-blue-400"
              onClick={handleShowMode}
            >
              mode
            </span>
            {showMode && (
              <div className="flex justify-center items-center gap-10 m-2">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.setItem("theme", "dark");
                      setTheme("dark");
                    }
                  }}
                  className="hover:opacity-75 rounded-md cursor-pointer dark:text-last-dark text-text-dark-username"
                >
                  <MdDarkMode size={25} />
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.setItem("theme", "light");
                      setTheme("light");
                    }
                  }}
                  className="hover:opacity-75 rounded-md cursor-pointer dark:text-text-dark text-text-dark-username"
                >
                  <MdOutlineLightMode size={25} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-md shadow-md"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>
    </aside>
  );
};

export default React.memo(AsideComponet);
