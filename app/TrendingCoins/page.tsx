import Link from "next/link";
import getTrendingCoins from "../Dashboard/api/TrendingCoins";

const TrendingCoins = async () => {
  const trendingCoins = await getTrendingCoins();

  return (
    <div className="border-2 border-slate-800 rounded-2xl m-4 p-4 space-y-10">

      {/* ================= COINS ================= */}
      <div className="rounded-3xl p-4 md:p-6 bg-[#0B1120]">

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Trending Coins
          </h2>

          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Top trending cryptocurrencies right now.
          </p>
        </div>

        <div className="space-y-4">

          {trendingCoins?.coins?.map((coin: any, index: number) => {
            const item = coin.item;

            return (
              <Link
                href={`/CoinDetails/${item.id}`}
                key={item.coin_id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-center bg-slate-900/40 hover:bg-slate-800 transition-all duration-300 border border-slate-800 rounded-2xl p-4"
              >

                {/* Rank */}
                <span className="text-slate-400 font-semibold md:col-span-1">
                  #{item.market_cap_rank ?? index + 1}
                </span>

                {/* Coin */}
                <div className="flex items-center gap-3 md:col-span-3 overflow-hidden">

                  <img
                    src={item.small}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
                  />

                  <div className="overflow-hidden">
                    <h3 className="text-white font-semibold truncate">
                      {item.name}
                    </h3>

                    <p className="text-slate-400 text-sm uppercase">
                      {item.symbol}
                    </p>
                  </div>

                </div>

                {/* Price */}
                <div className="md:col-span-3">
                  <p className="text-white font-bold text-lg break-all">
                    {item?.data?.price || "N/A"}
                  </p>
                </div>

                {/* 24h */}
                <div className="md:col-span-2">
                  <p
                    className={`font-semibold ${
                      item?.data?.price_change_percentage_24h?.usd >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item?.data?.price_change_percentage_24h?.usd?.toFixed(2) ??
                      "0.00"}
                    %
                  </p>
                </div>

                {/* Score */}
                <div className="md:col-span-3">
                  <div className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-center text-sm w-fit">
                    #{index + 1} Trending
                  </div>
                </div>

              </Link>
            );
          })}
        </div>
      </div>

      {/* ================= NFTS ================= */}
      <div className="border border-slate-800 rounded-3xl p-4 md:p-6 bg-[#0B1120]">

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Trending NFTs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {trendingCoins?.nfts?.map((nft: any) => (

            <div
              key={nft.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:bg-slate-800 transition"
            >

              <img
                src={nft.thumb}
                className="w-full h-40 md:h-52 object-cover rounded-xl mb-4"
              />

              <h3 className="text-white text-lg md:text-xl font-semibold">
                {nft.name}
              </h3>

              <p className="text-slate-400 mt-1 text-sm md:text-base">
                {nft.symbol}
              </p>

              <div className="mt-4">
                <p className="text-slate-300 text-sm">
                  Floor Price:
                </p>

                <p className="text-green-400 font-bold">
                  {nft.data.floor_price}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="border border-slate-800 rounded-3xl p-4 md:p-6 bg-[#0B1120]">

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {trendingCoins?.categories?.map((category: any) => (

            <div
              key={category.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:bg-slate-800 transition"
            >

              <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                {category.name}
              </h3>

              <p className="text-slate-400 text-sm md:text-base">
                Coins Count: {category.coins_count}
              </p>

              <p
                className={`mt-3 font-semibold ${
                  category.market_cap_1h_change >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {category.market_cap_1h_change.toFixed(2)}%
              </p>

              <div className="flex items-center gap-2 mt-4 flex-wrap">

                {category.top_3_coins_images?.map(
                  (img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-700"
                    />
                  )
                )}

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TrendingCoins;