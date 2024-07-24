import productType from '../types/product.type'
import productModel from '../models/product.model'

export const addProductToDB = async (payload: productType) => {
  return await productModel.create(payload)
}

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log(error)
    })
}

export const getProductByIdFromDB = async (id: String) => {
  return await productModel.findOne({ product_id: id })
}

export const updateProductById = async (id: String, payload: productType) => {
  const result = await productModel.findOneAndUpdate(
    {
      product_id: id
    },
    {
      $set: payload
    }
  )

  return result
}

export const deleteProductById = async (id: String) => {
  const result = await productModel.findOneAndDelete({ product_id: id })
  return result
}
