import React from "react";
import NavbarLinks from "./NavbarLinks";
import { cookies } from "next/headers";
import { logoutAction } from "@/lib/actions/auth";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const Navbar = async () => {
  const cookieStore = await cookies();
  const session:RequestCookie|undefined = cookieStore.get("session")


  return (
    <nav className="sticky left-0 top-0 flex justify-between bg-gray-100/95 shadow-lg shadow-cyan-500/50">
      <NavbarLinks session={session} logoutAction={logoutAction}/>
    </nav>
  );
};

export default Navbar;
