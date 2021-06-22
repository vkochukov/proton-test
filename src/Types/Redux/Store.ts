import { IKlinesItem } from '../KlinesItem'

export interface KlinesState {
  list: IKlinesItem[]
  fetchList: {
    loading: boolean
    error: any
  }
}

export interface StartupState {
  loading: boolean
  error: any
}
