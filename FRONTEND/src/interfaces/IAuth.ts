export interface IRegister {
  email: string
  userName: string
  password: string
  passwordConfirm: string
  token: string
}

export interface ILogin {
  email:string
  password:string
  token: string
}