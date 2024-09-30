"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./Menu";
import NavLink from "./NavLink";

const navLinks = [
  {
    title: "My Profile",
    path: "/Profile",
  },
  {
    title: "Yodlers you follow",
    path: "/api/yodels/:id",
  },
  {
    title: "See what's new",
    path: "/api/yodels",
  },
  {
    title: "Search",
    path: "/api/yodels/search",
  },
  {
    title: "Logout",
    path: "/",
  },
];

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border-yellow-200 top-0 left-0 right-0 z-10 bg-black">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-5 py-2">
        <Link
          href={"/"}
          className="text-1xl md:text-6xl font-bold leading-normal py-2 bg-gradient-to-r from-primary-400 to-secondary-300 bg-clip-text text-transparent"
        >
          Yodel
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navOpen ? (
            <button
              onClick={() => setNavOpen(true)}
              className="flex items-center px-4 py-3 border rounded border-slate-400 text-slate-400 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={() => setNavOpen(false)}
              className="flex items-center px-4 py-3 border rounded border-slate-400 text-slate-400 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto mr-8" id="navbar">
          <ul className="flex p-4 md:flex-row md:space-x-8 ">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
