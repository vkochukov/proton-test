import { KlinesState } from '@/Store/Klines'

export function klinesLoadingSelector(state: { klines: KlinesState }) {
  return state.klines.fetchList.loading
}

export function klinesErrorSelector(state: { klines: KlinesState }) {
  return state.klines.fetchList.error
}

export function klinesListSelector(state: { klines: KlinesState }) {
  return state.klines.list
}
