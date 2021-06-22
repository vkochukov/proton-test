import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchList from './FetchList'

const sliceInitialState = {
  list: [],
}

export default buildSlice('klines', [FetchList], sliceInitialState).reducer
