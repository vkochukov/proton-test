import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchKlinesService from '@/Services/Klines/FetchList'

export default {
  initialState: buildAsyncState('fetchList'),
  action: buildAsyncActions('klines/fetchList', fetchKlinesService),
  reducers: buildAsyncReducers({
    itemKey: 'list',
    errorKey: 'fetchList.error',
    loadingKey: 'fetchList.loading',
  }),
}
