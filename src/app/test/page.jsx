"use client"

import { useStore } from '@/store/useStore'
import React from 'react'

const page = () => {

  const count = useStore(state => state.count)
   const inc = useStore(state => state.inc);
   const updateName = useStore(state => state.updateName)
   const name = useStore(state => state.name)

const coinList = useStore(state => state.coinList)


  return (
    <div>
      {count}
      {name}

      <button onClick={inc}>+</button>
      <br />
      <button onClick={() => updateName("king khan")}>LORA</button>
      <p>{coinList.length}</p>
      </div>
  )
}

export default page