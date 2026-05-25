"use client"
import React, { createContext, useEffect, useState } from 'react'
import { Coin } from '../Types/coins'
import getAllCoins from '../Dashboard/api/Cions'
import getMarket from '../Dashboard/api/Market'
import getCoinDetails from '../Dashboard/api/CoinDetails'
import getTrendingCoins from '../Dashboard/api/TrendingCoins'


interface CoinsContextType {
  isLoading: boolean
  coins: Coin[]
    market: Coin[]
    getMarketData: (id:string) => Promise<Coin[]>
    coinDetails: Coin[]
    getCoinData: (id:string) => Promise<Coin[]>
    trendingCoins: Coin[]
    // getTrendingCoinsData: () => Promise<Coin[]>
}

export const coinsContext = createContext <CoinsContextType | null>(null)


const  CartContextProvider = ({children}:{children:React.ReactNode}) => {
 
     const [coins, setCoins] = useState<Coin[]>([])
     const [market, setMarket] = useState<Coin[]>([])
     const [coinDetails, setCoinDetails] = useState<Coin[]>([])
     const [trendingCoins, setTrendingCoins] = useState<Coin[]>([])
     const [isLoading, setIsLoading] = useState(false)
    
    async function getCoins(){
        try {
            const data =await getAllCoins()
            setCoins(data)
            return data
        } catch (error) {
            console.log(error);
            
        }
    }

 async function getMarketData(id:string){
        try {
            const data =await getMarket({ id })
            setMarket(data)
            return data
        } catch (error) {
            console.log(error);
            
        }
    }

async function getCoinData(id:string){
        try {
            const data =await getCoinDetails({ id })
            setCoinDetails(data)
            return data
        } catch (error) {
            console.log(error);
            
        }
    }
   async function getTrendingCoinsData(){
        try {
            const data =await getTrendingCoins()
            setTrendingCoins(data)
            return data
        } catch (error) {
            console.log(error);
            
        }
    }
  

 
  useEffect(function(){

    getCoins()
    

 },[])
 

 
    return (
    <coinsContext.Provider value={{
        isLoading,
        coins,
        market,
        coinDetails,
        getMarketData,
        getCoinData,
        trendingCoins,
    }}>
      {children}
    </coinsContext.Provider>
  )
}

export default CartContextProvider
