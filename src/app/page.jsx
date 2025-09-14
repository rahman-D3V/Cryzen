import CoinTable from '@/components/Coin'
import CoinGrid from '@/components/Coin'
import Hero from '@/components/Hero'
import KeyFeatures from '@/components/KeyFeatures'
import Navbar from '@/components/Navbar'
import RightPanel from '@/components/RightPanel'
import TrendingCoin from '@/components/TrendingCoin'
import React from 'react'

const LandindPage = () => {
  return (
    <div>

      <Hero/>

      <KeyFeatures/>

      <CoinTable/>

      <RightPanel/>

      <TrendingCoin/>

    </div>
  )
}

export default LandindPage