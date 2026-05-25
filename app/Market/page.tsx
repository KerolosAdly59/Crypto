"use client"
import React, { useContext, useState } from 'react'
import { coinsContext } from '../Context/CoinsCotext'
import getAllCoins from '../Dashboard/api/Cions'
import Crypto from '../Dashboard/Crypto/Crypto'
import { Field } from '@/components/ui/field'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Fuse from 'fuse.js'
import BtnViewAllCrypto from '../Dashboard/BtnViewAllCrypto/BtnViewAllCrypto'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Market = () => {
  const { coins, market }: any = useContext(coinsContext)

  const [search, setSearch] = useState("");



  const fuse = new Fuse(coins, {
    keys: ["name", "symbol"],
    threshold: 0.3,
  });

  const filteredCoins = search
    ? fuse.search(search).map(r => r.item)
    : coins;

  return (
    <div>
      <div className=' ms-8 mt-8'>

        <Field>
          <div className="relative w-full max-w-sm ">
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
      <div className='border-2 border-slate-800 rounded-2xl m-4 p-2'>
        <div>
          <h2 className='text-2xl'>Market</h2>
          <p className='text-gray-500'>Welcome back! Here's what's happening in the crypto market today.</p>
        </div>
        <div>
          <div className='flex flex-wrap justify-between'>

          </div>

          <div className=' mt-4 text-gray-500 border-b-2 border-slate-800 py-2 flex flex-wrap gap-2'>
            {filteredCoins.length === 0 && (
              <p className="text-red-500 text-center text-2xl my-4">No results found</p>
            )}
            {filteredCoins.slice(0, coins.length).map((coin: any) => (
              <div key={coin.id} className='border border-slate-800 rounded-2xl p-4  gap-4 flex-wrap items-center w-fit  mb-4'>
                <h4 className='text-lg '>{coin.market_cap_rank}</h4>
                <div className='flex items-center justify-start  overflow-hidden'>
                  <img src={coin.image} alt={coin.name} className='w-10 h-10 rounded-full me-2' />
                  <div>
                    <span>{coin.name}</span>
                    <p className='text-sm text-gray-500'>{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-2">
                  <Link href={`MarketDetails/${coin.id}`} className='text-sm text-green-500 hover:bg-green-500 hover:text-white transition duration-500 cursor-pointer  mx-auto border border-green-500 rounded-lg px-4 py-2'>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}

export default Market
