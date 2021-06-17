import { StartupState } from '@/Store/Startup'

export function startupLoadingSelector(state: { startup: StartupState }) {
  return state.startup.loading
}
