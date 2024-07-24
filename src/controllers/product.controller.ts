import { Request, Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { addProductToDB, deleteProductById, getProductByIdFromDB, getProductFromDB, updateProductById } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()

  const { error, value } = createProductValidation(req.body)

  if (error) {
    console.log('Err', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    await addProductToDB(value)
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add product success'
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

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductByIdFromDB(id)

    if (product) {
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: product
      })
    } else {
      return res.status(404).send({
        status: true,
        statusCode: 404,
        message: 'Data Not Found',
        data: {}
      })
    }
  } else {
    const products: any = await getProductFromDB()
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)

  if (error) {
    console.log('Err', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    const result = await updateProductById(id, value)

    if (result) {
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Update product success'
      })
    } else {
      return res.status(404).send({
        status: true,
        statusCode: 404,
        message: 'Data not found'
      })
    }
  } catch (error) {
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteProductById(id)

    if (result) {
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Delete product success'
      })
    } else {
      return res.status(404).send({
        status: true,
        statusCode: 404,
        message: 'Data not found'
      })
    }
  } catch (error) {
    return res.status(422).send({
      status: true,
      statusCode: 422,
      message: error
    })
  }
}
