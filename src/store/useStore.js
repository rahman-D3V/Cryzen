// store/useStore.js
import { create } from 'zustand';

export const useStore = create(set => ({
  count: 0,
  name: 'yasir',
  coinList: [],
  trendingCoins: [],
  marketCapData:[],
  inc: () => set(s => ({ count: s.count + 1 })),
  updateName: (lora) => set(() => ({ name: lora })),
  setCoinList: (arr) => set({ coinList: arr }),
  setTrendingCoins: (arr) => set({trendingCoins:arr}),
  setMarketCapData: (arr) => set({marketCapData:arr}),
}));
