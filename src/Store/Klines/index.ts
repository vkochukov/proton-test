import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchList from './FetchList'

const sliceInitialState = {
  list: [],
}

export default buildSlice('klines', [FetchList], sliceInitialState).reducer

interface IKlinesItem {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  closeTime: number
  quoteAssetVolume: string
  numberOfTrades: number
  takerBuyBaseAssetVolume: string
  takerBuyQuoteAssetVolume: string
  ignore: string
}

export interface KlinesState {
  list: IKlinesItem[]
  fetchList: {
    loading: boolean
    error: any
  }
}
