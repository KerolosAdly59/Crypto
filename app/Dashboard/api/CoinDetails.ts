export default async  function getCoinDetails({id}:{id:string}){


    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    const data = await response.json()
    return data

}
