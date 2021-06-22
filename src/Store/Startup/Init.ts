import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper'
import FetchList from '@/Store/Klines/FetchList'
import { navigateAndReset } from '@/Navigators/Root'
import { EKlinesIntervals } from '@/Types/KlinesIntervals'
import { ESymbols } from '@/Types/Symbols'
import { EScreens } from '@/Types/Screens'

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
