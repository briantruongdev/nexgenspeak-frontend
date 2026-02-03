export interface IResponseLogin {
  message: string
  token: string
  user: {
    userId: string
    email: string
  }
}

export interface IResponseRegisterAndResetPassword {
  message: string
  userId: string
  email: string
}
