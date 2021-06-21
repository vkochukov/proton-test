import api from '@/Services'
import handleError from '@/Services/utils/handleError'

interface IFetchKlinesParams {
  symbol: string
  interval: string
}

const prepareKlinesData = (data: []) =>
  data.map(item => ({
    openTime: item[0],
    open: item[1],
    high: item[2],
    low: item[3],
    close: item[4],
    volume: item[5],
    closeTime: item[6],
    quoteAssetVolume: item[7],
    numberOfTrades: item[8],
    takerBuyBaseAssetVolume: item[9],
    takerBuyQuoteAssetVolume: item[10],
    ignore: item[11],
  }))

export default async (params: IFetchKlinesParams) => {
  const { symbol, interval } = params

  if (!symbol || !interval) {
    return handleError({ message: 'Currency and interval are required' })
  }

  const response = await api.get('v3/klines', {
    params: {
      symbol,
      interval,
    },
  })

  return prepareKlinesData(response.data)
}
