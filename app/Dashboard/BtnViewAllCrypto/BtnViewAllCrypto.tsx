"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const BtnViewAllCrypto = ({ allCrypto }: { allCrypto: boolean } ) => {
   
  return (
    <div>
      <p   className='hover:text-green-500 border-green-500  text-white transition duration-500'>
                {allCrypto ? "View Top 10" : "View All"}
      </p>
    </div>
  )
}

export default BtnViewAllCrypto
