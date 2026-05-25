export default async  function getAllCoins(){


    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    const data = await response.json()
    return data

}
