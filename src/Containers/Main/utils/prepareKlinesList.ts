import { IKlinesItem } from '@/Store/Klines/FetchList'
import { EKlinesIntervals } from '@/Types/KlinesIntervals'

export interface IPreparedKlines {
  x: number
  y: number
  marker: string | number
}

const getMarker = (timestamp: number, activeInterval: EKlinesIntervals) => {
  switch (activeInterval) {
    case EKlinesIntervals.hours:
    case EKlinesIntervals.day:
      return new Date(timestamp).getUTCDay()
    default:
      return new Date(timestamp).toLocaleTimeString()
  }
}

export default (list: IKlinesItem[], activeInterval: EKlinesIntervals) => {
  return list.map((item: IKlinesItem, index: number) => ({
    x: index,
    y: parseFloat(item.close),
    marker: getMarker(item.closeTime, activeInterval),
  }))
}
