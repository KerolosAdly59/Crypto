export default async  function getTrendingCoins(){


    const response = await fetch("https://api.coingecko.com/api/v3/search/trending")
    const data = await response.json()
    return data

}
