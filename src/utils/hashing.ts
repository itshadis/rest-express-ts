import bcrypt from 'bcrypt'

export const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const checkPassword = (inputPassword: string, dbPassword: string) => {
  return bcrypt.compareSync(inputPassword, dbPassword)
}
