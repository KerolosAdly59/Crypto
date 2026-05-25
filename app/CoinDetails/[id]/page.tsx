"use client";

import React, { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowUpRight, LineChart, ShieldCheck } from "lucide-react";

import { coinsContext } from "@/app/Context/CoinsCotext";
import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CoinDetails = () => {
  const params = useParams();
  const coinId = params?.id;

  
  const { coinDetails, getCoinData }: any = useContext(coinsContext);
  console.log(coinDetails);
  


const coinsData =
  coinDetails?.prices?.map((item: any, index: number) => ({
    time: new Date(item[0]).toLocaleDateString(),

    price: Number(item[1].toFixed(2)),

    volume: Number(
      coinDetails?.market_cap?.market_data?.total_volume?.[index]?.[index]?.[1]?.toFixed(2)
    ),

    marketCap: Number(
      coinDetails?.market_cap?.market_data?.total_volume?.[index]?.[1]?.toFixed(2)
    ),
  })) || [];


  // Fetch Coin Data
  useEffect(() => {
    if (coinId) {
      getCoinData(coinId);
    }
  }, [coinId]);

  // Loading
  if (!coinDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] p-6">

      {/* ================= HEADER ================= */}
      <div className="bg-[#131A2A] rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border border-gray-800">

        {/* Left */}
        <div className="flex items-center gap-4">

          <img
            src={coinDetails?.image?.large}
            alt={coinDetails?.name}
            className="w-16 h-16 rounded-full"
          />

          <div>
            <div className="flex items-center gap-3 flex-wrap">

              <h1 className="text-3xl font-bold text-white">
                {coinDetails?.name}
              </h1>

              <span className="uppercase text-gray-400 text-lg ">
                {coinDetails?.symbol}
              </span>

              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm px-2">
                Rank #  {coinDetails?.market_cap_rank}
              </span>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-3">
              {coinDetails?.categories
                ?.slice(0, 4)
                .map((cat: string, index: number) => (
                  <span
                    key={index}
                    className="bg-[#1E293B] text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {cat}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Right */}
       <div className="flex flex-col gap-4">
        <div>
           {/* <ResponsiveContainer width="100%" height="100%">
              <LineChart data={coinsData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer> */}
        </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-[#0B1120] p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">Genesis Date</p>

            <h3 className="text-white font-semibold mt-1">
              {coinDetails?.genesis_date || "N/A"}
            </h3>
          </div>

          <div className="bg-[#0B1120] p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">Algorithm</p>

            <h3 className="text-white font-semibold mt-1">
              {coinDetails?.hashing_algorithm || "N/A"}
            </h3>
          </div>

          <div className="bg-[#0B1120] p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">Bullish</p>

            <div className="flex items-center gap-2 mt-1">
              <ArrowUpRight className="text-green-400" size={18} />

              <h3 className="text-green-400 font-semibold">
                {coinDetails?.sentiment_votes_up_percentage}%
              </h3>
            </div>
          </div>

          <div className="bg-[#0B1120] p-4 rounded-2xl">
            <p className="text-gray-400 text-sm">Watchlist</p>

            <div className="flex items-center gap-2 mt-1">
              <ShieldCheck className="text-blue-400" size={18} />

              <h3 className="text-white font-semibold">
                {coinDetails?.watchlist_portfolio_users?.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
       </div>
      </div>

      {/* ================= PRICE CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

        {/* Current Price */}
        <div className="bg-[#131A2A] p-5 rounded-3xl border border-gray-800">
          <p className="text-gray-400">Current Price</p>

          <h2 className="text-3xl font-bold text-white mt-3">
            $
            {coinDetails?.market_data?.current_price?.usd?.toLocaleString()}
          </h2>
        </div>

        {/* Market Cap */}
        <div className="bg-[#131A2A] p-5 rounded-3xl border border-gray-800">
          <p className="text-gray-400">Market Cap</p>

          <h2 className="text-3xl font-bold text-white mt-3">
            $
            {coinDetails?.market_data?.market_cap?.usd?.toLocaleString()}
          </h2>
        </div>

        {/* Volume */}
        <div className="bg-[#131A2A] p-5 rounded-3xl border border-gray-800">
          <p className="text-gray-400">24h Volume</p>

          <h2 className="text-3xl font-bold text-white mt-3">
            $
            {coinDetails?.market_data?.total_volume?.usd?.toLocaleString()}
          </h2>
        </div>

        {/* Price Change */}
        <div className="bg-[#131A2A] p-5 rounded-3xl border border-gray-800">
          <p className="text-gray-400">24h Change</p>

          <h2
            className={`text-3xl font-bold mt-3 ${
              coinDetails?.market_data?.price_change_percentage_24h > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coinDetails?.market_data?.price_change_percentage_24h?.toFixed(2)}
            %
          </h2>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="bg-[#131A2A] mt-8 p-6 rounded-3xl border border-gray-800">

        <h2 className="text-2xl font-bold text-white mb-4">
          About {coinDetails?.name}
        </h2>

        <p className="text-gray-300 leading-8">
          {coinDetails?.description?.en
            ?.replace(/<\/?[^>]+(>|$)/g, "")
            ?.slice(0, 1000)}
          ...
        </p>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="bg-[#131A2A] mt-8 p-6 rounded-3xl border border-gray-800">

        <h2 className="text-2xl font-bold text-white mb-6">
          Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <div className="bg-[#0B1120] p-5 rounded-2xl">
            <p className="text-gray-400">ATH</p>

            <h3 className="text-white text-xl font-bold mt-2">
              $
              {coinDetails?.market_data?.ath?.usd?.toLocaleString()}
            </h3>
          </div>

          <div className="bg-[#0B1120] p-5 rounded-2xl">
            <p className="text-gray-400">ATL</p>

            <h3 className="text-white text-xl font-bold mt-2">
              $
              {coinDetails?.market_data?.atl?.usd?.toLocaleString()}
            </h3>
          </div>

          <div className="bg-[#0B1120] p-5 rounded-2xl">
            <p className="text-gray-400">Circulating Supply</p>

            <h3 className="text-white text-xl font-bold mt-2">
              {coinDetails?.market_data?.circulating_supply?.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CoinDetails;