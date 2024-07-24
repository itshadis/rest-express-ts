import { Request, Response } from 'express'
import { createSessionValidation, createUserValidation } from '../validations/user.validation'
import { v4 as uuidv4 } from 'uuid'
import { createUser, findUserByEmail } from '../services/auth.service'
import { checkPassword, hashing } from '../utils/hashing'
import UserType from '../types/user.type'
import { signJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()

  const { error, value } = createUserValidation(req.body)

  if (error) {
    console.log('Err', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    value.password = `${hashing(value.password)}`

    await createUser(value)
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Create user success'
    })
  } catch (error) {
    console.log('Err', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    console.log('Err', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    const user: any = await findUserByEmail(value.email)
    const isValid = checkPassword(value.password, user.password)

    if (!isValid) {
      return res.status(401).send({
        status: false,
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login Success',
      data: { accessToken }
    })
  } catch (error: any) {
    console.log('Err', error)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.message
    })
  }
}
