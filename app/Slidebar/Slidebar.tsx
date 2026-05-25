"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Slidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/Dashboard", icon: "fa-chart-line" },
    { name: "Market", href: "/Market", icon: "fa-chart-bar" },
    { name: "Favorite", href: "/Favorite", icon: "fa-heart" },
    { name: "Trending Coins", href: "/TrendingCoins", icon: "fa-fire" },
  ];

  return (
    <>

      {/* زرار الموبايل */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-2 rounded-lg"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0  bottom-0 w-64 bg-slate-900
          border-r border-slate-800 z-50
          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 py-8 text-gray-500">
          <i className="fa-brands fa-bitcoin text-5xl text-green-700"></i>
          <h1 className="font-bold text-2xl">Crypto</h1>
        </div>

        {/* Links */}
        <ul className="space-y-2 px-3">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl transition
                    ${
                      isActive
                        ? "bg-green-700/20 text-white border border-green-700"
                        : "text-gray-500 hover:text-white hover:bg-slate-800"
                    }
                  `}
                >
                  <i className={`fa-solid ${link.icon}`} />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

      </div>
    </>
  );
};

export default Slidebar;