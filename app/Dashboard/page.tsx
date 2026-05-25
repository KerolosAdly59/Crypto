// "use client"

import getAllCoins from './api/Cions'
import Crypto from './Crypto/Crypto'
const Dashboard = async () => {
  const coins = await getAllCoins()
  console.log(coins)

  


  return (
    <div>

                  <Crypto coins={coins} />

      
    </div>
  )
}

export default Dashboard
