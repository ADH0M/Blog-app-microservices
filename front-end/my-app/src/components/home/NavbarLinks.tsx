"use client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LinkState from "./LinkState";

const NavbarLinks = ({
  session,
  logoutAction,
}: {
  session: RequestCookie | undefined;
  logoutAction: () => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="flex-1 mx-2   text-gray-500  p-4 flex gap-4">
        <Link href={"/"}>
          <li className={`${pathname === "/" ? "text-blue-500" : ""} relative`}>
            home
            <LinkState />
          </li>
        </Link>

        <Link href={"/hub"}>
          <li
            className={`${pathname === "/hub" ? "text-blue-500" : ""} relative`}
          >
            Hub
            <LinkState />
          </li>
        </Link>

        {session && (
          <Link href={"/chat"} scroll>
            <li
              className={`${
                pathname === "/chat" ? "text-blue-500" : ""
              } relative rounded-md`}
            >
              Chat
              <LinkState />
            </li>
          </Link>
        )}
      </ul>
      {!session ? (
        <ul className="mx-2 p-2">
          <Link href="/login" prefetch={false}>
            <li className="text-blue-500 hover:bg-blue-500 px-2 rounded-md hover:text-indigo-50">
              Login
            </li>
          </Link>

          <Link href="/signup" prefetch={false}>
            <li className="text-indigo-500 hover:bg-indigo-500 px-2 rounded-md hover:text-indigo-50">
              Signup
            </li>
          </Link>
        </ul>
      ) : (
        <button
          onClick={logoutAction}
          className="dark:text-text-dark-username
           text-text-username mx-4 cursor-pointer relative font-semibold hover:text-pink-900"
        >
          Logout
          <LinkState />
        </button>
      )}
    </>
  );
};

export default NavbarLinks;
