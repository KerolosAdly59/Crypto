"use client";

import { Coin } from "@/app/Types/coins";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { coinsContext } from "../Context/CoinsCotext";

const FavoritesPage = () => {
  const { coins }: any = useContext(coinsContext);

  const [favoriteCoins, setFavoriteCoins] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // GET FAVORITES
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  // FILTER
  useEffect(() => {
    if (!coins) return;

    const filtered = coins.filter((coin: Coin) =>
      favorites.includes(coin.id)
    );

    setFavoriteCoins(filtered);
  }, [coins, favorites]);

  // TOGGLE
  const toggleFavorite = (coinId: string) => {
    let updated;

    if (favorites.includes(coinId)) {
      updated = favorites.filter((id) => id !== coinId);
    } else {
      updated = [...favorites, coinId];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="border-2 border-slate-800 rounded-2xl m-4 p-4">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Favorite Coins ❤️</h2>
        <p className="text-gray-500 mt-2">
          Your saved cryptocurrencies watchlist.
        </p>
      </div>

      {/* Table Header (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-12 items-center text-gray-500 border-b border-slate-800 p-4">
        <span className="col-span-1">#</span>
        <p className="col-span-2">Name</p>
        <p className="col-span-2">Price</p>
        <p className="col-span-1">24h%</p>
        <p className="col-span-3">Market Cap</p>
        <p className="col-span-2">ATH Date</p>
      </div>

      {/* Coins */}
      <div className="mt-4 space-y-4">

        {favoriteCoins.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-400">
              No favorite coins yet 💔
            </h3>
          </div>
        )}

        {favoriteCoins.map((coin) => {
          const priceChange = coin.price_change_percentage_24h ?? 0;

          return (
            <div
              key={coin.id}
              className="border border-slate-800 rounded-2xl p-3 md:p-4 bg-slate-900/40 hover:bg-slate-800 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3">

                <Link
                  href={`/CoinDetails/${coin.id}`}
                  className="w-full"
                >
                  {/* RESPONSIVE GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-center">

                    {/* Rank */}
                    <h4 className="text-sm md:text-lg md:col-span-1">
                      {coin.market_cap_rank}
                    </h4>

                    {/* Name */}
                    <div className="flex items-center md:col-span-2 overflow-hidden">

                      <img
                        src={coin.image}
                        className="w-10 h-10 rounded-full me-2 flex-shrink-0"
                      />

                      <div className="overflow-hidden">
                        <span className="block truncate">
                          {coin.name}
                        </span>
                        <p className="text-sm text-gray-500">
                          {coin.symbol.toUpperCase()}
                        </p>
                      </div>

                    </div>

                    {/* Price */}
                    <p className="text-lg md:text-2xl font-bold md:col-span-2 break-all">
                      ${coin.current_price.toLocaleString()}
                    </p>

                    {/* 24h */}
                    <p
                      className={`text-sm md:text-lg md:col-span-1 ${
                        priceChange >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {priceChange >= 0 ? "+" : ""}
                      {priceChange.toFixed(2)}%
                    </p>

                    {/* Market Cap */}
                    <p className="text-lg md:text-2xl font-bold md:col-span-3 break-all">
                      ${coin.market_cap.toLocaleString()}
                    </p>

                    {/* Date */}
                    <p className="text-sm md:text-lg md:col-span-2">
                      {new Date(coin.ath_date).toLocaleDateString()}
                    </p>

                  </div>
                </Link>

                {/* Heart */}
                <button
                  onClick={() => toggleFavorite(coin.id)}
                  className="flex-shrink-0"
                >
                  <i
                    className={`fas fa-heart fa-lg md:fa-xl ${
                      favorites.includes(coin.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  ></i>
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesPage;