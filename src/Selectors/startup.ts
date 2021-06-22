import { StartupState } from '@/Types/Redux/Store'

export function startupLoadingSelector(state: { startup: StartupState }) {
  return state.startup.loading
}
