import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchKlinesService from '@/Services/Klines/FetchList'

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

export default {
  initialState: buildAsyncState('fetchList'),
  action: buildAsyncActions('klines/fetchList', fetchKlinesService),
  reducers: buildAsyncReducers({
    itemKey: 'list',
    errorKey: 'fetchList.error',
    loadingKey: 'fetchList.loading',
  }),
}
