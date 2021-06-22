import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper'
import FetchList from '@/Store/Klines/FetchList'
import { navigateAndReset } from '@/Navigators/Root'
import { EScreens } from '@/Navigators/Application'
import { EKlinesIntervals } from '@/Types/KlinesIntervals'
import { ESymbols } from '@/Types/Symbols'

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('startup/init', async (args, { dispatch }) => {
    await dispatch(
      FetchList.action({
        symbol: ESymbols.BTCUSDT,
        interval: EKlinesIntervals.minutes,
      }),
    )
    // Navigate and reset to the main navigator
    navigateAndReset(EScreens.Main)
  }),
  reducers: buildAsyncReducers({ itemKey: null }), // We do not want to modify some item by default
}
