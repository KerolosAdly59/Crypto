"use client";

import { Coin } from "@/app/Types/coins";
import React, { useEffect, useState } from "react";
import BtnViewAllCrypto from "../BtnViewAllCrypto/BtnViewAllCrypto";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import Link from "next/link";

const Crypto = ({ coins }: { coins: Coin[] }) => {
    const [allCrypto, setAllCrypto] = useState(false);
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState<string[]>([]);

    function handleViewAll() {
        setAllCrypto(!allCrypto);
    }

    const fuse = new Fuse(coins, {
        keys: ["name", "symbol"],
        threshold: 0.3,
    });

    const filteredCoins = search
        ? fuse.search(search).map((r) => r.item)
        : coins;

    const toggleFavorite = (coinId: string) => {
        let updatedFavorites: string[];

        if (favorites.includes(coinId)) {
            updatedFavorites = favorites.filter((id) => id !== coinId);
        } else {
            updatedFavorites = [...favorites, coinId];
        }

        setFavorites(updatedFavorites);

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );
    };

    useEffect(() => {
        const storedFavorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );
        setFavorites(storedFavorites);
    }, []);

    return (
        <>
            {/* Search */}
            <div className="ms-8 mt-8">
                <Field>
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

                        <Input
                            type="text"
                            placeholder="search for a cryptocurrency..."
                            className="pl-10 border border-gray-800"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </Field>
            </div>

            {/* Container */}
            <div className="border-2 border-slate-800 rounded-2xl m-4 p-2">
                <div>
                    <h2 className="text-2xl">Dashboard</h2>
                    <p className="text-gray-500">
                        Welcome back! Here's what's happening in the crypto market today.
                    </p>
                </div>

                {/* Header */}
                <div className="flex flex-wrap justify-between items-center">
                    <h3 className="text-xl mt-4 mb-2">
                        {allCrypto
                            ? "All Cryptocurrencies"
                            : "Top 10 Cryptocurrencies"}
                    </h3>

                    <h3
                        onClick={handleViewAll}
                        className="text-sm text-green-500 cursor-pointer m-8 hover:text-green-700 transition duration-500"
                    >
                        <BtnViewAllCrypto allCrypto={allCrypto} />
                    </h3>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 items-center text-gray-500 border-b-2 border-slate-800 p-4">
                    <span className="col-span-1">#</span>
                    <p className="col-span-2">Name</p>
                    <p className="col-span-2">Price</p>
                    <p className="col-span-1">24h%</p>
                    <p className="col-span-3">Market Cap</p>
                    <p className="col-span-3">Date</p>
                </div>

                {/* Coins */}
                <div className="mt-4">
                    {filteredCoins.length === 0 && (
                        <p className="text-red-500 text-center text-2xl my-4">
                            No results found
                        </p>
                    )}

                    {filteredCoins
                        .slice(0, allCrypto ? coins.length : 10)
                        .map((coin: any) => (
                            <div
                                key={coin.id}
                                className="border border-slate-800 rounded-2xl p-3 md:p-4 bg-slate-900/40 hover:bg-slate-800 transition-all duration-300 mb-3"
                            >
                                <div className="flex items-center justify-between gap-3">

                                    <Link
                                        href={`CoinDetails/${coin.id}`}
                                        className="w-full"
                                    >
                                        {/* GRID RESPONSIVE */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 items-center">

                                            {/* Rank */}
                                            <h4 className="text-sm md:text-lg md:col-span-1">
                                                {coin.market_cap_rank}
                                            </h4>

                                            {/* Name */}
                                            <div className="flex items-center md:col-span-2 overflow-hidden">
                                                <img
                                                    src={coin.image}
                                                    alt={coin.name}
                                                    className="w-10 h-10 rounded-full me-2 flex-shrink-0" />

                                                <div className="overflow-hidden">
                                                    <span className="text-white font-bold block truncate">
                                                        {coin.name}
                                                    </span>
                                                    <p className="text-sm text-gray-500">
                                                        {coin.symbol.toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <p className="text-lg md:text-2xl font-bold md:col-span-2 break-all">${coin.current_price.toLocaleString("en-US" )}</p>

                                            {/* 24h */}
                                            <p className={`text-sm md:text-lg md:col-span-1 ${coin.price_change_percentage_24h >=0 ? "text-green-500" : "text-red-500"}`} >
                                                {coin.price_change_percentage_24h >=0? "+" : ""}
                                                {coin.price_change_percentage_24h?.toFixed(2)} %</p>

                                            {/* Market Cap */}
                                            <p className="text-lg md:text-2xl font-bold md:col-span-3 break-all">$ {coin.market_cap.toLocaleString( "en-US")}</p>

                                            {/* Date */}
                                            <p className="text-sm md:text-lg md:col-span-3">
                                                {new Date(coin.ath_date).toLocaleDateString("en-US")}
                                            </p>
                                        </div>
                                    </Link>

                                    {/* Favorite */}
                                    <button onClick={() =>toggleFavorite(coin.id)}className="flex-shrink-0">
                                        <i className={`fas fa-heart fa-lg md:fa-xl ${favorites.includes(coin.id)? "text-red-500": "text-gray-500" }`}></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Crypto;