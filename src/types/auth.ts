export interface IAuth {
  success?: boolean
  errors?: UserBlocking | UserBlocked | Verify | NeedUpdatePass | any
  user_id?: string
  is_need_verify?: boolean
  is_need_update_password: boolean,
  access_token: string
  user: IUser
  right: any
}

export interface ILogin {
  access_token: string | null
  user: IUser | null
  right?: any
  isLoading?: boolean
}

type UserBlocking = {
  user_is_blocking: string
}

type UserBlocked = {
  user_is_blocked: string
}

type Verify = {
  user_need_verify: string
}

type NeedUpdatePass = {
  user_need_update_password: string
}

type IUser = {
  id: number | null
  first_name: string | null
  last_name: string | null
  avatar: string | null
  email?: string | null
  phone?: string | null
  is_active?: number | boolean
}
