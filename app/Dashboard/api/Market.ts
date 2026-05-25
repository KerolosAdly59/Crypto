export default async  function getMarket({id}: {id: string}){


    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
    const data = await response.json()
    return data

}
