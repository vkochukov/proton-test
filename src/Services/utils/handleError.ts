interface IError {
  message?: string
  data?: any
  status?: number
}

export default function ({ message, data, status }: IError) {
  return Promise.reject({ message, data, status })
}
