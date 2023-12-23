interface IUser {
  name: string
  age: number
  email: string
  password: string
  passwrodChangeAt: Date
  photo?: string
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
}
export { IUser }
