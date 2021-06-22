import { EKlinesIntervals } from '@/Types/KlinesIntervals'
import { IKlinesItem } from '@/Types/KlinesItem'
import { IPreparedKlines } from '@/Types/PreparedKlines'

const getMarker = (timestamp: number, activeInterval: EKlinesIntervals) => {
  const time = new Date(timestamp)

  switch (activeInterval) {
    case EKlinesIntervals.hours:
    case EKlinesIntervals.day:
      return `${
        time.getMonth() + 1
      }/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
    default:
      return `${time.getHours()}:${time.getMinutes()}`
  }
}

export default (
  list: IKlinesItem[],
  activeInterval: EKlinesIntervals,
): IPreparedKlines[] =>
  list.map((item: IKlinesItem, index: number) => ({
    x: index,
    y: parseFloat(item.close),
    marker: getMarker(item.closeTime, activeInterval),
  }))
