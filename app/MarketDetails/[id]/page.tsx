"use client";

import React, { useContext, useEffect, useState } from "react";
import { coinsContext } from "@/app/Context/CoinsCotext";
import { useParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";

const MarketDetails = () => {
  const { getMarketData }: any = useContext(coinsContext);
  const params = useParams();

  const coinId = params?.id;

  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const chartData = marketData?.prices?.map((item: any, index: number) => ({
  time: new Date(item[0]).toLocaleDateString(),
  price: item[1],
  volume: marketData.total_volumes[index]?.[1],
  marketCap: marketData.market_caps[index]?.[1],
}));
  async function fetchData() {
    if (!coinId) return;

    try {
      setLoading(true);

      const data = await getMarketData(coinId);
      setMarketData(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [coinId]);

  // 🧠 Helpers
  const prices = marketData?.prices || [];
  const marketCaps = marketData?.market_caps || [];
  const volumes = marketData?.total_volumes || [];

  const lastPrice = prices.at(-1)?.[1];
  const highPrice = Math.max(...prices.map((p: any) => p[1]));
  const lowPrice = Math.min(...prices.map((p: any) => p[1]));
  const avgPrice =
    prices.length > 0
      ? prices.reduce((acc: number, p: any) => acc + p[1], 0) /
        prices.length
      : 0;

  const lastMarketCap = marketCaps.at(-1)?.[1];
  const lastVolume = volumes.at(-1)?.[1];

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Market Details</h1>
        <p className="text-gray-500">
          Full analytics for selected cryptocurrency
        </p>
      </div>

<div className="h-[250px]  bg-slate-900  p-8 rounded-xl border">
  <h2 className="mb-3 font-semibold  text-center">Price (7D)</h2>

  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#3b82f6" />
    </LineChart>
  </ResponsiveContainer>
</div>

<div className="h-[250px]  bg-slate-900  p-8  rounded-xl border">
  <h2 className="mb-3 font-semibold text-center">Volume</h2>

  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="volume" fill="#10b981" />
    </BarChart>
  </ResponsiveContainer>
</div>
<div className="h-[250px]  bg-slate-900  p-8  rounded-xl border">
  <h2 className="mb-3 font-semibold  text-center">Market Cap</h2>

  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="marketCap" stroke="#f59e0b" />
    </LineChart>
  </ResponsiveContainer>
</div>
      {loading && <p>Loading...</p>}

      {/* Dashboard Grid */}
      {marketData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-transfer text-black">

          <Card title="Current Price" value={`$${lastPrice}`} />
          <Card title="Highest (7D)" value={`$${highPrice.toFixed(2)}`} />
          <Card title="Lowest (7D)" value={`$${lowPrice.toFixed(2)}`} />
          <Card title="Average Price" value={`$${avgPrice.toFixed(2)}`} />
          <Card title="Market Cap" value={`$${lastMarketCap}`} />
          <Card title="24h Volume" value={`$${lastVolume}`} />

        </div>
      )}
    </div>
  );
};

export default MarketDetails;

// 🔥 Reusable Card
function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-xl p-5 shadow-sm bg-slate-900">
      <h2 className="text-white text-sm">{title}</h2>
      <p className="text-xl text-gray-500 font-semibold mt-2">{value}</p>
    </div>
  );
}